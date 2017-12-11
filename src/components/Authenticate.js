import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Item, Container } from './FlexComponents';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

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

class Authenticate extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      guest: false,
      guestName: ''
    }
  }

  componentWillMount() {
    const name = window.localStorage.getItem('name');
    const sub = window.localStorage.getItem('sub');
    this.setState({ name, sub });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleGuestClick = event => {
    const { name, sub } = this.state;
    if (name && sub) {
      this.props.handleLoginGuest(null, { name, sub });
    }
    this.setState({ guest: true });
  }

  renderGuest() {
    const { classes, handleLoginGuest } = this.props;
    return (
      <Item flex='0 0 75%'>
        <TextField
          required
          id="required"
          label="Enter Name"
          margin="normal"
          placeholder='John Smith'
          fullWidth={true}
          value={this.state.guestName}
          onChange={this.handleChange('guestName')}
          style={textFieldStyle} />
        <Button raised
          className={classes.button} onClick={e => handleLoginGuest(e, { name: this.state.guestName })}>
          Submit
      </Button>
      </Item>
    )
  }
  renderInitial() {
    const { classes, handleLoginUser } = this.props;
    return (
      <Item flex='0 0 75%%'>
        <Button raised
          className={classes.button} onClick={handleLoginUser}>
          Login with Spark
    </Button>
        <Button raised
          className={classes.button} onClick={this.handleGuestClick}>
          Guest Access
    </Button>
      </Item>
    )
  }
  render() {
    return (this.state.guest ? this.renderGuest() : this.renderInitial());
  }
}

export default withStyles(styles)(Authenticate);