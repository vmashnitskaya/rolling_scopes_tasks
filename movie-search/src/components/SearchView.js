import M from 'materialize-css';
import Page from '../templates/Page';

export default class SearchView {
    constructor() {
        this.body = document.querySelector('body');
        this.initPage();
        M.updateTextFields();
    }

    initPage = () => {
        this.body.innerHTML = Page();
    };
}
