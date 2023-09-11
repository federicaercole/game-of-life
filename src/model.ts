import { Cell, Options } from "./types";

export default function model(options: Options) {

    const cell = (x: number, y: number): Cell => {
        const state = {
            alive: false,
            x: x,
            y: y
        }
        return state;
    };

    const changeAliveState = (cell: Cell, value: boolean): Cell => {
        return {
            ...cell,
            alive: value
        }
    };

    const createGameBoard = (options: Options): Cell[] => {
        let gameboard: Cell[] = [];

        for (let y = 0; y < options.rows; y++) {
            for (let x = 0; x < options.columns; x++) {
                gameboard.push(cell(x, y));
            }
        }
        return gameboard;
    };

    let gameboard = createGameBoard(options);

    const getCellIndex = (x: number, y: number) => {
        return x + (y * options.columns);
    };

    function changeCellState(x: number, y: number) {
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

    function updateGameboard(board: Cell[]) {
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

    function aliveConditions(cell: Cell, numberOfAliveCells: number) {
        let cellState = cell;
        if (numberOfAliveCells === 3) {
            cellState = changeAliveState(cell, true);
        } else if (numberOfAliveCells < 2 || numberOfAliveCells > 3) {
            cellState = changeAliveState(cell, false);
        }
        return cellState;
    }

    const checkNeighbors = (cell: Cell) => {
        const x = cell.x;
        const y = cell.y;

        let numberOfAliveCells = checkAliveState(x - 1, y - 1) + checkAliveState(x, y - 1) + checkAliveState(x + 1, y - 1) +
            checkAliveState(x - 1, y) + checkAliveState(x + 1, y) + checkAliveState(x - 1, y + 1) + checkAliveState(x, y + 1) + checkAliveState(x + 1, y + 1);

        return numberOfAliveCells;
    };

    const checkAliveState = (x: number, y: number) => {
        const cellIndex = getCellIndex(x, y);
        if (x < 0 || x >= options.columns || y < 0 || y >= options.rows) {
            return 0;
        }
        return gameboard[cellIndex].alive ? 1 : 0;
    };

    return { gameboard, changeCellState, createGameBoard, randomizeBoard, updateGameboard, game }
}