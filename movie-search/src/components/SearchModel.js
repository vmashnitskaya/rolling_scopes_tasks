export default class SearchModel {
    constructor() {
        this.loading = false;
        this._data = null;
        this.page = 1;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
        this.onDataChange(data);
    }

    bindDataChange(callback) {
        this.onDataChange = callback;
    }

    addData(data) {
        this._data.push(...data);
        this.onDataChange(data);
    }

    get error() {
        return this._error;
    }

    set error(error) {
        this._error = error;
        console.log(this._error);
        this.onErrorRecieved();
    }

    bindErrorRecieved(callback) {
        this.onErrorRecieved = callback;
    }
}
