
// Fetches the projects saved by fetchProjects.js (run `node fetchProjects.js`
// to refresh projects.json from Sanity) and returns them as a plain array.
async function fetchProjects() {
    const response = await fetch('./projects.json');
    if (!response.ok) {
        throw new Error(`Failed to load projects.json: ${response.status}`);
    }
    return response.json();
}

// Maps a raw Sanity project document to the shape the grid needs.
function toDisplayProject(project) {
    const asset = project.coverImage && project.coverImage.asset;
    const isVideo = !!(asset && asset.mimeType && asset.mimeType.startsWith('video/'));

    return {
        name: project.webTitle || '',
        year: project.year || '',
        image: asset ? asset.url : './placeholder.jpeg',
        isVideo: isVideo,
        slug: project.slug ? project.slug.current : '',
        url: project.url || '',
        isBorder: false
    };
}

// Navigates to a project's designated External URL if one is set in Sanity;
// otherwise falls back to the auto-rendered project page for its slug.
function goToProject(project) {
    if (project.url) {
        window.open(project.url, '_blank', 'noopener,noreferrer');
    } else if (project.slug) {
        window.location.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
    }
}

async function initDisplayView() {
    const gridContainer = document.getElementById('gridContainer');
    const controlPanel = document.getElementById('controlPanel');
    const controlButtons = [];

    // Parallax effect variables
    const PARALLAX_MAX = 20;
    let targetTX = 0;
    let targetTY = 0;
    let parallaxRaf = null;
    let baseCenterX = 0; // Base centering transform
    let baseCenterY = 0;
    let isNavigating = false;
    let currentIndex = 1;

    const rawProjects = await fetchProjects();
    let projects = rawProjects.map(toDisplayProject);

    // Spiral grid arrangement variables.
    // Spiral grid arragment logic, calculate which positions would form a complete surrounding border.
    const regularCount = projects.length;
    let currentTotal = regularCount;
    let steps = Math.ceil(Math.sqrt(currentTotal));

    const layerSize1 = (steps * 2) * 4;
    const layerSize2 = ((steps + 1) * 2) * 4;
    const borderItemsNeeded = layerSize1 + layerSize2;

    for (let i = 0; i < borderItemsNeeded; i++) {
        projects.push({ name: "", year: "", isBorder: true });
    }

    // Generate spiral coordinates starting from center (4,4)
    function generateSpiralCoordinates(count) {
        const coords = [];
        let x = 4, y = 4; // Start at center
        coords.push({x, y});

        let steps = 1;
        let direction = 0; // 0: right, 1: up, 2: left, 3: down

        while (coords.length < count) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < steps; j++) {
                    if (coords.length >= count) break;

                    if (direction === 0) x++; // right
                    else if (direction === 1) y--; // up
                    else if (direction === 2) x--; // left
                    else if (direction === 3) y++; // down

                    coords.push({x, y});
                }
                direction = (direction + 1) % 4;
                if (coords.length >= count) break;
            }
            steps++;
        }

        return coords;
    }

    const spiralCoords = generateSpiralCoordinates(projects.length);
    const gridCells = [];

    // Create grid cells and position them according to spiral
    projects.forEach((project, index) => {
        const gridCell = document.createElement('div');
        gridCell.className = 'grid-cell';

        const coord = spiralCoords[index];
        // Convert to 0-based and position absolutely
        gridCell.style.position = 'absolute';
        gridCell.style.left = `${(coord.x - 1) * 680}px`;
        gridCell.style.top = `${(coord.y - 1) * 480}px`;

        if (project.isBorder) {
            // Border items: just outline box, no image, no text
            gridCell.innerHTML = `
                <div class="display-grid-container">
                    <div class="display-grid-image" style="background-image: none; background-color: transparent; border: 1px dashed black;"></div>
                </div>
            `;
        } else {
            // Regular items
            gridCell.innerHTML = `
                <div class="display-grid-container">
                    <div class="display-grid-image"></div>
                    <div class="display-grid-textbox">
                        <span class="display-grid-name"></span>
                        <span class="display-grid-year"></span>
                    </div>
                </div>
                <div class="nav-arrow nav-arrow-left">←</div>
                <div class="nav-arrow nav-arrow-up">↑</div>
                <div class="nav-arrow nav-arrow-right">→</div>
                <div class="nav-arrow nav-arrow-down">↓</div>
            `;

            // Set dynamic content via DOM APIs (not string interpolation) so
            // CMS-sourced text/URLs can't break out of the markup.
            const imageEl = gridCell.querySelector('.display-grid-image');
            if (project.isVideo) {
                const video = document.createElement('video');
                video.className = 'display-grid-video';
                video.src = project.image;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                imageEl.appendChild(video);
            } else {
                imageEl.style.backgroundImage = `url("${project.image}")`;
            }
            gridCell.querySelector('.display-grid-name').textContent = project.name;
            gridCell.querySelector('.display-grid-year').textContent = project.year;

            const container = gridCell.querySelector('.display-grid-container');
            container.style.cursor = 'pointer';
            container.addEventListener('click', () => goToProject(project));
        }

        gridContainer.appendChild(gridCell);
        gridCells.push({element: gridCell, coord: coord});

        // Add click listeners to navigation arrows for non-border items
        if (!project.isBorder) {
            const arrows = gridCell.querySelectorAll('.nav-arrow');
            arrows.forEach(arrow => {
                arrow.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleArrowClick(arrow.classList, index);
                });
            });
        }
    });

    // Generate control panel buttons only for non-border items
    const nonBorderProjects = projects.filter(p => !p.isBorder);
    nonBorderProjects.forEach((project, index) => {
        const button = document.createElement('button');
        button.className = 'control-button';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'button-name';
        nameSpan.textContent = project.name;

        const yearSpan = document.createElement('span');
        yearSpan.className = 'button-year';
        yearSpan.textContent = project.year;

        button.appendChild(nameSpan);
        button.appendChild(yearSpan);

        button.addEventListener('click', () => navigateToGrid(index + 1));
        controlPanel.appendChild(button);

        // Store button reference with original name
        controlButtons.push({
            element: button,
            nameSpan: nameSpan,
            originalName: project.name
        });
    });

    // Calculate grid bounds (only for non-border items)
    const nonBorderCells = gridCells.filter((_, index) => !projects[index].isBorder);
    const gridBounds = {
        minX: Math.min(...nonBorderCells.map(cell => cell.coord.x)),
        maxX: Math.max(...nonBorderCells.map(cell => cell.coord.x)),
        minY: Math.min(...nonBorderCells.map(cell => cell.coord.y)),
        maxY: Math.max(...nonBorderCells.map(cell => cell.coord.y))
    };

    // Handle arrow click to navigate to adjacent grid cell
    function handleArrowClick(classList, currentIndex) {
        const currentCoord = gridCells[currentIndex].coord;
        let targetCoord;

        if (classList.contains('nav-arrow-left')) {
            targetCoord = {x: currentCoord.x - 1, y: currentCoord.y};
        } else if (classList.contains('nav-arrow-right')) {
            targetCoord = {x: currentCoord.x + 1, y: currentCoord.y};
        } else if (classList.contains('nav-arrow-up')) {
            targetCoord = {x: currentCoord.x, y: currentCoord.y - 1};
        } else if (classList.contains('nav-arrow-down')) {
            targetCoord = {x: currentCoord.x, y: currentCoord.y + 1};
        }

        const targetIndex = findGridIndexByCoord(targetCoord);
        if (targetIndex !== -1) {
            navigateToGrid(targetIndex + 1);
        }
    }

    // Find grid cell index by coordinate
    function findGridIndexByCoord(coord) {
        return gridCells.findIndex(cell =>
            cell.coord.x === coord.x && cell.coord.y === coord.y
        );
    }

    // Function to center a specific grid item
    function navigateToGrid(index) {
        currentIndex = index;

        // Disable parallax during navigation
        isNavigating = true;

        // Remove active class from all cells
        gridCells.forEach(cell => {
            cell.element.classList.remove('active');
        });

        // Remove active state from all control buttons
        controlButtons.forEach(btn => {
            btn.element.classList.remove('active');
        });

        const cellData = gridCells[index - 1];
        const coord = cellData.coord;

        // Add active class to the centered cell
        cellData.element.classList.add('active');

        // Add active state to corresponding control button
        if (controlButtons[index - 1]) {
            const activeButton = controlButtons[index - 1];
            activeButton.element.classList.add('active');
        }

        // Hide/show arrows based on grid boundaries
        const arrows = cellData.element.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => {
            arrow.classList.remove('hidden');

            if (arrow.classList.contains('nav-arrow-left') && coord.x <= gridBounds.minX) {
                arrow.classList.add('hidden');
            }
            if (arrow.classList.contains('nav-arrow-right') && coord.x >= gridBounds.maxX) {
                arrow.classList.add('hidden');
            }
            if (arrow.classList.contains('nav-arrow-up') && coord.y <= gridBounds.minY) {
                arrow.classList.add('hidden');
            }
            if (arrow.classList.contains('nav-arrow-down') && coord.y >= gridBounds.maxY) {
                arrow.classList.add('hidden');
            }
        });

        // Calculate position of the grid item (0-based pixels)
        const itemX = (coord.x - 1) * 680;
        const itemY = (coord.y - 1) * 500;

        // Calculate viewport center (adjust based on controls visibility)
        const viewportCenterX = window.innerWidth / 2;
        const bottomControls = document.querySelector('.bottom-controls');
        const isHidden = bottomControls.classList.contains('hidden');
        const viewportCenterY = window.innerHeight / 2 + (isHidden ? 20 : -10);

        // Calculate grid item center
        const itemCenterX = itemX + 340; // 680/2
        const itemCenterY = itemY + 240; // 480/2

        // Calculate translation needed to center the item
        const translateX = viewportCenterX - itemCenterX;
        const translateY = viewportCenterY - itemCenterY;

        // Store base centering position
        baseCenterX = translateX;
        baseCenterY = translateY;

        // Use slower transition for navigation
        gridContainer.style.transition = 'transform 1.5s ease';

        // Apply transform with current parallax offset
        gridContainer.style.transform = `translate(${baseCenterX + targetTX}px, ${baseCenterY + targetTY}px)`;

        // Re-enable parallax after navigation completes (1.5s)
        setTimeout(() => {
            isNavigating = false;
        }, 1500);
    }

    // Apply parallax transform combining base centering and parallax offset
    function applyParallax() {
        parallaxRaf = null;

        // Use faster transition for parallax
        gridContainer.style.transition = 'transform 180ms ease-out';

        const transform = `translate(${baseCenterX + targetTX}px, ${baseCenterY + targetTY}px)`;
        gridContainer.style.transform = transform;
    }

    // Calculate parallax offset based on mouse position
    function onMouseMove(e) {
        // Skip parallax if currently navigating
        if (isNavigating) return;

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        // Normalized distance from center (-1 to 1)
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        // Acceleration factor: moves more aggressively when further from center
        const ax = 1 + 0.6 * Math.abs(dx);
        const ay = 1 + 0.6 * Math.abs(dy);

        // Calculate target offset (negative to move opposite of cursor)
        targetTX = -dx * PARALLAX_MAX * ax;
        targetTY = -dy * PARALLAX_MAX * ay;

        // Debounce transform updates using RAF
        if (parallaxRaf === null) {
            parallaxRaf = requestAnimationFrame(applyParallax);
        }
    }

    // Reset parallax to center position
    function resetParallax() {
        targetTX = 0;
        targetTY = 0;

        if (parallaxRaf === null) {
            parallaxRaf = requestAnimationFrame(applyParallax);
        }
    }

    // Initialize parallax listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', resetParallax);

    // Toggle controls visibility
    const controlsToggle = document.getElementById('controls-toggle');
    const bottomControls = document.querySelector('.bottom-controls');
    let controlsVisible = false;

    // Set initial hidden state
    bottomControls.classList.add('hidden');
    controlsToggle.textContent = 'show project list ↑';

    controlsToggle.addEventListener('click', () => {
        controlsVisible = !controlsVisible;

        if (controlsVisible) {
            bottomControls.classList.remove('hidden');
            controlsToggle.textContent = 'hide project list ↓';
        } else {
            bottomControls.classList.add('hidden');
            controlsToggle.textContent = 'show project list ↑';
        }

        navigateToGrid(currentIndex);
    });

    // Initialize by centering the first item (center of spiral)
    navigateToGrid(1);
}

initDisplayView();
