    // Create the custom cursor element dynamically
    const cursor = document.createElement('div');
    cursor.id = 'customCursor';
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Update the cursor position based on mouse movements
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Enlarge the cursor on mouse press
    document.addEventListener('mousedown', () => {
      cursor.style.width = '50px';
      cursor.style.height = '50px';
    });

    // Return to original size on mouse release
    document.addEventListener('mouseup', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
    });