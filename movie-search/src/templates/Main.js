import Search from './Search';
import Slider from './Slider';
import Loader from './Loader';
import NoResults from './ErrorMessage';

const Main = () => `
<main>
    <div class="container">
        ${Search()}
        ${Slider()}
        ${NoResults()}
        ${Loader()}
    </div>
</main>
`;

export default Main;
