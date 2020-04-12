import Card from './Card';
import state from './stateManager';

export default class MainPage {
  static createElement(tag, ...classes) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
  }

  constructor(body, wrapperHeader, wrapperMain, wrapperFooter) {
    this.body = body;
    this.wrapperHeader = wrapperHeader;
    this.wrapperMain = wrapperMain;
    this.wrapperFooter = wrapperFooter;
    this.isMainPage = state.isMainPage;
    this.isTrain = state.isTrain;
    this.menu = null;
    this.burger = null;
    this.switcher = null;
  }

  createMenu() {
    this.menu = MainPage.createElement('nav', 'menu', 'hidden');
    if (this.isTrain) {
      this.menu.classList.add('train');
    } else {
      this.menu.classList.add('game');
    }

    this.menu.tabIndex = -1;
    const menuList = MainPage.createElement('ol', 'menu__items');
    for (let i = 1; i <= 9; i += 1) {
      const menuElement = MainPage.createElement('li', 'menu__items-item');
      menuElement.innerHTML = `<a class="menu__items-link"href="#">Element ${i}</a>`;
      menuList.append(menuElement);
    }
    this.menu.append(menuList);
    this.body.prepend(this.menu);


    // Add Event listeners
    this.menu.addEventListener('click', (event) => {
      if (event.target.classList.contains('menu__items-link')) {
        this.openCloseMenu();
      }
    });

    this.menu.addEventListener('blur', () => {
      this.menu.blur();
      this.openCloseMenu();
    });
  }

  createCardsLayout() {
    for (let i = 0; i < 8; i += 1) {
      const card = new Card();
      const elements = card.createCard(this.isMainPage, this.isTrain);
      this.wrapperMain.append(...elements);
    }
  }

  createBurger() {
    this.burger = MainPage.createElement('div', 'burger');
    for (let i = 0; i < 3; i += 1) {
      const span = MainPage.createElement('span', 'burger-line');
      this.burger.append(span);
    }
    this.wrapperHeader.prepend(this.burger);

    // Add event listener
    this.burger.addEventListener('click', this.openCloseMenu);
  }

  openCloseMenu = () => {
    if (!this.burger.classList.contains('active')) {
      // Open menu
      this.menu.classList.remove('hidden');
      // Change burger
      this.burger.classList.add('active');
      this.burger.childNodes.forEach((element) => element.classList.add('active'));
    } else {
      this.menu.blur();
      // Change burger
      this.burger.classList.remove('active');
      this.burger.childNodes.forEach((element) => element.classList.remove('active'));


      // Open menu
      this.menu.classList.add('hidden');
    }
  }

  createSwitcher() {
    this.switcher = MainPage.createElement('div', 'switch');
    const input = MainPage.createElement('input');
    input.type = 'checkbox';
    input.id = 'checkbox';
    const label = MainPage.createElement('label');
    label.for = 'checkbox';
    if (this.isTrain === true) {
      label.innerHTML = 'Train';
    } else {
      label.innerHTML = 'Game';
    }
    this.switcher.prepend(input);
    this.switcher.append(label);
    this.wrapperHeader.append(this.switcher);
  }
}
