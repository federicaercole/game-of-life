import view from "./view.js";
import model from "./model.js";

function init() {

    const gameOptions = {
        rows: 60,
        columns: 100,
        side: 10,
        playing: false
    };

    const animationTimer = 100;

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
        document.dispatchEvent(new Event("changeStartBtnText"));
        return iterateGame();
    });

    appView.bindRandomBtnEvent(() => {
        if (!gameOptions.playing) {
            document.dispatchEvent(new Event("changeStartBtnText"));
            const randomBoard = appModel.randomizeBoard();
            renderBoard(randomBoard);
        }
    });

    appView.bindClearBtnEvent(() => {
        if (!gameOptions.playing) {
            document.dispatchEvent(new Event("changeStartBtnText"));
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

    function iterateGame() {
        appModel.game();
        appView.drawGameboard(appModel.gameboard);
        const animation = setTimeout(() => requestAnimationFrame(iterateGame), animationTimer);
        if (!gameOptions.playing) {
            clearTimeout(animation);
        }
    }
}

window.addEventListener("load", init)