import M from 'materialize-css';
import ymaps from 'ymaps';
import App from '../templates/App';
import WaitingLayer from '../templates/WaitingLayer';
import Main from '../templates/Main';

export default class ForecastView {
    constructor() {
        this.body = document.querySelector('body');

        this.initPreliminarLayout();
    }

    initPreliminarLayout() {
        this.body.innerHTML = App();

        const dropdownHeader = document.querySelector('.dropdown-trigger');
        this.dropdown = M.Dropdown.init(dropdownHeader, {
            coverTrigger: false,
            alignment: 'bottom',
            constrainWidth: true,
            closeOnClick: true,
        });
    }

    initMainLayout(data) {
        this.location = this.body.querySelector('.location');
        this.date = this.body.querySelector('.time__date');
        this.latitude = this.body.querySelector('.latitude + span');
        this.longitude = this.body.querySelector('.longitude + span');
        this.main = this.body.querySelector('main');

        const dateTime = ForecastView.getdateTime();

        this.setLocationData(data, dateTime);
    }

    setLocationData(data, dateTime) {
        this.main.innerHTML = Main(data, dateTime);

        setInterval(this.updateTimer, 1000);

        this.setMap(data);
    }

    setBackground(image) {
        const app = this.body.querySelector('.app');
        app.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgb(0, 0, 0)), url(${image}), center center`;
        app.style.backgroundRepeat = 'no-repeat';
        app.style.backgroundSize = '100% 100%';
    }

    setMap({latitude, longitude}) {
        ymaps
            .load()
            .then((maps) => {
                this.map = new maps.Map(document.querySelector('#map-wrapper'), {
                    center: [latitude, longitude],
                    zoom: 11,
                });
            })
            .catch((e) => {
                throw new Error(`Yandex Map error${e.message}`);
            });
    }

    static getdateTime() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const fullDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const date = new Date();

        const dateTime = {
            date: `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`,
            time: `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()} 
            : ${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} 
            : ${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`,
            dayTomorrow: fullDays[date.getDay() + 1],
            dayAfterTomorrow: fullDays[date.getDay() + 2],
            dayAfterAfterTomorrow: fullDays[date.getDay() + 3],
        };
        return dateTime;
    }

    updateTimer() {
        const {time} = ForecastView.getdateTime();
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
            const searchValue = new FormData(searchForm).get('search');
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
}
