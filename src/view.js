export default function view(options, gameboard) {

    const side = 10;
    const container = document.querySelector(".container");
    const svg = `<svg aria-hidden="true" focusable="false" width="${options.columns * side}" height="${options.rows * side}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="${side}" height="${side}" patternUnits="userSpaceOnUse">
                <path d="M ${side} 0 L 0 0 0 ${side}" fill="none" stroke="#374151" stroke-width="0.5" />
            </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>`;
    const canvasHTML = `<canvas width="${options.columns * side}" height="${options.rows * side}" aria-label="Game grid" role="img"></canvas>`
    container.innerHTML = svg + canvasHTML;

    const canvas = document.querySelector("canvas");
    const canvasCtx = canvas.getContext("2d");
    let coord = { x: 0, y: 0 };
    const animationTimer = 100;
    let playing = false;

    window.addEventListener("resize", resizeGrid);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);

    function resizeGrid() {
        const svgPattern = document.querySelector("svg pattern");
        svgPattern.setAttribute("width", side / (canvas.width / canvas.clientWidth));
        svgPattern.setAttribute("height", side / (canvas.width / canvas.clientWidth));
    }

    function getCursorPosition(event) {
        coord.x = event.offsetX * canvas.width / canvas.clientWidth;
        coord.y = event.offsetY * canvas.height / canvas.clientHeight;
    }

    function startDrawing(event) {
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mousedown', draw);
        getCursorPosition(event);
    }

    function stopDrawing() {
        canvas.removeEventListener('mousemove', draw);
    }

    function draw(event) {
        if (!playing) {
            const cellX = Math.floor(coord.x / side);
            const cellY = Math.floor(coord.y / side);
            const cellIndex = getCellIndex(cellX, cellY);
            const target = gameboard[cellIndex];
            if (target.alive) {
                gameboard[cellIndex] = changeAliveState(target, false);
            } else {
                gameboard[cellIndex] = changeAliveState(target, true);
            }
            getCursorPosition(event);
            drawCell(gameboard[cellIndex]);
        }
    }

    return {}

}