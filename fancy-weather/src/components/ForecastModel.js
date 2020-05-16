export default class ForecastModel {
    constructor() {
        this._locationWeatherData = {};
        this._loading = false;
    }

    get locationWeatherData() {
        return this._locationWeatherData;
    }

    set locationWeatherData(locationWeatherData) {
        this._locationWeatherData = locationWeatherData;
    }

    get loading() {
        return this.loading;
    }

    set loading(loading) {
        this._loading = loading;
        this.onLoadingChange();
    }

    bindOnLoadingChange(callback) {
        this.onLoadingChange = callback;
    }
}
