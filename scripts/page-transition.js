// Create the overlay div
const overlay = document.createElement('div');
overlay.classList.add('loading-overlay');
overlay.classList.add('h1');

const loadingText = document.createElement('div');
overlay.appendChild(loadingText);

document.body.appendChild(overlay);

// Animate the loading text
let dotCount = 1;
const maxDots = 6;

const loadingInterval = setInterval(() => {
  loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
  dotCount = (dotCount % maxDots) + 1;
}, 100); // adjust speed here

// Wait until all resources (including images) are fully loaded
window.addEventListener('load', () => {
  overlay.classList.add('hide');

  // Stop animation
  clearInterval(loadingInterval);

  // Remove it after transition
  setTimeout(() => {
    overlay.remove();
  }, 1000); // match transition duration
});