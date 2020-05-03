const Switch = (isTrain) => `
    <div class="switch">
        <input type="checkbox" id="checkbox" checked ="${isTrain ? 'false' : 'checked'}">
        <label class="switch"></label>
    </div>
`;

export default Switch;
