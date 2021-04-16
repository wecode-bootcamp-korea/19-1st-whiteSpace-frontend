import React, { Component } from 'react';
import ProductList from '../../../ProductList/ProductList';
import ProductWrap from '../../../../Components/ProductWrap/ProductWrap';

export default class BestProduct extends Component {
  render() {
    const { productArr } = this.props;
    return (
      <ProductWrap category="best" text="Best Products">
        <ProductList type="best" productArr={productArr} />
      </ProductWrap>
    );
  }
}
