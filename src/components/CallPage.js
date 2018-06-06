import React, { Component } from 'react';
import CallContainer from './CallContainer';
import { inject, observer } from 'mobx-react';
import qs from 'query-string';


@inject('store') @observer
class CallPage extends Component {
  componentWillMount() {
    const { location } = this.props.history;
    let query = location.search ? qs.parse(location.search) : {}
    const { uri, immediate } = query;
    this.setState({ uri, immediate });
  }
  onCallDisconnected = () => {
    this.props.store.setNavbarHidden(false);
  }
  onCallConnected = () => {
    this.props.store.setNavbarHidden(true);
  }
  render() {
    const { uri, immediate } = this.state;
    return (
      <CallContainer
        callString={uri}
        immediate={immediate}
        onCallConnected={this.onCallConnected}
        onCallDisconnected={this.onCallDisconnected} />
    )
  }
}

export default CallPage;