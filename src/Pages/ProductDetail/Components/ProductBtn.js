import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductBtn.scss';

class ProductBtn extends Component {
  warningAlert = () => {
    alert('장바구니에 먼저 담아주세요');
  };

  render() {
    const { goToCart } = this.props;
    const { warningAlert } = this;

    return (
      <div className="orderBtn">
        <button className="buyBtn" onClick={warningAlert}>
          BUY NOW
        </button>
        <button className="addBtn" onClick={goToCart}>
          ADD CART
        </button>
      </div>
    );
  }
}

export default ProductBtn;
