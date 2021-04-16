import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const { imgSrc } = this.props.card;

    return (
      <div className="productCard">
        <img alt="productCard" className="productCard" src={imgSrc} />
      </div>
    );
  }
}

export default ProductCard;
