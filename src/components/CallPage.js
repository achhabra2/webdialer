import React, { PureComponent } from 'react';
import { Container, Item } from './FlexComponents';
import CallContainer from './CallContainer';
import qs from 'query-string';

export default class CallPage extends PureComponent {
  componentWillMount() {
    const {location} = this.props.history;
    let query = location.search? qs.parse(location.search) : {}
    const {uri, immediate} = query;
    this.setState({uri, immediate});
  }
  render() {
    const {uri, immediate} = this.state;
    return (
      <Container>
        <Item flex='0 0 75%'>
          <CallContainer callString={uri} immediate={immediate} />
        </Item>
      </Container>
    )
  }
}