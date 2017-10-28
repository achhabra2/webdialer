import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

export default class componentName extends PureComponent {
  static propTypes = {
    onDial: PropTypes.func
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
      <Grid item xs={12}>
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
      </Grid>
    )
  }
}
