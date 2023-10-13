let inputName = false;
let namesArray = JSON.parse(localStorage.getItem('namesArray')) || [];


function moveArchive(number){
  const repositionDiv = document.querySelector(`.archive-container${number}`);

  repositionDiv.addEventListener('click', () => {
    repositionDiv.classList.toggle('selected');
    document.getElementById('audio').play();
  });
}

function goToTest(){
  if(inputName){
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
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      updateText();
      checkName();
      inputName = true;
      // Prevent the default Enter key behavior (e.g., form submission)
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