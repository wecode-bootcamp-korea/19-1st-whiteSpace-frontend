import React, { Component } from 'react';
import ProductReview from './Components/ProductReview/ProductReview';
import './ProductDetail.scss';

export default class ProductDetail extends Component {
  render() {
    return (
      <div className="productDetail">
        <ProductReview />
      </div>
    );
  }
}
