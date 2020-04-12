import Burger from './Burger';
import Switch from './Switch';

const Header = () => `
<header class="header">
    <div class="wrapper header-wrapper">
        ${Burger()}
        ${Switch()}
    </div>
</header>
`;

export default Header;
