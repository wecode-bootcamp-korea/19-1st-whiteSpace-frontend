import React, { Component } from 'react';
import ProductCard from './ProductCard';
import ProductSideCard from './ProductSideCard';

class ProductImgs extends Component {
  render() {
    const { productImgArr } = this.props;

    return (
      <>
        <div className="productMainImg">
          {productImgArr.map(card => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
        <div className="productDetailImg">
          {productImgArr.map(card => (
            <ProductSideCard key={card.id} card={card} />
          ))}
        </div>
      </>
    );
  }
}

export default ProductImgs;
