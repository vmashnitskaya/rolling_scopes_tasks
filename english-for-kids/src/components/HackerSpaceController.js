import BaseController from './BaseController';

export default class HackerSpaceController extends BaseController {
  constructor(model, view) {
    super(model, view);


    this.view.setTrain(this.model.isTrain);
    this.view.setTable(this.model.categories, this.model.cards);
  }
}
