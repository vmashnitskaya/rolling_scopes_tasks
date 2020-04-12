import cards from '../cards';

export default class BaseModel {
  constructor(currentMenuItem, isTrain) {
    this.menuItems = [{ name: 'Main', category: null }, ...cards[0].map((name) => ({ name, category: name }))];
    this.currentMenuItem = currentMenuItem;
    this._isTrain = isTrain;
    this._isMenuOpen = false;
  }

  get isTrain() {
    return this._isTrain;
  }

  set isTrain(isTrain) {
    this._isTrain = isTrain;
    this.onTrainChange();
  }

  bindTrainChange(callback) {
    this.onTrainChange = callback;
  }

  get isMenuOpen() {
    return this._isMenuOpen;
  }

  set isMenuOpen(isMenuOpen) {
    this._isMenuOpen = isMenuOpen;
    this.onMenuOpenChange();
  }

  bindMenuOpenChange(callback) {
    this.onMenuOpenChange = callback;
  }
}
