// import MainPage from './MainPage';

// function createElement(tag, parentToPrepend, ...classes) {
//   const element = document.createElement(tag);
//   element.classList.add(...classes);
//   parentToPrepend.prepend(element);
//   return element;
// }
// // Create layout
// const body = document.querySelector('body');
// const footer = createElement('footer', body, 'footer');
// const main = createElement('main', body, 'main');
// const header = createElement('header', body, 'header');
// const wrapperHeader = createElement('div', header, 'wrapper', 'header-wrapper');
// const wrapperMain = createElement('div', main, 'wrapper', 'main-wrapper');
// const wrapperFooter = createElement('div', footer, 'wrapper', 'footer-wrapper');

// const layout = new MainPage(body, wrapperHeader, wrapperMain, wrapperFooter);
// layout.createBurger();
// layout.createMenu();
// layout.createCardsLayout();
// layout.createSwitcher();

import App from './App';

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
