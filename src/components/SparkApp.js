import React, { Component } from 'react'
import Navbar from './Navbar';
import CallPage from './CallPage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import SubPage from './SubPage';
import About from './About';
import Controls from './Forms/CustomPage';
import LoginPage from './LoginPage';
import DevTools from 'mobx-react-devtools'
import BrandPage from './BrandPage';
import AuthPage from './AuthPage';

const rootStyle = {
  textAlign: 'center'
}


class SparkApp extends Component {
  render() {
    const { store, location } = this.props;
    return (
      <div style={rootStyle}>
        {/* <DevTools /> */}
        {!store.navbarHidden && <Navbar location={location} authenticated={store.authenticated} />}
        <Switch>
          <PrivateRoute authenticated={store.authenticated} path="/call" component={CallPage} />
          <PrivateRoute authenticated={store.authenticated} path="/custom" component={SubPage} />
          <Route path='/auth' component={AuthPage} />
          <Route path='/about' component={About} />
          <Route path='/brand' component={BrandPage} />
          <Route path='/controls' component={Controls} />
          <Route exact path="/login" component={LoginPage} authenticated={store.authenticated} />
          <Route exact path='/' authenticated={store.authenticated} render={props => (
            <Redirect to={{
              pathname: '/call',
              state: { from: props.location }
            }} />
          )} />
        </Switch>
      </div>
    )
  }
}

export default inject('store')(withRouter(observer(SparkApp)));

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