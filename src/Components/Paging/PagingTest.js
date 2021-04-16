import React, { Component } from 'react';
import Paging from './Paging';
import './Paging.scss';

const LIMIT = 9;

export default class PagingTest extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
    };
  }

  fetchProduct = e => {
    fetch(
      `http://10.58.2.83:8000/products?limit=${LIMIT}&offset=${offset * LIMIT}`
    )
      .then(res => res.json())
      .then(res => this.setState({ product: res }));
  };

  pagingBtnOnClick = e => {
    console.log(e.target.dataset.idx);
  };

  render() {
    const { product, currentIdx } = this.state;
    const { fetchProduct } = this;
    const offset = (currentIdx - 1) * LIMIT;
    return (
      <>
        <Paging
          currentIdx={currentIdx}
          // btnAmount={Math.ceil(total / LIMIT)}
          offset={offset}
          fetchProduct={fetchProduct}
          pagingBtnOnClick={this.pagingBtnOnClick}
        />
      </>
    );
  }
}
