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
  