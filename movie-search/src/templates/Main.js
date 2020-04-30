import Search from './Search';
import Slider from './Slider';
import Loader from './Loader';
import KeyboardModal from './KeyboardModal';
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
        ${KeyboardModal()}
    </div>
</main>
`;

export default Main;
