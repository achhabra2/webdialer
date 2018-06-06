import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import VoiceChatIcon from 'material-ui-icons/VoiceChat';
import Draggable from 'react-draggable';
import IconButton from 'material-ui/IconButton';
import DragHandle from 'material-ui-icons/DragHandle';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import RoomSuggest from './RoomSuggest';
import validator from 'validator';
import { withStyles } from 'material-ui/styles';

const textFieldStyle = {
  minWidth: '180px'
};

const overlayStyle = {
  position: 'relative',
  right: '15px',
  top: '15px',
  margin: '10px',
  zIndex: 6
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180
  },
  paper: theme.mixins.gutters({
    position: 'relative',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    maxWidth: 500,
    minWidth: 180,
    margin: 'auto'
  }),
  textFieldStyle: {
    minWidth: '400px'
  }
});

class Dialer extends PureComponent {
  static propTypes = {
    onDial: PropTypes.func,
    className: PropTypes.string,
    spaceString: PropTypes.string,
    callString: PropTypes.string,
    mayday: PropTypes.bool,
    widget: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      callString: this.props.callString || '',
      spaceString: this.props.spaceString || '',
      sipCall: false,
      formValid: false,
      uriValid: true,
      spaceIdMode: false,
      mayday: this.props.mayday || false,
      widget: this.props.widget || false
    };
  }

  handleChange = name => event => {
    if (name === 'callString') {
      if (validator.isEmail(event.target.value)) {
        this.setState({ uriValid: true, formValid: true });
      } else {
        this.setState({ uriValid: false });
      }
    } else if (name === 'spaceString') {
      this.setState({ uriValid: true, formValid: true });
    }
    this.setState({
      [name]: event.target.value
    });
  };

  handleDial = event => {
    event.preventDefault();
    let dialStr;
    this.state.sipCall && !this.state.widget
      ? (dialStr = `sip:${this.state.callString}`)
      : (dialStr = this.state.callString);
    this.props.onDial({
      callString: dialStr,
      spaceString: this.state.spaceString,
      widget: this.state.widget
    });
  };

  handleSwitch = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  renderMayday() {
    return (
      <Draggable>
        <div style={overlayStyle}>
          <IconButton aria-label="Drag">
            <DragHandle />
          </IconButton>
          <Button
            fab
            color="primary"
            aria-label="edit"
            onClick={this.handleDial}
          >
            <VoiceChatIcon />
          </Button>
        </div>
      </Draggable>
    );
  }
  renderDialer() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={8}>
        <Typography type="headline" component="h3">
          Place a Spark Video Call
        </Typography>
        <Typography component="p">
          Enter address to call and select SDK or Widget mode.
        </Typography>
        <Divider />
        <form autoComplete="off">
          <FormGroup>
            {!this.props.callString &&
              (!this.state.spaceIdMode || !this.state.widget) && (
                <TextField
                  required
                  id="uri"
                  label="Enter Address"
                  margin="normal"
                  type="email"
                  error={!this.state.uriValid}
                  placeholder="roomkit@sparkdemos.com"
                  helperText="(eg. user@domain.com)"
                  fullWidth={true}
                  value={this.state.callString}
                  onChange={this.handleChange('callString')}
                  style={textFieldStyle}
                />
              )}
            {!this.props.callString &&
              this.state.spaceIdMode &&
              this.state.widget && (
                <RoomSuggest onChange={this.handleChange('spaceString')} />
              )}
            {!this.props.callString && (
              <FormGroup>
                {!this.state.widget && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.sipCall}
                        onChange={this.handleSwitch('sipCall')}
                        aria-label="Sip Call"
                      />
                    }
                    label={this.state.sipCall ? 'SIP Call' : 'Spark Call'}
                    className={classes.formControl}
                  />
                )}
                {this.state.widget && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.spaceIdMode}
                        onChange={this.handleSwitch('spaceIdMode')}
                        aria-label="Space Mode"
                      />
                    }
                    label="Space Mode"
                    className={classes.formControl}
                  />
                )}
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.widget}
                      onChange={this.handleSwitch('widget')}
                      aria-label="Widget Mode"
                    />
                  }
                  label={this.state.widget ? 'Widget' : 'SDK'}
                  className={classes.formControl}
                />
              </FormGroup>
            )}
            <Button
              color="primary"
              disabled={!this.state.formValid}
              raised
              type="submit"
              onClick={this.handleDial}
            >
              Place Call
            </Button>
          </FormGroup>
        </form>
      </Paper>
    );
  }
  render() {
    const { mayday, callString, spaceString } = this.state;
    return (
      <div style={{ padding: '16px' }}>
        {mayday && (callString || spaceString)
          ? this.renderMayday()
          : this.renderDialer()}
      </div>
    );
  }
}

export default withStyles(styles)(Dialer);
