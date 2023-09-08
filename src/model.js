export default function model(options) {

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

    const createGameBoard = (options) => {
        let gameboard = [];

        for (let y = 0; y < options.rows; y++) {
            for (let x = 0; x < options.columns; x++) {
                gameboard.push(cell(x, y));
            }
        }
        return gameboard;
    };

    let gameboard = createGameBoard(options);

    return { gameboard }

}