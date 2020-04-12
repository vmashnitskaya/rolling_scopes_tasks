import MainPageModel from './components/MainPageModel';
import MainPageView from './components/MainPageView';
import MainPageController from './components/MainPageController';

export default class App {
  init() {
    this.model = new MainPageModel(true);
    this.view = new MainPageView();
    this.controller = new MainPageController(this.model, this.view);
  }
}
