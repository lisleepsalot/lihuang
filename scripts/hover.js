// Attach event listeners to each project container
document.querySelectorAll('.project-container').forEach(container => {
  container.addEventListener('mouseenter', function(e) {
    // Extract the identifier from the data attribute
    const identifier = e.currentTarget.dataset.identifier;
    console.log("Hovered identifier:", identifier);
    // Create the floating div with the identifier as its text content
    createFloatingDiv(e.pageX, e.pageY, identifier);
  });
  
  container.addEventListener('mousemove', function(e) {
    updateFloatingDiv(e.pageX, e.pageY);
  });
  
  container.addEventListener('mouseleave', function(e) {
    removeFloatingDiv();
  });
});

let floatingDiv;
// Create the floating div at initial position (x, y) with identifier text
function createFloatingDiv(x, y, identifier) {
  const projectData = projects.find(project => project.identifier === identifier);
  const projectTags = projectData.categories.map(tag => `#${tag}`).join(" <br> ");
  if (!projectData) {
    console.error(`Project with identifier "${identifier}" not found.`);
    return;
  }
  //TODO: get the project items and get its categories, and name. and put it in the HTML, below is a placeholder

  
  floatingDiv = document.createElement('div');
  floatingDiv.innerHTML = `     
      ${projectData.name} <br>
      ---------------------- <br>
      ${projectTags} <br>
      ---------------------- <br>
      ${projectData.year} <br>`
  floatingDiv.classList.add('floating-info');
  floatingDiv.classList.add('header-text');
  floatingDiv.style.pointerEvents = 'none'; 
  // floatingDiv.textContent = identifier;
  
  // Append it to the document so we can measure its dimensions
  document.body.appendChild(floatingDiv);
  
  // Set its initial position (adjusting horizontally if needed)
  updateFloatingDiv(x, y);
}

// Update the floating div's position based on mouse coordinates
function updateFloatingDiv(x, y) {
  if (!floatingDiv) return;
  
  // Get the div's width
  const divWidth = floatingDiv.offsetWidth;
  
  // If positioning at x would cause overflow on the right, reposition it to the left of the cursor
  if (x + divWidth > window.innerWidth) {
    leftPos = x - divWidth;
  } else {
    leftPos = x;
  }
  
  // Set the computed position
  floatingDiv.style.left = leftPos + 'px';
  floatingDiv.style.top = y + 'px';
}

// Remove the floating div from the DOM
function removeFloatingDiv() {
  if (floatingDiv) {
    floatingDiv.remove();
    floatingDiv = null;
  }
}