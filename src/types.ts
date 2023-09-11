export interface Cell {
    alive: boolean;
    x: number;
    y: number;
}

export interface Options {
    rows: number;
    columns: number;
    side: number;
    playing: boolean;
}