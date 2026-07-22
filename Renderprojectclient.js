// Escapes text so quotes/&/<> coming from Sanity content can't break the HTML we inject.
function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Turns one uploaded media item ({asset: {url, mimeType}}) into an <img> or <video> tag.
// Returns '' if the slot is empty (e.g. no mobile alt was set).
function mediaTag(mediaItem, extraClass) {
  if (!mediaItem || !mediaItem.asset) return ''
  const {url, mimeType} = mediaItem.asset
  const isVideo = mimeType && mimeType.startsWith('video/')

  if (isVideo) {
    return `<video class="${extraClass}" src="${url}" autoplay muted loop playsinline></video>`
  }
  return `<img class="${extraClass}" src="${url}" alt="">`
}

// Renders one desktop+mobile pair as a single media slot. Both versions are
// always in the markup; a CSS media query decides which one shows.
function renderMediaSlot(desktopItem, mobileItem) {
  if (!desktopItem) return ''
  const desktopTag = mediaTag(desktopItem, 'media-desktop')
  const mobileTag = mobileItem ? mediaTag(mobileItem, 'media-mobile') : ''
  return desktopTag + mobileTag
}

// Renders one content block into a div carrying its layout type as a class name
// (e.g. "content-block--2-wide") — your CSS handles the actual arrangement.
function renderContentBlock(block) {
  const slot1 = renderMediaSlot(block.image1, block.mobileImage1)
  const slot2 = renderMediaSlot(block.image2, block.mobileImage2)

  return `
    <div class="content-block content-block--${block.type}">
      ${slot1}
      ${slot2}
    </div>`
}

// Renders the text info section at the top of a project: full-width title
// (underlined), then a description / client-credit-year / tags row below it.
function renderProjectInfo(project) {
  const tagsHtml = (project.tags || [])
    .map(tag => `<p>#${escapeHtml(tag)}</p>`)
    .join('')

  return `
    <div class="project-info">
      <h1 class="project-title">${escapeHtml(project.webTitle)}</h1>
      <div class="project-info-row">
        <div class="project-description">${escapeHtml(project.description)}</div>
        <div class="project-meta">
          <p>Client: ${escapeHtml(project.client)}</p>
          <p>${escapeHtml(project.credit)}</p>
          <p>Year: ${escapeHtml(project.year)}</p>
        </div>
        <div class="project-tags">${tagsHtml}</div>
      </div>
    </div>`
}

// Builds the full inner HTML for one project (info section + every content block).
// This is the browser-side twin of renderProjectPage() in renderProjects.js —
// same logic, but returns a string to inject into the page instead of writing a file.
export function buildProjectHTML(project) {
  const blocksHtml = (project.content || []).map(renderContentBlock).join('\n')
  return renderProjectInfo(project) + blocksHtml
}

// Renders the prev/next/home project navigation footer — same divider
// treatment as the project-info title, with header-style link buttons.
export function buildProjectFooterHTML(prevProject, nextProject) {
  const prevSlug = prevProject.slug ? prevProject.slug.current : ''
  const nextSlug = nextProject.slug ? nextProject.slug.current : ''

  return `
    <div class="project-footer">
      <a class="header-text project-footer-prev" href="project.html?slug=${encodeURIComponent(prevSlug)}">← ${escapeHtml(prevProject.webTitle)}</a>
      <a class="header-text project-footer-home" href="work.html">return home</a>
      <a class="header-text project-footer-next" href="project.html?slug=${encodeURIComponent(nextSlug)}">${escapeHtml(nextProject.webTitle)} →</a>
    </div>`
}