import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import withStyles from 'material-ui/styles/withStyles';
import c from 'classnames';

const styles = theme => ({
  paper: theme.mixins.gutters({
    position: 'absolute',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    maxWidth: 800,
    minWidth: 180,
    margin: 'auto',
    zIndex: '100'
  })
});

class MyDetails extends Component {
  static propTypes = {
    details: PropTypes.object.isRequired
  }

  renderDetails() {
    const { details } = this.props;
    return Object.keys(details).map(key => {
      switch (key) {
        case 'avatar':
          return (<Typography><a href={details[key]}>avatar</a></Typography>)
        default:
          return (
            <Typography>{key + ':  ' + details[key]}</Typography>
          )
      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={c(classes.paper, 'animated fadeInDown')} elevation={8}>
        <Typography type="headline" component="h3">
          Person Details
        </Typography>
        <Divider />
        {this.renderDetails()}
      </Paper>
    )
  }
}

export default withStyles(styles)(MyDetails);