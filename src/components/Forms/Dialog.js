import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import validator from 'validator';

export default class URIDialog extends React.Component {

  state = {
    uri: ''
  }

  handleChange = name => event => {
    if (name === "uri") {
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

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.uri);
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter email of the Spark User you want to call.
            </DialogContentText>
          <TextField
            autoFocus
            error={!this.state.uriValid}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={this.state.uri}
            onChange={this.handleChange('uri')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={this.handleSubmit} disabled={!this.state.uriValid} color="primary">
            Submit
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}