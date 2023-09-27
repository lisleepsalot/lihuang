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

  document.querySelectorAll('.js-anatomyOfFascism').forEach((element) => {
    element.addEventListener('click', () => {
      window.location.href = "pages/anatomyOfFascism.html";
    });
  });

  document.querySelectorAll('.js-hospitalNavigation').forEach((element) => {
    element.addEventListener('click', () => {
      window.location.href = "pages/hospitalNavigation/hospital-navigation.html";
    });
  });

  document.querySelectorAll('.js-puzzleType').forEach((element) => {
    element.addEventListener('click', () => {
      window.location.href = "pages/puzzleType/puzzle-type.html";
    });
  });

  document.querySelectorAll('.js-toCookInHere').forEach((element) => {
    element.addEventListener('click', () => {
      window.location.href = "pages/toCookInHere.html";
    });
  });