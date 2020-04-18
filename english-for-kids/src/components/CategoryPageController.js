import BaseController from './BaseController';

export default class CategoryPageController extends BaseController {
  constructor(model, view) {
    super(model, view);

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
    const numberOfClicks = this.model.cards.find((element) => element.word === this.model.selectedCard.word).trainClicks || 0;
    this.model.cards.find((element) => element.word === this.model.selectedCard.word).trainClicks = Number(numberOfClicks) + 1;

    const localStorageState = JSON.parse(localStorage.getItem('trainClicks'));

    const objectArray = [this.model.selectedCard.word, numberOfClicks + 1];
    console.log(numberOfClicks);

    localStorage.setItem('trainClicks', JSON.stringify(objectArray));
    /* {
       const existingArray = localStorageState.find((element) => {
        console.log(`element  ${element}`);
        console.log(`this.model.selectedCard.word ${this.model.selectedCard.word}`);
        element[0] === this.model.selectedCard.word;
      });
      console.log(`existingArray ${existingArray}`);
      if (existingArray) {
        localStorageState.splice(localStorageState.indexOf(existingArray) - 1, 1, [this.model.selectedCard.word, this.model.selectedCard.trainClicks]);
      } */

    this.view.setSelectedCardChange(this.model.selectedCard);
  }

  handleSelectedCardPlay = (word) => {
    this.model.selectedCard = this.model.cards.find((element) => element.word === word);
  }

  onAnimatedCardChange = () => {
    this.view.setAnimatedCard(this.model.animatedCard);
  }

  handleAnimatedCardChange = (word) => {
    this.model.animatedCard = this.model.cards.find((element) => element.word === word);
  }

  handleNewGameStarted = () => {
    this.model.cardsForGameRemaining = this.model.cardsForGame.slice(0);
    this.model.gameErrors = 0;
    this.model.cardsForGame = CategoryPageController.shuffle(this.model.cardsForGame);
  }

  static shuffle(array) {
    for (let a = 0; a < 1000; a += 1) {
      for (let i = array.length - 1; i > 0; i = -1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    return array;
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
    if (this.model.cardsForGameRemaining.length !== 0) {
      this.view.playNext(this.model.cardsForGameRemaining);
    } else if (this.model.cardsForGameRemaining.length === 0 && this.model.gameErrors === 0) {
      this.view.victoryGameOver();
    } else {
      this.view.failureGameOver(this.model.gameErrors);
    }
  }

  handleInCorrectAnswerRecieved = () => {
    this.model.gameErrors += 1;
  }

  handleNewGameAfterVictory = () => {
    this.view.setGameLayout(this.model.cards);
  }

  handleNewGameAfterFailure = () => {
    this.view.setGameLayout(this.model.cards);
  }
}
