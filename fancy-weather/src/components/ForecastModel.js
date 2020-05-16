export default class ForecastModel {
    constructor() {
        this._locationWeatherData = {};
    }

    get locationWeatherData() {
        return this._locationWeatherData;
    }

    set locationWeatherData(locationWeatherData) {
        this._locationWeatherData = locationWeatherData;
    }
}
