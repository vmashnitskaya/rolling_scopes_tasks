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

    initMainLayout(time, date, data) {
        this.location = this.body.querySelector('.location');
        this.date = this.body.querySelector('.time__date');
        this.latitude = this.body.querySelector('.latitude + span');
        this.longitude = this.body.querySelector('.longitude + span');
        this.main = this.body.querySelector('main');

        const dateForDisplaying = ForecastView.getdateTime(date);
        this.timer = time;

        this.setLocationData(data, dateForDisplaying, this.timer);
    }

    setLocationData(data, dateForDisplaying, timeForDisplaying) {
        this.main.innerHTML = Main(data, dateForDisplaying, timeForDisplaying);

        // setInterval(this.updateTimer, 1000);

        this.setMap(data);
    }

    setBackground(image) {
        const app = this.body.querySelector('.app');
        app.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgb(0, 0, 0)), url(${image}), center center`;
        app.style.backgroundRepeat = 'no-repeat';
        app.style.backgroundSize = '100% 100%';
        this.body.querySelector('.image-change-icon').classList.remove('active');
    }

    setMap({latitude, longitude}) {
        ymaps
            .load()
            .then((maps) => {
                this.map = new maps.Map(document.querySelector('#map-wrapper'), {
                    center: [latitude, longitude],
                    zoom: 10,
                });
            })
            .catch((e) => {
                throw new Error(`Yandex Map error${e.message}`);
            });
    }

    static getdateTime(date) {
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

        const todayDate = date.slice(0, 1)[0].split(',');
        const todayMonthYear = todayDate
            .slice(1, 2)[0]
            .split(' ')
            .filter((el) => el !== '');

        const dateTime = {
            date: `${todayDate[0].slice(0, 3)} ${todayMonthYear[0]} ${todayMonthYear[1]}`,
            dayTomorrow: date[1],
            dayAfterTomorrow: date[2],
            dayAfterAfterTomorrow: date[3],
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

    handleBackgroundChange(handler) {
        const changeImage = this.body.querySelector('.image-change');
        changeImage.addEventListener('click', () => {
            this.body.querySelector('.image-change-icon').classList.add('active');
            handler();
        });
    }
}
