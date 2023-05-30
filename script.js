export { cell, gameboard, changeAliveState, createGameBoard, getCellIndex, randomizeBoard, checkNeighbors, game };

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
const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");
const animationTimer = 200;

const drawCell = (cell) => {
    const side = 10;
    canvasCtx.fillStyle = cell.alive ? '#65a30d' : '#111827';
    canvasCtx.fillRect(cell.x * side, cell.y * side, side, side);
};

const drawGameboard = () => {
    for (let i = 0; i < gameboard.length; i++) {
        drawCell(gameboard[i]);
    };
};

function startGame() {
    gameboard = randomizeBoard();
    drawGameboard();
}

function iterateGame() {
    game();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    drawGameboard();
    setTimeout(() => {
        requestAnimationFrame(iterateGame);
    }, animationTimer)
}

startGame();
iterateGame();