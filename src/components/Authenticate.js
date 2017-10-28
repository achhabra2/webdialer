import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

@inject('store') @observer
class Authenticate extends Component {

  handleLogin = e => {
    e.preventDefault();
    this.props.store.api.authorization.initiateLogin();
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Button raised
          className={classes.button} onClick={this.handleLogin}>
          Click to Authorize
    </Button>
      </Grid>
    )
  }
}

export default withStyles(styles)(Authenticate);