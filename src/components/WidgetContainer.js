import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable';
import { inject, observer } from 'mobx-react';
import { Widget } from './Widget';

@inject('store') @observer
class WidgetContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired
  }

  render() {
    const api = this.props.store.api;
    const { data } = this.props;
    return (
      <Draggable handle=".ciscospark-avatar-container">
        <div className={this.props.className}>
          <Widget
            accessToken={api.credentials.supertoken.access_token}
            size={Number(this.props.size.substring(0, 2)) / 100}
            data={data}
          />
        </div>
      </Draggable>
    )
  }
}

export default WidgetContainer;