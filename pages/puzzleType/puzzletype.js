const textDisplay = document.querySelector('.text-display');

textDisplay.addEventListener('input', function() {
  let sanitizedText = sanitizeText(textDisplay.innerText);
  textDisplay.innerHTML = '';

  for (let i = 0; i < sanitizedText.length; i++) {
    const span = document.createElement('span');
    span.textContent = sanitizedText[i];
    span.className = (i + 1) % 2 === 0 ? 'htext' : 'vtext';
    textDisplay.appendChild(span);
  }

  if (sanitizedText.length % 2 !== 0) {
    textDisplay.innerHTML += '<br>';
  }

  moveCursorToEnd(textDisplay);
});

function sanitizeText(text) {
  // Allow only letters and spaces
  return text.replace(/[^a-zA-Z\s]/g, '');
}

function moveCursorToEnd(element) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);

  element.focus();
}
