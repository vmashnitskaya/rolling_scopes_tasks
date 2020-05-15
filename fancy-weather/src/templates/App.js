import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => `
    <div style="background: url('./img/bg.jpg') no-repeat; background-size: cover;">
        ${Header()}
        ${Main()}
        ${Footer()}
    </div>
`;

export default App;
