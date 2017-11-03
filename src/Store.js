import { observable, computed, action } from 'mobx';
import Spark from 'ciscospark';



let public_address;
process.env.NODE_ENV == 'production' ? public_address = 'https://webdialer.chhab.rocks/auth' : public_address = 'http://localhost:3000/auth';

let redirectUri = '&redirect_uri=' + encodeURIComponent(public_address);

let authUrl = `https://api.ciscospark.com/v1/authorize?client_id=C6db8b9e03171d990182af1fefe345c04e732957f0ff1f3385be65bdf6d3a144b&response_type=code&scope=spark%3Aall%20spark%3Akms${redirectUri}`;


class Store {
  @observable authenticated = false;
  @observable navbarImage;
  @observable navbarText = 'Spark Web Dialer';
  @observable navbarColor;
  @observable navbarHidden = false;
  @observable lastPage;
  
  constructor() {
      this.api = Spark.init({
        config: {
          credentials: {
            authorizationString: authUrl
          }
        }
      });
      this.api.once('ready', () => {
        if (this.api.canAuthorize)
          this.authenticated = true;
      });
    // if (typeof window) {
    //   this.api = window.spark;
    //   this.api.once('ready', () => {
    //     if (this.api.canAuthorize)
    //       this.authenticated = true;
    //   });
    // }
  }

  @action setAuth() {
    this.authenticated = this.api.canAuthorize;
  }

  @action setApi = (token) => {
    this.api = Spark.init({
      credentials: token
    });
    this.api.once('ready', () => {
      if (this.api.canAuthorize)
        this.authenticated = true;
    });
  }

  @action setBanner(url) {
    this.navbarImage = url;
  }

  @action setText(text) {
    this.navbarText = text;
  }

  @action setColor(color) {
    this.navbarColor = color;
  }

  @action setNavbarHidden = (bool) => {
    this.navbarHidden = bool;
  }

  @action setLastPage = (lastPage) => {
    this.lastPage = lastPage;
  }

}

export default Store;