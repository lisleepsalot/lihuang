// Decorative mouse-trail effect for the info (about) page. Divides the
// screen into a grid; moving the mouse drops a dotted white cell with a
// letter into whichever cell it's currently over, and the cell fades out
// if the mouse doesn't revisit it. Only runs on wide viewports (>=1200px)
// — the effect sits behind #info-container, which stays on top and fully
// readable.

const FUN_CELL_SIZE = 24;
const FUN_FADE_DELAY_MS = 1000;
const FUN_FADE_JITTER_MS = 800; // +/- variation applied to each cell's fade delay
const FUN_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // fallback pool if the fact fetch fails
const FUN_FACT_API = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
const FUN_CREDIT_TEXT = 'via uselessfacts.jsph.pl';
const FUN_SPECIAL_GLYPHS = 'ø014⅞@×÷↑→↓←'.split('');

const FUN_SPAWN_CHANCE = 0.25; // odds a freshly spawned cell also lights up neighbors
const FUN_NEIGHBOR_OFFSETS = [
    {dx: -1, dy: -1}, {dx: 0, dy: -1}, {dx: 1, dy: -1},
    {dx: -1, dy: 0},                   {dx: 1, dy: 0},
    {dx: -1, dy: 1},  {dx: 0, dy: 1},  {dx: 1, dy: 1}
];

const FUN_LONG_PRESS_MS = 300;
const FUN_TYPEWRITER_COLS = 20;
const FUN_TYPEWRITER_CHAR_DELAY_MS = 55;

// Greedy word-wrap: never splits a word, breaks once a line would exceed maxCols.
function wrapTextToLines(text, maxCols) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        const candidate = currentLine.length === 0 ? word : `${currentLine} ${word}`;
        if (candidate.length > maxCols && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = candidate;
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines;
}

// Sets up the grid: fact-driven trail letters, mouse-trail spawning, and the long-press typewriter.
function initFunGrid() {
    const container = document.getElementById('funGrid');
    if (!container) return;

    const activeCells = new Map(); // "col,row" -> {el, timeoutId}

    let funLetterPool = FUN_LETTERS.split('');
    let funLetterIndex = 0;
    let funFactText = '';
    let funSpaceCount = 0;

    // Returns the next character from the fact pool, every 3rd space swapped for a special glyph.
    function nextFunLetter() {
        const letter = funLetterPool[funLetterIndex % funLetterPool.length];
        funLetterIndex++;

        if (letter === ' ') {
            funSpaceCount++;
            if (funSpaceCount % 3 === 0) {
                return FUN_SPECIAL_GLYPHS[Math.floor(Math.random() * FUN_SPECIAL_GLYPHS.length)];
            }
        }

        return letter;
    }

    // Fetches a random fact and refreshes the letter pool it drives.
    async function loadFunFact() {
        try {
            const response = await fetch(FUN_FACT_API);
            const data = await response.json();
            const characters = data.text.split('');
            if (characters.length > 0) {
                funLetterPool = characters;
                funLetterIndex = 0;
                funSpaceCount = 0;
                funFactText = data.text;
            }
        } catch (err) {
            // Keep the existing pool if the fact can't be fetched.
        }
    }

    // Creates or refreshes the cell at (col, row); may spawn neighbors and always re-arms its fade timer.
    function activateCell(col, row, isSpawnedNeighbor, letter) {
        const key = `${col},${row}`;
        let entry = activeCells.get(key);

        if (!entry) {
            const cell = document.createElement('div');
            cell.className = 'fun-cell';
            cell.style.left = `${col * FUN_CELL_SIZE}px`;
            cell.style.top = `${row * FUN_CELL_SIZE}px`;
            cell.textContent = letter || nextFunLetter();
            container.appendChild(cell);

            entry = {el: cell, timeoutId: null};
            activeCells.set(key, entry);

            if (!isSpawnedNeighbor && Math.random() < FUN_SPAWN_CHANCE) {
                spawnNeighbors(col, row);
            }
        } else {
            clearTimeout(entry.timeoutId);
        }

        const fadeDelay = FUN_FADE_DELAY_MS + (Math.random() * 2 - 1) * FUN_FADE_JITTER_MS;

        entry.timeoutId = setTimeout(() => {
            entry.el.remove();
            activeCells.delete(key);
        }, fadeDelay);
    }

    // Lights up 1-2 random neighbors of a freshly spawned cell.
    function spawnNeighbors(col, row) {
        const count = Math.random() < 0.5 ? 1 : 2;
        const offsets = [...FUN_NEIGHBOR_OFFSETS].sort(() => Math.random() - 0.5).slice(0, count);
        offsets.forEach(({dx, dy}) => activateCell(col + dx, row + dy, true));
    }

    // Activates the cell under the cursor on every move.
    function onMouseMove(e) {
        const col = Math.floor(e.clientX / FUN_CELL_SIZE);
        const row = Math.floor(e.clientY / FUN_CELL_SIZE);
        activateCell(col, row);
    }

    // Removes every active cell and clears their fade timers.
    function clearAllCells() {
        activeCells.forEach(entry => {
            clearTimeout(entry.timeoutId);
            entry.el.remove();
        });
        activeCells.clear();
    }

    let typewriterTimeoutId = null;

    // Fetches a fresh fact and types it out, word-wrapped, from the press point, then the API credit.
    async function startTypewriter(startCol, startRow) {
        await loadFunFact();
        if (!funFactText) return;

        const factLines = wrapTextToLines(funFactText, FUN_TYPEWRITER_COLS);
        const creditLines = wrapTextToLines(FUN_CREDIT_TEXT, FUN_TYPEWRITER_COLS);
        const lines = [...factLines, '', ...creditLines];

        const queue = [];
        lines.forEach((line, lineIndex) => {
            line.split('').forEach((char, charIndex) => {
                if (char === ' ') return;
                queue.push({col: startCol + charIndex, row: startRow + lineIndex, letter: char});
            });
        });

        let i = 0;
        function typeNext() {
            if (i >= queue.length) return;
            const {col, row, letter} = queue[i];
            activateCell(col, row, true, letter);
            i++;
            typewriterTimeoutId = setTimeout(typeNext, FUN_TYPEWRITER_CHAR_DELAY_MS);
        }
        typeNext();
    }

    let longPressTimeoutId = null;

    // Starts the long-press timer that triggers the typewriter.
    function onMouseDown(e) {
        const col = Math.floor(e.clientX / FUN_CELL_SIZE);
        const row = Math.floor(e.clientY / FUN_CELL_SIZE);
        longPressTimeoutId = setTimeout(() => startTypewriter(col, row), FUN_LONG_PRESS_MS);
    }

    // Cancels a pending long-press before it fires.
    function cancelLongPress() {
        clearTimeout(longPressTimeoutId);
    }

    const wideViewport = window.matchMedia('(min-width: 1200px)');

    // Enables or disables all mouse listeners based on whether the viewport is wide enough.
    function syncToViewport(matches) {
        if (matches) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', cancelLongPress);
            window.addEventListener('mouseleave', cancelLongPress);
        } else {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', cancelLongPress);
            window.removeEventListener('mouseleave', cancelLongPress);
            cancelLongPress();
            clearTimeout(typewriterTimeoutId);
            clearAllCells();
        }
    }

    loadFunFact();
    syncToViewport(wideViewport.matches);
    wideViewport.addEventListener('change', (e) => syncToViewport(e.matches));
}

document.addEventListener('DOMContentLoaded', initFunGrid);
