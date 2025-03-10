// Create an object to store the checkbox states (default unchecked)
const designCheckboxStates = {
    editorial: false,
    identity: false,
    motion: false
  };
  
  // Get references to the checkboxes
  const editorialCheckbox = document.getElementById('checkbox-editorial');
  const identityCheckbox = document.getElementById('checkbox-identity');
  const motionCheckbox = document.getElementById('checkbox-motion');
  
  // Explicitly set the checkboxes to unchecked (optional, as they are unchecked by default)
  editorialCheckbox.checked = false;
  identityCheckbox.checked = false;
  motionCheckbox.checked = false;
  
// Update the state object based on checkbox changes and recall makeGrid()
editorialCheckbox.addEventListener('change', function(e) {
    designCheckboxStates.editorial = e.target.checked;
    console.log('Editorial:', designCheckboxStates.editorial);
    clearGrid();
    makeGrid();
  });
  
  identityCheckbox.addEventListener('change', function(e) {
    designCheckboxStates.identity = e.target.checked;
    console.log('Identity:', designCheckboxStates.identity);
    clearGrid();
    makeGrid();
  });
  
  motionCheckbox.addEventListener('change', function(e) {
    designCheckboxStates.motion = e.target.checked;
    console.log('Motion:', designCheckboxStates.motion);
    clearGrid();
    makeGrid();
  });

  function makeGrid() {
    let projectsHTML = "";
    // Grab the current grid content (if needed)
    const currentHTML = document.querySelector('.projects-display-grid').innerHTML;
    
    // Build an array of selected checkboxes keys (e.g., "editorial", "identity", "motion")
    const selectedKeys = Object.keys(designCheckboxStates).filter(key => designCheckboxStates[key]);
  
    // Map checkbox keys to category names
    const checkboxCategoryMap = {
      editorial: "editorial design",
      identity: "identity design",
      motion: "motion design"
    };
    
    let filteredProjects = [];
    // If no checkboxes are selected OR all are selected, show all projects
    if (selectedKeys.length === 0 || selectedKeys.length === Object.keys(designCheckboxStates).length) {
      filteredProjects = projects;
    } else {
      // Convert selected keys to their corresponding category names
      const selectedCategories = selectedKeys.map(key => checkboxCategoryMap[key]);
      
      // Filter projects: project.categories must include at least one of the selected categories
      filteredProjects = projects.filter(project => 
        project.categories.some(cat => selectedCategories.includes(cat))
      );
    }
    
    // Generate HTML for each filtered project
    filteredProjects.forEach((project) => {
      let mediaElement = "";
      // Check if the file is a video or an image
      if (project.image.endsWith('.mp4')) {
        mediaElement = `
          <video class="grid-cover" autoplay muted loop playsinline>
            <source src="${project.image}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
      } else {
        mediaElement = `
          <img class="grid-cover" src="images/placeholder.jpg"srcset="${project.image}" alt="${project.name}">
        `;
      }
      
      projectsHTML += `
        <div class="project-container js-${project.identifier}" data-identifier="${project.identifier}" onclick="goTo('${project.identifier}');">
            <div style="position: relative; width: 100%">
                ${mediaElement}
            </div>
            <p class="h1 project-preview-title">${project.name}</p>
        </div>
      `;
    });
    
    // Update the projects display grid with the filtered projects HTML
    document.querySelector('.projects-display-grid').innerHTML = currentHTML + projectsHTML;
    return currentHTML + projectsHTML;
  }

const gridHTML = makeGrid();

function clearGrid(){
  document.querySelector('.projects-display-grid').innerHTML='';
}

