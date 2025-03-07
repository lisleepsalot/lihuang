let isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

document.addEventListener("DOMContentLoaded", function () {
  
  // Insert header content
  document.querySelectorAll(".header").forEach(header => {
    let isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
      if (isIndexPage) {
          header.innerHTML = headerUpperHTML + headerLowerHTML;
      } else {
          header.innerHTML = pageHeaderUpperHTML;
      }
  });

  // Remove border/outline if not index.html
  if (!isIndexPage) {
      document.querySelectorAll(".header-upper").forEach(headerUpper => {
          headerUpper.style.border = "none";
          headerUpper.style.outline = "none";
      });
  }
});

//this method blinks the text div
let text = "hello!";
let prefix = "------------"; 
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

setInterval(animateText, 100); 

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