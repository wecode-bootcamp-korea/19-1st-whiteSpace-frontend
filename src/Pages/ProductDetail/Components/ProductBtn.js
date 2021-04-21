import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductBtn.scss';

class ProductBtn extends Component {
  render() {
    return (
      <div className="orderBtn">
        <button className="buyBtn">
          <Link to="/order">BUY NOW</Link>
        </button>
        <button className="addBtn">
          <Link to="/cart">ADD CART</Link>
        </button>
      </div>
    );
  }
}

export default ProductBtn;
