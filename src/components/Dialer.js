import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import { Container, Item } from './FlexComponents';
import VideoCamIcon from 'material-ui-icons/VideocamOff';
import Draggable from 'react-draggable';
import IconButton from 'material-ui/IconButton';
import DragHandle from 'material-ui-icons/DragHandle';

const containerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  width: '100%'
};

export default class Dialer extends PureComponent {
  static propTypes = {
    onDial: PropTypes.func,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      callString: this.props.callString || '',
      sipCall: false,
      mayday: this.props.mayday || false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDial = event => {
    let dialStr;
    this.state.sipCall ? dialStr = `sip:${this.state.callString}` : dialStr = this.state.callString;
    this.props.onDial(dialStr);
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
            <VideoCamIcon />
          </Button>
        </Container>
      </Draggable>
    )
  }
  renderDialer() {
    return (
      <Container className={this.props.className} style={containerStyle}>
        {!this.props.callString && (
          <Item flex='0 0 100%'>
            <TextField
              required
              id="required"
              label="Enter Address"
              margin="normal"
              fullWidth={true}
              onChange={this.handleChange('callString')} />
          </Item>
        )}
        {!this.props.callString && (
          <Item flex='0 0 100%'>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.sipCall}
                    onChange={this.handleSwitch('sipCall')}
                    aria-label="Sip Call"
                  />}
                label='SIP Call' />
            </FormGroup>
          </Item>
        )}
        <Item flex='0 0 100%'>
          <Button color='primary' raised onClick={this.handleDial}>
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
