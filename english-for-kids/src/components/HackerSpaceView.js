import BaseView from './BaseView';
import HackerSpaceWrapper from '../templates/HackerSpaceWrapper';
import HackerSpaceRow from '../templates/HackerSpaceRow';
import HackerSpaceHeaders from '../templates/HackerSpaceHeaders';
import HackerSpaceCategory from '../templates/HackerSpaceCategory';

export default class HackerSpaceView extends BaseView {
  constructor() {
    super();
    this.main.innerHTML = HackerSpaceWrapper();
    this.statisticsWrapper = this.main.querySelector('.statistics');
  }

  setTrain(isTrain) {
    if (isTrain) {
      this.menu.classList.remove('game');
      this.menu.classList.add('train');
    } else {
      this.menu.classList.add('game');
      this.menu.classList.remove('train');
    }
  }

  setTable(categories, cards) {
    this.statisticsWrapper.innerHTML += HackerSpaceHeaders();

    for (let i = 0; i < categories.length; i += 1) {
      this.statisticsWrapper.innerHTML += HackerSpaceCategory(categories[i].name);
      this.statisticsWrapper.innerHTML += cards[i].map(HackerSpaceRow).join('');
    }
  }
}
