const Header = () => `
    <header>
        <div class="container">
            <div class="navbar">
                <div class="controls">
                    <button class="waves-effect waves-light btn image-change"><i class="material-icons image-change-icon">loop</i></button>
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
                            <span class="unit-change celsius" data-unit="C"></span>
                        </label>
                        </p>
                        <p>
                        <label>
                            <input name="group1" type="radio" />
                            <span class="unit-change fahrenheit" data-unit="F"></span>
                        </label>
                        </p>
                    </form>
                </div>
                <form class="search-form" id="search-form" autocomplete="off">
                    <div class="input-field">
                        <input placeholder="Search city or ZIP" id="search" name="search" type="text" class="search">
                    </div>
                    <input type="submit" class="waves-effect waves-light btn" value="Search"></input>
                </form>
                <div class="error hide">Failed to load results</div>
            </div>
        </div>
    </header>
`;
export default Header;
