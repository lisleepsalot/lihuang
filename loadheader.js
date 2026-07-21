let headerHTML = `<div class="header-container header-name">
                <p ><a href="work.html" class="header-text">Li Huang</a></p>
            </div>
            <div class="header-container">
                <p id="current-datetime"></p>
            </div>
            <div class="header-container header-utility">
                <a href="work.html"  
                id="current-display" class="header-text">
                    work
                </a>
                <p>
                    <a href="index.html" class="header-text">about</a> 
                </p>
                <p>
                    <a href="misc.html" class="header-text">misc</a>
                </p>
            </div>`

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".header").forEach(header => {
            header.innerHTML = headerHTML;
    });
});


//time logic
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
  }
}

updateDateTime(); 
setInterval(updateDateTime, 1000);