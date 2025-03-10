function loadUtilitySection() {
  const utilitySection = document.getElementById("utility-section");

  if (utilitySection) {
      utilitySection.innerHTML = utilitySectionHTML;
  } else {
      console.warn('Element with id "utility-section" not found.');
  }
}

loadUtilitySection();