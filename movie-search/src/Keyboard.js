export default class Keyboard {
    constructor(wrapper) {
        this.properties = {
            capsLock: false,
            lang: window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'en',
        };
        this.altphabets = {
            keyLayoutEn: [
                '`',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '0',
                '-',
                '=',
                'backspace',
                'q',
                'w',
                'e',
                'r',
                't',
                'y',
                'u',
                'i',
                'o',
                'p',
                '[',
                ']',
                '\\',
                'keyboard_capslock',
                'a',
                's',
                'd',
                'f',
                'g',
                'h',
                'j',
                'k',
                'l',
                ';',
                "'",
                'check',
                'language',
                'z',
                'x',
                'c',
                'v',
                'b',
                'n',
                'm',
                ',',
                '.',
                '/',
                'space_bar',
            ],
            keyLayoutRu: [
                'ё',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '0',
                '-',
                '=',
                'backspace',
                'й',
                'ц',
                'у',
                'к',
                'е',
                'н',
                'г',
                'ш',
                'щ',
                'з',
                'х',
                'ъ',
                '\\',
                'keyboard_capslock',
                'ф',
                'ы',
                'в',
                'а',
                'п',
                'р',
                'о',
                'л',
                'д',
                'ж',
                'э',
                'check',
                'language',
                'я',
                'ч',
                'с',
                'м',
                'и',
                'т',
                'ь',
                'б',
                'ю',
                '.',
                '/',
                'space_bar',
            ],
        };
        this.elements = {
            main: null,
            keyContainer: null,
            keys: [],
        };
        // Create set for pressed buttons
        this.pressed = new Set();
        this.createKeyboard(wrapper);
    }

    createKeyboard(wrapper) {
        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keyContainer = document.createElement('div');

        // Add classes
        this.elements.main.classList.add('keyboard');
        this.elements.keyContainer.classList.add('keyboard__keys');

        // Append to DOM
        if (this.properties.lang === 'en') {
            this.elements.keyContainer.append(
                Keyboard.createKeys(this.altphabets.keyLayoutEn, 'en')
            );
            this.elements.keyContainer.append(
                Keyboard.createKeys(this.altphabets.keyLayoutRu, 'ru', 'hidden')
            );
        } else {
            this.elements.keyContainer.append(
                Keyboard.createKeys(this.altphabets.keyLayoutEn, 'en', 'hidden')
            );
            this.elements.keyContainer.append(
                Keyboard.createKeys(this.altphabets.keyLayoutRu, 'ru')
            );
        }

        // Add listeners to keytboard container
        this.elements.keyContainer.addEventListener('mousedown', this.handleMouseDown, true);
        // this.elements.keyContainer.addEventListener('pointerdown', this.handlePointerDown, true);

        this.elements.main.append(this.elements.keyContainer);
        wrapper.append(this.elements.main);

        this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');
    }

    setTextarea(textarea) {
        // Paste value into text area
        this.textarea = textarea;
    }

    bindSubmit(onSubmit) {
        this.onSubmit = onSubmit;
    }

    static createKeys(althabet, ...classes) {
        const fragment = document.createDocumentFragment();
        althabet.forEach((element) => {
            const key = document.createElement('button');
            key.setAttribute('type', 'button');
            key.classList.add('keyboard__key', ...classes);
            key.innerHTML = element;

            switch (true) {
                case element === 'backspace':
                    key.classList.add('keyboard__key-small', 'material-icons');
                    break;

                case element === 'keyboard_capslock':
                    key.classList.add(
                        'keyboard__key-medium',
                        'material-icons',
                        'keyboard_capslock'
                    );
                    break;

                case element === 'language':
                    key.classList.add('keyboard__key-small', 'material-icons');
                    break;

                case element === 'check':
                    key.classList.add('keyboard__key-medium', 'material-icons');
                    break;

                case element === 'space_bar':
                    key.classList.add('keyboard__key-extra-wide', 'material-icons');
                    break;

                default:
                    key.classList.add(
                        `code${element.toUpperCase().charCodeAt(0)}`,
                        `code${element.toLowerCase().charCodeAt(0)}`
                    );
                    break;
            }
            fragment.append(key);

            if (
                element === 'backspace' ||
                element === '\\' ||
                element === 'check' ||
                element === '/'
            ) {
                const lineBreak = document.createElement('br');
                lineBreak.classList.add(...classes);
                fragment.append(lineBreak);
            }
        });
        return fragment;
    }

    changeLanguage() {
        this.properties.lang = this.properties.lang === 'en' ? 'ru' : 'en';

        window.localStorage.setItem('lang', this.properties.lang);
    }

    initAFterLangChange() {
        this.changeLanguage();
        const language = this.properties.lang === 'en' ? ['en', 'ru'] : ['ru', 'en'];

        document.querySelectorAll(`.${language[0]}`).forEach((element) => {
            element.classList.remove('hidden');
        });

        document
            .querySelectorAll(`.${language[1]}`)
            .forEach((element) => element.classList.add('hidden'));
    }

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        this.changeRegister();
    }

    changeRegister() {
        for (let i = 0; i < this.elements.keys.length; i += 1) {
            const key = this.elements.keys[i];
            if (key.textContent.length === 1) {
                key.textContent = this.properties.capsLock
                    ? key.textContent.toUpperCase()
                    : key.textContent.toLowerCase();
            }
        }
    }

    changeCapsLockColor(element) {
        if (element.classList.contains('highlighted', `${this.properties.lang}`)) {
            element.classList.remove('highlighted');
        } else if (!element.classList.contains('highlighted', `${this.properties.lang}`)) {
            element.classList.add('highlighted');
        }
    }

    detectLanguage(event) {
        if (
            /[a-zA-Z]/.test(event.key) &&
            event.key.length === 1 &&
            event.code !== 'Space' &&
            this.properties.lang === 'ru'
        ) {
            this.initAFterLangChange();
        } else if (
            /[а-яА-Я]/i.test(event.key) &&
            event.key.length === 1 &&
            event.code !== 'Space' &&
            this.properties.lang === 'en'
        ) {
            this.initAFterLangChange();
        }
    }

    handleMouseDown = (event) => {
        event.preventDefault();
        if (event.target.classList.contains('keyboard__key')) {
            event.target.classList.add('animated');

            switch (event.target.textContent) {
                case 'backspace':
                    this.textarea.value = this.textarea.value.substring(
                        0,
                        this.textarea.value.length - 1
                    );
                    break;
                case 'keyboard_capslock':
                    this.changeCapsLockColor(
                        document.querySelector(`.keyboard_capslock.${this.properties.lang}`)
                    );
                    this.toggleCapsLock();
                    break;
                case 'language':
                    this.initAFterLangChange();
                    break;
                case 'check':
                    this.onSubmit();
                    break;
                case 'space_bar':
                    this.textarea.value += ' ';
                    break;
                default:
                    this.textarea.value += this.properties.capsLock
                        ? event.target.textContent.toUpperCase()
                        : event.target.textContent.toLowerCase();
                    break;
            }

            setTimeout(() => event.target.classList.remove('animated'), 500);
        }
    };
}
