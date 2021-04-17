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
      categoryProductArr: [],
      categoryName: '',
      // categoryId: this.props.location.state.categoryId,
      currentIdx: 1,
    };
  }

  componentDidMount() {
    console.log(this.props);
    // const { categoryId } = this.state;

    // fetch(
    //   `http://10.58.2.83:8000/products${categoryId !== 0}`
    //     ? `?category=${categoryId}`
    //     : ``
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       categoryProductArr: data[0].product,
    //       categoryName: data[0].product[0].categoryName,
    //     });
    //   });

    fetch('data/categoryProductData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          categoryProductArr: data.products,
          categoryName: data.category,
        });
        // this.setState({
        //   categoryProductArr: data[0].product,
        //   categoryName: data[0].product[0].categoryName,
        // });
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
        break;
      default:
        this.setState({
          currentIdx: idx,
        });
        fetchProduct(idx);
    }
  };

  fetchProduct = idx => {
    console.log('fetchProduct');
    const { currentIdx, categoryId } = this.state;
    // const { categoryId } = this.props.location.state;
    fetch(
      `http://10.58.2.83:8000/products${
        categoryId === 0 ? `` : `?category=${categoryId}`
      }?limit=${LIMIT}&offset=${(currentIdx - 1) * LIMIT}`
    )
      .then(res => res.json())
      .then(res => this.setState({ categoryProductArr: res }));
  };

  render() {
    const { categoryProductArr, categoryName, currentIdx } = this.state;
    const { pagingBtnOnClick } = this;
    const total = categoryProductArr.count;
    const btnAmount = Math.ceil(total / LIMIT);
    return (
      <>
        <Nav />
        <ProductWrap category="categoryList" text={categoryName}>
          <ProductList type="category" productArr={categoryProductArr} />
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
