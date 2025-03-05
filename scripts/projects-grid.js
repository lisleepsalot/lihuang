function makeGrid(){
  let projectsHTML = "";
  const currentHTML = document.querySelector('.projects-display-grid').
  innerHTML;
  
  projects.forEach((project)=>{
    let status = ``;
    let click = ``;
    if(project.status != 'done'){
      status = `        
      <div class="status-bar">
        ${project.status}
      </div>
      <div style="background-color: white; opacity: 70%; height: 100%; width: 100%; position: absolute;"></div>`
      click = '';
    }else{
      status = ``;
      click = `onclick="goTo('${project.identifier}');"`
    }

    projectsHTML +=
    `
    <div class="project-container js-${project.identifier}" ${click}>
      <div style="position: relative">
        ${status}
        <img class="grid-image" src="${project.image}" alt="${project.image}">
      </div>
      <p class="h1 h1-center">${project.name}</p>
    </div>
    `
  })
  
  
  document.querySelector('.projects-display-grid').
  innerHTML = currentHTML + projectsHTML;
  return currentHTML + projectsHTML;
}
// const gridHTML = makeGrid();

function clearGrid(){
  document.querySelector('.projects-display-grid').innerHTML='';
}