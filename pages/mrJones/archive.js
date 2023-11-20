let inputName = false;
let namesArray = JSON.parse(localStorage.getItem('namesArray')) || [];

function moveArchive(){
  const repositionDiv = document.querySelector(`.archive-container7`);
    repositionDiv.classList.toggle('selected');
  }


  function isNameInputNotEmpty() {
    const inputText = document.querySelector('.nameInput').value;
    return inputText.trim() !== ''; // Check if the trimmed input is not an empty string
  }

function goToTest(){
  updateText();
  if(isNameInputNotEmpty()){
    moveArchive();
    audio.play();
    setTimeout(function() {
      window.location.href = 'page1.html'; 
    }, 1100);
    const inputText = document.querySelector('.nameInput').value;
    namesArray.push(inputText);
    localStorage.setItem('namesArray', JSON.stringify(namesArray));
    console.log(namesArray);

  }else{
    document.querySelector('.name-reminder').innerHTML=
    'Enter your name before everything.';

  }

  
}

const archiveContainers = document.querySelectorAll('.archive-container');
archiveContainers.forEach((container) => {
  container.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      updateText();
      checkName();
      setTimeout(function() {
        goToTest();; 
      }, 300);
      
      event.preventDefault();
    }
  });
});



function updateText(){
  document.getElementById('audioClick').play();
  const inputText = document.querySelector('.nameInput').value;
  document.querySelector('.tag').innerHTML=
  `
  name:  ${inputText}<br>
  date: ____________________<br>
  note: ____________________
  `;

  
}