import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {Container, Item} from './FlexComponents';

export default class componentName extends PureComponent {
  static propTypes = {
    onDial: PropTypes.func,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      callString: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDial = event => {
    this.props.onDial(this.state.callString);
  };

  render() {
    return (
      <div className={this.props.className}>
        <TextField
          required
          id="required"
          label="Enter Address"
          margin="normal"
          fullWidth={true}
          onChange={this.handleChange('callString')}
        />
        <Button color='primary' raised onClick={this.handleDial}>
          Place Call
        </Button>
      </div>
    )
  }
}
