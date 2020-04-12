const Switch = (data) => `
    <div class="switch">
        <input type="checkbox" id="checkbox" ${data.checked ? 'checked' : ''} />
        <label class="">${data.label}</label>
    </div>
`;

export default Switch;
