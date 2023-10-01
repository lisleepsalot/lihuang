function goTo(pageName) {
  window.location.href = `pages/${pageName}.html`;
  console.log(`${pageName}`);
} 
  
  
  /*document.querySelectorAll('.js-hopeAndAnchor').forEach((element) => {
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
      console.log("hello");
      window.location.href = "pages/hospital-navigation.html";
    });
  });

  document.querySelectorAll('.js-puzzleType').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/puzzle-type.html";
    });
  });

  document.querySelectorAll('.js-afterParty').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/afterParty.html";
    });
  });

  document.querySelectorAll('.js-toCookInHere').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/toCookInHere.html";
    });
  });

  document.querySelectorAll('.js-waterlily').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/waterlily.html";
    });
  });

  document.querySelectorAll('.js-atlasSwing').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/atlasSwing.html";
    });
  });

  document.querySelectorAll('.js-meowfia').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/meowfia.html";
    });
  });

  document.querySelectorAll('.js-kebash').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/kebash.html";
    });
  });

  document.querySelectorAll('.js-toCookInHere').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/toCookInHere.html";
    });
  });

  document.querySelectorAll('.js-russianAg').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/russianAvantGarde.html";
    });
  });

  document.querySelectorAll('.js-kirakira').forEach((element) => {
    element.addEventListener('click', () => {
      
      window.location.href = "pages/kirakira.html";
    });
  });
*/
  document.querySelectorAll('.header-right-section').forEach((element) => {
    element.addEventListener('click', () => {
      goToIndexAbout();
    });
  });



  function goToIndexAbout() {
    localStorage.setItem('shouldAbout', 'true');
    window.location.href="../index.html"
  }
  

function checkAndNavigate() {
  const shouldAbout = localStorage.getItem('shouldAbout');

  if (shouldAbout === 'true') {
    clearAdd();
    goToAbout();
    localStorage.removeItem('shouldAbout');
  }
}