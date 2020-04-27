import Header from '../templates/Header';

export default class SearchView {
    constructor() {
        this.body = document.querySelector('body');
        this.initHeader();
    }

    initHeader = () => {
        this.body.innerHTML = Header();
    };
}
