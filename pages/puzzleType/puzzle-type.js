let letter = '';
let text = '';
let spanCount = 0;
const textDisplay = document.querySelector('.text-display');

const keyMappings = {
  'a': 'a', 'b': 'B', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g',
  'h': 'h', 'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n',
  'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'u',
  'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
  '6': '6', '7': '7', '8': '8', '9': '9',
  ' ': ' ',
};

const renderText = function(letter) {
  //give span horizontal or vertical class
  if (letter !== 'Enter') {
    event.preventDefault();
    const lineBreak = spanCount > 0 && (spanCount + 1) % 9 === 0 ? '<br>' : '';
    console.log(letter);
    html = `<span class="${spanCount % 2 === 0 ? 'vtext' : 'htext'}">${letter}</span>${lineBreak}`;
    console.log(html);
    text += html;
    spanCount++;
  } 
};

//this thing assigns different functions when different keys were pressed
document.body.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log('Key pressed:', event.key);
  const pressedKey = event.key;
  if (event.key === 'Backspace') {
    removeLastSpan();
  }
// Exit the event listener if spanCount is 45 or more
  if (spanCount >= 45) {
    return; 
  }

// If pressed enter, add spanCount to neariest 9 multiples and add <br>
  if (event.key === 'Enter') {
    const nearestMultipleOf9 = Math.ceil(spanCount / 9) * 9;
    spanCount = nearestMultipleOf9;
    text += '<br>';}
// If pressed backspace, remove the last span
// If pressed other keys, pass letter in accordancd to the key map
  else if (keyMappings.hasOwnProperty(pressedKey)) {
    console.log(text);
    letter = keyMappings[pressedKey];
    renderText(letter);
  }
  console.log(text);
  //this is the only place that render the text
  document.querySelector('.text-display').innerHTML = text;
});

document.body.addEventListener('keydown', function(event) {
  if (event.key === 'backspace') {
    removeLastSpan();
  }
});


const removeLastSpan = function(){
  if (spanCount > 0) {
      //const lastSpan = document.querySelector('span:last-child');
      text = document.querySelector('.text-display').innerHTML;
      text = text.slice(0, -28); // Remove the last character from the text
      //document.querySelector('.text-display').removeChild(lastSpan); // Remove the last <span> element
      document.querySelector('.text-display').innerHTML =  text; 
      console.log(text);
      spanCount--;
  }
}