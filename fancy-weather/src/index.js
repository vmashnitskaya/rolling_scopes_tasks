import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/style.scss';
import App from './App';

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
