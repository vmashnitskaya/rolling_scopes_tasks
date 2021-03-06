import Page from '../templates/Page';
import MenuItem from '../templates/MenuItem';
import Switch from '../templates/Switch';

export default class BaseView {
  constructor() {
    this.body = document.querySelector('body');
    this.body.innerHTML = Page();
    this.header = document.querySelector('header');
    this.headerWrapper = document.querySelector('.header-wrapper');
    this.main = document.querySelector('main');
    this.burger = document.querySelector('.burger');
    this.menu = document.querySelector('.menu');
    this.switch = null;
  }

  setTrain(isTrain) {
    if (!this.switch) {
      this.headerWrapper.insertAdjacentHTML('beforeEnd', `${Switch(isTrain)}`);
      this.switch = document.querySelector('.switch');
    }
    const switchInput = this.switch.querySelector('input');
    switchInput.checked = !isTrain;
    const switchLabel = this.switch.querySelector('label');
    switchLabel.innerText = isTrain ? 'Train' : 'Play';
    if (isTrain) {
      this.menu.classList.remove('game');
      this.menu.classList.add('train');
    } else {
      this.menu.classList.add('game');
      this.menu.classList.remove('train');
    }
  }

  bindChangeTrain(handler) {
    this.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('switch')) {
        handler();
      }
    });
  }

  setMenuOpen(isMenuOpen) {
    if (isMenuOpen) {
      this.menu.classList.remove('hidden');
      this.burger.classList.add('active');
      this.burger.querySelectorAll('.burger-line').forEach((element) => element.classList.add('active'));
    } else {
      this.menu.classList.add('hidden');
      this.burger.classList.remove('active');
      this.burger.querySelectorAll('.burger-line').forEach((element) => element.classList.remove('active'));
    }
  }


  bindChangeMenuOpen(handler) {
    this.body.addEventListener('click', (event) => {
      if (!event.target.classList.contains('menu') && !this.menu.classList.contains('hidden')) {
        handler();
      } else if (event.target.classList.contains('burger') || event.target.classList.contains('burger-line')) {
        handler();
      }
    });
  }

  setMenuItems(menuItems) {
    const menuList = this.menu.querySelector('ol');
    menuList.innerHTML = menuItems.map(MenuItem).join('');
  }

  setCurrentMenuItem(currentMenuItem) {
    const menuItems = this.menu.querySelectorAll('.menu__items-link');

    menuItems.forEach((element) => {
      element.classList.remove('highlighted');
      if (element.innerText === currentMenuItem) {
        element.classList.add('highlighted');
      }
    });
  }
}
