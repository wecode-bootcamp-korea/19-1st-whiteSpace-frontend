import React, { Component } from 'react';
import ProductList from '../ProductList/ProductList';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import Paging from '../../Components/Paging/Paging';
import './CategoryProduct.scss';

const LIMIT = 9;
// const categoryId = this.props.match.params.categoryId;

export default class CategoryProduct extends Component {
  constructor() {
    super();
    this.state = {
      totalAmount: '',
      categoryProductArr: [],
      categoryName: '',
      currentIdx: 1,
    };
  }

  fetchProduct = idx => {
    // fetch(
    //   `http://10.58.4.178:8000/products?${
    //     categoryId ? `category=${categoryId}` : ``
    //   }page=${idx}`
    // )
    //   .then(res => res.json())
    //   .then(productData => {
    //     this.setState({ categoryProductArr: productData.products });
    //   });
  };

  componentDidMount() {
    fetch('data/categoryProductData.json')
      .then(res => res.json())
      .then(productData => {
        const { products, category } = productData;
        this.setState({
          categoryProductArr: products,
          categoryName: category,
        });
      });

    // fetch(
    //   `http://10.58.4.178:8000/products${
    //     categoryId ? `category=${categoryId}` : ``
    //   }?page=1`
    // )
    //   .then(res => res.json())
    //   .then(productList => {
    //     const { products, category, count } = productList;
    //     this.setState({
    //       categoryProductArr: products,
    //       categoryName: category,
    //       totalAmount: count,
    //     });
    //   });
  }

  pagingBtnOnClick = idx => {
    const { fetchProduct } = this;
    // if (idx === 'prev') {
    //   this.setState({
    //     currentIdx: currentIdx - 1,
    //   });
    //   idx = currentIdx - 1;
    // } else if (idx === 'next') {
    //   this.setState({
    //     currentIdx: currentIdx + 1,
    //   });
    //   idx = currentIdx + 1;
    // } else {
    //   this.setState({
    //     currentIdx: idx,
    //   });
    // }
    this.setState({
      currentIdx: idx,
    });
    fetchProduct(idx);
  };

  render() {
    console.log(this.props);
    const {
      categoryProductArr,
      categoryName,
      currentIdx,
      totalAmount,
    } = this.state;
    const { pagingBtnOnClick } = this;
    const btnAmount = Math.ceil(totalAmount / LIMIT);
    return (
      <>
        <ProductWrap category="categoryList" text={categoryName}>
          <ProductList type="category" productArr={categoryProductArr} />
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
