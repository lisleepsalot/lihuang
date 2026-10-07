// Are.na channel viewer: loads every block from one channel (v3 API) and lets
// visitors step, shuffle, or jump to the channel, after a timed about intro.

// Config — timings must match the CSS transitions.
const CHANNEL_SLUG = 'li-misc';
const API_BASE = 'https://api.are.na/v3';
const PAGE_SIZE = 100;
const ABOUT_DURATION = 5000;
const PANEL_FADE_MS = 400;
const BLOCK_FADE_MS = 300;

// State.
let blocks = [];
let currentIndex = 0;
let channelUrl = '';
let blockFadeTimer = null;
let aboutTimers = [];

// DOM.
const miscAbout = document.querySelector('.misc-about');
const miscContainer = document.querySelector('.misc-container');
const miscMedia = document.querySelector('.misc-media');
const miscDescription = document.querySelector('.misc-description');
const prevButton = document.getElementById('misc-prev');
const shuffleButton = document.getElementById('misc-shuffle');
const nextButton = document.getElementById('misc-next');
const visitChannelBtn = document.getElementById('visit-channel');
const aboutToggleBtn = document.getElementById('about-toggle');


/* ---------- Data ---------- */

// Fetches a URL as JSON, throwing on non-2xx responses.
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Are.na ${response.status} for ${url}`);
  return response.json();
}

// Fetches channel metadata (title, slug, owner).
function fetchChannelInfo(slug) {
  return fetchJson(`${API_BASE}/channels/${slug}`);
}

// Collects every page of channel contents into one array.
async function fetchAllContents(slug) {
  const items = [];
  let page = 1;

  while (page) {
    const res = await fetchJson(`${API_BASE}/channels/${slug}/contents?per=${PAGE_SIZE}&page=${page}`);
    items.push(...res.data);
    page = res.meta.has_more_pages ? res.meta.next_page : null;
  }
  return items;
}

// Keeps finished blocks only, dropping nested channels and pending blocks.
function filterDisplayable(items) {
  return items.filter(item => item.base_type === 'Block' && item.type !== 'PendingBlock');
}

// Builds the public are.na URL for the channel.
function buildChannelUrl(channel) {
  return channel.owner && channel.owner.slug
    ? `https://www.are.na/${channel.owner.slug}/${channel.slug}`
    : '';
}

// Loads channel info and contents together, then shows the first block.
async function loadChannel() {
  try {
    const [channel, contents] = await Promise.all([
      fetchChannelInfo(CHANNEL_SLUG),
      fetchAllContents(CHANNEL_SLUG)
    ]);
    channelUrl = buildChannelUrl(channel);
    blocks = filterDisplayable(contents);

    if (blocks.length > 0) displayBlock(0);
    else showMessage('This channel is empty.');
  } catch (error) {
    console.error('Error fetching Are.na channel:', error);
    showMessage('Error loading content');
  }
}


/* ---------- Element builders ---------- */

// Creates an <img> with a 2x source from an Are.na image object.
function createImage(image, alt) {
  const img = document.createElement('img');
  img.src = image.large.src;
  img.srcset = `${image.large.src} 1x, ${image.large.src_2x} 2x`;
  img.alt = image.alt_text || alt || '';
  img.loading = 'lazy';
  return img;
}

// Creates a .misc-text wrapper holding the given HTML.
function createTextWrapper(html) {
  const wrapper = document.createElement('div');
  wrapper.className = 'misc-text';
  wrapper.innerHTML = html;
  return wrapper;
}

// Creates an external link that opens in a new tab.
function createLink(href, label) {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = label;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}

// Creates a <video> or <audio> player with controls.
function createPlayer(tag, url) {
  const el = document.createElement(tag);
  el.src = url;
  el.controls = true;
  return el;
}


/* ---------- Block renderers ---------- */

// Renders an Image block.
function renderImage(block) {
  return createImage(block.image, block.title);
}

// Renders a Text block from Are.na's pre-rendered HTML.
function renderText(block) {
  return createTextWrapper(block.content.html);
}

// Renders a Link block as its preview image, or a text link if none.
function renderLink(block) {
  if (block.image) return createImage(block.image, block.title);

  const url = block.source ? block.source.url : '#';
  const wrapper = createTextWrapper('');
  wrapper.appendChild(createLink(url, block.title || url));
  return wrapper;
}

