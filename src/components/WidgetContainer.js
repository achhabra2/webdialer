import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable';
import { inject, observer } from 'mobx-react';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import Tooltip from 'material-ui/Tooltip';
import { Widget } from './Widget';

const overlay = {
  position: 'absolute',
  left: '50%',
  '-webkit-transform': 'translateX(-50%)',
  'transform': 'translateX(-50%)',
  top: '5px',
  margin: '0',
  zIndex: 1000
}

@inject('store') @observer
class WidgetContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    onWidgetClose: PropTypes.func
  }

  render() {
    const api = this.props.store.api;
    const { data, size, access_token, ...props } = this.props;
    return (
      <Draggable handle=".ciscospark-avatar-container">
        <div className={this.props.className}>
          <Tooltip id="tooltip-back" title="Close Widget" style={overlay} placement="bottom">
            <Button fab mini color="primary" aria-label="back" onClick={this.props.onWidgetClose}>
              <CloseIcon />
            </Button>
          </Tooltip>
          <Widget
            accessToken={api.credentials.supertoken.access_token}
            size={Number(this.props.size.substring(0, 2)) / 100}
            data={data}
            {...props}
          />
        </div>
      </Draggable>
    )
  }
}

export default WidgetContainer;