function makeGrid(){
  let projectsHTML = "";
  const currentHTML = document.querySelector('.projects-display-grid').
  innerHTML;
  
  projects.forEach((project)=>{
    projectsHTML +=
    `
    <div class="project-container js-${project.identifier}">
      <img class="grid-image" src="${project.image}" alt="${project.image}">
      <p class="h1 h1-center">${project.name}</p>
    </div>
    `
  })
  
  
  document.querySelector('.projects-display-grid').
  innerHTML = currentHTML + projectsHTML;
  return currentHTML + projectsHTML;
}
const gridHTML = makeGrid();

function clearGrid(){
  document.querySelector('.projects-display-grid').innerHTML='';
}