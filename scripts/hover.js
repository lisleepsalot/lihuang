const imageContainers = document.querySelectorAll('.bigg');

// Add a click event listener to each "image-container" element
imageContainers.forEach((container) => {
  container.addEventListener('click', () => {
    // Toggle the "bigger" class on the clicked element
    container.classList.toggle('bigger');
  });
});