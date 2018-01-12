import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Widget.css'

export class Widget extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    accessToken: PropTypes.string.isRequired,
    size: PropTypes.number,
    startCall: PropTypes.bool
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
  componentDidMount() {
    window.ciscospark.widget(this.widgetEl).spaceWidget({
      accessToken: this.props.accessToken,
      toPersonEmail: this.props.data.toPersonEmail,
      initialActivity: "meet",
      startCall: this.props.data.startCall || false
    });
  }

  componentWillUnmount() {
    window.ciscospark.widget(this.widgetEl).remove();
  }

  render() {
    const style = {
      height: window.innerHeight*this.props.size + 'px',
      width: window.innerWidth*this.props.size + 'px'
    }
    return (
      <div style={style} ref={el => this.widgetEl = el} />
    )
  }
}

export default Widget;