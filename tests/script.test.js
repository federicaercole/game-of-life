import { cell, toggleState } from "../script";

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