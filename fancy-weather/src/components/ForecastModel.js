export default class ForecastModel {
    constructor() {
        this._locationWeatherData = {};
        this._isLoading = false;
        this._unit = localStorage.getItem('unit') ? localStorage.getItem('unit') : 'C';
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

    get unit() {
        return this._unit;
    }

    set unit(unit) {
        this._unit = unit;
    }
}
