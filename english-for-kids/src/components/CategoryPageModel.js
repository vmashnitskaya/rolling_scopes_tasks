import BaseModel from './BaseModel';
import cards from '../cards';

export default class CategoryPageModel extends BaseModel {
  constructor(currentMenuItem) {
    super(currentMenuItem);
    this.cards = cards[cards[0].indexOf(currentMenuItem) + 1];
    this._cardsForGame = this.cards.slice(0);
    this._cardsForGameRemaining = this._cardsForGame.slice(0);
    this._playedCard = null;
    this._animatedCard = null;
    this._selectedCard = null;
    this.gameErrors = 0;
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

  get cardsForGame() {
    return this._cardsForGame;
  }

  set cardsForGame(cardsForGame) {
    this._cardsForGame = cardsForGame;
    this.onCardsForGameChange();
  }

  bindCardsGorGameChange(callback) {
    this.onCardsForGameChange = callback;
  }

  get cardsForGameRemaining() {
    return this._cardsForGameRemaining;
  }

  set cardsForGameRemaining(cardsForGameRemaining) {
    this._cardsForGameRemaining = cardsForGameRemaining;
  }

  get playedCard() {
    return this._playedCard;
  }

  set playedCard(playedCard) {
    this._playedCard = playedCard;
  }
}
