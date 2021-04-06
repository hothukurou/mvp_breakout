import { BreakoutPresenter } from "./presenter/breakout_presenter.js";
import { DataStore } from "./presenter/data_store.js";
import { BreakoutViewer } from "./view/breakout_viewer.js";

export class Container {
    constructor() {

        /** View層 */
        const breakoutViewer = new BreakoutViewer();

        /** presenter層 */
        const dataStore = new DataStore();
        const breakoutOperator = new BreakoutPresenter(dataStore, breakoutViewer);

    }
}