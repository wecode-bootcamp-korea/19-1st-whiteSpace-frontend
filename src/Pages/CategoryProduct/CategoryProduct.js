import React, { Component } from 'react';
import ProductList from '../ProductList/ProductList';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import Paging from '../../Components/Paging/Paging';
import './CategoryProduct.scss';

const LIMIT = 9;

export default class CategoryProduct extends Component {
  constructor() {
    super();
    this.state = {
      categoryProductArr: [],
      categoryName: '',
      currentIdx: 2,
    };
  }

  // fetchProduct = e => {
  //   fetch(
  //     `http://10.58.2.83:8000/products?limit=${LIMIT}&offset=${offset * LIMIT}`
  //   )
  //     .then(res => res.json())
  //     .then(res => this.setState({ categoryProductArr: res }));
  // };

  componentDidMount() {
    fetch('data/categoryProductData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          categoryProductArr: data[0].product,
          categoryName: data[0].product[0].categoryName,
        });
      });
  }

  pagingBtnOnClick = idx => {
    const { fetchProduct } = this;
    const { currentIdx } = this.state;
    switch (idx) {
      case 'prev':
        this.setState({
          currentIdx: currentIdx - 1,
        });
        break;
      case 'next':
        this.setState({
          currentIdx: currentIdx + 1,
        });
        // console.log('currentIdx + 1');
        break;
      default:
        // fetchProduct(idx);
        this.setState({
          currentIdx: idx,
        });
      // console.log(idx);
    }
  };

  render() {
    const { categoryProductArr, categoryName, currentIdx } = this.state;
    const { pagingBtnOnClick } = this;
    const total = 30;
    const btnAmount = Math.ceil(total / LIMIT);
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
