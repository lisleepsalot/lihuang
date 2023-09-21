let projectsHTML = "";

projects.forEach((project)=>{
  projectsHTML +=
  `
  <div class="project-container">
    <img class="grid-image" src="${project.image}">
    <p class="h1">${project.name}</p>
  </div>
  `
})

document.querySelector('.projects-display-grid').
innerHTML = projectsHTML;