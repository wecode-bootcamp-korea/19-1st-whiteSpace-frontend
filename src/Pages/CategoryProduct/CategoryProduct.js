import React, { Component } from 'react';
import ProductList from '../ProductList/ProductList';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import Paging from '../../Components/Paging/Paging';
import './CategoryProduct.scss';

export default class CategoryProduct extends Component {
  constructor() {
    super();
    this.state = {
      categoryProductArr: [],
      categoryName: '',
    };
  }

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
  render() {
    const { categoryProductArr, categoryName } = this.state;
    return (
      <>
        <ProductWrap category="categoryList" text={categoryName}>
          <ProductList type="category" productArr={categoryProductArr} />
        </ProductWrap>
        <Paging />
      </>
    );
  }
}
