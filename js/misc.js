// Are.na channel viewer: shows an intro/about panel, then loads the li-misc channel via the
      // Are.na v3 API and lets visitors step, shuffle, or jump out to the channel on are.na.
      const API_URL = 'https://api.are.na/v3/channels/li-misc';

      let blocks = [];
      let currentIndex = 0;
      let channelUrl = '';

      const miscAbout = document.querySelector('.misc-about');
      const miscContainer = document.querySelector('.misc-container');
      const miscMedia = document.querySelector('.misc-media');
      const miscDescription = document.querySelector('.misc-description');
      const prevButton = document.querySelector('.misc-button:nth-child(1)');
      const shuffleButton = document.querySelector('.misc-button:nth-child(2)');
      const nextButton = document.querySelector('.misc-button:nth-child(3)');
      const visitChannelBtn = document.getElementById('visit-channel');
      const aboutToggleBtn = document.getElementById('about-toggle');

      // Timed intro: about panel first, then crossfade to the block viewer.
      function initIntroSequence() {
        setTimeout(() => {
          miscAbout.classList.add('fade-out');

          setTimeout(() => {
            miscContainer.classList.add('fade-in');
          }, 400);
        }, 5000);
      }

      // Loads channel metadata and its blocks in parallel, then renders the first block.
      async function fetchChannel() {
        try {
          const [channelRes, contentsRes] = await Promise.all([
            fetch(API_URL, {cache: 'no-store'}),
            fetch(`${API_URL}/contents?per=100`, {cache: 'no-store'})
          ]);
          const data = await channelRes.json();
          const contents = await contentsRes.json();
          blocks = contents.data.filter(block => block.type !== 'Channel');
          channelUrl = `https://www.are.na/${data.owner.slug}/${data.slug}`;

          if (blocks.length > 0) {
            displayBlock(currentIndex);
          }
        } catch (error) {
          console.error('Error fetching Are.na channel:', error);
          miscMedia.innerHTML = '<p>Error loading content</p>';
        }
      }

      // Renders one block into the media + caption panels, picking markup by block type,
      // with an optional fade between blocks.
      function displayBlock(index, withTransition = false) {
        if (blocks.length === 0) return;

        const block = blocks[index];

        const updateContent = () => {
          miscMedia.innerHTML = '';
          miscDescription.innerHTML = '';

        switch(block.type) {
          case 'Image':
            const img = document.createElement('img');
            img.src = block.image.large.src;
            img.alt = block.title || 'Are.na block image';
            miscMedia.appendChild(img);
            break;

          case 'Text':
            const textDiv = document.createElement('div');
            textDiv.innerHTML = block.content.html;
            textDiv.style.color = 'var(--lh)';
            textDiv.style.padding = '24px';
            miscMedia.appendChild(textDiv);
            break;

          case 'Link':
            if (block.image && block.image.large) {
              const linkImg = document.createElement('img');
              linkImg.src = block.image.large.src;
              linkImg.alt = block.title || 'Link preview';
              miscMedia.appendChild(linkImg);
            } else {
              const linkDiv = document.createElement('div');
              linkDiv.innerHTML = `<a href="${block.source.url}" target="_blank" style="color: var(--lh);">${block.title || block.source.url}</a>`;
              linkDiv.style.padding = '24px';
              miscMedia.appendChild(linkDiv);
            }
            break;

          case 'Embed':
            if (block.embed && block.embed.html) {
              miscMedia.innerHTML = block.embed.html;
            } else if (block.image && block.image.large) {
              const embedImg = document.createElement('img');
              embedImg.src = block.image.large.src;
              miscMedia.appendChild(embedImg);
            }
            break;

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
                attachImg.src = block.image.large.src;
                miscMedia.appendChild(attachImg);
              }
            }
            break;

          default:
            miscMedia.innerHTML = '<p>Unsupported block type</p>';
        }

          let description = '';
          if (block.title) description += `<strong>${block.title}</strong><br>`;
          if (block.description) description += block.description.html;
          if (block.source && block.source.url) description += `<br><a href="${block.source.url}" target="_blank" style="color: var(--lh);">View source</a>`;

          miscDescription.innerHTML = description || 'No description available.';

          miscMedia.classList.remove('fade-out');
          miscDescription.classList.remove('fade-out');
        };

        if (withTransition) {
          miscMedia.classList.add('fade-out');
          miscDescription.classList.add('fade-out');
          setTimeout(updateContent, 300);
        } else {
          updateContent();
        }
      }

      // Navigation: previous / next wrap around the channel; shuffle jumps anywhere.
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

      prevButton.addEventListener('click', showPrevious);
      nextButton.addEventListener('click', showNext);
      shuffleButton.addEventListener('click', showRandom);

      // Sends visitors to the full channel on are.na.
      visitChannelBtn.addEventListener('click', () => {
        if (channelUrl) {
          window.open(channelUrl, '_blank');
        }
      });

      // Replays the intro so visitors can reread the about panel.
      aboutToggleBtn.addEventListener('click', () => {
        miscContainer.classList.remove('fade-in');
        miscAbout.classList.remove('fade-out');

        setTimeout(() => {
          miscAbout.classList.add('fade-out');
          setTimeout(() => {
            miscContainer.classList.add('fade-in');
          }, 400);
        }, 5000);
      });

      initIntroSequence();
      fetchChannel();
