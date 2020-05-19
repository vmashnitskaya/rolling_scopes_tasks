import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
import api from '../api';

export default class ForecastController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.handleSearch(this.onSearch);
        this.view.handleBackgroundChange(this.onBackgroundChange);
        this.view.handleUnitChange(this.onUnitChange);

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
        const searchCriteria = this.onBackgroundCriteriaChange();
        this.view.initMainLayout(
            this.model.time,
            this.model.date,
            this.model.locationWeatherData,
            this.model.unit
        );
        this.onBackgroundChange(searchCriteria);
        // eslint-disable-next-line no-console
        console.info(`Search string for background: ${searchCriteria}`);

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
        this.model.date = this.countDate();
        this.model.time = this.countTime();
        const searchCriteria = this.onBackgroundCriteriaChange();
        this.view.initMainLayout(
            this.model.time,
            this.model.date,
            this.model.locationWeatherData,
            this.model.unit
        );
        this.onBackgroundChange(searchCriteria);
        // eslint-disable-next-line no-console
        console.info(`Search string for background: ${searchCriteria}`);
    };

    onBackgroundCriteriaChange() {
        let criteria = '';
        const timeCopy = this.model.time.slice(0);
        const timeOfDay = timeCopy.split(' ')[1];
        const hour = Number(timeCopy.split(' ')[0].split(':')[0]);
        if (hour >= 5 && hour <= 11 && timeOfDay === 'AM') {
            criteria += 'morning';
        } else if (hour >= 12 && hour <= 4 && timeOfDay === 'PM') {
            criteria += 'afternoon';
        } else if (hour >= 5 && hour <= 11 && timeOfDay === 'PM') {
            criteria += 'evening';
        } else if (
            (hour >= 1 && hour <= 4 && timeOfDay === 'AM') ||
            (hour === 12 && timeOfDay === 'AM')
        ) {
            criteria += 'night';
        } else {
            criteria += 'day';
        }

        switch (this.model.month) {
            case '12':
            case '1':
            case '2':
                criteria += ',winter';
                break;
            case '3':
            case '4':
            case '5':
                criteria += ',spring';
                break;
            case '6':
            case '7':
            case '8':
                criteria += ',summer';
                break;
            case '9':
            case '10':
            case '11':
                criteria += ',autumn';
                break;
            default:
                criteria += ',seasons';
        }

        return criteria;
    }

    onBackgroundChange = async () => {
        try {
            this.model.backgroundImage = await api.getBackground('spring');
            this.view.setBackground(this.model.backgroundImage);
        } catch (e) {
            this.model.error = e.message;
            this.view.setBackground('./img/default_bg.jpg');
        }
    };

    countTime() {
        const currentTime = moment().format();
        const timeForDisplaying = moment(currentTime)
            .tz(this.model.timezone)
            .locale('en')
            .format('LTS');

        setInterval(this.onUpdateTimer, 1000);

        return timeForDisplaying;
    }

    onUpdateTimer = () => {
        this.model.time = this.countTime();
        this.view.updateTimer(this.model.time);
    };

    countDate() {
        const cityOrCountry = this.model.locationWeatherData.country;
        this.model.timezone = cityTimezones.findFromCityStateProvince(cityOrCountry)[0].timezone;
        const currentTime = moment().tz(this.model.timezone).locale('en');
        this.model.month = moment(currentTime).format('M');
        const today = moment(currentTime).format('dddd, MMMM DD YYYY, h:mm:ss a');
        const tomorrow = moment(currentTime).add(1, 'd').format('dddd');
        const afterTomorrow = moment(currentTime).add(2, 'd').format('dddd');
        const afterAfterTomorrow = moment(currentTime).add(3, 'd').format('dddd');
        return [today, tomorrow, afterTomorrow, afterAfterTomorrow];
    }

    onUnitChange = (unit) => {
        if (this.model.unit !== unit) {
            this.model.unit = unit;
            localStorage.setItem('unit', unit);
            this.view.updateTemperatureUnits(this.model.locationWeatherData, this.model.unit);
        }
    };
}
