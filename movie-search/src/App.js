import SearchView from './components/SearchView';
import SearchModel from './components/SearchModel';
import SearchController from './components/SearchController';

export default class App {
    init() {
        const view = new SearchView();
        const model = new SearchModel('Batman');
        this.controller = new SearchController(view, model);
    }
}
