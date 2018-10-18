import React, { Component } from 'react';
import injectSheet from 'react-jss';
import background from './background.jpg';

const styles = {
  containerStyle: {
    border: 'none',
    display: 'inline-block',
    position: 'relative',
    '&:hover $controlsStyle': {
      opacity: '1'
    }
  },
  videoStyle: {
    width: '100%',
    height: 'auto'
  },
  overlayStyle: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    margin: '10px',
    padding: '5px 5px',
    height: '20%'
  },
  controlsStyle: {
    position: 'absolute',
    bottom: '5px',
    width: '100%',
    textAlign: 'center',
    margin: 'auto',
    opacity: '0',
    transition: '.5s ease'
  }
};

const videoStyle = {
  width: '500px'
};

class Video extends Component {
  render() {
    const {
      incomingAudio,
      incoming,
      outgoing,
      classes,
      fullScreen
    } = this.props;
    return (
      <div className={classes.containerStyle} ref={fullScreen}>
        <video
          className={classes.videoStyle}
          // style={videoStyle}
          autoPlay
          allowFullScreen
          ref={incoming}
          poster={background}
        />
        <audio autoPlay ref={incomingAudio} />
        <video className={classes.overlayStyle} muted autoPlay ref={outgoing} />
        <div className={classes.controlsStyle}>{this.props.children}</div>
      </div>
    );
  }
}

export default injectSheet(styles)(Video);
