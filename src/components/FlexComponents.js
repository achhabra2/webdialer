import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Container extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.object,
  }

  render() {
    const { style, children, component, className, ...other } = this.props;
    const template = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignContent: 'stretch',
      height: '100%',
      border: 'none',
    };

    const merged = Object.assign({}, template, style);

    let ComponentProp = component;

    if (!ComponentProp) {
      ComponentProp = 'div';
    }

    return (
      <ComponentProp style={merged} {...other}>
        {children}
      </ComponentProp>
    )
  }
}

class Item extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.object,
    children: PropTypes.object,
    flex: PropTypes.string,
    border: PropTypes.string,
    position: PropTypes.string,
    padding: PropTypes.string,
  }

  render() {
    const { className, component, padding, children, flex, border, position, ...other } = this.props;

    const style = {
      margin: 'auto',
      padding: padding || '5px',
      flex: flex || '1 1 50%',
      border: border || 'none',
      position: position || 'relative',
    };

    let ComponentProp = component;

    if (!ComponentProp) {
      ComponentProp = 'div';
    }

    return (
      <ComponentProp style={style} {...other} >
        {children}
      </ComponentProp>
    )
  }
}

export { Container, Item };