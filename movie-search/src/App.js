import SearchView from './components/SearchView';
import SearchModel from './components/SearchModel';
import SearchController from './components/SearchController';

export default class App {
    // eslint-disable-next-line class-methods-use-this
    init() {
        const view = new SearchView();
        const model = new SearchModel('Batman');
        const controller = new SearchController(view, model);
    }
}
