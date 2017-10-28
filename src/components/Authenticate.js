import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

@inject('store') @observer
class Authenticate extends PureComponent {

  handleLogin = e => {
    e.preventDefault();
    this.props.store.api.authorization.initiateLogin();
  }

  render() {
    const {classes} = this.props;
    return (
      <Button raised 
      className={classes.button} onClick={this.handleLogin}>
        Click to Authorize
    </Button>
    )
  }
}

export default withStyles(styles)(Authenticate);