import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import RoomSuggest from '../RoomSuggest';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: '300px'
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: '120px'
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const controlStyle = {
  minWidth: '180px',
  maxWidth: '500px',
  textAlign: 'center',
  margin: 'auto'
};

class CustomPage extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: '',
      callString: '',
      spaceString: '',
      sipCall: false,
      widget: false,
      mayday: true,
      formValid: false,
      uriValid: true,
      urlValid: true,
      spaceMode: false,
      callSize: '40%'
    };
  }

  handleChange = name => event => {
    if (name === 'baseUrl') {
      let bool = validator.isURL(event.target.value, {
        require_protocol: true
      });
      bool
        ? this.setState({ urlValid: true })
        : this.setState({ urlValid: false });
      bool &&
        this.state.uriValid &&
        (this.state.callString || this.state.spaceString) &&
        this.setState({ formValid: true });
    } else if (name === 'callString') {
      let bool = validator.isEmail(event.target.value);
      bool
        ? this.setState({ uriValid: true })
        : this.setState({ uriValid: false });
      bool &&
        this.state.urlValid &&
        this.state.baseUrl &&
        this.setState({ formValid: true });
    } else if (name === 'spaceString') {
      if (event.target.value) this.setState({ uriValid: true });
      if (this.state.urlValid && this.state.baseUrl)
        this.setState({ formValid: true });
    }
    this.setState({
      [name]: event.target.value
    });
  };

  handlePage = event => {
    event.preventDefault();
    let temp = { ...this.state };
    if (this.state.sipCall && !this.state.widget) {
      temp.callString = `sip:${this.state.callString}`;
    }
    if (this.state.widget && this.state.spaceMode) {
      temp.callString = '';
    }
    this.props.onSubmit(temp, event);
  };

  handleSwitch = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={8}>
        <Typography type="headline" component="h3">
          Custom Website Video Demo
        </Typography>
        <Typography component="p">
          Enter the URL of a site you want to overlay Spark Video SDK or Widget
          on top of.
        </Typography>
        <Divider />
        <form noValidate autoComplete="off" style={controlStyle}>
          <FormGroup>
            <TextField
              required
              id="URL"
              label="Branding Website URL"
              margin="normal"
              error={!this.state.urlValid}
              placeholder="https://www.cisco.com/"
              helperText="(Enter Full URL)"
              type="url"
              className={classes.textField}
              fullWidth={true}
              onChange={this.handleChange('baseUrl')}
            />
            {this.state.widget && this.state.spaceMode ? (
              <RoomSuggest onChange={this.handleChange('spaceString')} />
            ) : (
              <TextField
                required
                id="URI"
                error={!this.state.uriValid}
                label="Spark or URI Calling Address"
                placeholder="roomkit@sparkdemos.com"
                helperText="(eg. user@domain.com)"
                margin="normal"
                type="email"
                className={classes.textField}
                fullWidth={true}
                onChange={this.handleChange('callString')}
              />
            )}
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

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.widget}
                    onChange={this.handleSwitch('widget')}
                    aria-label="Widget Mode"
                  />
                }
                label={this.state.widget ? 'Widget' : 'SDK'}
              />
              {this.state.widget ? (
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.spaceMode}
                      onChange={this.handleSwitch('spaceMode')}
                      aria-label="Space Mode"
                    />
                  }
                  label="Space Mode"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.sipCall}
                      onChange={this.handleSwitch('sipCall')}
                      aria-label="Sip Call"
                    />
                  }
                  label={this.state.sipCall ? 'SIP Call' : 'Spark Call'}
                />
              )}
            </FormGroup>

            <Button
              color="primary"
              disabled={!this.state.formValid}
              type="submit"
              className={classes.button}
              raised
              onClick={this.handlePage}
            >
              Run
            </Button>
          </FormGroup>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(CustomPage);
