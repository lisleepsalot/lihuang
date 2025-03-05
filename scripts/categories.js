//these functions could protentially merge into one;
document.querySelector('.design-category').addEventListener('click', function() {
  // showDesign();
});
//this is the archive category
document.querySelector('.archive-category').addEventListener('click', function() {
  showArchives();
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

function showArchives() {
  let archiveHTML ='';
  clearRest();
  archives.forEach((archive)=>{
    archiveHTML += `
    <div class="archive-container archive-piece${archive.index}" onclick="showArchive('${archive.index}')">
        <div class="grid-description">
            ${archive.description}
        </div>
        <img class="illustration-image illo" src="${archive.image}">
    </div>
    `
  });
  document.querySelector('.archive-display-grid').innerHTML = archiveHTML;
;
}

function clearRest(){
  document.querySelector('.projects-display-grid').innerHTML='';
  document.querySelector('.archive-display-grid').innerHTML = '';
  document.querySelector('.play-display-grid').innerHTML = '';
}