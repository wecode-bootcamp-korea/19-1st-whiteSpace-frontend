import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const { productArr, type } = this.props;
    return (
      <div className="productList">
        <ul>
          {productArr.map(product => {
            const { id, name, price, thumbnail_url, stock, is_new } = product;
            return (
              <li
                className="product"
                key={id}
                // style={{ (type !== 'best') && padding: 2 + 'rem' }}
                style={{ padding: 2 + 'rem' }}
              >
                <Link to="#!">
                  <div className="imageWrap">
                    <img
                      className="productImage"
                      alt="productImage"
                      src={thumbnail_url}
                    />
                  </div>
                </Link>
                <div className="contentWrap">
                  <div>
                    <Link to="#!">
                      <span className="productName">{name}</span>
                    </Link>
                    {!stock ? (
                      <StatusBtn text="SOLDOUT" color="red" />
                    ) : (
                      <>
                        {is_new && (
                          <StatusBtn text="NEW" color="yellow" stock={stock} />
                        )}
                        {stock <= 20 && (
                          <StatusBtn
                            text="LIMITED"
                            color="blue"
                            stock={stock}
                          />
                        )}
                      </>
                    )}
                  </div>
                  {
                    <p
                      className={
                        (type === 'best' ? 'bestProduct' : 'product') + 'Price'
                      }
                    >
                      {price.toLocaleString()}원
                    </p>
                  }
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