// Renders an Attachment block as a player, preview image, or download link.
function renderAttachment(block) {
  const { url, content_type, filename } = block.attachment;
  const type = content_type || '';

  if (type.startsWith('video')) return createPlayer('video', url);
  if (type.startsWith('audio')) return createPlayer('audio', url);
  if (block.image) return createImage(block.image, block.title);

  const wrapper = createTextWrapper('');
  wrapper.appendChild(createLink(url, filename || 'Download file'));
  return wrapper;
}

// Renders an Embed block using the iframe HTML Are.na provides.
function renderEmbed(block) {
  if (block.embed.html) {
    const wrapper = document.createElement('div');
    wrapper.className = 'misc-embed';
    wrapper.innerHTML = block.embed.html;
    return wrapper;
  }
  if (block.image) return createImage(block.image, block.title);
  return createTextWrapper('Embedded media unavailable');
}

const RENDERERS = {
  Image: renderImage,
  Text: renderText,
  Link: renderLink,
  Attachment: renderAttachment,
  Embed: renderEmbed
};

// Picks the renderer for a block's type, with a fallback notice.
function renderMedia(block) {
  const render = RENDERERS[block.type];
  return render ? render(block) : createTextWrapper('Unsupported block type');
}

// Builds the caption: title, description, and source link.
function renderDescription(block) {
  const fragment = document.createDocumentFragment();

  if (block.title) {
    const strong = document.createElement('strong');
    strong.textContent = block.title;
    fragment.append(strong, document.createElement('br'));
  }
  if (block.description) {
    const span = document.createElement('span');
    span.innerHTML = block.description.html;
    fragment.appendChild(span);
  }
  if (block.source && block.source.url) {
    fragment.append(document.createElement('br'), createLink(block.source.url, 'View source'));
  }
  if (!fragment.childNodes.length) fragment.textContent = 'No description available.';
  return fragment;
}


/* ---------- Display & navigation ---------- */

// Shows a status message in the media panel.
function showMessage(text) {
  miscMedia.replaceChildren(createTextWrapper(text));
  miscDescription.replaceChildren();
}

// Fades both block panels in or out together.
function setBlockFaded(isFaded) {
  miscMedia.classList.toggle('fade-out', isFaded);
  miscDescription.classList.toggle('fade-out', isFaded);
}

// Swaps in a block's media and caption, then fades back in.
function swapContent(block) {
  miscMedia.replaceChildren(renderMedia(block));
  miscDescription.replaceChildren(renderDescription(block));
  setBlockFaded(false);
}

// Shows a block, optionally with a fade, cancelling any pending swap.
function displayBlock(index, withTransition = false) {
  const block = blocks[index];
  if (!block) return;

  clearTimeout(blockFadeTimer);
  if (!withTransition) return swapContent(block);

  setBlockFaded(true);
  blockFadeTimer = setTimeout(() => swapContent(block), BLOCK_FADE_MS);
}

// Moves to an index, wrapping around both ends.
function goTo(index) {
  if (blocks.length === 0) return;
  currentIndex = (index + blocks.length) % blocks.length;
  displayBlock(currentIndex, true);
}

// Steps to the previous block.
function showPrevious() {
  goTo(currentIndex - 1);
}

// Steps to the next block.
function showNext() {
  goTo(currentIndex + 1);
}

// Jumps to a random block other than the current one.
function showRandom() {
  if (blocks.length < 2) return;
  const offset = 1 + Math.floor(Math.random() * (blocks.length - 1));
  goTo(currentIndex + offset);
}

// Opens the channel on are.na in a new tab.
function openChannel() {
  if (channelUrl) window.open(channelUrl, '_blank', 'noopener');
}


/* ---------- About panel & setup ---------- */

// Cancels any pending about-panel timers.
function clearAboutTimers() {
  aboutTimers.forEach(clearTimeout);
  aboutTimers = [];
}

// Shows the about panel, then fades it out and the viewer in.
function runAboutSequence() {
  clearAboutTimers();
  miscContainer.classList.remove('fade-in');
  miscAbout.classList.remove('fade-out');

  aboutTimers.push(setTimeout(() => {
    miscAbout.classList.add('fade-out');
    aboutTimers.push(setTimeout(() => miscContainer.classList.add('fade-in'), PANEL_FADE_MS));
  }, ABOUT_DURATION));
}

// Wires every button to its handler.
function bindEvents() {
  prevButton.addEventListener('click', showPrevious);
  nextButton.addEventListener('click', showNext);
  shuffleButton.addEventListener('click', showRandom);
  visitChannelBtn.addEventListener('click', openChannel);
  aboutToggleBtn.addEventListener('click', runAboutSequence);
}

// Starts the intro, binds events, and loads the channel.
function init() {
  bindEvents();
  runAboutSequence();
  loadChannel();
}

init();
