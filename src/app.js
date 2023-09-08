import view from "./view.js";
import model from "./model.js";

function init() {

    const gameboardOptions = {
        rows: 60,
        columns: 100,
    };

    const appModel = model(gameboardOptions);
    const appView = view(gameboardOptions, appModel.gameboard);

}

window.addEventListener("load", init)