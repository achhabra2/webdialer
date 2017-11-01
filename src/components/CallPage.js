import React, { PureComponent } from 'react';
import { Container, Item } from './FlexComponents';
import CallContainer from './CallContainer';

export default class CallPage extends PureComponent {
  render() {
    return (
      <Container>
        <Item flex='0 0 75%'>
          <CallContainer />
        </Item>
      </Container>
    )
  }
}