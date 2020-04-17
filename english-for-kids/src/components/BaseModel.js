import cards from '../cards';

export default class BaseModel {
  constructor(currentMenuItem) {
    this.menuItems = [{ name: 'Main', hash: 'main' }, ...cards[0].map((name) => ({ name, hash: `category/${name}` }))];
    this.currentMenuItem = currentMenuItem;
    this._isTrain = localStorage.getItem('isTrain') ? JSON.parse(localStorage.getItem('isTrain')) : true;
    this._isMenuOpen = false;
  }

  get isTrain() {
    return this._isTrain;
  }

  set isTrain(isTrain) {
    this._isTrain = isTrain;
    localStorage.setItem('isTrain', isTrain);
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
