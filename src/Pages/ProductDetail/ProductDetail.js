import React, { Component } from 'react';
import Review from './Components/Review';
import './ProductDetail.scss';

export default class ProductDetail extends Component {
  render() {
    return (
      <div className="productDetail">
        <Review />
      </div>
    );
  }
}
