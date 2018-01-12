import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText, FormGroup } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import c from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textFieldStyle: {
    minWidth: '400px',
  }
});

class CareForm extends PureComponent {

  static propTypes = {
    dataset: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { dataset } = this.props;
    let forms = {};
    for (let form of dataset) {
      Object.assign(forms, {
        [form.name]: '',
        [form.name + 'Error']: false
      })
    }
    this.setState({ ...forms });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.target.value ? this.setState({ [event.target.name + 'Error']: false }) : this.setState({ [event.target.name + 'Error']: true })
  };

  handleClick = event => {
    const { dataset } = this.props;
    let error = false;
    for (const field of dataset) {
      if (this.state[field.name] || field.required === false) {
        this.setState({ [field.name + 'Error']: false });
      }
      else {
        this.setState({ [field.name + 'Error']: true });
        error = true;
      }
    }
    !error && this.props.handleSubmit(this.state);
  }

  renderFormControls(dataset) {
    const { classes } = this.props;
    return dataset.map(form => {
      return {
        'select': (
            <FormControl
              required={form.required}
              error={this.state[form.name + 'Error']}
              className={classes.formControl}
              key={form.name}>
              <InputLabel htmlFor={form.name}>{form.description}</InputLabel>
              <Select
                value={this.state[form.name]}
                onChange={this.handleChange}
                input={<Input name={form.name} id={form.name} />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {form.data && form.data.map(entry => <MenuItem value={entry.value} key={entry.value}>{entry.name}</MenuItem>)}
              </Select>
              <FormHelperText>{form.help}</FormHelperText>
            </FormControl>
          ),
        'text': (
            <TextField
              error={this.state[form.name + 'Error']}
              key={form.name}
              required={form.required}
              name={form.name}
              label={form.description}
              margin="normal"
              helperText={form.help}
              fullWidth={true}
              value={this.state[form.name]}
              onChange={this.handleChange}
              className={classes.textFieldStyle} />
          )
      }[form.type]
    })
  }

  render() {
    const { classes, dataset, header, subheader, submitText } = this.props;
    return (
      <Paper className={c(classes.paper, 'animated fadeInDown')} elevation={8}>
        <Typography type="headline" component="h3">
          {header || 'Help Request Kiosk'}
        </Typography>
        <Typography component="p">
          {subheader || 'Please select the product you need help with and which department you\'d like to reach.'}
        </Typography>
        <Divider />
        <form autoComplete="off">
          <FormGroup>
            {this.renderFormControls(dataset)}
            <Divider />
            <Button color='primary'
              raised
              type="submit"
              onClick={this.handleClick}>
              {submitText || 'Get Help'}
            </Button>
          </FormGroup>
        </form>
      </Paper>
    )
  }
}

export default withStyles(styles)(CareForm);

