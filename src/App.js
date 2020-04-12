import MainPage from './templates/MainPage';

document.addEventListener('DOMContentLoaded', () => { // Аналог $(document).ready(function(){
  document.querySelector('body').innerHTML = MainPage({
    menuOpen: false,
    isTrain: false,
    categories: [{ name: 'Category 1', image: 'img/dance.jpg' }, { name: 'Category 2', image: 'img/dance.jpg' }],
  });
});
