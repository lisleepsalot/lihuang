// Extract the .html filename from the URL
let documentName = window.location.pathname.split("/").pop() || "index.html";

// Check if the page is the index page
let isIndexPage = documentName === "index.html" || window.location.pathname === "/";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".header").forEach(header => {
        if (isIndexPage) {
            // Set header content for index page
            header.innerHTML = headerUpperHTML;
        } else {
            // Set header content for non-index pages
            header.innerHTML = pageHeaderUpperHTML;
            makeInfoGrid();
            makeBottomButtons();
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
  }
}

updateDateTime(); 
setInterval(updateDateTime, 1000);

function makeBottomButtons(){
    const bottomButtonsContainer = document.querySelector('.bottom-buttons-container');

// Check if the container exists before inserting content
if (bottomButtonsContainer) {
    bottomButtonsContainer.innerHTML = `
    <div class="return-home-button hover-yellow">
        <a class="removeA hover-yellow" href="../index.html">← return home</a>
    </div>
    <div class="next-project-button hover-yellow">
        next project →
    </div>
    `;
} else {
  console.error("The .bottom-buttons-container element was not found.");
}
}


// Add click event listener to the next project button
const nextProjectButton = document.querySelector(".next-project-button");

if (nextProjectButton) {
  nextProjectButton.addEventListener("click", function() {
    const currentIdentifier = window.location.pathname.split("/").pop().replace(".html", "");
    
    // Find the index of the current project in the projects array
    let currentIndex = projects.findIndex(project => project.identifier === currentIdentifier);
    
    if (currentIndex === -1) {
      console.error(`Current project with identifier "${currentIdentifier}" not found.`);
      return;
    }
    
    // Determine the next project's index (wrap around to 0 if at the end)
    const nextIndex = (currentIndex + 1) % projects.length;
    const nextProject = projects[nextIndex];
    
    // Redirect to the next project's HTML page
    window.location.href = nextProject.identifier + ".html";
  });
} else {
  console.warn("The .next-project-button element was not found.");
}


function makeInfoGrid(){
    // Extract the project identifier from the URL (e.g., "calvino")
    const projectIdentifier = window.location.pathname.split("/").pop().replace(".html", "");
    
    // Find the project with a matching identifier
    const projectData = projects.find(project => project.identifier === projectIdentifier);
    
    if (!projectData) {
        console.error(`Project with identifier "${projectIdentifier}" not found.`);
        return;
    }
    
    // Generate the project tags string with <br> as a separator
    const projectTags = projectData.categories.map(tag => `#${tag}`).join(" <br> ");
    
    // Build the info grid HTML using the project data
    const infoGridHTML = `
        <div class="project-title">
            ${projectData.name}
        </div>
        <div class="project-brief">
            ${projectData.brief || ""}
        </div>
        <div class="project-info-grid-2">
            <div class="project-credits">
                ${projectData.credits || ""}
            </div>
            <div class="project-tags">
                ${projectTags}
            </div>
        </div>
    `;
    
    // Find the div with class .project-info-load and insert the generated HTML
    const infoLoadDiv = document.querySelector(".project-info-load");
    if (infoLoadDiv) {
        infoLoadDiv.innerHTML = infoGridHTML;
    } else {
        console.error("Error: .project-info-load div not found.");
    }
}