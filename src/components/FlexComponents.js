import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import prefix from 'react-prefixer';

const containerStyle = {
  flexDirection: 'column',
  alignItems: 'baseline',
  alignContent: 'flex-start',
  width: 'auto',
  textAlign: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'stretch',
  alignContent: 'stretch',
  zIndex: 1
};

class Container extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
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

    const merged = prefix(Object.assign({}, template, style));

    let ComponentProp = component;

    if (!ComponentProp) {
      ComponentProp = 'div';
    }

    return (
      <ComponentProp style={merged} className={className} {...other}>
        {children}
      </ComponentProp>
    )
  }
}

class Item extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.object,
    flex: PropTypes.string,
    border: PropTypes.string,
    position: PropTypes.string,
    padding: PropTypes.string,
    alignSelf: PropTypes.string,
  }

  render() {
    const {
      style,
      className,
      component,
      padding,
      children,
      flex,
      border,
      position,
      alignSelf,
      textAlign,
      minWidth,
      ...other
    } = this.props;

    const template = {
      margin: 'auto',
      padding: padding || '5px',
      flex: flex || '0 1 auto',
      border: border || 'none',
      position: position || 'relative',
      alignSelf: alignSelf || 'auto',
      textAlign: textAlign || 'center',
      minWidth: minWidth || 'auto',
    };

    const merged = Object.assign({}, template, style);

    let ComponentProp = component;

    if (!ComponentProp) {
      ComponentProp = 'div';
    }

    return (
      <ComponentProp className={className} style={merged} {...other} >
        {children}
      </ComponentProp>
    )
  }
}

export { Container, Item };