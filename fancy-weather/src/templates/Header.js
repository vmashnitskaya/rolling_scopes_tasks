const Header = () => `
    <header>
        <div class="container">
            <div class="navbar">
                <div class="controls">
                    <button class="waves-effect waves-light btn image-change"><i class="material-icons">loop</i></button>
                    <div class="dropdown">
                        <button class='dropdown-trigger btn' href='#' data-target='dropdown1'><span class="language">EN</span><span class="material-icons arrow-down">
                        keyboard_arrow_down
                        </span></button>

                        <ul id='dropdown1' class='dropdown-content list'>
                            <li>EN</li>
                            <li>RU</li>
                            <li>BY</li>
                        </ul>
                    </div>
                    <form action="#">
                        <p>
                        <label>
                            <input name="group1" type="radio" checked />
                            <span class="celsius"></span>
                        </label>
                        </p>
                        <p>
                        <label>
                            <input name="group1" type="radio" />
                            <span class="fahrenheit"></span>
                        </label>
                        </p>
                    </form>
                </div>
                <form autocomplete="off">
                    <div class="input-field">
                        <input placeholder="Search city or ZIP" id="search" type="text" class="search">
                    </div>
                    <input type="submit" class="waves-effect waves-light btn" value="Search"></input>
                </form>
            </div>
        </div>
    </header>
`;
export default Header;
