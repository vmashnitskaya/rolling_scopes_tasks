import localization from '../localization';

const Header = (unit, lang) => `
    <header>
        <div class="container">
            <div class="navbar">
                <div class="controls">
                    <button class="waves-light btn image-change"><i class="material-icons image-change-icon">loop</i></button>
                    <div class="dropdown">
                        <button class='dropdown-trigger waves-light btn' href='#' data-target='dropdown1'><span class="language">${lang.toUpperCase()}</span><span class="material-icons arrow-down">
                        keyboard_arrow_down
                        </span></button>

                        <ul id='dropdown1' class='dropdown-content list'>
                            <li class="lang-locale" data-lang="en">EN</li>
                            <li class="lang-locale" data-lang="ru">RU</li>
                            <li class="lang-locale" data-lang="be">BE</li>
                        </ul>
                    </div>
                    <form class="units" action="#">
                        <p>
                        <label>
                            <input class="celsius-button" name="group1" type="radio" ${
                                unit === 'C' ? 'checked' : ''
                            } />
                            <span class="unit-change celsius" data-unit="C"></span>
                        </label>
                        </p>
                        <p>
                        <label>
                            <input class="fahrenheit-button" name="group1" type="radio" ${
                                unit === 'F' ? 'checked' : ''
                            }/>
                            <span class="unit-change fahrenheit" data-unit="F"></span>
                        </label>
                        </p>
                    </form>
                    <button class="waves-light btn speech-enabler"><i class="material-icons">record_voice_over</i></button>
                </div>
                <form class="search-form" id="search-form" autocomplete="off">
                    <div class="input-field">
                        <input placeholder="${
                            localization[lang].placeholder
                        }" id="search" name="search-input" type="text" class="search">
                        <i class="material-icons voice tooltipped" data-tooltip="${
                            localization[lang].codePhrase
                        }">keyboard_voice</i>
                    </div>
                    <input type="submit" class="waves-light btn submit-button" value="${
                        localization[lang].search
                    }"></input>
                </form>
                <div class="error hide">${localization[lang].error}</div>
            </div>
        </div>
    </header>
`;
export default Header;
