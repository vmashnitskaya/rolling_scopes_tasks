import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = (data, dateTime) => `
    <div class="app" style="background: url('./img/bg.jpg'); background-repeat: no-repeat; background-size: cover;">
        ${Header()}
        ${Main(data, dateTime)}
        ${Footer()}
    </div>
`;

export default App;
