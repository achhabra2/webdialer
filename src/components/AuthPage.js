import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import qs from 'query-string';
import { Redirect } from 'react-router-dom';


@inject('store') @observer
export class AuthPage extends Component {
  componentWillMount() {
    const parsed = qs.parse(this.props.history.location.hash)
    let state;
    if (parsed.state) {
      state = JSON.parse(atob(parsed.state));
    }
    let { page, ...query } = state;
    this.setState({ page, query });
  }
  render() {
    const query = this.state.query? qs.stringify(this.state.query) : '';
    return (
      <div>
        Authenticating...
        {this.state.page && this.props.store.authenticated &&
          <Redirect to={{
            pathname: this.state.page,
            search: `?${query}`
          }} />}
      </div>
    )
  }
}

export default AuthPage;