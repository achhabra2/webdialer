import 'babel-polyfill';
import ciscospark from 'ciscospark';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let public_address;
process.env.NODE_ENV == 'production'? public_address = 'https://webdialer.chhab.rocks/' : public_address = 'http://localhost:3000/';

let redirectUri = '&redirect_uri=' + encodeURIComponent(public_address);

let authUrl = `https://api.ciscospark.com/v1/authorize?client_id=C6db8b9e03171d990182af1fefe345c04e732957f0ff1f3385be65bdf6d3a144b&response_type=code&scope=spark%3Aall%20spark%3Akms${redirectUri}`;

window.spark = ciscospark.init({
  config: {
    credentials: {
      authorizationString: authUrl
    }
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
