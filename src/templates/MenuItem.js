const MenuItem = (data) => `
<li class="menu__items-item">
    <a class="menu__items-link" href="#" data-category="${data.category}">${data.name}</a>
</li>
`;

export default MenuItem;
