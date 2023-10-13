// Function to retrieve and accumulate HTML content
function retrieveAndAccumulateContent() {
    // Get all elements with the class "container" from the current page
    const containerElements = document.querySelectorAll('.container');

    // Initialize an array to store the newly retrieved content
    let newContentArray = [];

    // Loop through the "container" elements and append their innerHTML to the array
    containerElements.forEach(element => {
        newContentArray.push(element.innerHTML);
    });

    // Retrieve the existing accumulated content from local storage (if it exists)
    let accumulatedContentArray = JSON.parse(localStorage.getItem('accumulatedContent')) || [];

    // Concatenate the new content with the existing accumulated content
    accumulatedContentArray = accumulatedContentArray.concat(newContentArray);

    // Store the updated accumulated content array in local storage
    localStorage.setItem('accumulatedContent', JSON.stringify(accumulatedContentArray));

    // Optionally, you can log or display the updated accumulated content
    console.log('Updated Accumulated Content:', accumulatedContentArray);
}
