import Header from './Header';
import Footer from './Footer';

const App = (unit, lang) => `
    <div class="app">
        ${Header(unit, lang)}
        <main></main>
        ${Footer()}
    </div>
`;
export default App;
