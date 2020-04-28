import api from '../api';

export default class SearchController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.model.bindLoadingChange(this.onLoadingChange);
        this.model.bindDataChange(this.onDataChange);

        this.view.handleSearch(this.onSearch);
    }

    onSearch = async (searchValue) => {
        this.model.loading = true;
        const searchResults = await api.getSearchResults(searchValue, 1);
        this.model.loading = false;
        this.model.data = searchResults.data;
    };

    onLoadingChange = () => {
        if (this.model.loading) {
            this.view.showLoading();
        } else {
            this.view.hideLoading();
        }
    };

    onDataChange = () => {
        this.view.setData(this.model.data);
    };
}
