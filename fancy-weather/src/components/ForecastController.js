import api from '../api';

export default class ForecastController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.getLocation();
    }

    getLocation = async () => {
        this.model.locationWeatherData = await api.getLocation();
        this.view.initLayout(this.model.locationWeatherData);
    };
}
