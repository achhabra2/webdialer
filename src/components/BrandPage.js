import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Container, Item } from './FlexComponents';
import CallContainer from './CallContainer';
import qs from 'query-string';

const barclays = 'https://www.barclayscorporate.com/_jcr_content/header_par/header/image.img.jpg/1505304181708.jpg'
const lloyds = 'https://international.lloydsbank.com/components/img/international/logo-lloyds-bank-print.png';

const bannerStyle = {
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100px',
  width: 'auto',
  height: 'auto',
  textAlign: 'center',
  margin: '0 auto',
}

@inject('store') @observer
class BrandPage extends Component {

  componentWillMount() {
    this.props.store.setNavbarHidden(true);
    let query = qs.parse(this.props.history.location.search);
    if (!this.props.store.authenticated) {
      this.props.store.api.authorization
        .initiateLogin({
          state: {
            page: 'brand',
            ...query
          }
        });
    }
    else {
      if (query.banner) {
        switch(query.banner) {
          case 'barclays': 
            this.setState({banner: barclays})
            break;
          case 'lloyds':
            this.setState({banner: lloyds})
            break;
          default: 
            this.setState({banner: query.banner})
        }
      }
    }
  }

  render() {
    return (
      <div>
        <img src={this.state.banner || barclays} style={bannerStyle} alt='Corporate Banner' />
        <Container>
          <Item flex='0 0 100%'>
            <CallContainer />
          </Item>
        </Container>
        <img src={this.state.banner || barclays} style={bannerStyle} alt='Corporate Banner' />
      </div>
    )
  }
}

export default BrandPage;