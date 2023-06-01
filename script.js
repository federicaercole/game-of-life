//export { cell, gameboard, changeAliveState, createGameBoard, getCellIndex, randomizeBoard, checkNeighbors, game };

// Game logic
const cell = (x, y) => {
    const state = {
        alive: false,
        x: x,
        y: y
    }
    return state;
};

const changeAliveState = (cell, value) => {
    return {
        ...cell,
        alive: value
    }
};

const gameboardOptions = {
    rows: 60,
    columns: 100,
};

const createGameBoard = (options) => {
    let gameboard = [];

    for (let y = 0; y < options.rows; y++) {
        for (let x = 0; x < options.columns; x++) {
            gameboard.push(cell(x, y));
        }
    }
    return gameboard;
};

let gameboard = createGameBoard(gameboardOptions);

const getCellIndex = (x, y) => {
    return x + (y * gameboardOptions.columns);
};

const randomizeBoard = () => {
    const randomBoard = gameboard.map(cell => {
        return changeAliveState(cell, Math.random() > 0.5);
    });
    return randomBoard;
};

const checkNeighbors = (cell) => {
    const x = cell.x;
    const y = cell.y;

    let numberOfAliveCells = checkAliveState(x - 1, y - 1) + checkAliveState(x, y - 1) + checkAliveState(x + 1, y - 1) +
        checkAliveState(x - 1, y) + checkAliveState(x + 1, y) + checkAliveState(x - 1, y + 1) + checkAliveState(x, y + 1) + checkAliveState(x + 1, y + 1);

    return numberOfAliveCells;
};

const checkAliveState = (x, y) => {
    const cellIndex = getCellIndex(x, y);
    if (x < 0 || x >= gameboardOptions.columns || y < 0 || y >= gameboardOptions.rows) {
        return 0;
    }
    return gameboard[cellIndex].alive ? 1 : 0;
};

const game = () => {
    let gameboardCopy = [...gameboard];
    for (let y = 0; y < gameboardOptions.rows; y++) {
        for (let x = 0; x < gameboardOptions.columns; x++) {
            const cellIndex = getCellIndex(x, y);
            const cell = gameboardCopy[cellIndex];
            const numberOfAliveCells = checkNeighbors(cell);
            const cellState = aliveConditions(cell, numberOfAliveCells);
            gameboardCopy[cellIndex] = cellState;
        }
    }
    updateGameboard(gameboardCopy);
};

function updateGameboard(board) {
    for (let i = 0; i < gameboard.length; i++) {
        gameboard[i] = board[i];
    }
};

function aliveConditions(cell, numberOfAliveCells) {
    let cellState = cell;
    if (numberOfAliveCells === 3) {
        cellState = changeAliveState(cell, true);
    } else if (numberOfAliveCells < 2 || numberOfAliveCells > 3) {
        cellState = changeAliveState(cell, false);
    }
    return cellState;
}

//UI

const side = 10;

const container = document.querySelector(".container");
const svg = `<svg aria-hidden="true" focusable="false" width="${gameboardOptions.columns * side}" height="${gameboardOptions.rows * side}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="${side}" height="${side}" patternUnits="userSpaceOnUse">
                <path d="M ${side} 0 L 0 0 0 ${side}" fill="none" stroke="#374151" stroke-width="0.5" />
            </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>`;
const canvasHTML = `<canvas width="${gameboardOptions.columns * side}" height="${gameboardOptions.rows * side}" aria-label="Game grid" role="img"></canvas>`
container.innerHTML = svg + canvasHTML;

const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");

window.addEventListener("resize", resizeGrid);

function resizeGrid() {
    const svgPattern = document.querySelector("svg pattern");
    svgPattern.setAttribute("width", side / (canvas.width / canvas.clientWidth));
    svgPattern.setAttribute("height", side / (canvas.width / canvas.clientWidth));
}

resizeGrid();

const drawCell = (cell) => {
    canvasCtx.fillStyle = cell.alive ? '#65a30d' : '#111827';
    canvasCtx.fillRect(cell.x * side, cell.y * side, side, side);
};

const drawGameboard = () => {
    for (let i = 0; i < gameboard.length; i++) {
        drawCell(gameboard[i]);
    };
};

let coord = { x: 0, y: 0 };
const animationTimer = 100;
let playing = false;

function iterateGame() {
    game();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    drawGameboard();
    const animation = setTimeout(() => requestAnimationFrame(iterateGame), animationTimer);
    if (!playing) {
        clearTimeout(animation);
    }
}

const startBtn = document.querySelector(".start");
const randomBtn = document.querySelector(".random");
const clearBtn = document.querySelector(".clear");

startBtn.addEventListener("click", () => {
    if (playing) {
        playing = false;
        startBtn.textContent = "Continue";
    } else {
        playing = true;
        startBtn.textContent = "Stop";
    }
    return iterateGame();
});

randomBtn.addEventListener("click", () => {
    if (!playing) {
        gameboard = randomizeBoard();
        drawGameboard();
        startBtn.textContent = "Start";
    }
});

clearBtn.addEventListener("click", () => {
    if (!playing) {
        gameboard = createGameBoard(gameboardOptions);
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        startBtn.textContent = "Start";
    }
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);

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