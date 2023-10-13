function loadContentIntoElement() {
  // Retrieve the accumulated content from local storage
  const accumulatedContentArray = JSON.parse(localStorage.getItem('accumulatedContent')) || [];

  // Get a reference to the element with the class "shitLoad"
  const shitLoadElement = document.querySelector('.shitLoad');

      // Join the accumulated content array into a single string
      const accumulatedContent = accumulatedContentArray.join('');

      // Set the innerHTML of the element to the accumulated content
      shitLoadElement.innerHTML = accumulatedContent;
}

// Call the function to load the content when needed
loadContentIntoElement();