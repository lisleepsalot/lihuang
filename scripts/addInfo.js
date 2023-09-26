document.querySelector('.top-icon').addEventListener('click', function() {
  const addAboveElement = document.querySelector('.add-above');
  
  if (addAboveElement.innerHTML.trim() !== '') {
    addAboveElement.innerHTML = ''; // Empty the content
  } else {
    addAboveElement.innerHTML = `
      <div class="info">
        Li is currently hard at work finishing this website. Be sure to check back soon for exciting updates and new features!
      </div>
    `;
  }
});
