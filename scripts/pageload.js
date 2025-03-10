let isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

document.addEventListener("DOMContentLoaded", function () {
  
  // Insert header content
  document.querySelectorAll(".header").forEach(header => {
    let isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
      if (isIndexPage) {
          header.innerHTML = headerUpperHTML;
      } else {
          header.innerHTML = pageHeaderUpperHTML;
      }
  });
});

//this method blinks the text div
let text = "hello there!";
let prefix = "*.*.*.*.*.*.*.*.*."; 
let fullString = text + prefix;
let length = fullString.length;
let index = 0;

function animateText() {
    let isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
    if(isIndexPage){
        let shiftedText = fullString.substring(length - index) + fullString.substring(0, length - index);
        document.getElementById("animation1").textContent = shiftedText;
    
        index = (index + 1) % length;

    }
}

setInterval(animateText, 200); 

//this method blinks my title
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

  let dateTimeElement = document.getElementById("current-datetime");
  if (dateTimeElement) {
      dateTimeElement.textContent = estDateTime;
  } else {
      console.warn("Element #current-datetime not found.");
  }
}

updateDateTime(); 
setInterval(updateDateTime, 1000);