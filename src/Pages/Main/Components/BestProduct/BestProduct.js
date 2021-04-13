import React, { Component } from 'react';
import ProductList from '../ProductList/ProductList';
import './BestProduct.scss';

export default class BestProduct extends Component {
  render() {
    return (
      <div className="bestProduct">
        <h1>Best Products</h1>
        <ProductList />
      </div>
    );
  }
}
