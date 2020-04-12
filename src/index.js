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

import MainPage from './templates/MainPage';

document.addEventListener('DOMContentLoaded', () => {
  let open = false;
  const body = document.querySelector('body');
  body.innerHTML = MainPage({
    menuOpen: open,
    isTrain: true,
    categories: [{ name: 'Category 1', image: 'img/dance.jpg' }, { name: 'Category 2', image: 'img/dance.jpg' }],
  });
  body.addEventListener('click', () => {
    open = !open;
    body.innerHTML = MainPage({
      menuOpen: open,
      isTrain: true,
      categories: [{ name: 'Category 1', image: 'img/dance.jpg' }, { name: 'Category 2', image: 'img/dance.jpg' }],
    });
  });
});
