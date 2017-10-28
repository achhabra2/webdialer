/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class IncomingToast extends React.PureComponent {


  render() {
    const {onAnswer, onIgnore, classes} = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.props.open}
        autoHideDuration={12000}
        onRequestClose={onIgnore}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Incoming Call</span>}
        action={[
          <Button key="undo" color="primary" onClick={onAnswer}>
            Answer
            </Button>,
          <Button key="undo" color="accent" onClick={onIgnore}>
            Ignore
            </Button>
        ]}
      />
    );
  }
}

IncomingToast.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomingToast);