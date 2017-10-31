import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar';
import Authenticate from './Authenticate';
import CallPage from './CallPage';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Switch, Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import SubPage from './SubPage';
import About from './About';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

@inject('store') @observer
class SparkApp extends Component {
  static propTypes = {
  }


  render() {
    const { classes, store } = this.props;
    return (
      <div className={classes.root}>
        <Navbar authenticated={store.authenticated} />

        <Switch>
          <Route exact path="/login" render={props => (
            <Grid container
              spacing={24}
              alignItems='center'
              justify='center'>
              <Authenticate />
            </Grid>
          )} />
          <Route exact path='/' component={About} />
          <Route path='/about' component={About} />
          <PrivateRoute authenticated={store.authenticated} path="/call" component={CallPage} />
          <PrivateRoute authenticated={store.authenticated} path="/custom" component={SubPage} />
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles)(SparkApp);

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  authenticated ? (
    <Route {...rest} render={props => (
      (
        <Component {...props} />
      ))} />)
    : (
      <Route {...rest} render={props => (
        (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        ))} />
    )
)