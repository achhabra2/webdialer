import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import { Container, Item } from './FlexComponents';
import VoiceChatIcon from 'material-ui-icons/VoiceChat';
import Draggable from 'react-draggable';
import IconButton from 'material-ui/IconButton';
import DragHandle from 'material-ui-icons/DragHandle';
import validator from 'validator';

const containerStyle = {
  flexDirection: 'column',
  alignItems: 'baseline',
  alignContent: 'flex-start',
  width: '100%',
  textAlign: 'center',
};

const textFieldStyle = {
  minWidth: '400px',
}

export default class Dialer extends PureComponent {
  static propTypes = {
    onDial: PropTypes.func,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      callString: this.props.callString || '',
      sipCall: true,
      formValid: false,
      uriValid: true,
      mayday: this.props.mayday || false,
      widget: this.props.widget || false
    };
  }

  handleChange = name => event => {
    if (name === "callString") {
      if (validator.isEmail(event.target.value)) {
        this.setState({ uriValid: true, formValid: true });
      }
      else {
        this.setState({ uriValid: false })
      }
    }
    this.setState({
      [name]: event.target.value
    });
  };

  handleDial = event => {
    let dialStr;
    (this.state.sipCall && !this.state.widget) ? dialStr = `sip:${this.state.callString}` : dialStr = this.state.callString;
    this.props.onDial({ callString: dialStr, widget: this.state.widget });
  };

  handleSwitch = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  renderMayday() {
    return (
      <Draggable>
        <Container className={this.props.className} style={containerStyle}>
          <IconButton aria-label="Drag" disabled color="primary">
            <DragHandle />
          </IconButton>
          <Button fab
            color="primary"
            aria-label="edit" onClick={this.handleDial} >
            <VoiceChatIcon />
          </Button>
        </Container>
      </Draggable>
    )
  }
  renderDialer() {
    return (
      <Container className={this.props.className} style={containerStyle} component="form" autoComplete="off">
        {!this.props.callString && (
          <Item flex='1 1 60%%'>
            <TextField
              required
              id="uri"
              label="Enter Address"
              margin="normal"
              type="email"
              error={!this.state.uriValid}
              placeholder='roomkit@sparkdemos.com'
              helperText='(eg. user@domain.com)'
              fullWidth={true}
              value={this.state.callString}
              onChange={this.handleChange('callString')}
              style={textFieldStyle} />
          </Item>
        )}
        {!this.props.callString && (
          <Item flex='1 1 60%'>
            {!this.state.widget && <FormGroup style={textFieldStyle}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.sipCall}
                    onChange={this.handleSwitch('sipCall')}
                    aria-label="Sip Call"
                  />}
                label={this.state.sipCall ? 'SIP Call' : 'Spark Call'} />
            </FormGroup>}
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.widget}
                    onChange={this.handleSwitch('widget')}
                    aria-label="Widget Mode"
                  />}
                label={this.state.widget ? 'Widget' : 'SDK'} />
            </FormGroup>
          </Item>
        )}
        <Item flex='1 1 100%'>
          <Button color='primary' disabled={!this.state.formValid} raised type="submit" onClick={this.handleDial}>
            Place Call
        </Button>
        </Item>
      </Container>
    )
  }
  render() {
    return (
      <div>
        {(this.props.mayday && this.props.callString) ? this.renderMayday() : this.renderDialer()}
      </div>
    )
  }
}