import React, { Component } from 'react';
import ProductList from '../ProductList/ProductList';
import './BestProduct.scss';

export default class BestProduct extends Component {
  render() {
    const { productArr } = this.props;
    return (
      <div className="bestProduct">
        <h1>Best Products</h1>
        <ProductList productArr={productArr} />
      </div>
    );
  }
}
