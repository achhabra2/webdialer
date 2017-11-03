import React, { Component, PureComponent } from 'react';
import Store from './Store';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route } from 'react-router-dom';
import SparkApp from './components/SparkApp';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { inject, observer } from 'mobx-react';
import blue from 'material-ui/colors/blue';
import cyan from 'material-ui/colors/cyan';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: cyan,
  }
});

// @inject('store') @observer
class App extends Component {
  // componentWillMount() {
  //   let params = (new URL(document.location)).searchParams;
  //   let name = params.get('state');
  //   if (name)
  //     this.props.store.setLastPage(name);
  // }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SparkApp />
      </MuiThemeProvider>
    );
  }
}

class AppContainer extends Component {
  render() {
    return (
      <Provider store={new Store()}>
        <BrowserRouter forceRefresh={false}>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
};

export default AppContainer;