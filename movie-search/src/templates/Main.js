import Search from './Search';
import Slider from './Slider';
import Loader from './Loader';

const Main = () => `
<main>
    <div class="container">
        ${Search()}
        ${Slider()}
        ${Loader()}
    </div>
</main>
`;

export default Main;
