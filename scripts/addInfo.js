document.querySelector('.top-icon-info').addEventListener('click', function() {showInfo();
});

document.querySelector('.top-icon-question').addEventListener('click', function() {showq();
});

document.querySelector('.top-icon-plus').addEventListener('click', function() {getMemes();
});

document.querySelector('.top-icon-clear').addEventListener('click', function() {clearAdd();
});


let infoCount = true;
let questionCount = false;
//defining all button functions here
function showInfo(){
  const addAboveElement = document.querySelector('.add-above-info');
  const existingHTML = document.querySelector('.add-above-info').innerHTML;
  
  if (infoCount) {
    document.querySelector('.info').remove();
    infoCount = false;
  } else if(!infoCount){
    addAboveElement.innerHTML = existingHTML + `
      <div class="info">
      Li is working really hard to wrap up and fix this website. Make sure to drop by soon for some cool updates and new features! <br> 
        <div class="top-icon top-icon-clear" style="display: inline-block" onclick = "clearAdd();">
        c
        </div>(Click 'i' again or 'c' to close this tab, click '?' to know more about them)
        
      </div>
    `;
    infoCount = true;
  }
  console.log(infoCount);
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
        Yes! These are functions being tested to incorporate modular elements into the display grid.<br>
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
      <div class="function-explained flex-1" style="align-items: center;">
        <div class="flex-text">
          <div class="cat-container">
            <img class="catloaf not-angry" style="z-index: 5" src="images/icons/catloaf.svg">
            <img class="catloaf " src="images/icons/angryloaf.svg">
            <img style="width: 170px;" src="images/icons/angryloaf.svg">
          </div>
          <p>This is Li's digital cat loaf Typo.</p>
        </div>
      </div>
    `;
    questionCount = true;
  }
}

function goToAbout() {
  showDesign();
  
  const aboutHTML =
  `<div class="about-block">
  <div class="about-left">
      <div class="about-animation-container">
          <img class="stand-still-image"src="images/icons/standstill.svg">
          <img class="sayhi-image" src="images/icons/sayhi.svg">
      </div>
  </div>
  <div class="about-right">
      <div> 
          <p class="about-title">Hi! I'm Li.<br>Welcome to<br>my website!</p>
          <p class="about-description">My name is Li. 
          <br>I am a cat lover who enjoys things that are informative, interactive, and pretty.
              I’m currently pursuing Graphic Design Degree at <a>Rhode Island School of Design</a>.<br>I love good food and good designs.<br>
              <br>
              <br>
              <a class="about-links hover-yellow"href = "file/resume2023.10.pdf" target="_blank" >MY RESUME</a><br>
              <a class="about-links hover-yellow"href = "https://www.linkedin.com/in/li-huang-7810231b8/" target="_blank">MY LINKEDIN</a><br>
              <a class="about-links hover-yellow"href = "" target="_blank" >MY EMAIL</a><br><br>
              <br>
              <div class="top-icon top-icon-clear" style="display: inline-block" onclick = "clearAdd();">
              c
              </div><span class="about-description">click me to clear this block.<span>
              
          </p>
      </div>
     
  </div>
</div>`+gridHTML;
document.querySelector('.projects-display-grid').innerHTML= aboutHTML;
}

function clearAdd(){
    if (infoCount){document.querySelector('.info').remove();
    infoCount = false;}
    document.querySelector('.add-above-question').innerHTML = '';
    questionCount = false;
    if (document.querySelector('.about-block')){document.querySelector('.about-block').remove();};
    document.querySelector('.memeBank-grid').innerHTML = '';
    memeStatus = false;

}

