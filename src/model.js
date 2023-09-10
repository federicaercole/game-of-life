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

    const game = () => {
        let gameboardCopy = [...gameboard];
        for (let y = 0; y < options.rows; y++) {
            for (let x = 0; x < options.columns; x++) {
                const cellIndex = getCellIndex(x, y);
                const cell = gameboardCopy[cellIndex];
                const numberOfAliveCells = checkNeighbors(cell);
                const cellState = aliveConditions(cell, numberOfAliveCells);
                gameboardCopy[cellIndex] = cellState;
            }
        }
        updateGameboard(gameboardCopy);
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

    const checkNeighbors = (cell) => {
        const x = cell.x;
        const y = cell.y;

        let numberOfAliveCells = checkAliveState(x - 1, y - 1) + checkAliveState(x, y - 1) + checkAliveState(x + 1, y - 1) +
            checkAliveState(x - 1, y) + checkAliveState(x + 1, y) + checkAliveState(x - 1, y + 1) + checkAliveState(x, y + 1) + checkAliveState(x + 1, y + 1);

        return numberOfAliveCells;
    };

    const checkAliveState = (x, y) => {
        const cellIndex = getCellIndex(x, y);
        if (x < 0 || x >= options.columns || y < 0 || y >= options.rows) {
            return 0;
        }
        return gameboard[cellIndex].alive ? 1 : 0;
    };

    return { gameboard, changeCellState, createGameBoard, randomizeBoard, updateGameboard, game }
}