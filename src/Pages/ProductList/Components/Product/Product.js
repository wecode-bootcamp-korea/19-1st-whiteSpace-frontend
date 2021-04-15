import React, { Component } from 'react';
import StatusBtn from '../StatusBtn/StatusBtn';
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

  render() {
    const { productArr } = this.props;
    return (
      <>
        {productArr.map(product => {
          const { id, name, price, thumbnail_url, stock, is_new } = product;
          return (
            <li className="product" key={id}>
              <a href="#!">
                <div className="imageWrap">
                  <img
                    className="productImage"
                    alt="productImage"
                    src={thumbnail_url}
                  />
                </div>
              </a>
              <div className="contentWrap">
                <div>
                  <a href="#!">
                    <span className="productName">{name}</span>
                  </a>
                  {!stock ? (
                    <StatusBtn text="SOLDOUT" color="red" />
                  ) : (
                    (is_new && (
                      <StatusBtn text="NEW" color="yellow" stock={stock} />
                    ),
                    stock <= 20 && (
                      <StatusBtn text="LIMITED" color="blue" stock={stock} />
                    ))
                  )}
                </div>
                <p className="productPrice">{price.toLocaleString()}원</p>
              </div>
            </li>
          );
        })}
      </>
    );
  }
}
