import api from '../api';

export default class ForecastController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.model.bindOnLoadingChange(this.onLoadingChange);

        this.getLocation();
    }

    getLocation = async () => {
        // this.model.loading = true;
        try {
            this.model.backgroundImage = await api.getBackground();
        } catch (e) {
            this.model.error = e.message;
        }
        try {
            this.model.locationWeatherData = await api.getLocation();
        } catch (e) {
            this.model.error = e.message;
        }
        this.view.initLayout(this.model.backgroundImage, this.model.locationWeatherData);
    };

    onLoadingChange() {
        this.view.setLoading(this.model.loading);
    }
}
