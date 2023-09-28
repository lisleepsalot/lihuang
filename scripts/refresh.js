document.addEventListener('DOMContentLoaded', function() {
  // Check if the value is true
  const shouldRefresh = localStorage.getItem('shouldRefresh') === 'true';

  if (shouldRefresh) {
    // Clear the value
    localStorage.removeItem('shouldRefresh');

    // Perform a page refresh
    window.location.reload();
  }
});
