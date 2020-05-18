import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
import api from '../api';

export default class ForecastController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.handleSearch(this.onSearch);
        this.view.handleBackgroundChange(this.onBackgroundChange);

        this.onInitMainLayout();
    }

    onInitMainLayout = async () => {
        //    this.model.isLoading = true;
        //     this.view.addWaitingLayer();
        // this.view.setLoading(this.model.isLoading);
        try {
            this.model.locationWeatherData = await api.getLocationWeather();
        } catch (e) {
            this.model.error = e.message;
        }
        this.model.date = this.countDate();
        this.model.time = this.countTime();
        this.view.initMainLayout(this.model.time, this.model.date, this.model.locationWeatherData);
        this.onBackgroundChange();

        //     this.model.isLoading = false;
        //    this.view.setLoading();
    };

    onSearch = async (searchValue) => {
        try {
            this.view.setErrorDisplaying(false);
            this.model.locationWeatherData = await api.getCoordinatesWeather(searchValue);
        } catch (e) {
            this.model.error = e.message;
            this.view.setErrorDisplaying(true);
        }

        this.view.initMainLayout(this.model.time, this.model.locationWeatherData);
        this.onBackgroundChange();
    };

    onBackgroundChange = async () => {
        try {
            this.model.backgroundImage = await api.getBackground();
            this.view.setBackground(this.model.backgroundImage);
        } catch (e) {
            this.model.error = e.message;
        }
    };

    countTime() {
        const currentTime = moment().format();
        return moment(currentTime).tz(this.model.timezone).locale('en').format('LTS');
    }

    countDate() {
        const cityOrCountry =
            this.model.locationWeatherData.city || this.model.locationWeatherData.country;
        this.model.timezone = cityTimezones.lookupViaCity(cityOrCountry)[0].timezone;
        const currentTime = moment().format();
        const today = moment(currentTime)
            .tz(this.model.timezone)
            .locale('en')
            .format('dddd, MMMM DD YYYY, h:mm:ss a');
        const tomorrow = moment().tz(this.model.timezone).locale('en').add(1, 'd').format('dddd');
        const afterTomorrow = moment()
            .tz(this.model.timezone)
            .locale('en')
            .add(2, 'd')
            .format('dddd');
        const afterAfterTomorrow = moment()
            .tz(this.model.timezone)
            .locale('en')
            .add(3, 'd')
            .format('dddd');
        return [today, tomorrow, afterTomorrow, afterAfterTomorrow];
    }
}
