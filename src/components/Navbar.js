import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom'
import MyDetails from './MyDetails';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 1,
    width: '100%',
  },
});

class SimpleAppBar extends React.PureComponent {

  state = {
    detailOpen: false
  }

  checkSelected = (text) => {
    if (text) {
      if (text === 'call' || text === 'custom' || text === 'about' || text === 'care' || text==='cleu')
        return text;
    } else return false;
  }

  handleDetailOpen = event => {
    this.setState({detailOpen: !this.state.detailOpen})
  }

  renderTab() {
    if (this.props.authenticated) {
      return <Tab 
        value='account' 
        label={this.props.user ? this.props.user.displayName : 'User'}
        onClick={this.handleDetailOpen} />
    } else {
      return <Tab value='login' label="Login" />
    }
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
            <Tabs scrollable scrollButtons="auto" value={this.checkSelected(path)} fullWidth>
              {this.renderTab()}
              <Tab value='call' label="Dialer" component={Link} to='/call' />
              <Tab value='custom' label="Custom Branding" component={Link} to='/custom' />
              <Tab value='care' label="Kiosk Demo" component={Link} to='/care' />
              <Tab value='cleu' label="Sample Site" component={Link} to='/cleu' />
              <Tab value='about' label="About" component={Link} to='/about' />
            </Tabs>
          </Toolbar>
        </AppBar>
        {this.state.detailOpen && <MyDetails details={this.props.user} />}
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);