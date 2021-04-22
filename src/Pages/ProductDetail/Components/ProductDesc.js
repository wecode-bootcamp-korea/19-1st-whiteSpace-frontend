import React, { Component } from 'react';
import './ProductDesc.scss';

class ProductDesc extends Component {
  render() {
    const { strPrice, strDcPrice, name } = this.props;

    return (
      <>
        <div className="productDesc">
          <ul>
            <li className="name">{name}</li>
            <li className="price">{strPrice}</li>
            <li className="dcPrice">{strDcPrice}</li>
            <li className="shipping">배송비 2,500원</li>
          </ul>
        </div>
      </>
    );
  }
}

export default ProductDesc;
