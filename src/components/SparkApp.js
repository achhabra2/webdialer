import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar';
import Authenticate from './Authenticate';
import CallContainer from './CallContainer';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    textAlign: 'center',
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

@inject('store') @observer
class SparkApp extends Component {
  static propTypes = {
  }

  render() {
    const { classes, store } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <Grid container
          spacing={24}
          alignItems='center'
          justify='center'>
          {!store.authenticated &&
            <Authenticate />}
          {store.authenticated &&
            <CallContainer />}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SparkApp);