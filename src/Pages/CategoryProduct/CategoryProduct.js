import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API } from '../../config';
import ProductList from '../ProductList/ProductList';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import Paging from '../../Components/Paging/Paging';
import './CategoryProduct.scss';

const LIMIT = 9;

class CategoryProduct extends Component {
  constructor() {
    super();
    this.state = {
      totalAmount: 0,
      productArr: [],
      categoryName: '',
      currentIdx: 1,
    };
  }

  componentDidMount() {
    const { currentIdx } = this.state;
    const { fetchProduct } = this;
    fetchProduct(currentIdx);
  }

  componentDidUpdate(prevProps) {
    const { currentIdx } = this.state;
    const { fetchProduct } = this;

    if (prevProps.location.pathname !== this.props.location.pathname) {
      fetchProduct(currentIdx);
    }
  }

  fetchProduct = idx => {
    let categoryId = this.props.match.params.categoryId;

    if (categoryId === undefined) {
      categoryId = 0;
    }

    fetch(
      `${API}/products${
        categoryId ? `?category=${categoryId}&` : `?`
      }page=${idx}`
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
    return (
      <>
        <ProductWrap category="categoryList" text={categoryName}>
          <ProductList type="category" productArr={productArr} />
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
export default withRouter(CategoryProduct);
