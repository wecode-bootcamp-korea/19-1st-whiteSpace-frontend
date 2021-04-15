import React, { Component } from 'react';
import Product from './Components/Product/Product';
import './ProductList.scss';

export default class ProductList extends Component {
  render() {
    const { productArr, type } = this.props;
    return <Product type={type} productArr={productArr} />;
  }
}
