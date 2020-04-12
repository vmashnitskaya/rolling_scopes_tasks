const Burger = (data) => `
<div class="burger ${data.active ? 'active' : ''}">
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
</div>
`;

export default Burger;
