import api from '../api';

export default class SearchController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.model.bindDataChange(this.onDataChange);
        this.model.bindErrorRecieved(this.onErrorRecieved);

        this.view.handleSearch(this.onSearch);
        this.view.handleSlideVisible(this.onSlideVisible);
    }

    onSearch = async (searchValue) => {
        this.model.translated = '';
        let searchValueTrimmed = searchValue.trim();
        if (/[А-Яа-я]/.test(searchValueTrimmed)) {
            try {
                this.model.translated = searchValueTrimmed;
                searchValueTrimmed = await api.getSearchTranslation(searchValueTrimmed);
            } catch (e) {
                this.model.error = e.message;
            }
        }
        this.model.loading = true;
        this.view.showLoading();
        this.model.searchValue = searchValueTrimmed;
        this.view.showLoading();
        try {
            const {data, page, totalResults} = await api.getSearchResults(searchValueTrimmed, 1);
            this.view.hideLoading();
            this.model.page = page;
            this.model.totalResults = totalResults;
            this.model.data = data;
            this.model.loading = false;
        } catch (e) {
            this.model.error = e.message;
            this.view.hideLoading();
            this.model.loading = false;
        }
    };

    onDataChange = (data) => {
        if (this.model.translated) {
            this.searchReturn(data);
            this.view.changeTranslationMessage(this.model.searchValue);
        } else {
            this.searchReturn(data);
            this.view.changeTranslationMessage(null);
        }
    };

    searchReturn = (data) => {
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
                    this.model.searchValue,
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
}
