import BaseModel from './BaseModel';
import cards from '../cards';
import AnaliticsCounter from './AnaliticsCounter';

export default class HackerSpaceModel extends BaseModel {
  constructor() {
    super('Hacker Space');
    this.categories = cards[0].map((name) => ({ name }));
    this.categoriesStatistics = cards[0].map((name) => new AnaliticsCounter(name));
    this.cards = cards.slice(1).map((categoryCards, categoryIndex) => {
      const statistic = this.categoriesStatistics[categoryIndex];
      return categoryCards.map((card) => {
        const cardStatistics = statistic.getWordData(card.word);
        const percent = (cardStatistics.gameErrorClicks
        / (cardStatistics.gameErrorClicks + cardStatistics.gameSuccessClicks)) * 100;
        return {
          word: card.word,
          translation: card.translation,
          trainClicks: cardStatistics.trainClicks,
          gameSuccessClicks: cardStatistics.gameSuccessClicks,
          gameErrorClicks: cardStatistics.gameErrorClicks,
          percent: (percent || 0).toFixed(2),
        };
      });
    });
  }
}
