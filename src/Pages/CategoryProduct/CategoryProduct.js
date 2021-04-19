import React, { Component } from 'react';
import Nav from '../../Components/Nav/Nav';
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
      categoryProductArr: [],
      categoryName: '',
      currentIdx: 1,
    };
  }

  fetchProduct = idx => {
    // const { currentIdx } = this.state;
    fetch(`http://10.58.2.186:8000/products?page=${idx}`)
      .then(res => res.json())
      .then(productData => {
        this.setState({ categoryProductArr: productData.products });
      });
  };

  componentDidMount() {
    // console.log(this.props.location.state.categoryId); //메인에서 클릭했을때만 찍힘
    // fetch('data/categoryProductData.json')
    //   .then(res => res.json())
    //   .then(productData => {
    //     const { products, category } = productData;
    //     this.setState({
    //       categoryProductArr: products,
    //       categoryName: category,
    //     });
    //   });
    fetch('http://10.58.2.186:8000/products?page=1')
      // fetch('http://192.168.0.74:8000/products?category=2&page=1')
      .then(res => res.json())
      .then(productList => {
        const { products, category, count } = productList;
        this.setState({
          categoryProductArr: products,
          categoryName: category,
          totalAmount: count,
        });
      });
  }

  pagingBtnOnClick = idx => {
    const { fetchProduct } = this;
    const { currentIdx } = this.state;
    // switch (idx) {
    //   case 'prev':
    //     this.setState({
    //       currentIdx: currentIdx - 1,
    //     });
    //     break;
    //   case 'next':
    //     this.setState({
    //       currentIdx: currentIdx + 1,
    //     });
    //     break;
    //   default:
    //     fetchProduct(idx);
    //     this.setState({
    //       currentIdx: idx,
    //     });
    // }
    if (idx === 'prev') {
      this.setState({
        currentIdx: currentIdx - 1, //prev일때 idx처리해줘야함...
      });
    } else if (idx === 'next') {
      this.setState({
        currentIdx: currentIdx + 1,
      });
    } else {
      this.setState({
        currentIdx: idx,
      });
    }
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
        <Nav />
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
