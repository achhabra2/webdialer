import React, { Component } from 'react';

const containerStyle = {
  'border': '1px solid black',
  'display': 'inline-block',
  'position': 'relative',
}

const videoStyle = {
  width: '800px',
  height: '480px',
}

const overlayStyle = {
  'position': 'absolute',
  'right': '0px',
  'top': '0px',
  'margin': '10px',
  'padding': '5px 5px',
  'font-size': '20px',
  'font-family': 'Helvetica',
  width: '150px',
  height: '150px',
};

export default class Video extends Component {
  render() {
    const { incoming, outgoing } = this.props;
    return (
      <div style={containerStyle}>
        <video style={videoStyle} autoPlay ref={incoming}></video>
        <video style={overlayStyle} autoPlay ref={outgoing}></video>
      </div>
    )
  }
}