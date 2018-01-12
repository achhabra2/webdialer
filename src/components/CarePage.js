import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import superagent from 'superagent';
import CareForm from './Forms/CareForm';
import { Container, Item } from './FlexComponents';
import { CircularProgress } from 'material-ui/Progress';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Restore from 'material-ui-icons/Restore';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import yellow from 'material-ui/colors/yellow';
import Button from 'material-ui/Button';
import prefix from 'react-prefixer';
import CallContainer from './CallContainer';
import background from './bestbuy2.jpg';
import retail from './Forms/retail.json';
import types from './Forms/types.json';

const theme = createMuiTheme({
  palette: {
    //   type: 'dark',
    primary: indigo,
    secondary: yellow,
  },
  status: {
    danger: 'orange',
  },
});

const containerStyle = prefix({
  flexDirection: 'column',
  alignItems: 'baseline',
  alignContent: 'flex-start',
  width: '100%',
  textAlign: 'center',
  zIndex: 1
});

const buttonStyle = {
  position: 'fixed',
  left: '50px',
  top: '50px',
  zIndex: 2
}

const fab = {
  margin: '5px'
}

let bgStyle = background => ({
  backgroundImage: "url(" + background + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  width: '100%',
  paddingBottom: '50%',
});


class CarePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loadingMessage: '',
      uri: '',
      backgroundUrl: background,
      dataset: '',
      callActive: false,
      demoActive: false
    }
  }

  async componentWillMount() {
    const careName = window.localStorage.getItem('careName');
    const careSub = window.localStorage.getItem('careSub');
    this.setState({ careName, careSub });
    const { store } = this.props;
    store.setNavbarHidden(true);
    if (!store.authenticated) {
      store.setApi();
      this.setState({ loading: true, loadingMessage: 'Fetching JWT' });
      let jwt;
      try {
        let response = await superagent.post('https://7s6pizsaij.execute-api.us-west-2.amazonaws.com/dev/jwt')
          .set('Content-Type', 'application/json')
          .send({ name: careName || 'Kiosk User' })
          .send({ sub: careSub || Date.now() })
        jwt = response.body;
      }
      catch (e) {
        console.error(e);
        console.log('Could not get JWT');
        this.setState({ loading: false, loadingMessage: 'Error Getting JWT' });
      }
      try {
        this.setState({ loadingMessage: 'Getting Access Token' });
        console.log(`Using JWT: ${jwt}`)
        if (jwt && jwt.token) {
          console.log('Fetching Access Token from JWT');
          await store.api.authorization.requestAccessTokenFromJwt({ jwt: jwt.token });
          store.setAuth();
          window.localStorage.setItem('careName', jwt.name);
          window.localStorage.setItem('careSub', jwt.sub);
          this.setState({ loading: false, loadingMessage: 'Authenticated' });
        }
      }
      catch (e) {
        console.error(e)
        console.log('Could not Authorize JWT');
        this.setState({ loading: false, loadingMessage: 'Could not fetch Access Token' });
      }
    }
  }

  componentWillUnmount() {
    const { store } = this.props;
    store.setNavbarHidden(false);
  }

  placeCall = async state => {
    const { store } = this.props;
    this.setState({ loading: true, loadingMessage: 'Sending Data...' });
    // let mdMessage = ''
    // for(const field in state) {

    // }
    try {
      await store.api.messages.create({
        toPersonEmail: this.state.uri,
        markdown: `Help Requested<br>Area: ${state.area}<br>Floors: ${state.floors}<br>Internet: ${state.internet}`
      })
    }
    catch (e) {
      console.log(e)
    }
    this.setState({ loading: false, callActive: true })
  };

  showDemo = state => {
    this.setState({
      backgroundUrl: state.background || background,
      uri: state.email,
      dataset: state.dataset,
      demoActive: true
    });
  }

  handleBack = event => {
    const { store, history } = this.props;
    this.setState({
      callActive: false,
      demoActive: false
    });
    store.setNavbarHidden(false);
    history.push('/call');
  }

  handleReload = event => {
    this.setState({
      callActive: false,
      demoActive: false,
      dataset: '',
      uri: ''
    });
  }

  renderCall() {
    return (
      <CallContainer callString={this.state.uri} immediate={true} onCallChange={this.handleCallChange} />
    )
  }

  renderForm() {
    return this.state.demoActive ? this.renderDemoForm() : this.renderInitialForm();
  }

  renderInitialForm() {
    return (
      <CareForm
        key="initial"
        handleSubmit={this.showDemo}
        dataset={types}
        submitText="Start Demo"
        header="Enter Demo Information"
        subheader="Enter the email, optional background image, and dataset. "
      />
    )
  }
  renderDemoForm() {
    return (
      <CareForm key="demo"
        handleSubmit={this.placeCall}
        dataset={retail}
        header="Help Request Kiosk"
        subheader="Enter information regarding your house and internet connection."
      />
    )
  }
  render() {
    const { loading, loadingMessage, callActive } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={bgStyle(this.state.backgroundUrl)}>
          <div style={buttonStyle}>
            <Button fab color="accent" aria-label="back" style={fab} onClick={this.handleBack}>
              <ArrowBack />
            </Button>
            <Button fab color="accent" aria-label="reload" style={fab} onClick={this.handleReload}>
              <Restore />
            </Button>
          </div>
          <Container style={containerStyle}>
            <Item flex='1 1 80%'>
              {loading &&
                <CircularProgress size={80} color='accent' />}
              {loading && <p>{loadingMessage}</p>}
              {!loading && (callActive ?
                this.renderCall() : this.renderForm())}
            </Item>
          </Container>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default inject('store')(observer(CarePage));