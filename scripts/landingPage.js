
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