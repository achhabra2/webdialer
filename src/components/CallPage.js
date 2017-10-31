import React, { PureComponent } from 'react';
import { Container, Item } from './FlexComponents';
import CallContainer from './CallContainer';

export default class CallPage extends PureComponent {
  render() {
    return (
      <Container style={{height: '75%'}}>
        <Item flex='0 1 50%'>
          <CallContainer />
        </Item>
      </Container>
    )
  }
}