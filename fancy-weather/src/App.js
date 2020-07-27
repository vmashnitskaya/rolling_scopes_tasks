import ForecastView from './components/ForecastView';
import ForecastModel from './components/ForecastModel';
import ForecastController from './components/ForecastController';

export default class App {
    init() {
        const view = new ForecastView();
        const model = new ForecastModel();
        this.controller = new ForecastController(view, model);
    }
}
