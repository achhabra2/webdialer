import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 1,
    width: '100%',
  },
});

class SimpleAppBar extends React.PureComponent {

  checkSelected = (text) => {
    if(text) {
      if(text === 'login' || text === 'call' || text === 'custom' || text === 'about')
        return text;
    } else return false;
  }

  render() {
    const { classes, authenticated } = this.props;
    const path = this.props.location.pathname.replace(/^\//i, '');
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography align='center' type="title" color="inherit">
              Spark Web Dialer
          </Typography>
            <Tabs scrollable={false} centered value={this.checkSelected(path)} fullWidth={true}>
              {!authenticated && <Tab value='login' label="Login" component={Link} to='/login' />}
              <Tab value='call' label="Dialer" component={Link} to='/call' />
              <Tab value='custom' label="Custom Demo" component={Link} to='/custom' />
              <Tab value='about' label="About" component={Link} to='/about' />
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);