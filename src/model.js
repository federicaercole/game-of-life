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

    const getCellIndex = (x, y) => {
        return x + (y * options.columns);
    };

    function changeCellState(x, y) {
        const cellX = Math.floor(x / options.side);
        const cellY = Math.floor(y / options.side);
        const cellIndex = getCellIndex(cellX, cellY);
        const target = gameboard[cellIndex];
        gameboard[cellIndex] = changeAliveState(target, !target.alive);
    }

    const randomizeBoard = () => {
        const randomBoard = gameboard.map(cell => {
            return changeAliveState(cell, Math.random() > 0.5);
        });
        return randomBoard;
    };

    function updateGameboard(board) {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = board[i];
        }
    };

    return { gameboard, changeCellState, createGameBoard, randomizeBoard, updateGameboard }
}