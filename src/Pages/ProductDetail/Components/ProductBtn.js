import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ProductBtn.scss';

class ProductBtn extends Component {
  render() {
    const { goToCart, goToOrder } = this.props;
    const productId = this.props.match.params.productId;

    return (
      <div className="orderBtn">
        <button className="buyBtn" onClick={goToOrder}>
          <Link to="/order">BUY NOW</Link>
        </button>
        <button className="addBtn" onClick={goToCart}>
          <Link to="/cart">ADD CART</Link>
        </button>
      </div>
    );
  }
}

export default withRouter(ProductBtn);
