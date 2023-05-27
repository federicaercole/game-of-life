export const cell = (isAlive, x, y) => {
    const state = {
        alive: isAlive,
        x: x,
        y: y
    }
    return state;
};

export const toggleState = (cell) => {
    return {
        ...cell,
        alive: !cell.alive
    }
};

const gameboardOptions = Object.freeze({
    rows: 10,
    colums: 10
});

export const createGameBoard = (options) => {
    let gameboard = [];

    for (let y = 0; y < options.rows; y++) {
        for (let x = 0; x < options.colums; x++) {
            gameboard.push(cell(false, x, y));
        }
    }
    return gameboard;
};