//these functions could protentially merge into one;
document.querySelector('.design-category').addEventListener('click', function() {
  clearSelectedColors();
  showDesign();
});

document.querySelector('.illustration-category').addEventListener('click', function() {
  clearSelectedColors();
  showIllustration();
});

document.querySelector('.play-category').addEventListener('click', function() {
  clearSelectedColors();
  showPlay();
});




function showDesign(){
  const designCategoryElements = document.querySelectorAll('.design-category');

  designCategoryElements.forEach((element) => {
  element.classList.add('selected-yellow'); 
});
  document.querySelector('.illustration-display-grid').innerHTML = ''
}

function showIllustration() {
  const designCategoryElements = document.querySelectorAll('.illustration-category');

  designCategoryElements.forEach((element) => {
    element.classList.add('selected-red');
  });
}

function showPlay(){
  const designCategoryElements = document.querySelectorAll('.play-category');

  designCategoryElements.forEach((element) => {
  element.classList.add('selected-blue');
})
}

function clearSelectedColors(){
  const designCategoryElements = document.querySelectorAll('.main-page-category');

  designCategoryElements.forEach((element) => {
  element.classList.remove('selected-yellow'); });

  designCategoryElements.forEach((element) => {
  element.classList.remove('selected-red');  });

  designCategoryElements.forEach((element) => {
  element.classList.remove('selected-blue'); });

  memeStatus = false;
}