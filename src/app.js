import view from "./view.js";
import model from "./model.js";

function init() {

    const gameOptions = {
        rows: 60,
        columns: 100,
        side: 10,
        playing: false
    };

    function getCursorPosition(event) {
        const canvas = document.querySelector("canvas");
        const x = event.offsetX * canvas.width / canvas.clientWidth;
        const y = event.offsetY * canvas.height / canvas.clientHeight;
        return { x, y };
    }

    const appModel = model(gameOptions);
    const appView = view(gameOptions);

    appView.bindStartDrawingEvent(draw);
    appView.bindStopDrawingEvent(draw);

    appView.bindStartBtnEvent(() => {
        gameOptions.playing = !gameOptions.playing
        document.dispatchEvent(new Event("changePlayingStatus"));
    });

    appView.bindRandomBtnEvent(() => {
        if (!gameOptions.playing) {
            const randomBoard = appModel.randomizeBoard();
            renderBoard(randomBoard);
        }
    });

    appView.bindClearBtnEvent(() => {
        if (!gameOptions.playing) {
            const clearBoard = appModel.createGameBoard(gameOptions);
            renderBoard(clearBoard);
        }
    });

    function renderBoard(gameboard) {
        appModel.updateGameboard(gameboard);
        appView.drawGameboard(appModel.gameboard);
    }

    function draw(event) {
        const { x, y } = getCursorPosition(event);
        if (!gameOptions.playing) {
            appModel.changeCellState(x, y);
            appView.drawGameboard(appModel.gameboard);
        }
    }
}

window.addEventListener("load", init)