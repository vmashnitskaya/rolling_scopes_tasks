import BaseController from './BaseController';

export default class MainPageController extends BaseController {
  constructor(model, view) {
    super(model, view);

    // this.view.setSwitch(this.model.isTrain, this.model.categories);
    this.view.setCategories(this.model.categories, this.model.isTrain);
  }
}
