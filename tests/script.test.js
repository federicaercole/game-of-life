import { cell, gameboard, changeAliveState, createGameBoard, getCellIndex, randomizeBoard, checkNeighbors, game } from "../script";

describe("cell creation", () => {

    const deadCell = cell(0, 0);
    const aliveCell = changeAliveState(deadCell, !deadCell.alive);

    test("it creates a cell", () => {
        expect(deadCell).toEqual({ alive: false, x: 0, y: 0 });
    });

    test("it changes alive state", () => {
        expect(aliveCell).toEqual({ alive: true, x: 0, y: 0 });
    });

    test("it changes alive state another time", () => {
        const becomeDeadCell = changeAliveState(aliveCell, !aliveCell.alive);
        expect(becomeDeadCell).toEqual({ alive: false, x: 0, y: 0 });
    });
});

describe("gameboard", () => {

    const gameboardOptions = {
        rows: 10,
        columns: 10,
    };

    const gameboardTest = createGameBoard(gameboardOptions);

    test("it creates gameboard", () => {
        expect(gameboardTest.length).toEqual(100);
    });

    test("last element", () => {
        expect(gameboardTest[99]).toEqual({ alive: false, x: 9, y: 9 });
    });

    test("get neighbors of cell x: 1, y:1", () => {
        expect(gameboardTest[11]).toEqual({ alive: false, x: 1, y: 1 });

        expect(gameboardTest[0]).toEqual({ alive: false, x: 0, y: 0 });
        expect(gameboardTest[1]).toEqual({ alive: false, x: 1, y: 0 });
        expect(gameboardTest[2]).toEqual({ alive: false, x: 2, y: 0 });
        expect(gameboardTest[10]).toEqual({ alive: false, x: 0, y: 1 });
        expect(gameboardTest[12]).toEqual({ alive: false, x: 2, y: 1 });
        expect(gameboardTest[20]).toEqual({ alive: false, x: 0, y: 2 });
        expect(gameboardTest[21]).toEqual({ alive: false, x: 1, y: 2 });
        expect(gameboardTest[22]).toEqual({ alive: false, x: 2, y: 2 });
    });

    test("get the status of some cells", () => {
        const indexCell1 = getCellIndex(0, 1);
        const indexCell2 = getCellIndex(1, 1);

        expect(gameboardTest[indexCell1]).toEqual({ alive: false, x: 0, y: 1 });
        expect(gameboardTest[indexCell2]).toEqual({ alive: false, x: 1, y: 1 });
    });

    test("create a board with random cells alive state", () => {
        const randomBoard = randomizeBoard();
        expect(randomBoard.some(cell => cell.alive === true)).toBeTruthy();
    })
});

describe("game logic", () => {

    test("check number of alive cells around cell x:1, y:1", () => {
        gameboard[0] = changeAliveState(gameboard[0], true);
        gameboard[1] = changeAliveState(gameboard[1], true);
        gameboard[10] = changeAliveState(gameboard[10], true);

        const numberAlive = checkNeighbors(gameboard[11]);

        expect(numberAlive).toBe(3);
    });

    test("check number of alive cells around cell x:0, y:0", () => {
        gameboard[1] = changeAliveState(gameboard[1], true);
        gameboard[10] = changeAliveState(gameboard[10], true);

        const numberAlive = checkNeighbors(gameboard[0]);

        expect(numberAlive).toBe(2);
    });

    test("check if an alive cell become dead with less than 2 neighbors alive", () => {
        gameboard[0] = changeAliveState(gameboard[0], true);
        gameboard[1] = changeAliveState(gameboard[1], true);
        gameboard[10] = changeAliveState(gameboard[10], false);

        game();

        expect(gameboard[0]).toEqual({ alive: false, x: 0, y: 0 });
    });

    test("check if an alive cell become dead with more than 3 neighbors alive", () => {
        gameboard[0] = changeAliveState(gameboard[0], true);
        gameboard[1] = changeAliveState(gameboard[1], true);
        gameboard[2] = changeAliveState(gameboard[2], true);
        gameboard[10] = changeAliveState(gameboard[10], true);
        gameboard[11] = changeAliveState(gameboard[11], true);

        game();

        expect(gameboard[1]).toEqual({ alive: false, x: 1, y: 0 });
    });

    test("check if a dead cell become alive with exactly 3 neighbors alive", () => {
        gameboard[0] = changeAliveState(gameboard[0], false);
        gameboard[1] = changeAliveState(gameboard[1], true);
        gameboard[2] = changeAliveState(gameboard[2], true);
        gameboard[10] = changeAliveState(gameboard[10], true);
        gameboard[11] = changeAliveState(gameboard[11], true);

        game();

        expect(gameboard[0]).toEqual({ alive: true, x: 0, y: 0 });
    });

    test("a cell doesn't change its state if it has 2 alive neighbors", () => {
        gameboard[0] = changeAliveState(gameboard[0], true);
        gameboard[1] = changeAliveState(gameboard[1], true);
        gameboard[2] = changeAliveState(gameboard[2], false);
        gameboard[10] = changeAliveState(gameboard[10], true);
        gameboard[11] = changeAliveState(gameboard[11], false);

        game();

        expect(gameboard[0]).toEqual({ alive: true, x: 0, y: 0 });
    });
});