import React, { PureComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import { Container, Item } from './FlexComponents';
import Typography from 'material-ui/Typography';

export class About extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      markdown: `Placeholder`
    }
  }

  componentWillMount() {
    const readmePath = require('../README.md');
    fetch(readmePath)
      .then(response => {
        return response.text();
      }).then(text => {
        this.setState({
          markdown: text
        })
      })
  }

  render() {
    return (
      <Container>
        <Item flex='0 0 90%' textAlign='left'>
          <Typography type="subheading">
            <ReactMarkdown source={this.state.markdown} />
          </Typography>
        </Item>
      </Container>
    )
  }
}

export default About;
