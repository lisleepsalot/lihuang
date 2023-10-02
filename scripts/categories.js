//these functions could protentially merge into one;
document.querySelector('.design-category').addEventListener('click', function() {
  clearSelectedColors();
  showDesign();
});

document.querySelector('.illustration-category').addEventListener('click', function() {
  clearSelectedColors();
  showIllustrations();
});

document.querySelector('.play-category').addEventListener('click', function() {
  clearSelectedColors();
  showPlay();
});




function showDesign(){
  const designCategoryElements = document.querySelectorAll('.design-category');
  clearRest();
  makeGrid();
  designCategoryElements.forEach((element) => {
  element.classList.add('selected-yellow'); 
});
  document.querySelector('.illustration-display-grid').innerHTML = ''
}

function showIllustrations() {
  const designCategoryElements = document.querySelectorAll('.illustration-category');
  clearRest();
  document.querySelector('.illustration-display-grid').innerHTML=
`
<div class="column">
<div class="illustration-container illustration-piece1" onclick="showIllustration('1')">
    <div class="grid-description">
        High School Yearbook, 2020
    </div>
    <img class="illustration-image illo" src="images/illustration/1.jpg">
</div>
<div class="illustration-container illustration-piece10" style="display: flex;" onclick="showIllustration('10')">
    <div class="grid-description">
        mobile wallpaper for luckin tea, 2020
    </div>
    <img class="illustration-image illo illustration-half" src="images/illustration/2.jpg">
    <img class="illustration-image illo illustration-half" src="images/illustration/9.jpg">
</div>
<div class="illustration-container illustration-piece2" onclick="showIllustration('2')">
    <div class="grid-description">
        I don't know what this is, 2021
    </div>
    <img class="illustration-image illo" src="images/illustration/5.jpg">
</div>
</div>
<div class="column">
<div class="illustration-container illustration-piece3" onclick="showIllustration('3')">
    <div class="grid-description">
        my dorm, 2021
    </div>
    <img class="illustration-image illo" src="images/illustration/4.jpg">
</div>
<div class="illustration-container illustration-piece4" onclick="showIllustration('4')">
    <div class="grid-description">
        card face for luckin coffee, 2021
    </div>
    <img class="illustration-image illo" src="images/illustration/8.jpg">
</div>
<div class="illustration-container illustration-piece5" style="display: flex;"onclick="showIllustration('5')">
    <div class="grid-description">
        more luckin coffee, 2021
    </div>
    <img class="illustration-image illo illustration-half" src="images/illustration/10.gif">
    <img class="illustration-image illo illustration-half" src="images/illustration/13.jpg">
</div>
<div class="illustration-container illustration-piece6" onclick="showIllustration('6')">
    <div class="grid-description">
        staying alive
    </div>
    <img class="illustration-image illo" src="images/illustration/12.jpg">
</div>
</div>
<div class="column">
<div class="illustration-container illustration-piece7" onclick="showIllustration('7')">
    <div class="grid-description">
        social media post for luckin coffee, 2021
    </div>
    <img class="illustration-image illo" src="images/illustration/7.jpg">
    <div class="grid-description">
    social media post for luckin coffee, 2021
    </div>
</div>
<div class="illustration-container illustration-piece8" onclick="showIllustration('8')">
    <div class="grid-description">
        game art, 2021
    </div>
    <img class="illustration-image illo" src="images/illustration/3.jpg">
</div>
<div class="illustration-container illustration-piece9" onclick="showIllustration('9')">
<div class="grid-description">
social media post for luckin coffee, 2021
</div>
    <img class="illustration-image illo" src="images/illustration/6.jpg">
</div>
</div>
`;


  designCategoryElements.forEach((element) => {
    element.classList.add('selected-red');
  });
}

function showPlay(){
  const designCategoryElements = document.querySelectorAll('.play-category');
  clearRest();
  document.querySelector('.illustration-display-grid').innerHTML=
  `
  <div class="column">
  <div class="play-container">
      <div class="grid-description">
          drawings of my freshman room.
      </div>
      <img style="width: 100%" src="images/play/11.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          cook and eat.
      </div>
      <img style="width: 100%" src="images/play/2.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          army.
      </div>
      <img style="width: 100%" src="images/play/3.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          adooooobeeeeeeeeee.
      </div>               
      <img style="width: 100%" src="images/play/4.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          100% accurate world map, 2021
      </div>
      <img style="width: 100%" src="images/play/5.png">
  </div>
</div>
<div class="column">
  <div class="play-container">
      <div class="grid-description">
          something suspicious.
      </div>
      <img style="width: 100%" src="images/play/6.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          blue.
      </div>
      <img style="width: 100%" src="images/play/7.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          met oranges keep you alive.
      </div>
      <img style="width: 100%" src="images/play/8.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          home.
      </div>
      <img style="width: 100%" src="images/play/9.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          more freshman room.
      </div>
      <img style="width: 100%" src="images/play/10.png">
  </div>
</div>
<div class="column">
  <div class="play-container">
      <div class="grid-description">
          providence.
      </div>
      <img style="width: 100%" src="images/play/1.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          a gift(a compliment), 2022
      </div>
      <img style="width: 100%" src="images/play/12.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          雪糕.
      </div>
      <img style="width: 100%" src="images/play/14.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          雪糕.
      </div>
      <img style="width: 100%" src="images/play/13.png">
  </div>
  <div class="play-container">
      <div class="grid-description">
          advanced technology.
      </div>
      <img style="width: 100%" src="images/play/15.png">
  </div>
</div>
  `;
  designCategoryElements.forEach((element) => {
  element.classList.add('selected-blue');
})
}

function clearSelectedColors(){
  const designCategoryElements = document.querySelectorAll('.main-page-category');

  designCategoryElements.forEach((element) => {
  element.classList.remove('selected-yellow'); });

  designCategoryElements.forEach((element) => {
  element.classList.remove('selected-red');  });

  designCategoryElements.forEach((element) => {
  element.classList.remove('selected-blue'); });

  memeStatus = false;
}
function clearRest(){
  document.querySelector('.projects-display-grid').innerHTML='';
  document.querySelector('.illustration-display-grid').innerHTML = '';
  document.querySelector('.play-display-grid').innerHTML = '';
}