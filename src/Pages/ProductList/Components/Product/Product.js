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

  goToProductDetail = id => {
    // console.log(id);
    const { history } = this.props;
    // this.props.history.push(`/products/${id}`);
  };

  componentDidMount() {
    // fetch('data/productData.json')
    //   .then(res => res.json())
    //   .then(productData => {
    //     this.setState({
    //       productArr: productData,
    //     });
    //   });
  }

  render() {
    const { productArr, type } = this.props;
    const { goToProductDetail } = this;
    return (
      <div className="productList">
        <ul>
          {productArr.map(product => {
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
