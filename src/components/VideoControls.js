import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button';
import VideoCamIcon from 'material-ui-icons/VideocamOff';
import VolumeMuteIcon from 'material-ui-icons/VolumeMute';
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
  }

  muted = (property) => {
    return this.props[property]? 'accent' : 'primary';
  };

  handleToggle = (handler) => this.props[handler];

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Button className={classes.button} fab 
        color={this.muted('audioMuted')}
        aria-label="add" 
        onClick={this.handleToggle('onAudioMute')}>
        <VolumeMuteIcon />
        </Button>
        <Button className={classes.button} fab 
        color={this.muted('videoMuted')} 
        aria-label="edit" 
        onClick={this.handleToggle('onVideoMute')}>
        <VideoCamIcon />
        </Button>
        <Button className={classes.button} fab 
        color="accent" 
        aria-label="edit" 
        onClick={this.props.onEnd}>
        <CallEndIcon />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(VideoControls);