import api from '../api';
import createSpeechRecognition from '../createSpeechRecognition';
import createSpeechSynthesis from '../createSpeechSynthesis';
import dateTimeFormatter from '../dateTimeFormatter';
import getUTCDate from '../getUTCDate';

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
        const hour = Number(timeCopy.split(' ')[0].split(':')[0]);

        if (hour >= 5 && hour <= 11) {
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

        if (this.model.locationWeatherData.latitudeNegative) {
            switch (this.model.month) {
                case 5:
                case 6:
                case 7:
                    criteria += ',winter';
                    break;
                case 8:
                case 9:
                case 10:
                    criteria += ',spring';
                    break;
                case 11:
                case 0:
                case 1:
                    criteria += ',summer';
                    break;
                case 2:
                case 3:
                case 4:
                    criteria += ',autumn';
                    break;
                default:
                    criteria += ',seasons';
            }
        } else {
            switch (this.model.month) {
                case 11:
                case 0:
                case 1:
                    criteria += ',winter';
                    break;
                case 2:
                case 3:
                case 4:
                    criteria += ',spring';
                    break;
                case 5:
                case 6:
                case 7:
                    criteria += ',summer';
                    break;
                case 8:
                case 9:
                case 10:
                    criteria += ',autumn';
                    break;
                default:
                    criteria += ',seasons';
            }
        }

        return criteria;
    }

    onBackgroundChange = async () => {
        try {
            const searchCriteria = this.onBackgroundCriteriaChange();
            this.model.backgroundImage = await api.getBackground(searchCriteria);
            this.view.setBackground(this.model.backgroundImage);
            if (this.model.locationWeatherData.latitudeNegative) {
                console.info(
                    `Search string(Southern Hemisphere) for background: ${searchCriteria}`
                );
            } else {
                console.info(`Search string(North hemisphere) for background: ${searchCriteria}`);
            }
        } catch (e) {
            this.model.error = e.message;
            this.view.setBackground('../../img/default_bg.jpg');
        }
    };

    countTime = () => {
        const currentTime = getUTCDate(this.model.locationWeatherData.offset);
        const timeForDisplaying = dateTimeFormatter.timeFormatter(currentTime);

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
        const currentDate = getUTCDate(this.model.locationWeatherData.offset);
        this.model.month = currentDate.getMonth();
        const today = dateTimeFormatter.dateFormatterToday(currentDate);

        const tomorrow = dateTimeFormatter.dateFormatterNexDays(currentDate, 1);
        const afterTomorrow = dateTimeFormatter.dateFormatterNexDays(currentDate, 2);
        const afterAfterTomorrow = dateTimeFormatter.dateFormatterNexDays(currentDate, 3);
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
        const dateTime = {
            weekDay: `${date[0][0]}`,
            month: `${date[0][2]}`,
            monthDay: `${date[0][1]}`,
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
