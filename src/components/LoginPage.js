import React, { Component } from 'react'
import Authenticate from './Authenticate';
import Grid from 'material-ui/Grid';
import { inject, observer } from 'mobx-react';


@inject('store') @observer
class LoginPage extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.store.authenticated) {
      nextProps.history.push('/call')
    }
  }

  componentWillMount() {
    if (this.props.store.authenticated) {
      this.props.history.push('/call')
    }
  }

  render() {
    return (
      <Grid container
        spacing={24}
        alignItems='center'
        justify='center'>
        <Authenticate />
      </Grid>
    )
  }
}

export default LoginPage;
