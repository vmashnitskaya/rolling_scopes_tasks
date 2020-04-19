import BaseController from './BaseController';
import AnaliticsCounter from './AnaliticsCounter';

export default class CategoryPageController extends BaseController {
  constructor(model, view) {
    super(model, view);
    this.analiticsCounter = new AnaliticsCounter(this.model.currentMenuItem);

    this.model.bindSelectedCardChange(this.onSelectedCardChange);
    this.model.bindAnimatedCardChange(this.onAnimatedCardChange);
    this.model.bindCardsGorGameChange(this.onCardsForGameChange);

    this.view.bindChangeTrain(this.onTrainChange);
    this.view.bindAnimatedCardChange(this.handleAnimatedCardChange);
    this.view.bindSelectedCardChange(this.handleSelectedCardPlay);
    this.view.bindNewGameStarted(this.handleNewGameStarted);
    this.view.bindPlayAudioStarted(this.handlePlayAudioStarted);
    this.view.bindRepeatButtonClicked(this.handleRepeatButtonClicked);
    this.view.bindWordSelected(this.handleWordSelected);
    this.view.bindCorrectAnswerRecieved(this.handleCorrectAnswerRecieved);
    this.view.bindNewGameAfterVictory(this.handleNewGameAfterVictory);
    this.view.bindInCorrectAnswerRecieved(this.handleInCorrectAnswerRecieved);
    this.view.bindNewGameAfterFailure(this.handleNewGameAfterFailure);

    this.onTrainChange();
  }

  onTrainChange = () => {
    this.view.setTrain(this.model.isTrain);
    if (this.model.isTrain) {
      this.view.setTrainingCards(this.model.cards);
    } else {
      this.view.setGameLayout(this.model.cards);
    }
  }

  onSelectedCardChange = () => {
    this.analiticsCounter.incrementTrainClick(this.model.selectedCard.word);
    this.view.setSelectedCardChange(this.model.selectedCard);
  }

  handleSelectedCardPlay = (word) => {
    this.model.selectedCard = this.model.cards.find((element) => element.word === word);
  }

  onAnimatedCardChange = () => {
    if (this.model.animatedCard) {
      this.analiticsCounter.incrementTrainClick(this.model.animatedCard.word);
    }
    this.view.setAnimatedCard(this.model.animatedCard);
  }

  handleAnimatedCardChange = (word) => {
    this.model.animatedCard = this.model.cards.find((element) => element.word === word);
  }

  handleNewGameStarted = () => {
    this.model.cardsForGameRemaining = this.model.cardsForGame.slice(0);
    this.model.gameErrors = 0;
    this.model.cardsForGame = this.model.cardsForGame.sort(() => Math.random() - 0.5);
  }

  onCardsForGameChange = () => {
    this.view.setNewGameStart(this.model.cardsForGame);
  }

  handlePlayAudioStarted = (word) => {
    this.model.playedCard = this.model.cardsForGame
      .find((element) => element.word === word);
  }

  handleRepeatButtonClicked = () => {
    this.view.playWord(this.model.playedCard.word);
  }

  handleWordSelected = (word) => {
    if (word === this.model.playedCard.word) {
      this.model.cardsForGameRemaining = this.model.cardsForGameRemaining
        .filter((element) => element.word !== this.model.playedCard.word);

      this.view.handleCorrectAnswer(word);
    } else {
      this.view.handleIncorrectAnswer();
    }
  }

  handleCorrectAnswerRecieved = () => {
    this.analiticsCounter.incrementGameClick(this.model.playedCard.word);
    if (this.model.cardsForGameRemaining.length !== 0) {
      this.view.playNext(this.model.cardsForGameRemaining);
    } else if (this.model.cardsForGameRemaining.length === 0 && this.model.gameErrors === 0) {
      this.view.victoryGameOver();
    } else {
      this.view.failureGameOver(this.model.gameErrors);
    }
  }

  handleInCorrectAnswerRecieved = () => {
    this.analiticsCounter.incrementErrorCount(this.model.playedCard.word);
    this.model.gameErrors += 1;
  }

  handleNewGameAfterVictory = () => {
    window.location.href = '/';
  }

  handleNewGameAfterFailure = () => {
    window.location.href = '/';
  }
}
