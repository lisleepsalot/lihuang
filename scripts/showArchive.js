  function showArchive(number) {
    clearAdd();
    const element = document.querySelector(`.archive-piece${number}`);
    const gridDescriptions = document.querySelectorAll('.grid-description');
  
    if (element.classList.contains('showArchive')) {
      element.classList.remove('showArchive');
      element.classList.add('archive-container');
      // Iterate through gridDescriptions and remove the 'disable-interaction' class
      gridDescriptions.forEach((description) => {
        description.classList.remove('disable-interaction');
      });
    } else {
      element.classList.remove('archive-container');
      element.classList.add('showArchive');
      // Iterate through gridDescriptions and add the 'disable-interaction' class
      gridDescriptions.forEach((description) => {
        description.classList.add('disable-interaction');
      });
    }
  }
  