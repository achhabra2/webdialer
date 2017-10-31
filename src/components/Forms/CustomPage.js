import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, Item } from './FlexComponents';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '25%',
  },
});


class CustomPage extends PureComponent {
  static propTypes = {

  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handlePage = event => {
    // Set your options
    const w = window.innerWidth * .9;
    const options = {
      url: this.state.baseUrl,
      retina: true,
      format: 'png',
      width: w,
    };
    // this.imgInput.src = urlbox.buildUrl(options);
  };

  render() {
    const {classes} = this.props; 
    return (
      <Container component='form' noValidate autoComplete='off' >
        <TextField
          required
          id="required"
          label="Enter URL"
          margin="normal"
          className={classes.textField}
          onChange={this.handleChange('baseUrl')}
        />
        <TextField
          required
          id="required"
          label="Address to Call"
          margin="normal"
          className={classes.textField}
          onChange={this.handleChange('URI')}
        />
        <Button color='primary' className={classes.button}
          raised onClick={this.handlePage}>
          Render Page
        </Button>
      </Container>
    )
  }
}

export default withStyles(styles)(CustomPage);