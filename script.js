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
    rows: 10,
    columns: 10,
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
    if (gameboard[cellIndex]) {
        return gameboard[cellIndex].alive ? 1 : 0;
    } else {
        return 0;
    }
};

const game = () => {
    for (let y = 0; y < gameboardOptions.rows; y++) {
        for (let x = 0; x < gameboardOptions.columns; x++) {
            const cellIndex = getCellIndex(x, y);
            const cell = gameboard[cellIndex];
            const numberOfAliveCells = checkNeighbors(cell);
            const cellState = gameConditions(cell, numberOfAliveCells);
            gameboard[cellIndex] = cellState;
        }
    }
};

function gameConditions(cell, numberOfAliveCells) {
    let cellState = cell;
    if (numberOfAliveCells === 3) {
        cellState = changeAliveState(cell, true);
    } else if (numberOfAliveCells < 2 || numberOfAliveCells > 3) {
        cellState = changeAliveState(cell, false);
    }
    return cellState;
}

// UI
const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");

const drawCell = (cell) => {
    const width = 50;
    const height = 50;
    canvasCtx.fillStyle = cell.alive ? '#123456' : '#000';
    canvasCtx.fillRect(cell.x * width, cell.y * height, width, height);
};

function startGame() {
    gameboard = randomizeBoard();
    for (let i = 0; i < gameboard.length; i++) {
        drawCell(gameboard[i]);
    };
};

startGame();