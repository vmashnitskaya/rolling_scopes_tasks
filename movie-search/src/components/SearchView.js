import M from 'materialize-css';
import Glider from 'glider-js';
import Page from '../templates/Page';
import SliderItem from '../templates/SliderItem';

export default class SearchView {
    constructor() {
        this.body = document.querySelector('body');
        this.initPage();
        this.initSlider();
    }

    initPage() {
        this.body.innerHTML = Page();
        this.loader = this.body.querySelector('.waiting-layer');
        this.sliderContainer = this.body.querySelector('.glider-contain');
        this.errorWrapper = this.body.querySelector('.error-wrapper');
        this.searchForm = this.body.querySelector('.search-form');
        this.searchInput = this.searchForm.querySelector('input#search');
        this.searchForm.querySelector('i.clear').addEventListener('click', () => {
            this.searchInput.value = '';
        });
        M.updateTextFields();
    }

    initSlider() {
        const slider = document.querySelector('.glider');
        this.glider = new Glider(slider, {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: '.dots',
            duration: 0.3,
            draggable: true,
            skipTrack: true,
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next',
            },
            responsive: [
                {
                    breakpoint: 280,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }

    handleSearch = (handler) => {
        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchValue = new FormData(this.searchForm).get('search');
            if (searchValue) {
                handler(searchValue);
            }
        });
    };

    showLoading() {
        this.loader.classList.remove('hide');
        this.sliderContainer.classList.add('hide');
        this.errorWrapper.classList.add('hide');

        this.sliderContainer.querySelector('.glider-track').innerHTML = '';
        this.glider.refresh(true);
    }

    hideLoading() {
        this.loader.classList.add('hide');
        this.sliderContainer.classList.remove('hide');
    }

    addData(data) {
        data.forEach(this.addCardToGlider);
    }

    setErrorMessage(text) {
        this.sliderContainer.classList.add('hide');
        const errorMessage = this.errorWrapper.querySelector('h2');
        errorMessage.innerHTML = text;
        this.errorWrapper.classList.remove('hide');

        if (!this.loader.classList.contains('hide')) {
            this.loader.classList.add('hide');
        }
    }

    addCardToGlider = (cardData) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = SliderItem(cardData);
        this.glider.addItem(card);
    };

    handleSlideVisible = (handler) => {
        this.sliderContainer
            .querySelector('.glider')
            .addEventListener('glider-slide-visible', (event) => {
                handler(event.detail.slide);
            });
    };

    changeTranslationMessage = (text) => {
        const translationMessage = this.body.querySelector('.translation');
        const translationText = translationMessage.querySelector('h2');
        if (text) {
            translationMessage.classList.remove('hide');
            translationText.innerHTML = `Showing results for: <span>${text}</span>`;
        } else {
            translationMessage.classList.add('hide');
            translationText.innerHTML = '';
        }
    };

    setSearchValue(searchValue) {
        this.searchInput.value = searchValue;
    }
}
