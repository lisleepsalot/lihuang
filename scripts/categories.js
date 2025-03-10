
//this part changes to display/archive/design
document.addEventListener("DOMContentLoaded", function () {
  let currentView = "design"; // Initial state: 'design' or 'archive'

  // Change event listener to #utility-section instead of .header-lower
  document.querySelector("#utility-section").addEventListener("click", function (event) {
      const archiveAnimation = event.target.closest(".archive-animation");

      if (archiveAnimation) {
          const videoElement = archiveAnimation.querySelector("video");
          const sourceElement = videoElement.querySelector("source");

          // Toggle video source and update state
          if (currentView === "design") {
              sourceElement.src = "images/other/animation3.mp4";
              videoElement.load(); // Refresh video source
              showArchives(); // Call showArchives function
              currentView = "archive"; // Update state
          } else {
              sourceElement.src = "images/other/animation2.mp4";
              videoElement.load(); // Refresh video source
              showDesign(); // Call showDesign function
              currentView = "design"; // Update state
          }
      }
  });
});

//this method generates the projects
function showDesign(){
  const designCategoryElements = document.querySelectorAll('.design-category');
  clearRest();
  makeGrid();
  designCategoryElements.forEach((element) => {
  element.classList.add('selected-yellow'); 
});
  document.querySelector('.archive-display-grid').innerHTML = ''
}

//this methods shows the archive grid and replaces the project grids
function showArchives() {
  let archiveHTML = '';
  clearRest();
  archives.forEach((archive) => {
    let mediaElement;
    
    // Check if the archive image is a video
    if (archive.image.endsWith('.mp4')) {
      mediaElement = `
        <video class="archive-video illo" autoplay muted loop>
          <source src="${archive.image}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      mediaElement = `<img class="archive-image illo" src="${archive.image}">`;
    }

    archiveHTML += `
      <div class="archive-container" onclick="archiveView('${archive.index}')">
        <div class="grid-description">
          ${archive.description}
        </div>
        ${mediaElement}
      </div>
    `;
  });

  document.querySelector('.archive-display-grid').innerHTML = archiveHTML;
}

function archiveView(archiveIndex) {
  const archiveItem = archives.find(archive => archive.index === archiveIndex);
  
  if (archiveItem) {
    console.log(archiveItem);

    // Check if the image is a video (ends with .mp4)
    const isVideo = archiveItem.image.endsWith('.mp4');

    const archiveViewItem = `   
      <div class="archive-view-bg">
        <div class = "archive-view-close"> [x] close </div>
        ${isVideo 
          ? `<video class="archive-view-content" src="${archiveItem.image}" autoplay loop muted></video>` 
          : `<img class="archive-view-content" src="${archiveItem.image}" alt="Archive Image">`}
      </div>`;

    // Insert into the document (assuming you want to display it in `body`)
    document.body.insertAdjacentHTML('beforeend', archiveViewItem);

    return archiveItem; 
  } else {
    console.warn('Archive not found:', archiveIndex);
  }
}

//this checks if archive view or close button  got clicked and close the view
document.addEventListener('click', function(event) {
  const archiveBg = document.querySelector('.archive-view-bg');

  if (event.target.classList.contains('archive-view-bg') || 
      event.target.classList.contains('archive-view-close')) {
    archiveBg.remove();
  }
});

function clearRest(){
  document.querySelector('.projects-display-grid').innerHTML='';
  document.querySelector('.archive-display-grid').innerHTML = '';
  document.querySelector('.play-display-grid').innerHTML = '';
}