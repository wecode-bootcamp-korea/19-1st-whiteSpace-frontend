import React, { Component } from 'react';
import './ProductTotalPrice.scss';

class ProductTotalPrice extends Component {
  render() {
    const { intBundlePrice, intDcPrice, count } = this.props;
    const total = (intDcPrice + intBundlePrice) * count;

    return (
      <>
        <div className="totalPrice">
          <span className="total">Total:</span>
          <span className="total price">{total > 0 ? total : 0}원</span>
        </div>
      </>
    );
  }
}

export default ProductTotalPrice;
