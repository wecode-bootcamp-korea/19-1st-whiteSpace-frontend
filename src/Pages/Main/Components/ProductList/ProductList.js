import React, { Component } from 'react';
import Product from '../Product/Product';
import './ProductList.scss';

export default class ProductList extends Component {
  render() {
    return (
      <div className="productList">
        <ul>
          <Product />
        </ul>
      </div>
    );
  }
}
