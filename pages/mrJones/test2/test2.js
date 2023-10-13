document.querySelector('.drop-button').addEventListener('click', () => {
    dropText();
});


function dropText() {
  document.querySelectorAll('.item1').forEach(item => {
      item.style.animation = 'fluidDrop1 1s forwards';
  });

  document.querySelectorAll('.item2').forEach(item => {
      item.style.animation = 'fluidDrop2 1.2s forwards';
  });

  document.querySelectorAll('.item3').forEach(item => {
      item.style.animation = 'fluidDrop3 0.8s forwards';
  });

  document.querySelectorAll('.item4').forEach(item => {
      item.style.animation = 'fluidDrop4 1.1s forwards';
  });

  document.querySelectorAll('.item5').forEach(item => {
      item.style.animation = 'fluidDrop5 1s forwards';
  });
}
