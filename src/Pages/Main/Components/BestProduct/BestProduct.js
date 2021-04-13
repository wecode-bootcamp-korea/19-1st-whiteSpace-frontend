import React, { Component } from 'react';
import Product from '../Product/Product';
import './BestProduct.scss';

export default class BestProduct extends Component {
  render() {
    return (
      <div>
        <h1>Best Product</h1>
        <Product />
      </div>
    );
  }
}
