import M from 'materialize-css';
import ymaps from 'ymaps';
import App from '../templates/App';
import WaitingLayer from '../templates/WaitingLayer';
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
    }

    initMainLayout(time, date, data, unit, lang) {
        this.location = this.body.querySelector('.location');
        this.date = this.body.querySelector('.time__date');
        this.latitude = this.body.querySelector('.latitude + span');
        this.longitude = this.body.querySelector('.longitude + span');
        this.main = this.body.querySelector('main');

        const dateForDisplaying = ForecastView.getdateTime(date);
        this.timer = time;

        this.main.innerHTML = Main(data, dateForDisplaying, this.timer, unit, lang);
    }

    setBackground(image) {
        const app = this.body.querySelector('.app');
        app.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgb(0, 0, 0)), url(${image}), center center`;
        app.style.backgroundRepeat = 'no-repeat';
        app.style.backgroundSize = '100% 100%';
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

    addWaitingLayer() {
        this.waitingLayer = document.createElement('div');
        this.waitingLayer.classList.add('waiting-layer', 'hidden');
        this.waitingLayer.innerHTML = WaitingLayer();
        this.body.append(this.waitingLayer);
    }

    // setLoading(isLoading) {
    //     if (isLoading) {
    //         this.waitingLayer.classList.remove('hidden');
    //     } else {
    //         this.waitingLayer.classList.add('hidden');
    //     }
    // }

    handleSearch = (handler) => {
        const searchForm = document.querySelector('form.search-form');
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchValue = new FormData(searchForm).get('search-input');
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

    updateTemperatureUnits = (locationWeatherData, unit) => {
        const dayTemp = this.body.querySelector('.day__temperature');
        const tomorrow = this.body.querySelector('.tomorrow');
        const afterTomorrow = this.body.querySelector('.after-tomorrow');
        const afterAfterTomorrow = this.body.querySelector('.after-after-tomorrow');

        dayTemp.innerHTML =
            unit === 'C'
                ? `${locationWeatherData.weatherInfo.todayTemperature.tempC}`
                : `${locationWeatherData.weatherInfo.todayTemperature.tempF}`;
        tomorrow.innerHTML =
            unit === 'C'
                ? `${locationWeatherData.weatherInfo.tomorrowTemperatureC}°`
                : `${locationWeatherData.weatherInfo.tomorrowTemperatureF}°`;
        afterTomorrow.innerHTML =
            unit === 'C'
                ? `${locationWeatherData.weatherInfo.afterTomorrowTemperatureC}°`
                : `${locationWeatherData.weatherInfo.afterTomorrowTemperatureF}°`;
        afterAfterTomorrow.innerHTML =
            unit === 'C'
                ? `${locationWeatherData.weatherInfo.afterAfterTomorrowTemperatureC}°`
                : `${locationWeatherData.weatherInfo.afterAfterTomorrowTemperatureF}°`;
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
    };
}
