function goToAbout() {
  window.location.href = "about.html";}

function storeTrue(){
  localStorage.setItem('shouldRefresh', 'true');}

  document.querySelectorAll('.js-afterParty').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/afterParty.html";
    });
  });

  document.querySelectorAll('.js-hopeAndAnchor').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/hopeAndAnchor.html";
    });
  });

  document.querySelectorAll('.js-anatomyOfFascism').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/anatomyOfFascism.html";
    });
  });

  document.querySelectorAll('.js-hospitalNavigation').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/hospitalNavigation/hospital-navigation.html";
    });
  });

  document.querySelectorAll('.js-puzzleType').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/puzzleType/puzzle-type.html";
    });
  });

  document.querySelectorAll('.js-toCookInHere').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/toCookInHere.html";
    });
  });

  document.querySelectorAll('.js-waterlily').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/waterlily.html";
    });
  });

  document.querySelectorAll('.js-atlasSwing').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/atlasSwing.html";
    });
  });

  document.querySelectorAll('.js-meowfia').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/meowfia.html";
    });
  });

  document.querySelectorAll('.js-kebash').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/kebash.html";
    });
  });

  document.querySelectorAll('.js-toCookInHere').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/toCookInHere.html";
    });
  });

  document.querySelectorAll('.js-russianAg').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/russianAvantGarde.html";
    });
  });

  document.querySelectorAll('.js-kirakira').forEach((element) => {
    element.addEventListener('click', () => {
      storeTrue();
      window.location.href = "pages/kirakira.html";
    });
  });