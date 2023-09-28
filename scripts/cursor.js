// Site wide cursor
const site_wide_cursor = document.querySelector('.custom-cursor.site-wide');

document.addEventListener('mouseenter', () => {
	site_wide_cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
	site_wide_cursor.style.display = 'none';
});

document.addEventListener('mousemove', TrackCursor);

document.addEventListener('mousedown', () => site_wide_cursor.classList.add('active'));
document.addEventListener('mouseup', () => site_wide_cursor.classList.remove('active'));

/*function TrackCursor(evt) {
	const w = site_wide_cursor.clientWidth;
	const h = site_wide_cursor.clientHeight;

	site_wide_cursor.style.transform = 
		`translate(${evt.clientX - w/2}px, ${evt.clientY - h/2}px)`;
}*/
function TrackCursor(evt) {
  const w = site_wide_cursor.clientWidth;
  const h = site_wide_cursor.clientHeight;

  // Adjust the cursor's position based on the current scroll position
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  site_wide_cursor.style.transform = 
    `translate(${evt.clientX - w / 2 + scrollX}px, ${evt.clientY - h / 2 + scrollY}px)`;
}

function refreshCursor(){
  site_wide_cursor.style.transform = 
    `translate(1px, 1px)`;
}