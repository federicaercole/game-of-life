import view from "./view.js";
import model from "./model.js";

function init() {

    const gameboardOptions = {
        rows: 60,
        columns: 100,
        side: 10
    };

    let playing = false;

    function getCursorPosition(event) {
        const canvas = document.querySelector("canvas");
        const x = event.offsetX * canvas.width / canvas.clientWidth;
        const y = event.offsetY * canvas.height / canvas.clientHeight;
        return { x, y };
    }

    const appModel = model(gameboardOptions);
    const gameboard = appModel.gameboard;
    const appView = view(gameboardOptions, gameboard);

    appView.bindStartDrawingEvent(draw);
    appView.bindStopDrawingEvent(draw)

    function draw(event) {
        const { x, y } = getCursorPosition(event);
        if (!playing) {
            const cellX = Math.floor(x / gameboardOptions.side);
            const cellY = Math.floor(y / gameboardOptions.side);
            const cellIndex = appModel.getCellIndex(cellX, cellY);
            appModel.changeCellState(cellIndex);
            appView.drawCell(gameboard[cellIndex]);
        }
    }
}

window.addEventListener("load", init)