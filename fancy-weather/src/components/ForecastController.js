import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
import api from '../api';
import createSpeechRecognition from '../createSpeechRecognition';
import createSpeechSynthesis from '../createSpeechSynthesis';

export default class ForecastController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.speechRecognition = createSpeechRecognition(this.model.lang);

        this.view.initPreliminarLayout(this.model.unit, this.model.lang);
        this.view.handleSearch(this.onSearch);
        this.onInitMainLayout();

        this.view.handleBackgroundChange(this.onBackgroundChange);
        this.view.handleUnitChange(this.onUnitChange);
        this.view.handleLocaleChange(this.onLocaleChange);
        this.view.handleSoundClick(this.onSound);
        this.view.handleForecastAloud(this.onForecastAloud);
    }

    onInitMainLayout = async () => {
        try {
            this.model.locationWeatherData = await api.getLocationWeather();
            this.speechSynthesis = await createSpeechSynthesis(this.model.lang);
            this.onLayoutChange();
            this.onBackgroundChange();
        } catch (e) {
            console.log(e);
            this.model.error = e.message;
            this.view.setErrorPage();
        }
    };

    onSearch = async (searchValue) => {
        try {
            this.view.setErrorDisplaying(false);
            this.model.locationWeatherData = await api.getCoordinatesWeather(searchValue);
            this.onLayoutChange();
            this.onBackgroundChange();
        } catch (e) {
            this.model.error = e.message;
            this.view.setErrorDisplaying(true);
        }
    };

    onBackgroundCriteriaChange() {
        let criteria = '';
        const timeCopy = this.model.time.slice(0);
        const timeOfDay = timeCopy.split(' ')[1];
        const hour = Number(timeCopy.split(' ')[0].split(':')[0]);

        if (this.model.lang === 'en') {
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
        } else if (hour >= 5 && hour <= 11) {
            criteria += 'morning';
        } else if (hour >= 12 && hour <= 16) {
            criteria += 'afternoon';
        } else if (hour >= 17 && hour <= 23) {
            criteria += 'evening';
        } else if ((hour >= 1 && hour <= 4) || hour === 0) {
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
            const searchCriteria = this.onBackgroundCriteriaChange();
            this.model.backgroundImage = await api.getBackground(searchCriteria);
            this.view.setBackground(this.model.backgroundImage);
            console.info(`Search string for background: ${searchCriteria}`);
        } catch (e) {
            this.model.error = e.message;
            console.log(e);
            this.view.setBackground('../../img/default_bg.jpg');
        }
    };

    countTime = () => {
        const currentTime = moment().format();
        const timeForDisplaying = moment(currentTime)
            .tz(this.model.timezone)
            .locale(this.model.lang)
            .format('LTS');

        setInterval(this.onUpdateTimer, 1000);

        return timeForDisplaying;
    };

    onUpdateTimer = () => {
        try {
            this.model.time = this.countTime();
            this.view.updateTimer(this.model.time);
        } catch (e) {
            this.model.error = e.message;
            clearInterval(this.onUpdateTimer);
        }
    };

    countDate = () => {
        const cityOrCountry = this.model.locationWeatherData.country;
        this.model.timezone = cityTimezones.findFromCityStateProvince(cityOrCountry)[0].timezone;
        const currentTime = moment().tz(this.model.timezone).locale(this.model.lang);
        this.model.month = moment(currentTime).format('M');
        const today = moment(currentTime).format(
            `${
                this.model.lang === 'en'
                    ? `${'ddd, DD MMMM YYYY, h:mm:ss a'}`
                    : `${'dd, DD MMMM YYYY, h:mm:ss a'}`
            }`
        );
        const tomorrow = moment(currentTime).add(1, 'd').format('dddd');
        const afterTomorrow = moment(currentTime).add(2, 'd').format('dddd');
        const afterAfterTomorrow = moment(currentTime).add(3, 'd').format('dddd');
        return [today, tomorrow, afterTomorrow, afterAfterTomorrow];
    };

    onUnitChange = (unit) => {
        if (this.model.unit !== unit) {
            this.model.unit = unit;
            localStorage.setItem('unit', unit);
            this.view.updateTemperatureUnits(this.model.locationWeatherData, this.model.unit);
        }
    };

    onLocaleChange = async (lang) => {
        if (this.model.lang !== lang) {
            this.model.lang = lang;
            localStorage.setItem('lang', lang);
            this.view.changeHeaderLocalization(this.model.lang);
            this.onLayoutChange();

            this.speechRecognition.stop();
            this.speechRecognition = createSpeechRecognition(this.model.lang);

            this.speechSynthesis.cancel();
            this.speechSynthesis = await createSpeechSynthesis(this.model.lang);
        }
    };

    onLayoutChange = () => {
        this.model.date = this.countDate();
        this.model.time = this.countTime();
        this.dateForDisplaying = ForecastController.getdateTime(this.model.date);
        this.view.initMainLayout(
            this.model.time,
            this.dateForDisplaying,
            this.model.locationWeatherData,
            this.model.unit,
            this.model.lang
        );
        this.view.setMap(this.model.locationWeatherData, this.onError);
    };

    static getdateTime(date) {
        const todayDate = date.slice(0, 1)[0].split(',');
        const todayMonthYear = todayDate
            .slice(1, 2)[0]
            .split(' ')
            .filter((el) => el !== '');

        const dateTime = {
            date: `${todayDate[0]} ${todayMonthYear[0]} ${todayMonthYear[1]}`,
            dayTomorrow: date[1],
            dayAfterTomorrow: date[2],
            dayAfterAfterTomorrow: date[3],
        };
        return dateTime;
    }

    onError = (e) => {
        this.model.error = e.message;
        this.view.setErrorPage();
    };

    onSound = () => {
        if (this.speechRecognition.isStarted()) {
            this.view.changeIconColor();
            this.speechRecognition.stop();
        } else {
            this.view.changeIconColor();
            this.speechRecognition.start(this.handleSpeechText);
        }
    };

    handleSpeechText = (text) => {
        if (text.toLowerCase() === 'погода' || text.toLowerCase() === 'forecast') {
            this.onForecastAloud();
        } else {
            this.view.setSpeechText(text);

            this.onSearch(text);
        }
        this.speechRecognition.stop();
        this.view.changeIconColor();
    };

    onForecastAloud = () => {
        this.speechSynthesis.cancel();
        this.speechSynthesis.speak(this.model.locationWeatherData, this.model.unit);
    };
}
