// Shows the loading overlay immediately, animating "Loading..." until the
// page finishes loading, then slides it away. The dot text is set
// synchronously up front since setInterval's first tick doesn't fire until
// its delay elapses, and a fast page load can hide the overlay again before then.
function showLoadingOverlay(callback) {
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');

  const loadingText = document.createElement('div');
  loadingText.textContent = 'Loading.';
  overlay.appendChild(loadingText);

  document.body.appendChild(overlay);

  let dotCount = 1;
  const maxDots = 6;
  const loadingInterval = setInterval(() => {
    loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
    dotCount = (dotCount % maxDots) + 1;
  }, 300);

  // Slides the overlay out, then removes it and calls back.
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

  if (document.readyState === 'complete') {
    hideOverlay();
  } else {
    window.addEventListener('load', hideOverlay);
  }
}

// Runs on script load, so the overlay covers every page open/refresh.
showLoadingOverlay(() => {
  console.log('Overlay removed; page fully loaded.');
});

// Same as showLoadingOverlay, but for content swapped in-page: there's no
// further window "load" event to wait on, so it just waits a fixed delay.
function showLoadingOverlaySamePage(callback) {
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');

  const loadingText = document.createElement('div');
  loadingText.textContent = 'Loading.';
  overlay.appendChild(loadingText);

  document.body.appendChild(overlay);

  let dotCount = 1;
  const maxDots = 6;
  const loadingInterval = setInterval(() => {
    loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
    dotCount = (dotCount % maxDots) + 1;
  }, 300);

  // Slides the overlay out, then removes it and calls back.
  function hideOverlay() {
    overlay.classList.add('hide');
    clearInterval(loadingInterval);
    setTimeout(() => {
      overlay.remove();
      if (callback && typeof callback === 'function') {
        callback();
      }
    }, 1000);
  }

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

// Intercepts clicks on same-site links so leaving a page also gets the
// transition; external, anchor, mailto/tel, and new-tab links pass through untouched.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link || link.target === '_blank') return;

  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return;

  e.preventDefault();
  navigateWithTransition(url.href);
});
