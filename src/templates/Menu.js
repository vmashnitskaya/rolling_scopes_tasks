import MenuItem from './MenuItem';

const Menu = (data) => `
<nav class="menu game ${data.open ? '' : 'hidden'}" tabindex="-1">
    <ol class="menu__items">
        ${data.items.map(MenuItem).join('')}
    </ol>
</nav>
`;

export default Menu;
