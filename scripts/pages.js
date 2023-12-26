function goTo(pageName) {
  window.location.href = `pages/${pageName}.html`;
  console.log(`${pageName}`);
} 
  

document.querySelectorAll('.header-right-section').forEach((element) => {
  element.addEventListener('click', () => {
    // Call a function to scroll to the top
    scrollToTop();
  });
});

function scrollToTop() {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // You can use 'auto' instead of 'smooth' for instant scrolling
  });
}



  function goToIndexAbout() {
    localStorage.setItem('shouldAbout', 'true');
    window.location.href="../index.html"
  }
  

function checkAndNavigate() {
  const shouldAbout = localStorage.getItem('shouldAbout');

  if (shouldAbout === 'true') {
    clearAdd();
    goToAbout();
    localStorage.removeItem('shouldAbout');
  }
}