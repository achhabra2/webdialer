import React, { Component } from 'react'
import Authenticate from './Authenticate';
import Grid from 'material-ui/Grid';
import { inject, observer } from 'mobx-react';
import qs from 'query-string';

@inject('store') @observer
class LoginPage extends Component {

  componentWillMount() {
    const { from } = this.props.location.state;
    let query = from.search ? qs.parse(from.search) : {};
    this.setState({
      page: from.pathname,
      ...query
    });
  }

  handleLogin = event => {
    const {store} = this.props;
    if (!store.authenticated) {
      store.api.authorization
        .initiateLogin({
          state: this.state
        });
    }
  }

  render() {
    return (
      <Grid container
        spacing={24}
        alignItems='center'
        justify='center'>
        <Authenticate handleLogin={this.handleLogin} />
      </Grid>
    )
  }
}

export default LoginPage;
