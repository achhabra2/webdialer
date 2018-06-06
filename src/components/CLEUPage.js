import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CallContainer from './CallContainer';
import Button from 'material-ui/Button';
import ArrowBack from 'material-ui-icons/ArrowBack';
import WidgetIcon from 'material-ui-icons/Widgets';
import PlayArrow from 'material-ui-icons/Videocam';
import { blue, cyan } from 'material-ui/colors';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import URIDialog from './Forms/Dialog';

const siteTheme = createMuiTheme({
  palette: {
    contrastThreshold: 3,
    tonalOffset: 0.2,
    primary: { main: '#84a499' },
    secondary: { main: '#cccccc' }
  }
});

const defaultTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: cyan,
  }
});

const buttonStyle = {
  position: 'absolute',
  left: '50px',
  bottom: '50px',
  zIndex: 10
}

const fab = {
  margin: '5px',
}

const container = {
  position: 'relative',
  margin: 0,
  padding: 0,
  height: '100%',
  overflow: 'hidden',
  paddingBottom: '56.25%'
}

const iframe = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2
}

const overlay = {
  position: 'absolute',
  right: '15px',
  top: '15px',
  margin: '10px',
  width: '40%',
  zIndex: 5
}

const widgetOverlay = {
  position: 'absolute',
  right: '15px',
  top: '15px',
  margin: '10px',
  width: '50%',
  zIndex: 5
}

@inject('store') @observer
class CLEUPage extends Component {

  state = {
    showSDKCall: false,
    showWidgetCall: false,
    callString: '',
    dialogOpen: false
  }

  componentWillMount() {
    this.props.store.setNavbarHidden(true);
  }

  componentWillUnmount() {
    this.props.store.setNavbarHidden(false);
  }

  handleBack = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/call');
  }

  handleSDKCall = event => {
    event.preventDefault();
    this.setState({ showSDKCall: !this.state.showSDKCall })
  }

  handleWidgetCall = event => {
    event.preventDefault();
    if (this.state.callString !== '') {
      this.setState({ showWidgetCall: !this.state.showWidgetCall })
    }
    else {
      this.setState({ dialogOpen: true })
    }
  }

  handleDialogClose = event => {
    event.preventDefault();
    this.setState({ dialogOpen: false });
  }

  handleDialogSubmit = callString => {
    this.setState({ callString: callString, dialogOpen: false, showWidgetCall: true });
  }

  render() {
    return (
      <MuiThemeProvider theme={siteTheme}>
        <div style={container}>
          <URIDialog open={this.state.dialogOpen} handleClose={this.handleDialogClose} handleSubmit={this.handleDialogSubmit} />
          <div style={buttonStyle}>
            <Tooltip id="tooltip-back" title="Back to Webdialer" position="bottom" >
              <Button fab color="primary" aria-label="back" onClick={this.handleBack}>
                <ArrowBack />
              </Button>
            </Tooltip>
            <Tooltip id="tooltip-video-sdk" title="Video SDK Demo" style={fab}>
              <Button fab aria-label="reload" color="accent" onClick={this.handleSDKCall}>
                <PlayArrow />
              </Button>
            </Tooltip>
            <Tooltip id="tooltip-widget" title="Spark Widget Demo" style={fab}>
              <Button fab aria-label="reload" color="accent" onClick={this.handleWidgetCall}>
                <WidgetIcon />
              </Button>
            </Tooltip>
          </div>
          {this.state.showSDKCall &&
            (
              <CallContainer
                className={'animated fadeInDown'}
                mayday={true}
                callString={'sip:roomkit@sparkdemos.com'}
                style={overlay} />
            )}
          {this.state.showWidgetCall &&
            (
              <MuiThemeProvider theme={defaultTheme}>
                <CallContainer
                  className={'animated fadeInDown'}
                  widgetSize={'50%'}
                  widget={true}
                  mayday={true}
                  callString={this.state.callString}
                  style={widgetOverlay} />
              </MuiThemeProvider>
            )}
          <iframe title="Demo Site" src='https://cleu.chhab.rocks/index.html'
            frameBorder="0" allowFullScreen style={iframe}></iframe>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default CLEUPage;