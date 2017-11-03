import React, { PureComponent } from 'react';
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


class Authenticate extends PureComponent {
  render() {
    const { classes, handleLogin } = this.props;
    return (
      <Grid item xs={12}>
        <Button raised
          className={classes.button} onClick={handleLogin}>
          Click to Authorize
    </Button>
      </Grid>
    )
  }
}

export default withStyles(styles)(Authenticate);