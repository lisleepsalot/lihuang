      // Are.na API configuration
      const API_URL = 'https://api.are.na/v2/channels/misc-2-blz7-7lhg';

      // State
      let blocks = [];
      let currentIndex = 0;
      let channelUrl = '';

      // Elements
      const miscAbout = document.querySelector('.misc-about');
      const miscContainer = document.querySelector('.misc-container');
      const miscMedia = document.querySelector('.misc-media');
      const miscDescription = document.querySelector('.misc-description');
      const prevButton = document.querySelector('.misc-button:nth-child(1)');
      const shuffleButton = document.querySelector('.misc-button:nth-child(2)');
      const nextButton = document.querySelector('.misc-button:nth-child(3)');
      const visitChannelBtn = document.getElementById('visit-channel');
      const aboutToggleBtn = document.getElementById('about-toggle');

      // Intro animation sequence
      function initIntroSequence() {
        // Show about for 5 seconds
        setTimeout(() => {
          // Fade out about
          miscAbout.classList.add('fade-out');

          // After fade out completes, fade in container
          setTimeout(() => {
            miscContainer.classList.add('fade-in');
          }, 400); // Match CSS transition duration
        }, 5000);
      }

      // Fetch channel data from Are.na
      async function fetchChannel() {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          blocks = data.contents.filter(block => block.class !== 'Channel'); // Filter out channel blocks

          // Store channel URL
          channelUrl = `https://www.are.na/${data.user.slug}/${data.slug}`;

          if (blocks.length > 0) {
            displayBlock(currentIndex);
          }
        } catch (error) {
          console.error('Error fetching Are.na channel:', error);
          miscMedia.innerHTML = '<p>Error loading content</p>';
        }
      }

      // Display a block
      function displayBlock(index, withTransition = false) {
        if (blocks.length === 0) return;

        const block = blocks[index];

        // Function to update content
        const updateContent = () => {
          // Clear previous content
          miscMedia.innerHTML = '';
          miscDescription.innerHTML = '';

        // Display media based on block type
        switch(block.class) {
          case 'Image':
            const img = document.createElement('img');
            img.src = block.image.large.url;
            img.alt = block.title || 'Are.na block image';
            miscMedia.appendChild(img);
            break;

          case 'Text':
            const textDiv = document.createElement('div');
            textDiv.innerHTML = block.content_html || block.content;
            textDiv.style.color = 'var(--lh)';
            textDiv.style.padding = '24px';
            miscMedia.appendChild(textDiv);
            break;

          case 'Link':
            if (block.image && block.image.large) {
              const linkImg = document.createElement('img');
              linkImg.src = block.image.large.url;
              linkImg.alt = block.title || 'Link preview';
              miscMedia.appendChild(linkImg);
            } else {
              const linkDiv = document.createElement('div');
              linkDiv.innerHTML = `<a href="${block.source.url}" target="_blank" style="color: var(--lh);">${block.title || block.source.url}</a>`;
              linkDiv.style.padding = '24px';
              miscMedia.appendChild(linkDiv);
            }
            break;

          case 'Media':
          case 'Attachment':
            if (block.attachment && block.attachment.content_type) {
              if (block.attachment.content_type.startsWith('video')) {
                const video = document.createElement('video');
                video.src = block.attachment.url;
                video.controls = true;
                miscMedia.appendChild(video);
              } else if (block.attachment.content_type.startsWith('audio')) {
                const audio = document.createElement('audio');
                audio.src = block.attachment.url;
                audio.controls = true;
                miscMedia.appendChild(audio);
              } else if (block.image && block.image.large) {
                const attachImg = document.createElement('img');
                attachImg.src = block.image.large.url;
                miscMedia.appendChild(attachImg);
              }
            }
            break;

          default:
            miscMedia.innerHTML = '<p>Unsupported block type</p>';
        }

          // Display description
          let description = '';
          if (block.title) description += `<strong>${block.title}</strong><br>`;
          if (block.description) description += block.description;
          if (block.source && block.source.url) description += `<br><a href="${block.source.url}" target="_blank" style="color: var(--lh);">View source</a>`;

          miscDescription.innerHTML = description || 'No description available.';

          // Remove fade-out class to fade in
          miscMedia.classList.remove('fade-out');
          miscDescription.classList.remove('fade-out');

          // Add click handler to open block URL
          miscMedia.style.cursor = 'pointer';
          miscMedia.onclick = () => {
            if (block.source && block.source.url) {
              window.open(block.source.url, '_blank');
            } else {
              window.open(`https://www.are.na/block/${block.id}`, '_blank');
            }
          };
        };

        // If transition requested, fade out then update
        if (withTransition) {
          miscMedia.classList.add('fade-out');
          miscDescription.classList.add('fade-out');
          setTimeout(updateContent, 300); // Match CSS transition duration
        } else {
          updateContent();
        }
      }

      // Navigation functions
      function showPrevious() {
        if (blocks.length === 0) return;
        currentIndex = (currentIndex - 1 + blocks.length) % blocks.length;
        displayBlock(currentIndex, true);
      }

      function showNext() {
        if (blocks.length === 0) return;
        currentIndex = (currentIndex + 1) % blocks.length;
        displayBlock(currentIndex, true);
      }

      function showRandom() {
        if (blocks.length === 0) return;
        currentIndex = Math.floor(Math.random() * blocks.length);
        displayBlock(currentIndex, true);
      }

      // Event listeners
      prevButton.addEventListener('click', showPrevious);
      nextButton.addEventListener('click', showNext);
      shuffleButton.addEventListener('click', showRandom);

      // Visit channel button
      visitChannelBtn.addEventListener('click', () => {
        if (channelUrl) {
          window.open(channelUrl, '_blank');
        }
      });

      // About toggle button
      aboutToggleBtn.addEventListener('click', () => {
        // Fade out container
        miscContainer.classList.remove('fade-in');

        // Fade in about
        miscAbout.classList.remove('fade-out');

        // After 5 seconds, reverse
        setTimeout(() => {
          miscAbout.classList.add('fade-out');
          setTimeout(() => {
            miscContainer.classList.add('fade-in');
          }, 400);
        }, 5000);
      });

      // Initialize
      initIntroSequence();
      fetchChannel();
