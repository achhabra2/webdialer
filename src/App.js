import React, { Component, PureComponent } from 'react';
import Store from './Store';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route } from 'react-router-dom';
import SparkApp from './components/SparkApp';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { inject, observer } from 'mobx-react';
import ReactGA from 'react-ga';
import blue from 'material-ui/colors/blue';
import cyan from 'material-ui/colors/cyan';
import config from './.config';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: cyan,
  }
});


class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SparkApp />
      </MuiThemeProvider>
    );
  }
}

class AppContainer extends Component {
  componentWillMount() {
    ReactGA.initialize(config.GA);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  updateGA = () => {
    ReactGA.pageview(window.location.pathname);
  }
  render() {
    return (
      <Provider store={new Store()}>
        <BrowserRouter onUpdate={this.updateGA} forceRefresh={false}>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
};

export default AppContainer;