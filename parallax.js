// Core Parallax Effect Module
// Smooth mouse-based parallax that moves elements opposite to cursor position
// with acceleration based on distance from center

// Maximum parallax offset in pixels
const PARALLAX_MAX = 24;

// Target transform values (smoothly interpolated via CSS transition)
let targetTX = 0;
let targetTY = 0;

// RAF handle for debouncing transform updates
let parallaxRaf = null;

// Elements to apply parallax to (should have matching CSS transitions)
let parallaxElements = [];

// Initialize parallax effect on specified elements
function initParallax(elements) {
  if (Array.isArray(elements)) {
    parallaxElements = elements;
  } else {
    parallaxElements = [elements];
  }
  
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', resetParallax);
  
  // Ensure elements have the necessary CSS transition
  parallaxElements.forEach(el => {
    if (!el.style.transition.includes('transform')) {
      el.style.transition = 'transform 180ms ease-out';
    }
  });
}

// Apply the calculated parallax transform to all elements
function applyParallax() {
  parallaxRaf = null;
  const transform = `translate(${targetTX}px, ${targetTY}px)`;
  
  parallaxElements.forEach(el => {
    el.style.transform = transform;
  });
}

// Calculate parallax offset based on mouse position
function onMouseMove(e) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  
  // Normalized distance from center (-1 to 1)
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  
  // Acceleration factor: moves more aggressively when further from center
  const ax = 1 + 0.6 * Math.abs(dx);
  const ay = 1 + 0.6 * Math.abs(dy);
  
  // Calculate target offset (negative to move opposite of cursor)
  targetTX = -dx * PARALLAX_MAX * ax;
  targetTY = -dy * PARALLAX_MAX * ay;
  
  // Debounce transform updates using RAF
  if (parallaxRaf === null) {
    parallaxRaf = requestAnimationFrame(applyParallax);
  }
}

// Reset parallax to center position
function resetParallax() {
  targetTX = 0;
  targetTY = 0;
  
  if (parallaxRaf === null) {
    parallaxRaf = requestAnimationFrame(applyParallax);
  }
}

// Cleanup function to remove event listeners
function destroyParallax() {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseleave', resetParallax);
  
  if (parallaxRaf !== null) {
    cancelAnimationFrame(parallaxRaf);
    parallaxRaf = null;
  }
  
  // Reset transform on all elements
  parallaxElements.forEach(el => {
    el.style.transform = '';
  });
  
  parallaxElements = [];
}

// Export functions
export { initParallax, resetParallax, destroyParallax };