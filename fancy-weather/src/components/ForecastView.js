import M from 'materialize-css';
import ymaps from 'ymaps';
import App from '../templates/App';
import Main from '../templates/Main';
import localization from '../localization';

export default class ForecastView {
    constructor() {
        this.body = document.querySelector('body');
    }

    initPreliminarLayout(unit, lang) {
        this.body.innerHTML = App(unit, lang);

        this.dropdownHeader = document.querySelector('.dropdown-trigger');
        this.dropdown = M.Dropdown.init(this.dropdownHeader, {
            coverTrigger: false,
            alignment: 'bottom',
            constrainWidth: true,
            closeOnClick: true,
        });
        this.main = this.body.querySelector('main');
    }

    initMainLayout(time, date, data, unit, lang) {
        this.location = this.body.querySelector('.location');
        this.date = this.body.querySelector('.time__date');
        this.latitude = this.body.querySelector('.latitude + span');
        this.longitude = this.body.querySelector('.longitude + span');

        const dateForDisplaying = ForecastView.getdateTime(date);
        this.timer = time;

        this.main.innerHTML = Main(data, dateForDisplaying, this.timer, unit, lang);
    }

    setBackground(image) {
        const app = this.body.querySelector('.app');
        app.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgb(0, 0, 0)), url(${image}), center center`;
        app.style.backgroundRepeat = 'no-repeat';
        app.style.backgroundSize = 'cover';
        this.body.querySelector('.image-change-icon').classList.remove('active');
    }

    setMap({latitude, longitude}, handler) {
        ymaps
            .load()
            .then((maps) => {
                this.map = new maps.Map(document.querySelector('#map-wrapper'), {
                    center: [latitude, longitude],
                    zoom: 10,
                    controls: [],
                });
            })
            .catch((e) => {
                handler(e);
            });
    }

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

    updateTimer(time) {
        this.timer = document.querySelector('.time__timer');
        this.timer.innerHTML = time;
    }

    handleSearch = (handler) => {
        this.searchForm = document.querySelector('form.search-form');
        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchValue = new FormData(this.searchForm).get('search-input');
            if (searchValue) {
                handler(searchValue.trim());
            }
        });
    };

    setErrorDisplaying(forDisplaying) {
        const error = this.body.querySelector('.error');
        if (forDisplaying) {
            error.classList.remove('hide');
        } else {
            error.classList.add('hide');
        }
    }

    handleBackgroundChange(handler) {
        const changeImage = this.body.querySelector('.image-change');
        changeImage.addEventListener('click', () => {
            this.body.querySelector('.image-change-icon').classList.add('active');
            handler();
        });
    }

    handleUnitChange(handler) {
        this.body.addEventListener('click', (event) => {
            if (event.target.classList.contains('unit-change')) {
                handler(event.target.dataset.unit);
            }
        });
    }

    static temperatureRecognizer(weatherInfo, key, unit, weatherKey) {
        return unit === 'C'
            ? `${weatherInfo[key][`${weatherKey}C`]}`
            : `${weatherInfo[key][`${weatherKey}F`]}`;
    }

    updateTemperatureUnits = ({weatherInfo}, unit) => {
        this.body.querySelector('.day__temperature').innerHTML = ForecastView.temperatureRecognizer(
            weatherInfo,
            'todayTemperature',
            unit,
            'temp'
        );
        this.body.querySelector('.feeling-temp').innerHTML = `${ForecastView.temperatureRecognizer(
            weatherInfo,
            'todayTemperature',
            unit,
            'feels'
        )}`;

        const tomorrowClasses = ['.tomorrow', '.ticker__one-day-temp'];
        tomorrowClasses.forEach((className) => {
            this.body.querySelector(className).innerHTML = `${ForecastView.temperatureRecognizer(
                weatherInfo,
                'tomorrowTemperature',
                unit,
                'temp'
            )}°`;
        });

        this.body.querySelector('.one-day.feels').innerHTML = `${ForecastView.temperatureRecognizer(
            weatherInfo,
            'tomorrowTemperature',
            unit,
            'feels'
        )}`;

        const afterTomorrowClasses = ['.after-tomorrow', '.ticker__two-day-temp'];
        afterTomorrowClasses.forEach((className) => {
            this.body.querySelector(className).innerHTML = `${ForecastView.temperatureRecognizer(
                weatherInfo,
                'afterTomorrowTemperature',
                unit,
                'temp'
            )}°`;
        });

        this.body.querySelector('.two-day.feels').innerHTML = `${ForecastView.temperatureRecognizer(
            weatherInfo,
            'afterTomorrowTemperature',
            unit,
            'feels'
        )}`;

        const afterAfterTomorrowClasses = ['.after-after-tomorrow', '.ticker__three-day-temp'];
        afterAfterTomorrowClasses.forEach((className) => {
            this.body.querySelector(className).innerHTML = `${ForecastView.temperatureRecognizer(
                weatherInfo,
                'afterAfterTomorrowTemperature',
                unit,
                'temp'
            )}°`;
        });

        this.body.querySelector(
            '.three-day.feels'
        ).innerHTML = `${ForecastView.temperatureRecognizer(
            weatherInfo,
            'afterAfterTomorrowTemperature',
            unit,
            'feels'
        )}`;
    };

    handleLocaleChange = (handler) => {
        this.body.addEventListener('click', (event) => {
            if (event.target.classList.contains('lang-locale')) {
                document.querySelector(
                    'span.language'
                ).innerHTML = event.target.dataset.lang.toUpperCase();
                this.dropdown.close();
                handler(event.target.dataset.lang);
            }
        });
    };

    changeHeaderLocalization = (lang) => {
        this.body.querySelector('#search').placeholder = localization[lang].placeholder;
        this.body.querySelector('.submit-button').innerHTML = localization[lang].search;
        this.body.querySelector('.error').innerHTML = localization[lang].error;
        document.querySelector('html').lang = lang;
    };

    handleSoundClick(handler) {
        this.voiceIcon = this.body.querySelector('i.voice');
        this.voiceIcon.addEventListener('click', () => {
            handler();
        });
    }

    setSpeechText(text) {
        this.searchInput = this.body.querySelector('#search');
        this.searchInput.value = text;
    }

    changeIconColor() {
        if (this.voiceIcon.classList.contains('active')) {
            this.voiceIcon.classList.remove('active');
        } else {
            this.voiceIcon.classList.add('active');
        }
    }

    setErrorPage = () => {
        this.errorPage = document.querySelector('.error-page');

        if (this.errorPage.classList.contains('hide')) {
            this.errorPage.classList.remove('hide');
        } else {
            this.errorPage.classList.add('hide');
        }
    };
}
