import React, { Component } from 'react';
import ProductList from '../ProductList/ProductList';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import Paging from '../../Components/Paging/Paging';
import './CategoryProduct.scss';

const LIMIT = 9;
// const categoryId = this.props.match.params.categoryId;
// const searchKeyword = this.props.location.search.split('=')[1];
const searchKeyword = '검색어';

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
    //   `http://10.58.4.178:8000/products${
    //     categoryId ? `?category=${categoryId}` : ``
    //   }${searchKeyword ? `?search=${searchKeyword}` : ``}?page=${idx}`
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
    //     categoryId ? `?category=${categoryId}` : ``
    //   }${searchKeyword ? `?search=${searchKeyword}` : ``}?page=1`
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
    this.setState({
      currentIdx: idx,
    });
    fetchProduct(idx);
  };

  render() {
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
        <ProductWrap
          category={searchKeyword ? 'search' : 'categoryList'}
          // text={categoryName}
          text={searchKeyword ? searchKeyword : categoryName}
        >
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
