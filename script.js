export const cell = (x, y) => {
    const state = {
        alive: false,
        x: x,
        y: y
    }
    return state;
};

export const changeAliveState = (cell, value) => {
    return {
        ...cell,
        alive: value
    }
};

const gameboardOptions = {
    rows: 10,
    columns: 10,
};

export const createGameBoard = (options) => {
    let gameboard = [];

    for (let y = 0; y < options.rows; y++) {
        for (let x = 0; x < options.columns; x++) {
            gameboard.push(cell(x, y));
        }
    }
    return gameboard;
};

export const gameboard = createGameBoard(gameboardOptions);

export const getCellIndex = (x, y) => {
    return x + (y * gameboardOptions.columns);
};

export const randomizeBoard = () => {
    const randomBoard = gameboard.map(cell => {
        return changeAliveState(cell, Math.random() > 0.5);
    });
    return randomBoard;
};

export const checkNeighbors = (cell) => {
    const x = cell.x;
    const y = cell.y;

    let numberOfAliveCells = checkAliveState(x - 1, y - 1) + checkAliveState(x, y - 1) + checkAliveState(x + 1, y - 1) +
        checkAliveState(x - 1, y) + checkAliveState(x + 1, y) + checkAliveState(x - 1, y + 1) + checkAliveState(x, y + 1) + checkAliveState(x + 1, y + 1);

    return numberOfAliveCells;
};

const checkAliveState = (x, y) => {
    const cellIndex = getCellIndex(x, y);
    if (x < 0 || y < 0 || x >= gameboardOptions.columns || y >= gameboardOptions.rows) {
        return 0;
    }
    return gameboard[cellIndex].alive ? 1 : 0;
};