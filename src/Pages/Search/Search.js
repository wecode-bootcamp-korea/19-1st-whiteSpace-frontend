import React, { Component } from 'react';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import ProductList from '../ProductList/ProductList';
import Paging from '../../Components/Paging/Paging';

const LIMIT = 9;
const searchKeyword = this.props.location.search.split('=')[1];

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchProductArr: [],
      currentIdx: 1,
      totalAmount: 0,
    };
  }
  componentDidMount() {
    // fetch('data/categoryProductData.json')
    //   .then(res => res.json())
    //   .then(productData => {
    //     const { products } = productData;
    //     this.setState({
    //       searchProductArr: products,
    //     });
    //   });

    fetch(`http://10.58.4.178:8000/products?search=${searchKeyword}`)
      .then(res => res.json())
      .then(productData => {
        const { products } = productData;
        this.setState({
          searchProductArr: products,
        });
      });
  }

  fetchProduct = idx => {
    // fetch(
    //   `http://10.58.4.178:8000/products?search=${searchKeyword}?page=${idx}`
    // )
    //   .then(res => res.json())
    //   .then(productData => {
    //     this.setState({ searchProductArr: productData.products });
    //   });
  };

  pagingBtnOnClick = idx => {
    const { fetchProduct } = this;
    this.setState({
      currentIdx: idx,
    });
    fetchProduct(idx);
  };

  render() {
    const { searchProductArr, currentIdx, totalAmount } = this.state;
    const { pagingBtnOnClick } = this;
    const btnAmount = Math.ceil(totalAmount / LIMIT);
    return (
      <>
        <ProductWrap category="search" text={searchKeyword}>
          <ProductList type="search" productArr={searchProductArr} />
        </ProductWrap>
        <Paging
          currentIdx={currentIdx}
          btnAmount={btnAmount}
          pagingBtnOnClick={pagingBtnOnClick}
        />
      </>
    );
  }
}
