document.querySelector('.top-icon-info').addEventListener('click', function() {showInfo();
});

document.querySelector('.top-icon-question').addEventListener('click', function() {showq();
});

document.querySelector('.top-icon-plus').addEventListener('click', function() {showRandom();
});

document.querySelector('.top-icon-clear').addEventListener('click', function() {clearAdd();
});


let infoCount = false;
let questionCount = false;
//defining all button functions here
function showInfo(){
  const addAboveElement = document.querySelector('.add-above-info');
  const existingHTML = document.querySelector('.add-above-info').innerHTML;
  
  if (infoCount) {
    document.querySelector('.info').remove();
    infoCount = false;
  } else {
    addAboveElement.innerHTML = existingHTML + `
      <div class="info">
        Li is currently hard at work finishing and debugging this website. Be sure to check back soon for exciting updates and new features! (Press 'i' again to close this tab)
      </div>
    `;
    infoCount = true;
  }
}

function showq(){
  const addAboveElement = document.querySelector('.add-above-question');
  
  if (questionCount) {
    document.querySelector('.add-above-question').innerHTML = '';
    questionCount = false;
  } else {
    addAboveElement.innerHTML = `
      <div class="function-explained flex-2">
        <div class="flex-text">
        It seems like you've stumbled upon these nifty buttons...<br>
        Indeed! These are functions being tested to incorporate modular elements into the display grid.<br>
        <br>
        Right now, you can:<br>
        Press '?' to access basic information about this function.<br>
        Press 'i' to get basic information about the website.<br>
        Press '+' to add three random memes from my meme bank (debugging in progress...).<br>
        Press 'c' to clear all non-project contents.<br>
        <br>
        Stay tuned for future updates!
        </div>
      </div>
      <div class="function-explained flex-1">
        <div class="flex-text">
        This is a new Feature! flex 1
        </div>
      </div>
    `;
    questionCount = true;
  }
}

function clearAdd(){
  document.querySelector('.add-above-info').innerHTML = '';
  document.querySelector('.add-above-question').innerHTML = '';
  document.querySelector('.add-above-plus').innerHTML = '';
  questionCount = false;
  infoCount = false;

}