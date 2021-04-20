import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import Paging from '../../Components/Paging/Paging';
import './CategoryProduct.scss';

const LIMIT = 9;

export default class CategoryProduct extends Component {
  constructor() {
    super();
    this.state = {
      totalAmount: '',
      productArr: [],
      categoryName: '',
      currentIdx: 1,
    };
  }

  fetchProduct = idx => {
    const categoryId = this.props.match.params.categoryId;
    const searchKeyword = this.props.location.search.split('=')[1];

    fetch(
      `http://10.58.7.33:8000/products${
        categoryId ? `?category=${categoryId}` : ``
      }${searchKeyword ? `?search=${searchKeyword}` : ``}?page=${idx}`
    )
      .then(res => res.json())
      .then(productList => {
        const { products, category, count } = productList;
        this.setState({
          productArr: products,
          categoryName: category,
          totalAmount: count,
        });
      });
  };

  componentDidMount() {
    const categoryId = this.props.match.params.categoryId;
    const searchKeyword = this.props.location.search.split('=')[1];
    // fetch('data/categoryProductData.json')
    //   .then(res => res.json())
    //   .then(productList => {
    //     const { products, category } = productList;
    //     this.setState({
    //       productArr: products,
    //       categoryName: category,
    //     });
    //   });

    fetch(
      `http://10.58.7.33:8000/products${
        categoryId ? `?category=${categoryId}` : ``
      }${searchKeyword ? `?search=${searchKeyword}` : ``}?page=1`
    )
      .then(res => res.json())
      .then(productList => {
        const { products, category, count } = productList;
        this.setState({
          productArr: products,
          categoryName: category,
          totalAmount: count,
        });
      });
  }

  pagingBtnOnClick = idx => {
    const { fetchProduct } = this;
    this.setState({
      currentIdx: idx,
    });
    fetchProduct(idx);
  };

  render() {
    const { productArr, categoryName, currentIdx, totalAmount } = this.state;
    const { pagingBtnOnClick } = this;
    const btnAmount = Math.ceil(totalAmount / LIMIT);
    const searchKeyword = this.props.location.search.split('=')[1];
    return (
      <>
        <ProductWrap
          category={searchKeyword ? 'search' : 'categoryList'}
          text={searchKeyword ? searchKeyword : categoryName}
        >
          <ProductList type="category" productArr={productArr} />
        </ProductWrap>
        {/* <Paging
          currentIdx={currentIdx}
          btnAmount={btnAmount}
          pagingBtnOnClick={pagingBtnOnClick}
        /> */}
      </>
    );
  }
}
