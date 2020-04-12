export default class Card {
  constructor() {
    this.contentMain = '<div class="card__main-item"><div class="card__main-image" style="background: url(img/cat.jpg) no-repeat -45px; background-size: 230px 160px;"></div><div class="card__main-name">Hello</div>';
    this.contentTrain = '<div class="card__container-back"></div><div class="card__container-front"></div><div class="card__container-header"><div class="text">Hello</div><div class="rotate"><img src="img/rotate.png" alt="rotate">';
    // this.contentGame = '<div class="card__container-front"></div>';
  }

  createCard = (mainPage, modeTrain) => {
    let cardVisible = document.createElement('div');
    let cardHidden = document.createElement('div');
    if (mainPage === true && modeTrain === true) {
      [cardVisible, cardHidden] = Card.addCardsClasses(cardVisible, cardHidden, ['card__main', 'train'], ['card__main', 'game'], this.contentMain, this.contentMain);
    } else if (mainPage === true && modeTrain === false) {
      [cardVisible, cardHidden] = Card.addCardsClasses(cardVisible, cardHidden, ['card__main', 'game'], ['card__main', 'train'], this.contentMain, this.contentMain);
    } else if (mainPage === false && modeTrain === true) {
      [cardVisible, cardHidden] = Card.addCardsClasses(cardVisible, cardHidden, ['card__container-item', 'train'], ['card__container-item', 'game'], this.contentTrain, this.contentGame);
    } else if (mainPage === false && modeTrain === false) {
      [cardVisible, cardHidden] = Card.addCardsClasses(cardVisible, cardHidden, ['card__container-item', 'game'], ['card__container-item', 'train'], this.contentGame, this.contentTrain);
      cardVisible.innerHTML = this.contentTrain;
    }
    return [cardVisible, cardHidden];
  }

  static addCardsClasses(cardVisible, cardHidden, classesForVisible, classesForhidden, contentVisible, contentHidden) {
    cardVisible.classList.add(...classesForVisible);
    cardVisible.innerHTML = contentVisible;
    cardHidden.classList.add(...classesForhidden, 'hidden');
    cardHidden.innerHTML = contentHidden;
    return [cardVisible, cardHidden];
  }
}
