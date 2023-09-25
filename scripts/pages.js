function goToAbout() {
  window.location.href = "about.html";}

  document.querySelectorAll('.js-afterParty').forEach((element) => {
    element.addEventListener('click', () => {
      window.location.href = "pages/afterParty.html";
    });
  });

  document.querySelectorAll('.js-hopeAndAnchor').forEach((element) => {
    element.addEventListener('click', () => {
      window.location.href = "pages/hopeAndAnchor.html";
    });
  });