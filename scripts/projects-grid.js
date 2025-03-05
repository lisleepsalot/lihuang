function makeGrid(){
  let projectsHTML = "";
  const currentHTML = document.querySelector('.projects-display-grid').
  innerHTML;
  
  projects.forEach((project)=>{

    projectsHTML +=
    `
    <div class="project-container js-${project.identifier}" onclick="goTo('${project.identifier}');">
      <div style="position: relative">
        <img class="grid-image" src="${project.image}" alt="${project.image}">
      </div>
      <p class="h1 project-preview-title">${project.name}</p>
    </div>
    `
  })
  
  
  document.querySelector('.projects-display-grid').
  innerHTML = currentHTML + projectsHTML;
  return currentHTML + projectsHTML;
}

function clearGrid(){
  document.querySelector('.projects-display-grid').innerHTML='';
}