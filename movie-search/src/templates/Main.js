import Search from './Search';
import Slider from './Slider';
import Loader from './Loader';
import NoResults from './ErrorMessage';
import TranslationMessage from './TranslationMessage';

const Main = () => `
<main>
    <div class="container">
        ${Search()}
        ${TranslationMessage()}
        ${Slider()}
        ${NoResults()}
        ${Loader()}
    </div>
</main>
`;

export default Main;
