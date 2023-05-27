import { cell, toggleState, createGameBoard } from "../script";

describe("cell creation", () => {

    const deadCell = cell(false, 0, 0);
    const aliveCell = toggleState(deadCell);

    test("it creates a cell", () => {
        expect(deadCell).toEqual({ alive: false, x: 0, y: 0 });
    });

    test("it changes alive state", () => {
        expect(aliveCell).toEqual({ alive: true, x: 0, y: 0 });
    });

    test("it changes alive state another time", () => {
        const becomeDeadCell = toggleState(aliveCell);
        expect(becomeDeadCell).toEqual({ alive: false, x: 0, y: 0 });
    });
});

describe("gameboard", () => {

    const gameboardOptions = Object.freeze({
        rows: 10,
        colums: 10
    });

    const gameboard = createGameBoard(gameboardOptions);

    test("it creates gameboard", () => {
        expect(gameboard.length).toEqual(100);
    });

    test("last element", () => {
        expect(gameboard[99]).toEqual({ alive: false, x: 9, y: 9 });
    });

    test("get neighbors of cell x: 1, y:1", () => {
        expect(gameboard[11]).toEqual({ alive: false, x: 1, y: 1 });

        expect(gameboard[0]).toEqual({ alive: false, x: 0, y: 0 });
        expect(gameboard[1]).toEqual({ alive: false, x: 1, y: 0 });
        expect(gameboard[2]).toEqual({ alive: false, x: 2, y: 0 });
        expect(gameboard[10]).toEqual({ alive: false, x: 0, y: 1 });
        expect(gameboard[12]).toEqual({ alive: false, x: 2, y: 1 });
        expect(gameboard[20]).toEqual({ alive: false, x: 0, y: 2 });
        expect(gameboard[21]).toEqual({ alive: false, x: 1, y: 2 });
        expect(gameboard[22]).toEqual({ alive: false, x: 2, y: 2 });
    });
});