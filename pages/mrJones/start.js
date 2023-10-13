function checkName(){
  const inputNameNow = localStorage.getItem('namesArray');
  if (inputNameNow) {
    console.log(`The value of inputName is: ${inputNameNow}`);
  } else {
    console.log('inputName is not set in local storage.');
  }
}


function addArchive() {
  const inputNamesString = localStorage.getItem('namesArray');
  console.log(inputNamesString);

  if (inputNamesString) {
    // Split the inputNamesString into an array of names
      // Remove quotes and brackets and split the inputNamesString into an array of names
      const inputNamesArray = inputNamesString.replace(/["\[\]]/g, '').split(',');

    inputNamesArray.forEach((theName) => {
      const currentDate = new Date();
      const dateString = currentDate.toDateString();
      const themeTagElement = document.createElement('div');
      themeTagElement.classList.add('black-theme-tag');
      document.querySelector('.black-theme-tag').innerHTML = `
        name: ${theName}<br>
        date: ${dateString}<br>
        note:____________________
      `;
      document.querySelector('.black-archive-text').innerHTML=`
        Don't attempt to delve into someone's past.<br>
        This is not your archive.<br>
        Choose something else.
      `
      // For the element with '.black-archive-text' class
    const blackArchiveTextElement = document.querySelector('.black-archive-text');
    if (blackArchiveTextElement) {
      blackArchiveTextElement.classList.remove('black-archive-text');
      blackArchiveTextElement.classList.add('archive-text');
    };
  
    // For the element with '.black-theme-tag' class
    const blackThemeTagElement = document.querySelector('.black-theme-tag');
    if (blackThemeTagElement) {
      blackThemeTagElement.classList.remove('black-theme-tag');
      blackThemeTagElement.classList.add('empty-tag');
    };
  
    // For the element with '.black-archive-item' class
    const blackArchiveItemElement = document.querySelector('.black-archive-item');
    if (blackArchiveItemElement) {
      blackArchiveItemElement.classList.remove('black-archive-item');
      blackArchiveItemElement.classList.add('archive-item');
    };
    
    });

    console.log('Updated archive for all names');
  } else {
    console.log('inputName is not set in local storage.');
  }
}


addArchive();