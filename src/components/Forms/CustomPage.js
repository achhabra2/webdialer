import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, Item } from '../FlexComponents';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import validator from 'validator';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: '300px',
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: '120px',
  }
});

const controlStyle = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignContent: 'baseline',
  width: '90%',
  textAlign: 'center',
  margin: 'auto',
};

const textStyle = {
  flexDirection: 'column',
  alignItems: 'stretch',
  alignContent: 'stretch',
  flex: '1 1 auto',
};

class CustomPage extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: '',
      callString: '',
      sipCall: true,
      widget: false,
      mayday: true,
      formValid: false,
      uriValid: true,
      urlValid: true,
      callSize: '25%',
    }
  }

  handleChange = name => event => {
    if (name === "baseUrl") {
      let bool = validator.isURL(event.target.value, {require_protocol: true});
      bool? this.setState({urlValid: true}) : this.setState({urlValid: false});
      bool && this.state.uriValid && this.state.callString && this.setState({formValid: true});
    }
    else if (name === "callString") {
      let bool = validator.isEmail(event.target.value) 
      bool? this.setState({uriValid: true}) : this.setState({uriValid: false});
      bool && this.state.urlValid && this.state.baseUrl && this.setState({formValid: true});
    }
    this.setState({
      [name]: event.target.value
    });
  };

  handlePage = event => {
    let temp = { ...this.state };
    if (this.state.sipCall && !this.state.widget) {
      temp.callString = `sip:${this.state.callString}`;
    }
    this.props.onSubmit(temp, event);
  };

  handleSwitch = name => (event, checked) => {
    this.setState({ [name]: checked });
  };


  render() {
    const { classes } = this.props;
    return (
      <Container component='form' noValidate autoComplete='off' style={controlStyle}>
        <Item flex='1 1 60%'>
          <TextField
            required
            id="URL"
            label="Branding Website URL"
            margin="normal"
            error={!this.state.urlValid}
            placeholder='https://www.cisco.com/'
            helperText='(Enter Full URL)'
            type="url"
            className={classes.textField}
            fullWidth={true}
            onChange={this.handleChange('baseUrl')}
          />
          <TextField
            required
            id="URI"
            error={!this.state.uriValid}
            label="Spark or URI Calling Address"
            placeholder='roomkit@sparkdemos.com'
            helperText='(eg. user@domain.com)'
            margin="normal"
            type="email"
            className={classes.textField}
            fullWidth={true}
            onChange={this.handleChange('callString')}
          />
        </Item>
        <Item flex='1 1 40%' textAlign='right'>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="container-size">Video Size</InputLabel>
            <Select
              value={this.state.callSize}
              fullWidth={true}
              onChange={this.handleChange('callSize')}
              input={<Input id="container-size" />}
            >
              <MenuItem value={'25%'}>25%</MenuItem>
              <MenuItem value={'30%'}>30%</MenuItem>
              <MenuItem value={'40%'}>40%</MenuItem>
              <MenuItem value={'50%'}>50%</MenuItem>
              <MenuItem value={'60%'}>60%</MenuItem>
              <MenuItem value={'75%'}>75%</MenuItem>
            </Select>
          </FormControl>
        </Item>
        <Item flex='1 1 40%'>
          {!this.state.widget && (<FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.sipCall}
                  onChange={this.handleSwitch('sipCall')}
                  aria-label="Sip Call"
                />}
              label={this.state.sipCall ? 'SIP Call' : 'Spark Call'} />
          </FormGroup>)}
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
        <Item flex='0 0 100%'>
          <Button color='primary' disabled={!this.state.formValid} type="submit" className={classes.button}
            raised onClick={this.handlePage}>
            Run
        </Button>
        </Item>
      </Container>
    )
  }
}

export default withStyles(styles)(CustomPage);