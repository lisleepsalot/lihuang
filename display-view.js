
const PARALLAX_ENABLED = false;

// Fetches projects.json (built by fetchProjects.js) and returns it as a plain array.
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

// Opens a project's Sanity `url` in a new tab, or navigates to its auto-rendered page.
function goToProject(project) {
    if (project.url) {
        window.open(project.url, '_blank', 'noopener,noreferrer');
    } else if (project.slug) {
        navigateWithTransition(`project.html?slug=${encodeURIComponent(project.slug)}`);
    }
}

// Renders the mobile grid as a plain single-column, full-width list — no spiral, borders, arrows, or parallax.
function renderMobileGrid(projects, gridContainer) {
    projects.forEach(project => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';

        cell.innerHTML = `
            <div class="display-grid-container">
                <div class="display-grid-image"></div>
                <div class="display-grid-textbox">
                    <span class="display-grid-name"></span>
                    <span class="display-grid-year"></span>
                </div>
            </div>
        `;

        const imageEl = cell.querySelector('.display-grid-image');
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
        cell.querySelector('.display-grid-name').textContent = project.name;
        cell.querySelector('.display-grid-year').textContent = project.year;

        const container = cell.querySelector('.display-grid-container');
        container.style.cursor = 'pointer';
        container.addEventListener('click', () => goToProject(project));

        gridContainer.appendChild(cell);
    });
}

