function showLoadingOverlay(callback) {
  // Create the overlay div
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');
  overlay.classList.add('h1');

  // Create the loading text element
  const loadingText = document.createElement('div');
  overlay.appendChild(loadingText);

  // Append overlay to the document body
  document.body.appendChild(overlay);

  // Animate the loading text
  let dotCount = 1;
  const maxDots = 6;
  const loadingInterval = setInterval(() => {
    loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
    dotCount = (dotCount % maxDots) + 1;
  }, 300); // adjust speed here

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
  overlay.classList.add('h1');

  // Create the loading text element
  const loadingText = document.createElement('div');
  overlay.appendChild(loadingText);

  // Append overlay to the document body
  document.body.appendChild(overlay);

  // Animate the loading text
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
    }, 1000); // match the CSS transition duration
  }

  // Instead of relying on window load (which only fires once),
  // wait a fixed delay for the new content to be rendered.
  // Adjust the delay (here 500ms) as needed for your content updates.
  setTimeout(hideOverlay, 500);
}