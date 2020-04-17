import BaseController from './BaseController';

export default class MainPageController extends BaseController {
  constructor(model, view) {
    super(model, view);

    this.view.setCategories(this.model.categories, this.model.isTrain);
  }
}
