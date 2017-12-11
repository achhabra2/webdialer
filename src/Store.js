import { observable, computed, action } from 'mobx';
import Spark from 'ciscospark';

let public_address;
process.env.NODE_ENV == 'production' ? public_address = 'https://webdialer.chhab.rocks/auth' : public_address = 'http://localhost:3000/auth';

let redirectUri = '&redirect_uri=' + encodeURIComponent(public_address);

let authUrl = `https://api.ciscospark.com/v1/authorize?client_id=C6db8b9e03171d990182af1fefe345c04e732957f0ff1f3385be65bdf6d3a144b&response_type=code&scope=spark%3Aall%20spark%3Akms${redirectUri}`;

class Store {
  @observable authenticated = false;
  @observable navbarHidden = false;
  @observable lastPage;
  @observable redirectState;
  @observable user;

  constructor() {
    this.api = Spark.init({
      config: {
        credentials: {
          authorizationString: authUrl
        },
        phone: {
          enableExperimentalGroupCallingSupport: true
        }
      }
    });
    this.api.once('ready', async () => {
      if (this.api.canAuthorize) {
        this.authenticated = true;
        try {
          this.user = await this.api.people.get('me');
        }
        catch (error) {
          this.user = {}
        }
      }
    });
  }

  @action async setAuth() {
    this.authenticated = this.api.canAuthorize;
    if (this.authenticated) {
      try {
        this.user = await this.api.people.get('me');
      }
      catch (error) {
        this.user = {}
      }
    }
  }

  @action setApi = () => {
    this.api = Spark.init({
      config: {
        phone: {
          enableExperimentalGroupCallingSupport: true
        }
      }
    });
  }

  @action setBanner(url) {
    this.navbarImage = url;
  }

  @action setNavbarHidden = (bool) => {
    this.navbarHidden = bool;
  }

  @action setLastPage = (lastPage) => {
    this.lastPage = lastPage;
  }

  @action setRedirectState = (state) => {
    this.redirectState = state;
  }

}

export default Store;