let letter = '';
let text = '';
let spanCount = 0;
const textDisplay = document.querySelector('.text-display');

const keyMappings = {
  'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g',
  'h': 'h', 'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n',
  'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'u',
  'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
  '6': '6', '7': '7', '8': '8', '9': '9',
  ' ': '&nbsp','Enter':'Enter'
};

document.body.addEventListener('keydown', function(event) {
  console.log('Key pressed:', event.key);
  const pressedKey = event.key.toLowerCase();

  if (spanCount >= 45) {
    return; // Exit the event listener if spanCount is 45 or more
  }

  if (event.key === 'Enter') {
    const nearestMultipleOf9 = Math.ceil(spanCount / 9) * 9;
    spanCount = nearestMultipleOf9;
    text += '<br>';
    document.querySelector('.text-display').innerHTML = text;
  }else if (keyMappings.hasOwnProperty(pressedKey)) {
    textDisplay.innerHTML='';
    letter = keyMappings[pressedKey];
    renderText(letter);
    console.log(spanCount);
  }
});





const renderText = function(letter) {
  if (letter !== 'Enter') {
    const lineBreak = spanCount > 0 && (spanCount + 1) % 9 === 0 ? '<br>' : '';
    const html = `<span class="${spanCount % 2 === 0 ? 'vtext' : 'htext'}">${letter}</span>${lineBreak}`;
    text += html;
    textDisplay.innerHTML = text;
  } 

  if (letter !== 'Enter') {
    spanCount++;
  }
};
