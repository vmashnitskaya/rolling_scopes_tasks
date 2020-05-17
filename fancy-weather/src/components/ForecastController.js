import api from '../api';

export default class ForecastController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.handleSearch(this.onSearch);

        this.onInitMainLayout();
    }

    onInitMainLayout = async () => {
        //    this.model.isLoading = true;
        //     this.view.addWaitingLayer();
        // this.view.setLoading(this.model.isLoading);
        try {
            // this.model.backgroundImage = await api.getBackground();
            this.model.locationWeatherData = await api.getLocationWeather();
            this.view.initMainLayout(this.model.locationWeatherData);
            this.view.setBackground('./img/bg.png');
        } catch (e) {
            this.model.error = e.message;
        }

        //     this.model.isLoading = false;
        //    this.view.setLoading();
    };

    onSearch = async (searchValue) => {
        try {
            // this.model.backgroundImage = await api.getBackground();
            this.view.setErrorDisplaying(false);
            this.model.locationWeatherData = await api.getCoordinatesWeather(searchValue);
            this.view.initMainLayout(this.model.locationWeatherData);
            this.view.setBackground('./img/bg.png');
        } catch (e) {
            this.model.error = e.message;
            this.view.setErrorDisplaying(true);
        }
    };
}
