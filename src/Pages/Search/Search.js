import React, { Component } from 'react';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import ProductList from '../ProductList/ProductList';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchProductArr: [],
    };
  }
  componentDidMount() {
    fetch('data/categoryProductData.json')
      .then(res => res.json())
      .then(productData => {
        const { products } = productData;
        this.setState({
          searchProductArr: products,
        });
      });
  }
  render() {
    const { searchProductArr } = this.state;
    return (
      <>
        <ProductWrap category="search" text="검색어">
          <ProductList type="search" productArr={searchProductArr} />
        </ProductWrap>
      </>
    );
  }
}
