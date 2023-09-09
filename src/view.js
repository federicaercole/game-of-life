export default function view(options, gameboard) {

    const container = document.querySelector(".container");
    const svg = `<svg aria-hidden="true" focusable="false" width="${options.columns * options.side}" height="${options.rows * options.side}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="${options.side}" height="${options.side}" patternUnits="userSpaceOnUse">
                <path d="M ${options.side} 0 L 0 0 0 ${options.side}" fill="none" stroke="#374151" stroke-width="0.5" />
            </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>`;
    const canvasHTML = `<canvas width="${options.columns * options.side}" height="${options.rows * options.side}" aria-label="Game grid" role="img"></canvas>`
    container.innerHTML = svg + canvasHTML;

    const canvas = document.querySelector("canvas");
    const canvasCtx = canvas.getContext("2d");

    window.addEventListener("resize", resizeGrid);

    function resizeGrid() {
        const svgPattern = document.querySelector("svg pattern");
        svgPattern.setAttribute("width", options.side / (canvas.width / canvas.clientWidth));
        svgPattern.setAttribute("height", options.side / (canvas.width / canvas.clientWidth));
    }

    function bindStartDrawingEvent(handler) {
        canvas.addEventListener('mousedown', () => {
            canvas.addEventListener('mousemove', handler);
            canvas.addEventListener('mousedown', handler);
        });
    }

    function bindStopDrawingEvent(handler) {
        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', handler);
        })
    }

    const drawCell = (cell) => {
        canvasCtx.fillStyle = cell.alive ? '#65a30d' : '#111827';
        canvasCtx.fillRect(cell.x * options.side, cell.y * options.side, options.side, options.side);
    };

    const drawGameboard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            drawCell(gameboard[i]);
        };
    };

    return { bindStartDrawingEvent, bindStopDrawingEvent, drawCell }
}