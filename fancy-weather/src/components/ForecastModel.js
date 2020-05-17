export default class ForecastModel {
    constructor() {
        this._locationWeatherData = {};
        this._isLoading = false;
    }

    get locationWeatherData() {
        return this._locationWeatherData;
    }

    set locationWeatherData(locationWeatherData) {
        this._locationWeatherData = locationWeatherData;
    }

    get isLoading() {
        return this._isLoading;
    }

    set isLoading(isLoading) {
        this._isLoading = isLoading;
    }
}
