const MenuItem = (data) => `
<li class="menu__items-item">
    <a class="menu__items-link" href="#" dataset-name="${data.name}">
        ${data.name}
    </a>
</li>
`;

export default MenuItem;
