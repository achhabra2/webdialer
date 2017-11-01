import { observable, computed, action } from 'mobx';
// import Spark from 'ciscospark';

class Store {
//  @observable api = Spark;
  @observable authenticated = false;

  constructor() {
    if (typeof window) {
      this.api = window.spark;
      this.api.once('ready', () => {
        if (this.api.canAuthorize)
          this.authenticated = true;
      });
    }
  }

  @action setAuth() {
    this.authenticated = this.api.canAuthorize;
  }

  @action setApi(api) {
    this.api = api;
  }

}

export default Store;