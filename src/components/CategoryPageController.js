import BaseController from './BaseController';

export default class CategoryPageController extends BaseController {
  constructor(model, view) {
    super(model, view);

    this.model.bindSelectedCardChange(this.onSelectedCardChange);
    this.model.bindAnimatedCardChange(this.onAnimatedCardChange);

    this.view.bindAnimatedCardChange(this.handleAnimatedCardChange);

    this.view.setTrainingCards(this.model.cards);
  }

  onSelectedCardChange = () => {
    this.view.setSelectedCard();
  }

  onAnimatedCardChange = () => {
    this.view.setAnimatedCard(this.model.animatedCard);
  }

  handleAnimatedCardChange = (word) => {
    this.model.animatedCard = this.model.cards.find((element) => element.word === word);
  }
}
