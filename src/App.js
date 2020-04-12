import CategoryPageModel from './components/CategoryPageModel';
import CategoryPageView from './components/CategoryPageView';
import CategoryPageController from './components/CategoryPageController';


export default class App {
  init() {
    this.model = new CategoryPageModel('Action (set A)', true);
    this.view = new CategoryPageView();
    this.controller = new CategoryPageController(this.model, this.view);
  }
}
