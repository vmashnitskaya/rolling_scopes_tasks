import M from 'materialize-css';
import App from '../templates/App';

export default class ForecastView {
    constructor() {
        this.body = document.querySelector('body');
    }

    initLayout(data) {
        const dateTime = ForecastView.getdateTime();
        this.body.innerHTML = App(data, dateTime);
        const dropdownHeader = document.querySelector('.dropdown-trigger');
        this.dropdown = M.Dropdown.init(dropdownHeader, {
            coverTrigger: false,
            alignment: 'bottom',
            constrainWidth: true,
            closeOnClick: true,
        });
        this.location = this.body.querySelector('.location');
        this.date = this.body.querySelector('.time__date');
        this.latitude = this.body.querySelector('.latitude + span');
        this.longitude = this.body.querySelector('.longitude + span');

        setInterval(this.updateTimer, 1000);
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
            dayTomorrow: `${fullDays[date.getDay() % date.getDay()]}`,
            dayAfterTomorrow: `${fullDays[(date.getDay() % date.getDay()) + 1]}`,
            dayAfterAfterTomorrow: `${fullDays[(date.getDay() % date.getDay()) + 2]}`,
        };
        return dateTime;
    }

    updateTimer() {
        const {time} = ForecastView.getdateTime();
        this.timer = document.querySelector('.time__timer');
        this.timer.innerHTML = time;
    }
}
