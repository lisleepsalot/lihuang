function addVoice() {
  // Remove "not-shown" class from elements with class "voice-between"
  const voiceBetweenElement = document.querySelector('.voice-between');
  if (voiceBetweenElement) {
    voiceBetweenElement.classList.remove('not-shown');
  }

  // Add "now-shown" class to elements with class "container" and "right-part-container"
  const containerElements = document.querySelectorAll('.container');
  const rightPartContainerElements = document.querySelectorAll('.right-part-container');
  [...containerElements, ...rightPartContainerElements].forEach((element) => {
    element.classList.add('now-shown');
  });
}

function addVoice() {
  // Remove "not-shown" class from elements with class "voice-between"
  const voiceBetweenElement = document.querySelector('.voice-between');
  if (voiceBetweenElement) {
    voiceBetweenElement.classList.remove('not-shown');
  }

  // Add "now-shown" class to elements with class "container" and "right-part-container"
  const containerElements = document.querySelectorAll('.ccontent-container');
  const rightPartContainerElements = document.querySelectorAll('.right-part-container');
  [...containerElements, ...rightPartContainerElements].forEach((element) => {
    element.classList.add('now-shown');
  });
}
