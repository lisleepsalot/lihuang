const checkHide = document.querySelector('.js-hide');
console.log(checkHide);


function hideImage(number) {
  const imagePath = `.image-container${number}`;
  document.querySelector(imagePath).classList.add('js-hide');
  console.log('add hide sucessful');

}

function showImage(number) {
  const imagePath = `.image-container${number}`;
  document.querySelector(imagePath).classList.remove('js-hide');
  console.log('remove hide sucessful');

}