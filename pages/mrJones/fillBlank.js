let blank1Filled = null;
function fillBlank1(word) {
  document.querySelector('.empty-blank1').innerHTML = '1.' + word;
  blank1Filled = true;
  const audioElement = document.querySelector('.audioClick');

  audioElement.currentTime = 0;
  audioElement.play();
}

let blank2Filled = null;
function fillBlank2(word) {
  document.querySelector('.empty-blank2').innerHTML = '2.' + word;
  blank2Filled = true;
  const audioElement = document.querySelector('.audioClick');

  audioElement.currentTime = 0;
  audioElement.play();
}

let blank3Filled = null;
function fillBlank3(word) {
  document.querySelector('.empty-blank3').innerHTML = '3.' + word;
  blank3Filled = true;
  const audioElement = document.querySelector('.audioClick');

  audioElement.currentTime = 0;
  audioElement.play();
}

let blank4Filled = null;
function fillBlank4(word) {
  document.querySelector('.empty-blank4').innerHTML = '4.' + word;
  blank4Filled = true;
  const audioElement = document.querySelector('.audioClick');

  audioElement.currentTime = 0;
  audioElement.play();
}

let blank5Filled = null;
function fillBlank5(word) {
  document.querySelector('.empty-blank5').innerHTML = '5.' + word;
  blank5Filled = true;
  const audioElement = document.querySelector('.audioClick');

  audioElement.currentTime = 0;
  audioElement.play();
}

