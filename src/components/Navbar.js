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

class SimpleAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" color="inherit">
              Spark Web Dialer
          </Typography>
            <Tabs centered value={value} onChange={this.handleChange}>
              {!authenticated && <Tab label="Login" component={Link} to='/login' />}
              <Tab label="Dialer" component={Link} to='/call' />
              <Tab label="Custom Demo" component={Link} to='/custom' />
              <Tab label="About" component={Link} to='/about' />
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