import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import update from 'immutability-helper';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import VideoControls from './VideoControls';
import Dialer from './Dialer';
import Video from './Video';
import IncomingToast from './IncomingToast';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30,
    textAlign: 'center',
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

@inject('store') @observer
class CallContainer extends Component {

  constructor(props) {
    super(props);
    this.call = {};
    this.state = {
      loading: false,
      incomingCall: false,
      callString: '',
      callActive: false,
      callState: {
        audioMuted: false,
        videoMuted: false,
      }
    }
  }

  componentDidMount() {
    console.log('Component will mount');
    console.log(this.props.store.authenticated);
    let incomingVideo = this.incomingVideo;
    let outgoingVideo = this.outgoingVideo;

    if (this.props.store.authenticated) {
      this.props.store.api.phone.register();
      this.props.store.api.phone.on('call:incoming', (call) => {
        this.setState(state => ({ incomingCall: true }));
        this.call = call;
        // Set up listeners to update the UI if the callee chooses to answer the call.
        call.on('remoteMediaStream:change', () => {
          incomingVideo.srcObject = call.remoteMediaStream;
        });
        call.on('localMediaStream:change', () => {
          outgoingVideo.srcObject = call.localMediaStream;
          // Mute the local video so you don't hear yourself speaking
          outgoingVideo.muted = true;
        });

        // Let the caller know that you've indicated to the callee that there's an incoming call
        call.acknowledge();
      });
    }
    
  }

  componentWillReceiveProps(nextProps) {
    console.log('Will receive props..');
    // let incomingVideo = this.incomingVideo;
    // let outgoingVideo = this.outgoingVideo;

    // if (nextProps.store.authenticated) {
    //   this.props.store.api.phone.register();
    //   this.props.store.api.phone.on('call:incoming', (call) => {
    //     this.setState(state => ({ incomingCall: true }));
    //     this.call = call;
    //     // Set up listeners to update the UI if the callee chooses to answer the call.
    //     call.on('remoteMediaStream:change', () => {
    //       incomingVideo.srcObject = call.remoteMediaStream;
    //     });
    //     call.on('localMediaStream:change', () => {
    //       outgoingVideo.srcObject = call.localMediaStream;
    //       // Mute the local video so you don't hear yourself speaking
    //       outgoingVideo.muted = true;
    //     });

    //     // Let the caller know that you've indicated to the callee that there's an incoming call
    //     call.acknowledge();
    //   });
    // }
  }

  incomingVideoInput = input => {
    console.log('Incoming Video Input:');
    console.log(input);
    this.incomingVideo = input;
  }

  outgoingVideoInput = input => {
    console.log('Outgoing Video Input:');
    console.log(input);
    this.outgoingVideo = input;
  }

  handleCallInput = e => {
    console.log(e.target.value);
    this.setState({ callString: e.target.value });
  }

  handleHangUp = e => {
    this.call.hangup();
    this.setState({
      callActive: false
    });
  }

  handleMute = e => {
    this.call.toggleSendingAudio();
    this.setState(state => update(state, { $merge: { callState: { audioMuted: !state.callState.audioMuted } } }));
  }

  handleVideoMute = e => {
    this.call.toggleSendingVideo();
    this.setState(state => update(state, { $merge: { callState: { videoMuted: !state.callState.videoMuted } } }));
  }

  handleAccept = e => {
    this.setState(state => ({incomingCall: false}));
    this.call.answer();
  }

  handleIgnore = e => {
    this.setState(state => ({incomingCall: false}));
    this.call.reject();
  }

  placeCall = callString => {
    let incomingVideo = this.incomingVideo;
    let outgoingVideo = this.outgoingVideo;
    this.call = this.props.store.api.phone.dial(callString);
    this.setState(state => ({ loading: true }));
    this.call.on('active', () => {
      console.log('Call Active');
      this.setState(state => ({ loading: false, callActive: true }));
    });
    this.call.on('remoteMediaStream:change', () => {
      console.log('Connected! ')
      incomingVideo.srcObject = this.call.remoteMediaStream;
      this.setState(state => ({ loading: false, callActive: true }));
    });
    this.call.on('localMediaStream:change', () => {
      outgoingVideo.srcObject = this.call.localMediaStream;
      // Mute the local video so you don't hear yourself speaking
      outgoingVideo.muted = true;
    });
  }

  render() {
    const { classes } = this.props;
    const { loading, callActive, incomingCall } = this.state;
    return (
      <div>
        {loading && <CircularProgress className={classes.progress} size={50} />}
        {!callActive && !loading && <Dialer onDial={this.placeCall} />}
        <IncomingToast open={incomingCall} onAnswer={this.handleAccept} onIgnore={this.handleIgnore} />
        <Grid item xs={12}>
          <Paper className={classes.root} elevation={4}>
            <Typography type="headline" component="h4">
              Spark Video Call
        </Typography>
            <Video incoming={this.incomingVideoInput} outgoing={this.outgoingVideoInput} />
            <VideoControls onAudioMute={this.handleMute}
              onVideoMute={this.handleVideoMute}
              onEnd={this.handleHangUp}
              videoMuted={this.state.callState.videoMuted}
              audioMuted={this.state.callState.audioMuted} />
          </Paper>
        </Grid>
      </div>
    );
  }
}

CallContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CallContainer);