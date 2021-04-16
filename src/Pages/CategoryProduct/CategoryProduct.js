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
      currentIdx: 1,
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
    switch (idx) {
      case 'prev':
        console.log('currentIdx - 1');
        break;
      case 'next':
        console.log('currentIdx + 1');
        break;
      default:
        // fetchProduct(idx);
        console.log(idx);
    }
  };

  render() {
    const { categoryProductArr, categoryName, currentIdx } = this.state;
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
          pagingBtnOnClick={this.pagingBtnOnClick}
        />
      </>
    );
  }
}
