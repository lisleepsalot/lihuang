let hospitalIconHTML = '';

icons.forEach((icons)=>{
  hospitalIconHTML +=
  `
  <div class="draggable">
  <div class="icon${icons.id} icon-container openImage" data-image-number="${icons.id}">
    <div>
      <img class="icon-image" src="icons/icon-${icons.id}.png">
    </div>
  </div>
</div>
${icons.end}
  `
})


document.querySelector('.grid-container').
innerHTML = hospitalIconHTML;