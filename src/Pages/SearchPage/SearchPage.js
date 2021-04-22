import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProductWrap from '../../Components/ProductWrap/ProductWrap';
import ProductList from '../ProductList/ProductList';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      productArr: [],
      noResult: false,
    };
  }
  componentDidMount() {
    this.fetchProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchProduct();
    }
  }

  fetchProduct = () => {
    const searchKeyword = this.props.location.search.split('=')[1];

    fetch(`http://10.58.5.243:8000/products/search?keyword=${searchKeyword}`)
      .then(res => res.json())
      .then(searchList => {
        const { products } = searchList;

        if (searchList.MESSAGE === 'NO MATCH') {
          this.setState({
            noResult: true,
          });
        }
        this.setState({
          productArr: products,
        });
      });
  };

  render() {
    const { productArr, noResult } = this.state;
    const searchKeyword = this.props.location.search.split('=')[1];
    return (
      <>
        {noResult ? (
          <ProductWrap category="noResult" text="검색한 결과가 없습니다." />
        ) : (
          <ProductWrap category="search" text={searchKeyword}>
            <ProductList type="category" productArr={productArr} />
          </ProductWrap>
        )}
      </>
    );
  }
}

export default withRouter(SearchPage);
