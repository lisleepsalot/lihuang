/*document.querySelectorAll('.illustration-piece1').addEventListener('click', () => {
  showIllustration('1');});

document.querySelectorAll('.illustration-piece2').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('2');});});

document.querySelectorAll('.illustration-piece3').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('3');});});

document.querySelectorAll('.illustration-piece4').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('4');});});

document.querySelectorAll('.illustration-piece5').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('5');});});

document.querySelectorAll('.illustration-piece6').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('6');});});

document.querySelectorAll('.illustration-piece7').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('7');});});

document.querySelectorAll('.illustration-piece8').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('8');});});

document.querySelectorAll('.illustration-piece9').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('9');});});

document.querySelectorAll('.illustration-piece10').forEach((element) => {
  element.addEventListener('click', () => {
  showIllustration('10');});});
*/


  function showIllustration(number) {
    clearAdd();
    const element = document.querySelector(`.illustration-piece${number}`);
    const gridDescriptions = document.querySelectorAll('.grid-description');
  
    if (element.classList.contains('showIllustration')) {
      element.classList.remove('showIllustration');
      element.classList.add('illustration-container');
      // Iterate through gridDescriptions and remove the 'disable-interaction' class
      gridDescriptions.forEach((description) => {
        description.classList.remove('disable-interaction');
      });
    } else {
      element.classList.remove('illustration-container');
      element.classList.add('showIllustration');
      // Iterate through gridDescriptions and add the 'disable-interaction' class
      gridDescriptions.forEach((description) => {
        description.classList.add('disable-interaction');
      });
    }
  }
  