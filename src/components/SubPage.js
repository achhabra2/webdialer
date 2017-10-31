import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import background from './background.jpg';
import CallContainer from './CallContainer';
import Draggable from 'react-draggable';
import { CircularProgress } from 'material-ui/Progress';
import Urlbox from 'urlbox';

// Plugin your API key and secret
const urlbox = Urlbox('uyxmHTVQwumo6PKD', '3d74f6cee5b34eada3893332bd66579b');


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
    height: '100%',
  },
  formContainer: {
    margin: 'auto',
    flex: '0 0 50%',
    padding: '5px',
  },
  button: {
  },
  iframe: {
    margin: 'auto',
    padding: '5px',
    flex: '0 0 90%',
    border: 'none',
  },
  flexItem: {
    margin: 'auto',
    padding: '5px',
    flex: '1 1 90%',
    position: 'relative',
    border: '1px solid black',
  },
  overlayStyle: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    margin: '10px',
    width: '25%',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // verticalAlign: 'middle',
  }
});


class SubPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: '',
      loading: true,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handlePage = event => {
    // Set your options
    this.startLoading();
    const w = window.innerWidth * .9;
    const options = {
      url: this.state.baseUrl,
      retina: true,
      format: 'png',
      width: w,
    };
    this.imgInput.src = urlbox.buildUrl(options);
  };

  stopLoading = () => this.setState(state => ({ loading: false }));
  startLoading = () => this.setState(state => ({ loading: true }));

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const ciscoImg = 'https://api.urlbox.io/v1/uyxmHTVQwumo6PKD/png?full_page=true&user_agent=desktop&url=https%3A%2F%2Fwww.cisco.com&retina=true&width=700';

    return (
      <div className={classes.root} >
        <div className={classes.formContainer}>
          <TextField
            required
            id="required"
            label="Enter URL"
            margin="normal"
            fullWidth={true}
            onChange={this.handleChange('baseUrl')}
            className={classes.textField}
          />
          <Button color='primary' className={classes.button}
            raised onClick={this.handlePage}>
            Render Page
        </Button>
        </div>
        <div className={classes.flexItem}>
          {loading && <div className={classes.progress}> <CircularProgress size={50} /> </div>}
          <img onLoad={this.stopLoading} alt='' src={ciscoImg} width='100%'
            ref={(input) => { this.imgInput = input; }} />
          <CallContainer className={classes.overlayStyle} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SubPage);