import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StatusBtn from '../StatusBtn/StatusBtn';
import './Product.scss';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      productArr: [],
    };
  }

  goToProductDetail = id => {
    const { history } = this.props;
    history.push(`/products/${id}`);
  };

  render() {
    const { productArr, type } = this.props;
    const { goToProductDetail } = this;
    return (
      <div className="productList">
        <ul>
          {productArr !== undefined &&
            productArr.map(product => {
              const { id, name, price, thumbnail_url, stock, is_new } = product;
              return (
                <li
                  className="product"
                  key={id}
                  style={{ padding: type !== 'best' ? 2 + 'rem' : '' }}
                >
                  <div
                    className="imageWrap"
                    onClick={() => {
                      goToProductDetail(id);
                    }}
                  >
                    <img
                      className="productImage"
                      alt="productImage"
                      src={thumbnail_url}
                    />
                  </div>
                  <div className="contentWrap">
                    <div>
                      <span
                        className="productName"
                        onClick={() => {
                          goToProductDetail(id);
                        }}
                      >
                        {name}
                      </span>
                      {!stock ? (
                        <StatusBtn text="SOLDOUT" color="red" />
                      ) : (
                        <>
                          {is_new && (
                            <StatusBtn
                              text="NEW"
                              color="yellow"
                              stock={stock}
                            />
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
                          (type === 'best' ? 'bestProduct' : 'product') +
                          'Price'
                        }
                      >
                        {Number(price.split('.')[0]).toLocaleString()}원
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

export default withRouter(Product);
