import BaseView from './BaseView';
import CategoryWrapper from '../templates/CategoryWrapper';
import TrainCard from '../templates/TrainCard';
import GameCard from '../templates/GameCard';
import NewGameButton from '../templates/NewGameButton';
import RepeatButton from '../templates/RepeatButton';
import StarCorrect from '../templates/StarCorrect';
import StarIncorrect from '../templates/StarIncorrect';
import GameSound from '../templates/GameSound';
import VictoryGameOver from '../templates/VictoryGameOver';
import FailureGameOver from '../templates/FailureGameOver';

export default class CategoryPageView extends BaseView {
  constructor() {
    super();
    this.main.innerHTML = CategoryWrapper();
    this.wrapper = this.main.querySelector('.main-wrapper');
    this.starLine = this.main.querySelector('.star-line');
    this.buttonWrapper = this.main.querySelector('.button-wrapper');
    this.gameInProcess = false;
  }

  setTrainingCards(cards) {
    this.starLine.innerHTML = '';
    this.wrapper.innerHTML = cards.map(TrainCard).join('');
  }

  setGameLayout(cards) {
    this.starLine.innerHTML = '';
    this.wrapper.innerHTML = cards.map(GameCard).join('') + GameSound;
    this.buttonWrapper.innerHTML = NewGameButton();
  }


  setAnimatedCard(animatedCard) {
    if (animatedCard) {
      const card = this.wrapper.querySelector(`.card__container-item[data-word=${animatedCard.word}]`);

      card.classList.add('animated');

      const front = card.querySelector('.card__container-front');
      front.classList.add('animated');
      front.classList.add('hidden');

      const back = card.querySelector('.card__container-back');
      back.classList.remove('hidden');
    } else {
      const card = this.wrapper.querySelector('.card__container-item.animated');

      card.classList.remove('animated');

      const back = card.querySelector('.card__container-back');
      back.classList.add('hidden');

      const front = card.querySelector('.card__container-front');
      front.classList.remove('hidden');
    }
  }

  bindAnimatedCardChange(handler) {
    this.wrapper.addEventListener('click', (event) => {
      if (event.target.classList.contains('rotate-icon')) {
        const { word } = event.target.dataset;
        handler(word);
        const onMouseLeave = (e) => {
          handler(null);
          e.target.removeEventListener('mouseleave', onMouseLeave);
        };
        this.wrapper.querySelector(`.card__container-item[data-word=${word}]`).addEventListener('mouseleave', onMouseLeave);
      }
    });
  }

  setSelectedCardChange(selectedCard) {
    const audio = this.wrapper.querySelector(`audio.${selectedCard.word}`);
    audio.play();
  }

  bindSelectedCardChange(handler) {
    this.wrapper.addEventListener('click', (event) => {
      if (event.target.classList.contains('card__container-front')) {
        const { word } = event.target.parentNode.dataset;
        handler(word);
      }
    });
  }

  bindNewGameStarted(handler) {
    this.buttonWrapper.addEventListener('click', (event) => {
      if (event.target.classList.contains('new-game')) {
        handler();
      }
    });
  }

  bindPlayAudioStarted = (handler) => {
    this.wrapper.addEventListener('ended', (event) => {
      if (event.target.dataset.word === 'audio') {
        handler(event.target.className);
      }
    }, true);
  }

  setNewGameStart(cards) {
    this.starLine.innerHTML = '';
    this.wrapper.innerHTML = cards.map(GameCard).join('') + GameSound;
    this.buttonWrapper.innerHTML = RepeatButton();

    this.gameInProcess = true;

    const randomNumber = Math.floor(Math.random() * cards.length);

    const audio = this.wrapper.querySelector(`audio.${cards[randomNumber].word}`);
    audio.play();
  }

  bindRepeatButtonClicked(handler) {
    this.buttonWrapper.addEventListener('click', (event) => {
      if (event.target.classList.contains('repeat')) {
        handler();
      }
    });
  }


  playWord(word) {
    const audio = this.wrapper.querySelector(`audio.${word}`);
    audio.play();
  }

  bindWordSelected(handler) {
    this.wrapper.addEventListener('click', (event) => {
      if (this.gameInProcess === true && event.target.classList.contains('card__container-item') && !event.target.classList.contains('grey-out')) {
        handler(event.target.dataset.word);
      }
    });
  }


  handleCorrectAnswer(word) {
    this.starLine.innerHTML += StarCorrect;

    const success = this.wrapper.querySelector('.correct-sound');
    success.play();

    this.gameInProcess = true;

    const successElement = this.wrapper.querySelector(`.card__container-item[data-word=${word}]`);
    successElement.classList.add('grey-out');
  }

  bindCorrectAnswerRecieved(handler) {
    this.wrapper.addEventListener('ended', (event) => {
      if (event.target.className === 'correct-sound') {
        handler();
      }
    }, true);
  }

  handleIncorrectAnswer() {
    this.starLine.innerHTML += StarIncorrect;

    const incorrect = this.wrapper.querySelector('.incorrect-sound');
    incorrect.play();

    this.gameInProcess = true;
  }

  bindInCorrectAnswerRecieved(handler) {
    this.wrapper.addEventListener('ended', (event) => {
      if (event.target.className === 'incorrect-sound') {
        handler();
      }
    }, true);
  }

  playNext(cards) {
    const randomNumber = Math.floor(Math.random() * cards.length);

    const audio = this.wrapper.querySelector(`audio.${cards[randomNumber].word}`);
    audio.play();
  }

  victoryGameOver() {
    this.wrapper.innerHTML = VictoryGameOver + GameSound;

    const audio = this.wrapper.querySelector('.success-sound');
    audio.play();

    this.gameInProcess = false;
  }

  bindNewGameAfterVictory(handler) {
    this.wrapper.addEventListener('ended', (event) => {
      if (event.target.className === 'success-sound') {
        handler();
      }
    }, true);
  }

  failureGameOver(count) {
    this.wrapper.innerHTML = FailureGameOver(count) + GameSound;

    const audio = this.wrapper.querySelector('.failure-sound');
    audio.play();

    this.gameInProcess = false;
  }

  bindNewGameAfterFailure(handler) {
    this.wrapper.addEventListener('ended', (event) => {
      if (event.target.className === 'failure-sound') {
        handler();
      }
    }, true);
  }
}
