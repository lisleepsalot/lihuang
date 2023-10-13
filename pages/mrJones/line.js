function setTopPosition() {
  const lines = document.querySelectorAll('.line');
  let topPosition = 38;
  lines.forEach(line => {
      line.style.position = 'absolute';
      line.style.left = '30px';
      line.style.width= '220px';
      line.style.top = topPosition + 'px';
      topPosition += 18;
  });
}

setTopPosition();
