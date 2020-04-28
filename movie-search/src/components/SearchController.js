import api from '../api';

export default class SearchController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.model.bindLoadingChange(this.onLoadingChange);
        this.model.bindDataChange(this.onDataChange);
        this.model.bindErrorRecieved(this.onErrorRecieved);

        this.view.handleSearch(this.onSearch);
    }

    onSearch = async (searchValue) => {
        this.model.loading = true;
        this.model.searchValue = searchValue;
        try {
            const {data, totalResults} = await api.getSearchResults(searchValue, 1);
            this.model.loading = false;
            this.model.totalResults = totalResults;
            this.model.data = data;
        } catch (e) {
            this.model.error = e.message;
        }
    };

    onLoadingChange = () => {
        if (this.model.loading) {
            this.view.showLoading();
        } else {
            this.view.hideLoading();
        }
    };

    onDataChange = () => {
        if (this.model.totalResults > 0) {
            this.view.setData(this.model.data);
        } else {
            this.view.setErrorMessage(`No search result for ${this.model.searchValue}`);
        }
    };

    onErrorRecieved = () => {
        this.view.setErrorMessage('Failed to load results');
    };
}
