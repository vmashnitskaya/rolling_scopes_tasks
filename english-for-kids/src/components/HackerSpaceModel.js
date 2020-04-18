import BaseModel from './BaseModel';
import cards from '../cards';

export default class HackerSpaceModel extends BaseModel {
  constructor() {
    super('Hacker Space');
    this.categories = cards[0].map((name) => ({ name }));
    this.cards = cards.slice(1);
  }
}
