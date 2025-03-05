
//this listening collapse header when scrolled down.
window.addEventListener("scroll", function () {
  const headerLower = document.querySelector(".header-lower");
  const scrollY = window.scrollY; // Get current scroll position
  const maxScroll = 1; // Scroll threshold

  if (scrollY > maxScroll) {
      let offset = Math.min(308, scrollY - maxScroll); // Max offset of -308px
      headerLower.style.marginTop = `-${offset}px`;
  } else {
      headerLower.style.marginTop = "0px"; // Reset when scrolling back up
  }
});

//this method blinks the text div
let text = "hello!";
let prefix = "------------"; 
let fullString = text + prefix;
let length = fullString.length;
let index = 0;

function animateText() {
    let shiftedText = fullString.substring(length - index) + fullString.substring(0, length - index);
    document.getElementById("animation1").textContent = shiftedText;

    index = (index + 1) % length;
}

setInterval(animateText, 100); 

//this method blinks my title
const titles = ["Graphic Designer", "Illustrator?", "Cat Lover?"];
let currentIndex = 0; 
function updateTitle() {
    let titleElement = document.getElementById("title");
    titleElement.style.opacity = "0"; // Fade out effect

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % titles.length; 
        titleElement.textContent = titles[currentIndex]; 
        titleElement.style.opacity = "1"; 
    }, 100); 
}
setInterval(updateTitle, 4000); 

//this shows current date
function updateDateTime() {
  let now = new Date();

  let options = {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false // 24-hour format
  };

  let estDateTime = new Intl.DateTimeFormat("en-US", options).format(now);
  
  document.getElementById("current-datetime").textContent = estDateTime;
}

updateDateTime(); 
setInterval(updateDateTime, 1000); 