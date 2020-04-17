import BaseModel from './BaseModel';
import cards from '../cards';

export default class MainPageModel extends BaseModel {
  constructor() {
    super('Main');
    this.categories = cards[0].map((name, index) => ({ name, image: cards[index + 1][0].image, hash: `category/${name}` }));
  }
}
