import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import background from './background.jpg';
import CallContainer from './CallContainer';
import Draggable from 'react-draggable';
import { CircularProgress } from 'material-ui/Progress';
import Urlbox from 'urlbox';
import Controls from './Forms/CustomPage';
import { Item } from './FlexComponents';
import Typography from 'material-ui/Typography';

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
    position: 'relative',
  },
  formContainer: {
    margin: 'auto',
    flex: '0 0 66%',
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
    visibility: 'visible',
    border: '1px solid black',
  },
  overlayStyle: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    margin: '10px',
    // width: '25%',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    top: '80px',
    zIndex: 10,
  },
  hidden: {
    margin: 'auto',
    padding: '5px',
    flex: '1 1 90%',
    position: 'relative',
    visibility: 'hidden',
    border: '1px solid black',
  },
  show: {
    visibility: 'visible'
  },
});


class SubPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: '',
      loading: false,
      config: false,
      mayday: false,
      callString: '',
      callSize: '25%',
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const w = window.innerWidth * .9;
    const options = {
      url: this.state.baseUrl,
      retina: true,
      format: 'png',
      full_page: true,
      width: w,
    };
    if (this.imgInput) {
      this.imgInput.src = urlbox.buildUrl(options);
    }
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
      retina: false,
      format: 'png',
      width: w,
    };
    this.imgInput.src = urlbox.buildUrl(options);
  };

  handleSubmit = (config, event) => {
    // Set your options
    this.startLoading();
    this.setState(state => ({
      baseUrl: config.baseUrl,
      callString: config.callString,
      mayday: config.mayday,
      callSize: config.callSize || '25%',
      config: true,
    }));
  };

  stopLoading = () => this.setState(state => ({ loading: false }));
  startLoading = () => this.setState(state => ({ loading: true }));

  render() {
    const { classes } = this.props;
    const { mayday, callString, loading, config } = this.state;
    const ciscoImg = 'https://api.urlbox.io/v1/uyxmHTVQwumo6PKD/png?full_page=true&user_agent=desktop&url=https%3A%2F%2Fwww.cisco.com&retina=true&width=700';

    return (
      <div className={classes.root} >
        {loading && (
          <div className={classes.progress}>
            <CircularProgress size={100} />
            <Typography type="subheading">
              Be Patient this part takes a while...
            </Typography>
          </div>)}
        {!config && <Controls onSubmit={this.handleSubmit} />}
        {config && (
          <div class={classes.formContainer}>
            <Item>
              <Button color='primary' raised onClick={e => { this.setState({ config: false }) }}>
                Back
        </Button>
            </Item>
          </div>
        )}
        {config && (
          <div className={loading? classes.hidden : classes.flexItem }>
            <img onLoad={this.stopLoading} alt='' src={ciscoImg} width='100%'
              ref={(input) => { this.imgInput = input; }} />
            <CallContainer
              mayday={mayday}
              callString={callString}
              className={classes.overlayStyle}
              style={{ width: this.state.callSize }}
            />
          </div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(SubPage);