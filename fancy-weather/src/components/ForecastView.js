import M from 'materialize-css';
import App from '../templates/App';

export default class ForecastView {
    constructor() {
        this.body = document.querySelector('body');
        this.initLayout();
    }

    initLayout() {
        this.body.innerHTML = App();
        const dropdownHeader = document.querySelector('.dropdown-trigger');
        const dropdown = M.Dropdown.init(dropdownHeader, {
            coverTrigger: false,
            alignment: 'bottom',
            constrainWidth: true,
            closeOnClick: true,
            onOpenStart: this.changeArrow(),
            onCloseStart: this.changeArrow(),
        });

        // dropdownHeader.addEventListener('click', () => this.changeArrow(), true);
    }

    changeArrow() {
        this.arrow = this.body.querySelector('span.arrow-down');
        if (this.arrow.classList.contains('opened')) {
            this.arrow.classList.remove('opened');
        } else {
            this.arrow.classList.add('opened');
        }
    }
}
