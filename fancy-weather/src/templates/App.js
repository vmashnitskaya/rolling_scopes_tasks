import Header from './Header';
import Footer from './Footer';
import ErrorPage from './ErrorPage';

const App = (unit, lang) => `
    <div class="app">
    <img class="background-image" alt="background">
        ${Header(unit, lang)}
        <main></main>
        ${Footer()}
        ${ErrorPage()}
    </div>
`;
export default App;
