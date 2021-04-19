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
    fetch(`http://10.58.2.186:8000/products?page=${idx}`)
      .then(res => res.json())
      .then(productData => {
        this.setState({ categoryProductArr: productData.products });
      });
  };

  componentDidMount() {
    // fetch('data/categoryProductData.json')
    //   .then(res => res.json())
    //   .then(productData => {
    //     const { products, category } = productData;
    //     this.setState({
    //       categoryProductArr: products,
    //       categoryName: category,
    //     });
    //   });

    const { categoryId } = this.props.location.state;

    if (!categoryId) {
      fetch('http://10.58.2.186:8000/products?page=1')
        .then(res => res.json())
        .then(productList => {
          const { products, category, count } = productList;
          this.setState({
            categoryProductArr: products,
            categoryName: category,
            totalAmount: count,
          });
        });
    } else {
      fetch(`http://192.168.0.74:8000/products?category=${categoryId}&page=1`)
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
  }

  pagingBtnOnClick = idx => {
    const { fetchProduct } = this;
    const { currentIdx } = this.state;
    if (idx === 'prev') {
      this.setState({
        currentIdx: currentIdx - 1,
      });
      idx = currentIdx - 1;
    } else if (idx === 'next') {
      this.setState({
        currentIdx: currentIdx + 1,
      });
      idx = currentIdx + 1;
    } else {
      this.setState({
        currentIdx: idx,
      });
    }
    fetchProduct(idx);
  };

  render() {
    // console.log(this.props.location.state.categoryId);
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
