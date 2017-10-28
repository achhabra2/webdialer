import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar';
import Authenticate from './Authenticate';
import CallContainer from './CallContainer';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Route } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class SparkApp extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Authenticate />
          </Grid>
          <Grid item xs={12}>
            <CallContainer />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SparkApp);