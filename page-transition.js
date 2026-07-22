function showLoadingOverlay(callback) {
  // Create the overlay div
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');

  // Create the loading text element
  const loadingText = document.createElement('div');
  loadingText.textContent = 'Loading.';
  overlay.appendChild(loadingText);

  // Append overlay to the document body
  document.body.appendChild(overlay);

  // Animate the loading text. setInterval doesn't fire its first tick until
  // after the delay, so the text above is set synchronously first — without
  // it, a fast page load can hide the overlay again before any dot ever renders.
  let dotCount = 1;
  const maxDots = 6;
  const loadingInterval = setInterval(() => {
    loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
    dotCount = (dotCount % maxDots) + 1;
  }, 300);

  // Function to hide and remove overlay
  function hideOverlay() {
    overlay.classList.add('hide');
    clearInterval(loadingInterval);
    setTimeout(() => {
      overlay.remove();
      if (callback && typeof callback === 'function') {
        callback();
      }
    }, 1000); // match transition duration
  }

  // Check if the page has already loaded
  if (document.readyState === 'complete') {
    // Page is loaded, so hide overlay immediately
    hideOverlay();
  } else {
    // Otherwise, wait for the window load event
    window.addEventListener('load', hideOverlay);
  }
}

// Call the function as soon as the script runs,
// so that every time the page is opened or refreshed the overlay is created.
showLoadingOverlay(() => {
  console.log('Overlay removed; page fully loaded.');
});

function showLoadingOverlaySamePage(callback) {
  // Create the overlay div
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');

  // Create the loading text element
  const loadingText = document.createElement('div');
  loadingText.textContent = 'Loading.';
  overlay.appendChild(loadingText);

  // Append overlay to the document body
  document.body.appendChild(overlay);

  // Animate the loading text. setInterval doesn't fire its first tick until
  // after the delay, so the text above is set synchronously first — without
  // it, a fast page load can hide the overlay again before any dot ever renders.
  let dotCount = 1;
  const maxDots = 6;
  const loadingInterval = setInterval(() => {
    loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
    dotCount = (dotCount % maxDots) + 1;
  }, 300); // adjust speed here

  // Function to hide and remove overlay
  function hideOverlay() {
    overlay.classList.add('hide'); // trigger slide-away animation
    clearInterval(loadingInterval);
    setTimeout(() => {
      overlay.remove();
      if (callback && typeof callback === 'function') {
        callback();
      }
    }, 1000); 
  }

  // Instead of relying on window load (which only fires once),
  // wait a fixed delay for the new content to be rendered.
  // Adjust the delay (here 500ms) as needed for your content updates.
  setTimeout(hideOverlay, 500);
}

// Covers the screen, then navigates to `url` — the exit half of the page
// transition. The overlay's default (non-.hide) state already covers the
// screen, so appending it needs no animation; the destination page's own
// showLoadingOverlay() takes over from there, staying covered until it's
// ready and sliding away to reveal it.
function navigateWithTransition(url) {
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');
  document.body.appendChild(overlay);

  setTimeout(() => {
    window.location.href = url;
  }, 400);
}
window.navigateWithTransition = navigateWithTransition;

// Intercept clicks on same-site links so leaving a page gets the transition
// too, not just arriving on one.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link || link.target === '_blank') return;

  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return; // let external links behave normally

  e.preventDefault();
  navigateWithTransition(url.href);
});