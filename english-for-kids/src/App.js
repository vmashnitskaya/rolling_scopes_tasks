import CategoryPageModel from './components/CategoryPageModel';
import CategoryPageView from './components/CategoryPageView';
import CategoryPageController from './components/CategoryPageController';
import MainPageModel from './components/MainPageModel';
import MainPageView from './components/MainPageView';
import MainPageController from './components/MainPageController';
import HackerSpaceController from './components/HackerSpaceController';
import HackerSpaceView from './components/HackerSpaceView';
import HackerSpaceModel from './components/HackerSpaceModel';


export default class App {
  init() {
    window.addEventListener('hashchange', this.navigate);
    this.navigate();
  }

  navigate = () => {
    const path = window.location.hash.slice(1).split('/');
    switch (path[0]) {
      case 'category':
        this.model = new CategoryPageModel(decodeURI(path[1]).replace(/\+/g, ' '));
        this.view = new CategoryPageView();
        this.controller = new CategoryPageController(this.model, this.view);
        break;
      case 'hacker':
        this.model = new HackerSpaceModel();
        this.view = new HackerSpaceView();
        this.controller = new HackerSpaceController(this.model, this.view);
        break;
      default:
        this.model = new MainPageModel();
        this.view = new MainPageView();
        this.controller = new MainPageController(this.model, this.view);
        break;
    }
  }
}
