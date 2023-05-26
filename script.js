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