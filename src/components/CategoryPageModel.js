import BaseModel from './BaseModel';
import cards from '../cards';

export default class CategoryPageModel extends BaseModel {
  constructor(currentMenuItem, isTrain) {
    super(currentMenuItem, isTrain);
    this.cards = cards[cards[0].indexOf(currentMenuItem) + 1];
    this._animatedCard = null;
    this._selectedCard = null;
  }

  get selectedCard() {
    return this._selectedCard;
  }

  set selectedCard(selectedCard) {
    this._selectedCard = selectedCard;
    this.onSelectedCardChange();
  }

  bindSelectedCardChange(callback) {
    this.onSelectedCardChange = callback;
  }

  get animatedCard() {
    return this._animatedCard;
  }

  set animatedCard(animatedCard) {
    this._animatedCard = animatedCard;
    this.onAnimatedCardChange();
  }

  bindAnimatedCardChange(callback) {
    this.onAnimatedCardChange = callback;
  }
}
