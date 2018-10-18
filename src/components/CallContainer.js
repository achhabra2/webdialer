import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import update from 'immutability-helper';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import VideoControls from './VideoControls';
import Dialer from './Dialer';
import Video from './Video';
import IncomingToast from './IncomingToast';
import Draggable from 'react-draggable';
import ReactGA from 'react-ga';
import WidgetContainer from './WidgetContainer';

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30,
    textAlign: 'center'
  },
  progress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 10
    // verticalAlign: 'middle',
  },
  root: theme.mixins.gutters({
    paddingTop: 2,
    paddingBottom: 2,
    margin: 'auto'
  }),
  hidden: {
    display: 'none'
    // visibility: 'hidden'
  },
  draggable: {
    visibility: 'visible'
  }
});

@inject('store')
@observer
class CallContainer extends Component {
  static defaultProps = {
    widgetSize: '90%',
    onCallConnected() {
      console.log('Call Connected Event');
    },
    onCallDisconnected() {
      console.log('Call Disconnected Event');
    }
  };

  static propTypes = {
    callString: PropTypes.string,
    spaceString: PropTypes.string,
    mayday: PropTypes.bool,
    widget: PropTypes.bool,
    onCallConnected: PropTypes.func,
    onCallDisconnected: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.call = {};
    this.state = {
      loading: false,
      incomingCall: false,
      uriString: this.props.callString || '',
      spaceString: this.props.spaceString || '',
      callActive: false,
      callState: {
        audioMuted: false,
        videoMuted: false
      },
      videoElement: null,
      mayday: this.props.mayday || false,
      widget: this.props.widget || false
    };
  }

  componentDidMount() {
    if (this.props.store.authenticated) {
      this.props.store.api.phone.register();
      this.props.store.api.phone.on('call:incoming', call => {
        this.setState(state => ({ incomingCall: true }));
        this.call = call;
        this.bindCallEvents(this.call);
        // Let the caller know that you've indicated to the callee that there's an incoming call
        call.acknowledge();
      });
    }
    if (this.props.immediate && this.props.callString)
      this.placeCall({ callString: this.props.callString, widget: false });
    if (this.props.immediate && this.props.spaceString)
      this.placeCall({ spaceString: this.props.spaceString, widget: true });
  }

  incomingVideoInput = input => {
    this.incomingVideo = input;
  };

  incomingAudioInput = input => {
    this.incomingAudio = input;
  };

  fullScreenInput = input => {
    this.setState({ videoElement: input });
  };

  outgoingVideoInput = input => {
    this.outgoingVideo = input;
  };

  handleCallInput = e => {
    console.log(e.target.value);
    this.setState({ callString: e.target.value });
  };

  handleHangUp = e => {
    !this.state.widget && this.call.hangup();
    this.setState({
      callActive: false
      // widget: false,
      // callString: ''
    });
    ReactGA.event({
      category: 'Call',
      action: 'Ended'
    });
    this.props.onCallDisconnected();
  };

  // onWidgetClose = e => {
  //   this.setState({
  //     callActive: false,
  //     widget: false,
  //     callString: ''
  //   });
  // }

  handleMute = e => {
    this.call.toggleSendingAudio();
    this.setState(state =>
      update(state, {
        $merge: { callState: { audioMuted: !state.callState.audioMuted } }
      })
    );
  };

  handleVideoMute = e => {
    this.call.toggleSendingVideo();
    this.setState(state =>
      update(state, {
        $merge: { callState: { videoMuted: !state.callState.videoMuted } }
      })
    );
  };

  handleAccept = e => {
    this.setState(state => ({ incomingCall: false, loading: true }));
    this.call.answer();
    ReactGA.event({
      category: 'Call',
      action: 'Answered'
    });
  };

  handleIgnore = e => {
    this.setState(state => ({ incomingCall: false }));
    this.call.reject();
  };

  placeCall = options => {
    ReactGA.event({
      category: 'Call',
      action: 'Placed'
    });
    this.props.onCallConnected();
    const { callString = '', spaceString, widget } = options;
    if (widget) {
      this.setState({
        widget: true,
        uriString: callString,
        spaceString: spaceString,
        loading: false,
        callActive: true
      });
    } else {
      this.call = this.props.store.api.phone.dial(callString);
      this.bindCallEvents(this.call);
    }
  };

  bindCallEvents = call => {
    let incomingVideo = this.incomingVideo;
    let outgoingVideo = this.outgoingVideo;
    let incomingAudio = this.incomingAudio;

    this.setState(state => ({ loading: true, widget: false }));
    call.on('active', () => {
      console.log('Call Active');
      this.setState(state => ({ loading: false, callActive: true }));
    });
    call.on('remoteMediaStream:change', () => {
      console.log('Connected! ');
      this.setState(state => ({ loading: false, callActive: true }));
      const tracks = ['audio', 'video'];
      tracks.forEach(kind => {
        if (call.remoteMediaStream) {
          const track = call.remoteMediaStream
            .getTracks()
            .find(t => t.kind === kind);
          if (track) {
            if (kind === 'video')
              incomingVideo.srcObject = new MediaStream([track]);
            if (kind === 'audio')
              incomingAudio.srcObject = new MediaStream([track]);
          }
        }
      });
    });
    call.on('localMediaStream:change', () => {
      outgoingVideo.srcObject = call.localMediaStream;
    });
    call.on('inactive', () => {
      // Remove the streams from the UI elements
      outgoingVideo.srcObject = undefined;
      incomingVideo.srcObject = undefined;
      incomingAudio.srcObject = undefined;
      this.handleHangUp(call);
    });
  };

  render() {
    const { classes, callString } = this.props;
    const {
      loading,
      callActive,
      incomingCall,
      mayday,
      widget,
      uriString,
      spaceString
    } = this.state;

    return (
      <div className={this.props.className} style={this.props.style}>
        {loading && (
          <div className={classes.progress}>
            <CircularProgress size={80} color="accent" />
          </div>
        )}
        {!callActive &&
          !loading && (
            <Dialer
              mayday={mayday}
              widget={widget}
              callString={callString}
              spaceString={spaceString}
              onDial={this.placeCall}
            />
          )}
        <IncomingToast
          open={incomingCall}
          onAnswer={this.handleAccept}
          onIgnore={this.handleIgnore}
        />
        {widget && callActive ? (
          <WidgetContainer
            size={this.props.widgetSize}
            onWidgetClose={this.handleHangUp}
            data={{
              toPersonEmail: uriString,
              spaceId: spaceString,
              startCall: false
            }}
          />
        ) : (
          <div className={callActive ? classes.draggable : classes.hidden}>
            <Draggable>
              <Paper className={classes.root} elevation={10}>
                <Video
                  incoming={this.incomingVideoInput}
                  outgoing={this.outgoingVideoInput}
                  incomingAudio={this.incomingAudioInput}
                  fullScreen={this.fullScreenInput}
                >
                  <VideoControls
                    onAudioMute={this.handleMute}
                    onVideoMute={this.handleVideoMute}
                    onEnd={this.handleHangUp}
                    videoMuted={this.state.callState.videoMuted}
                    audioMuted={this.state.callState.audioMuted}
                    videoElement={this.state.videoElement}
                  />
                </Video>
              </Paper>
            </Draggable>
          </div>
        )}
      </div>
    );
  }
}

CallContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CallContainer);
