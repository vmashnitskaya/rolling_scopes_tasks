export default class Router {
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
  }

  getURLParam(paramName) {
    return this.urlParams.get(paramName);
  }
}
