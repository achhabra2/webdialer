import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button';
import VideoCamIcon from 'material-ui-icons/VideocamOff';
import VolumeMuteIcon from 'material-ui-icons/VolumeMute';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import CallEndIcon from 'material-ui-icons/CallEnd';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class VideoControls extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    onAudioMute: PropTypes.func,
    onVideoMute: PropTypes.func,
    onEnd: PropTypes.func,
    audioMuted: PropTypes.bool,
    videoMuted: PropTypes.bool,
    videoElement: PropTypes.object,
  }

  muted = (property) => {
    return this.props[property] ? 'accent' : 'primary';
  };

  handleToggle = (handler, event) => this.props[handler](event);

  handleFullScreen = (element, event) => {
    // console.log('Handle Fullscreen');
    // console.log(element);
    event.preventDefault();
    if (element) {
      if (IsFullScreenCurrently())
        GoOutFullscreen()
      else
        GoInFullscreen(element)
    }
  };

  render() {
    const { classes, videoElement } = this.props;
    return (
      <div>
        <Button className={classes.button} fab
          color={this.muted('audioMuted')}
          aria-label="add"
          onClick={e => this.handleToggle('onAudioMute', e)}>
          <VolumeMuteIcon />
        </Button>
        <Button className={classes.button} fab
          color={this.muted('videoMuted')}
          aria-label="edit"
          onClick={e => this.handleToggle('onVideoMute', e)}>
          <VideoCamIcon />
        </Button>
        <Button className={classes.button} fab
          color="accent"
          aria-label="edit"
          onClick={e => this.props.onEnd()}>
          <CallEndIcon />
        </Button>
        <Button className={classes.button} fab
          color="primary"
          aria-label="edit"
          onClick={e => this.handleFullScreen(videoElement, e)}>
          <FullscreenIcon />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(VideoControls);

function GoInFullscreen(element) {
  if (element.requestFullscreen)
    element.requestFullscreen();
  else if (element.mozRequestFullScreen)
    element.mozRequestFullScreen();
  else if (element.webkitRequestFullscreen)
    element.webkitRequestFullscreen();
  else if (element.msRequestFullscreen)
    element.msRequestFullscreen();
}

function GoOutFullscreen() {
  if (document.exitFullscreen)
    document.exitFullscreen();
  else if (document.mozCancelFullScreen)
    document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen)
    document.webkitExitFullscreen();
  else if (document.msExitFullscreen)
    document.msExitFullscreen();
}

function IsFullScreenCurrently() {
  var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;

  // If no element is in full-screen
  if (full_screen_element === null)
    return false;
  else
    return true;
}