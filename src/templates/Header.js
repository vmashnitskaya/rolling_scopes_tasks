import Burger from './Burger';
import Switch from './Switch';

const Header = (data) => `
<header class="header">
    <div class="wrapper header-wrapper">
        ${Burger({ active: data.menuOpen })}
        ${Switch(data.isTrain ? { label: 'Train', checked: false } : { label: 'Game', checked: false })}
    </div>
</header>
`;

export default Header;
