function makeGrid() {
  let projectsHTML = "";
  const currentHTML = document.querySelector('.projects-display-grid').innerHTML;

  projects.forEach((project) => {
      let mediaElement = ``;

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
              <img class="grid-cover" src="${project.image}" alt="${project.name}">
          `;
      }

      projectsHTML += `
          <div class="project-container js-${project.identifier}" onclick="goTo('${project.identifier}');">
              <div style="position: relative; width: 100%">
                  ${mediaElement}
              </div>
              <p class="h1 project-preview-title">${project.name}</p>
          </div>
      `;
  });

  document.querySelector('.projects-display-grid').innerHTML = currentHTML + projectsHTML;
  return currentHTML + projectsHTML;
}

function clearGrid(){
  document.querySelector('.projects-display-grid').innerHTML='';
}