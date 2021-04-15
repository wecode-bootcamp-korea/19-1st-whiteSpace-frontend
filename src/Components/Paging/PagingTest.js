import React, { Component } from 'react';
import './Paging.scss';

const LIMIT = 9;

export default class Paging extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      currentIdx: 1,
      offset: 0,
    };
  }

  fetchProduct = e => {
    this.setState({
      offset: e.target.dataset.idx,
    });

    fetch(
      `http://10.58.2.83:8000/products?limit=${LIMIT}&offset=${offset * LIMIT}`
    )
      .then(res => res.json())
      .then(res => this.setState({ product: res }));
  };

  render() {
    const { product, currentIdx, offset } = this.state;
    const { fetchProduct } = this;
    return (
      <>
        {/* <ProductList product={product} /> */}
        <Paging
          currentIdx={currentIdx}
          btnAmount={product.length / LIMIT}
          offset={offset}
          fetchProduct={fetchProduct}
        />
      </>
    );
  }
}
