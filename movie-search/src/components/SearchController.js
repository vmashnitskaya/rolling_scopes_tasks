import api from '../api';

export default class SearchController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.model.bindDataChange(this.onDataChange);
        this.model.bindErrorRecieved(this.onErrorRecieved);

        this.view.handleSearch(this.onSearch);
        this.view.handleSlideVisible(this.onSlideVisible);
        this.view.handleKeyboardIconClick(this.onKeyboardOpened);

        if (this.model.searchValue) {
            this.onSearch(this.model.searchValue);
        }
    }

    onSearch = async (searchValue) => {
        if (!this.model.loading) {
            this.model.loading = true;
            this.view.showLoading();
            this.model.translated = '';
            this.model.searchValue = searchValue.trim();
            if (/[А-Яа-я]/.test(this.model.searchValue)) {
                try {
                    this.model.translated = await api.getSearchTranslation(this.model.searchValue);
                } catch (e) {
                    this.model.error = e.message;
                }
            }
            this.view.setSearchValue(this.model.searchValue);
            this.view.changeTranslationMessage(null);
            try {
                const {data, page, totalResults} = await api.getSearchResults(
                    this.model.translated ? this.model.translated : this.model.searchValue,
                    1
                );
                this.view.hideLoading();
                this.model.page = page;
                this.model.totalResults = totalResults;
                this.model.data = data;
            } catch (e) {
                this.view.hideLoading();
                this.model.error = e.message;
            }
            this.model.loading = false;
        }
    };

    onDataChange = (data) => {
        if (this.model.translated && this.model.totalResults !== 0) {
            this.view.changeTranslationMessage(this.model.translated);
        }
        if (this.model.totalResults > 0) {
            this.view.addData(data);
        } else {
            this.view.setErrorMessage(`No search result for ${this.model.searchValue}`);
        }
    };

    onErrorRecieved = () => {
        this.view.setErrorMessage('Failed to load results');
    };

    onSlideVisible = async (visibleSlideIndex) => {
        if (
            !this.model.loading &&
            this.model.data.length !== this.model.totalResults &&
            this.model.data.length - visibleSlideIndex < 5
        ) {
            this.model.loading = true;
            try {
                const {data, page} = await api.getSearchResults(
                    this.model.translated ? this.model.translated : this.model.searchValue,
                    this.model.page + 1
                );
                this.model.page = page;
                this.model.addData(data);
            } catch (e) {
                this.model.error = e.message;
            }
            this.model.loading = false;
        }
    };

    onKeyboardOpened = () => {
        this.view.openKeyboard(this.model.keyboardVisible);
    };
}
