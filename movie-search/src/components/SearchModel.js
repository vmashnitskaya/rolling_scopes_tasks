export default class SearchModel {
    constructor() {
        this._loading = false;
        this._data = null;
    }

    get loading() {
        return this._loading;
    }

    set loading(loading) {
        this._loading = loading;
        this.onLoadingChange();
    }

    bindLoadingChange(callback) {
        this.onLoadingChange = callback;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
        this.onDataChange();
    }

    bindDataChange(callback) {
        this.onDataChange = callback;
    }

    get error() {
        return this._error;
    }

    set error(error) {
        this._error = error;
        this.onErrorRecieved();
    }

    bindErrorRecieved(callback) {
        this.onErrorRecieved = callback;
    }
}
