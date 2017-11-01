import React, { Component } from 'react';
import Store from './Store';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools'
import { BrowserRouter, Route } from 'react-router-dom';
import SparkApp from './components/SparkApp';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue';
import cyan from 'material-ui/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: cyan,
  }
});

class App extends Component {
  render() {
    return (
      <div>
        {/* <DevTools /> */}
        <SparkApp />
      </div>
    );
  }
}

const AppContainer = () => {
  return (
    <Provider store={new Store()}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter forceRefresh={false}>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

export default AppContainer;