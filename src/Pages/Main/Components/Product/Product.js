import React, { Component } from 'react';
import './Product.scss';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      productArr: [],
    };
  }

  componentDidMount() {
    fetch('data/productData.json')
      .then(res => res.json())
      .then(productData => {
        this.setState({
          productArr: productData,
        });
      });
  }

  likeProduct = id => {
    const { productArr } = this.state;
    this.setState(
      () => (productArr[id - 1].isLiked = !productArr[id - 1].isLiked)
    );
  };

  render() {
    const { productArr } = this.state;
    const { likeProduct } = this;
    return (
      <>
        {productArr.map((product, index) => {
          const { id, name, price, imgSrc, isNew, isLiked } = product;
          return (
            <li className="product" key={index}>
              <a href="#!">
                <div className="imageWrap">
                  <img
                    className="productImage"
                    alt="productImage"
                    src={imgSrc}
                  />
                  <div className="like">
                    <i
                      className={isLiked ? 'xi-heart colorHeart' : 'xi-heart-o'}
                      onClick={() => {
                        likeProduct(id);
                      }}
                    ></i>
                  </div>
                </div>
              </a>
              <div className="contentWrap">
                <div>
                  <a href="#!">
                    <span className="productName">{name}</span>
                  </a>
                  {isNew === 1 && (
                    <div className="badgeWrap">
                      <span className="badge">NEW</span>
                    </div>
                  )}
                </div>
                <p className="productPrice">{price.toLocaleString('en')}원</p>
              </div>
            </li>
          );
        })}
      </>
    );
  }
}
