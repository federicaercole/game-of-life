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
}

const gameboardOptions = {
    rows: 10,
    colums: 10,
};

export const createGameBoard = (options) => {
    let gameboard = [];

    for (let y = 0; y < options.rows; y++) {
        for (let x = 0; x < options.colums; x++) {
            gameboard.push(cell(x, y));
        }
    }
    return gameboard;
};

export const getCellIndex = (x, y) => {
    return x + (y * gameboardOptions.colums);
};

export const randomizeBoard = (options) => {
    const randomBoard = createGameBoard(options).map(cell => {
        return changeAliveState(cell, Math.random() > 0.5);
    });
    return randomBoard;
};