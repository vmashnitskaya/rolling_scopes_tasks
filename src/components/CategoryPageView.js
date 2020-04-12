import BaseView from './BaseView';
import MainWrapper from '../templates/MainWrapper';
import TrainCard from '../templates/TrainCard';

export default class CategoryPageView extends BaseView {
  constructor() {
    super();
    this.main.innerHTML = MainWrapper();
    this.wrapper = this.main.querySelector('.main-wrapper');
  }

  setAnimatedCard(animatedCard) {
    if (animatedCard) {
      const card = this.wrapper.querySelector(`.card__container-item[data-word=${animatedCard.word}]`);

      card.classList.add('animated');

      const back = card.querySelector('.card__container-back');
      back.classList.remove('hidden');

      const front = card.querySelector('.card__container-front');
      front.classList.add('hidden');
    } else {
      const card = this.wrapper.querySelector('.card__container-item.animated');

      card.classList.remove('animated');

      const back = card.querySelector('.card__container-back');
      back.classList.add('hidden');

      const front = card.querySelector('.card__container-front');
      front.classList.remove('hidden');
    }
  }

  bindAnimatedCardChange(handler) {
    this.wrapper.addEventListener('click', (event) => {
      if (event.target.classList.contains('rotate-icon')) {
        const { word } = event.target.dataset;
        handler(word);
        const onMouseLeave = (e) => {
          handler(null);
          e.target.removeEventListener('mouseleave', onMouseLeave);
        };
        this.wrapper.querySelector(`.card__container-item[data-word=${word}]`).addEventListener('mouseleave', onMouseLeave);
      }
    });
  }

  setTrainingCards(cards) {
    this.wrapper.innerHTML = cards.map(TrainCard).join('');
  }
}
