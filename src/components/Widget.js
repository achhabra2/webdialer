import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Widget.css'

export class Widget extends Component {

  static defaultProps = {
    onCallDisconnect(e) {
      console.log(e)
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    accessToken: PropTypes.string.isRequired,
    size: PropTypes.number,
    startCall: PropTypes.bool,
    onCallDisconnect: PropTypes.func
  }

  // componentWillMount() {
  //   let aScript = document.createElement('script');
  //   aScript.type = 'text/javascript';
  //   aScript.src = "https://code.s4d.io/widget-space/production/bundle.js";
  //   document.head.appendChild(aScript);
  //   let css = document.createElement('link');
  //   css.rel="stylesheet";
  //   css.href="https://code.s4d.io/widget-space/production/main.css"
  //   document.head.appendChild(css);
  // }

  handleEvents = (name, detail) => {
    if (name === 'calls:disconnected') {
      this.props.onCallDisconnect();
    }
  }

  componentDidMount() {
    const options = {
      accessToken: this.props.accessToken,
      initialActivity: "meet",
      startCall: this.props.data.startCall || false,
      onEvent: this.handleEvents
    }
    if (this.props.data.toPersonEmail) {
      options.toPersonEmail = this.props.data.toPersonEmail
    }
    else if (this.props.data.spaceId) {
      options.spaceId = this.props.data.spaceId
    }
    window.ciscospark.widget(this.widgetEl).spaceWidget(options);
    // window.ciscospark.widget(this.widgetEl).on('calls:disconnected', this.props.onCallDisconnect);
  }

  componentWillUnmount() {
    window.ciscospark.widget(this.widgetEl).remove();
  }

  render() {
    const style = {
      height: window.innerHeight * this.props.size + 'px',
      width: window.innerWidth * this.props.size + 'px',
      margin: 'auto'
    }
    return (
      <div style={style} ref={el => this.widgetEl = el} />
    )
  }
}

export default Widget;