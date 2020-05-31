import BaseView from './BaseView';
import MainWrapper from '../templates/MainWrapper';
import Category from '../templates/Category';

export default class MainPageView extends BaseView {
  constructor() {
    super();
    this.main.innerHTML = MainWrapper();
    this.wrapper = this.main.querySelector('.main-wrapper');
  }

  setCategories(categories, isTrain) {
    this.wrapper.innerHTML = categories.map((category) => Category({ ...category, isTrain })).join('');
  }

  setTrain(isTrain) {
    super.setTrain(isTrain);
    this.wrapper.querySelectorAll('.card__main').forEach((element) => {
      if (isTrain) {
        element.classList.add('train');
        element.classList.remove('game');
      } else {
        element.classList.add('game');
        element.classList.remove('train');
      }
    });
  }
}