// Builds and wires up the project grid: fetches projects, then renders the mobile list or the full desktop spiral.
async function initDisplayView() {
    const gridContainer = document.getElementById('gridContainer');
    const controlPanel = document.getElementById('controlPanel');
    const controlButtons = [];

    const PARALLAX_MAX = 20;
    let targetTX = 0;
    let targetTY = 0;
    let parallaxRaf = null;
    let baseCenterX = 0;
    let baseCenterY = 0;
    let isNavigating = false;
    let currentIndex = 1;
    let isInitialRender = true;

    const rawProjects = await fetchProjects();
    let projects = rawProjects.map(toDisplayProject);

    if (window.matchMedia('(max-width: 900px)').matches) {
        renderMobileGrid(projects, gridContainer);
        return;
    }

    // Border cells fill out the spiral into a full surrounding square.
    const regularCount = projects.length;
    let currentTotal = regularCount;
    let steps = Math.ceil(Math.sqrt(currentTotal));

    const layerSize1 = (steps * 2) * 4;
    const layerSize2 = ((steps + 1) * 2) * 4;
    const borderItemsNeeded = layerSize1 + layerSize2;

    for (let i = 0; i < borderItemsNeeded; i++) {
        projects.push({ name: "", year: "", isBorder: true });
    }

    // Generates spiral coordinates starting from center (4,4).
    function generateSpiralCoordinates(count) {
        const coords = [];
        let x = 4, y = 4;
        coords.push({x, y});

        let steps = 1;
        let direction = 0; // 0: right, 1: up, 2: left, 3: down

        while (coords.length < count) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < steps; j++) {
                    if (coords.length >= count) break;

                    if (direction === 0) x++;
                    else if (direction === 1) y--;
                    else if (direction === 2) x--;
                    else if (direction === 3) y++;

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

    // Creates and positions each grid cell according to the spiral.
    projects.forEach((project, index) => {
        const gridCell = document.createElement('div');
        gridCell.className = 'grid-cell';

        const coord = spiralCoords[index];
        gridCell.style.position = 'absolute';
        gridCell.style.left = `${(coord.x - 1) * 680}px`;
        gridCell.style.top = `${(coord.y - 1) * 480}px`;

        if (project.isBorder) {
            gridCell.innerHTML = `
                <div class="display-grid-container">
                    <div class="display-grid-image" style="background-image: none; background-color: transparent; border: 1px dashed black;"></div>
                </div>
            `;
        } else {
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

            // Set via DOM APIs (not string interpolation) so CMS-sourced text/URLs can't break out of the markup.
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

    // Builds one control-panel button per non-border project.
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

        controlButtons.push({
            element: button,
            nameSpan: nameSpan,
            originalName: project.name
        });
    });

    // Navigates to whichever grid cell is adjacent to the current one in the arrow's direction.
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
        if (targetIndex !== -1 && !projects[targetIndex].isBorder) {
            navigateToGrid(targetIndex + 1);
        }
    }

    // Finds a grid cell's index by its spiral coordinate.
    function findGridIndexByCoord(coord) {
        return gridCells.findIndex(cell =>
            cell.coord.x === coord.x && cell.coord.y === coord.y
        );
    }

    // Whether the cell adjacent to coord in the given direction holds a real project.
    function hasProjectNeighbor(coord, dx, dy) {
        const neighborIndex = findGridIndexByCoord({x: coord.x + dx, y: coord.y + dy});
        return neighborIndex !== -1 && !projects[neighborIndex].isBorder;
    }

    // Centers the given grid item, updates active states, and shows/hides its arrows.
    function navigateToGrid(index) {
        currentIndex = index;
        isNavigating = true;

        gridCells.forEach(cell => {
            cell.element.classList.remove('active');
        });

        controlButtons.forEach(btn => {
            btn.element.classList.remove('active');
        });

        const cellData = gridCells[index - 1];
        const coord = cellData.coord;

        cellData.element.classList.add('active');

        if (controlButtons[index - 1]) {
            const activeButton = controlButtons[index - 1];
            activeButton.element.classList.add('active');
        }

        const arrows = cellData.element.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => {
            arrow.classList.remove('hidden');

            if (arrow.classList.contains('nav-arrow-left') && !hasProjectNeighbor(coord, -1, 0)) {
                arrow.classList.add('hidden');
            }
            if (arrow.classList.contains('nav-arrow-right') && !hasProjectNeighbor(coord, 1, 0)) {
                arrow.classList.add('hidden');
            }
            if (arrow.classList.contains('nav-arrow-up') && !hasProjectNeighbor(coord, 0, -1)) {
                arrow.classList.add('hidden');
            }
            if (arrow.classList.contains('nav-arrow-down') && !hasProjectNeighbor(coord, 0, 1)) {
                arrow.classList.add('hidden');
            }
        });

        const itemX = (coord.x - 1) * 680;
        const itemY = (coord.y - 1) * 500;

        const viewportCenterX = window.innerWidth / 2;
        const bottomControls = document.querySelector('.bottom-controls');
        const isHidden = bottomControls.classList.contains('hidden');
        const viewportCenterY = window.innerHeight / 2 + (isHidden ? 20 : -10);

        const itemCenterX = itemX + 340; // 680/2
        const itemCenterY = itemY + 240; // 480/2

        const translateX = viewportCenterX - itemCenterX;
        const translateY = viewportCenterY - itemCenterY;

        baseCenterX = translateX;
        baseCenterY = translateY;

        if (isInitialRender) {
            // Jump straight to the starting cell on page load — no slide-in.
            isInitialRender = false;
            gridContainer.style.transition = 'none';
            gridContainer.style.transform = `translate(${baseCenterX + targetTX}px, ${baseCenterY + targetTY}px)`;
            isNavigating = false;
        } else {
            gridContainer.style.transition = 'transform 1.5s ease';
            gridContainer.style.transform = `translate(${baseCenterX + targetTX}px, ${baseCenterY + targetTY}px)`;

            setTimeout(() => {
                isNavigating = false;
            }, 1500);
        }
    }

    // Applies the current base-centering + parallax offset as the grid's transform.
    function applyParallax() {
        parallaxRaf = null;
        gridContainer.style.transition = 'transform 180ms ease-out';
        const transform = `translate(${baseCenterX + targetTX}px, ${baseCenterY + targetTY}px)`;
        gridContainer.style.transform = transform;
    }

    // Updates the parallax offset from mouse position, accelerating further from center.
    function onMouseMove(e) {
        if (isNavigating) return;

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        // Normalized distance from center (-1 to 1).
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        const ax = 1 + 0.6 * Math.abs(dx);
        const ay = 1 + 0.6 * Math.abs(dy);

        // Negative so the grid moves opposite the cursor.
        targetTX = -dx * PARALLAX_MAX * ax;
        targetTY = -dy * PARALLAX_MAX * ay;

        if (parallaxRaf === null) {
            parallaxRaf = requestAnimationFrame(applyParallax);
        }
    }

    // Resets the parallax offset back to center.
    function resetParallax() {
        targetTX = 0;
        targetTY = 0;

        if (parallaxRaf === null) {
            parallaxRaf = requestAnimationFrame(applyParallax);
        }
    }

    if (PARALLAX_ENABLED) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', resetParallax);
    }

    const controlsToggle = document.getElementById('controls-toggle');
    const bottomControls = document.querySelector('.bottom-controls');
    let controlsVisible = false;

    bottomControls.classList.add('hidden');
    controlsToggle.textContent = 'show project list ↑';

    // Shows/hides the project list panel and re-centers the current grid item.
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

    navigateToGrid(1);
}

initDisplayView();

// The spiral (desktop) vs. simple list (mobile) layout is built once at load
// and never re-laid-out live, so crossing the breakpoint leaves stale state.
// Reload when it's actually crossed, in either direction, to rebuild clean.
window.matchMedia('(max-width: 900px)').addEventListener('change', () => {
    window.location.reload();
});
