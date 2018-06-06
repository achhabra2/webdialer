import React, { Component } from 'react';
import Authenticate from './Authenticate';
import { Container, Item } from './FlexComponents';
import { inject, observer } from 'mobx-react';
import qs from 'query-string';
import superagent from 'superagent';
import { CircularProgress } from 'material-ui/Progress';
import { Redirect } from 'react-router-dom';
import prefix from 'react-prefixer';

const containerStyle = prefix({
  position: 'relative',
  width: '100%',
  textAlign: 'center',
  margin: 'auto'
});

@inject('store') @observer
class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    const { from } = this.props.location.state;
    let query = from && (from.search ? qs.parse(from.search) : undefined);
    from && this.setState({
      page: from.pathname,
      ...query
    });
  }

  handleLoginUser = event => {
    event.preventDefault();
    const { store } = this.props;
    if (!store.authenticated) {
      store.api.authorization
        .initiateLogin({
          state: this.state
        });
    }
  }

  handleLoginGuest = async (event, options) => {
    const { store } = this.props;
    const { name, sub } = options;
    store.setApi();
    this.setState({ loading: true, loadingMessage: 'Fetching JWT' });
    if (!store.authenticated) {
      let jwt;
      try {
        let response = await superagent.post('https://7s6pizsaij.execute-api.us-west-2.amazonaws.com/dev/jwt')
          .set('Content-Type', 'application/json')
          .send({ name: name || 'Webdialer User' })
          .send({ sub: sub || null })
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
          window.localStorage.setItem('name', jwt.name);
          window.localStorage.setItem('sub', jwt.sub);
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

  render() {
    const { loading, loadingMessage } = this.state;
    const { from } = this.props.location.state;
    const query = from && (from.search ? from.search : undefined);
    return (
      <div style={containerStyle}>
        {(!loading ? <Authenticate handleLoginUser={this.handleLoginUser} handleLoginGuest={this.handleLoginGuest} /> : <div style={{ margin: 'auto' }}> <CircularProgress size={80} color='accent' /> </div>)}
        <div style={{ textAlign: 'center' }}>
          {loadingMessage}<br />
          Note Guest Access does not work with SIP calls and will not work with roomkit@sparkdemos.com.
        </div>
        {this.state.page && this.props.store.authenticated &&
          <Redirect to={{
            pathname: this.state.page,
            search: query
          }} />}
      </div>
    )
  }
}

export default LoginPage;