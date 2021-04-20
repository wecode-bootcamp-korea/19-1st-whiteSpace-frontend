import React, { Component } from 'react';
import './ProductWrap.scss';

export default class ProductWrap extends Component {
  render() {
    const { children, category, text } = this.props;
    return (
      <div
        className="productWrap"
        style={{ paddingTop: category !== 'best' ? 5 + 'rem' : '' }}
      >
        <header>
          <h1
            className={
              (category === 'best' ? 'bestTitle' : 'categoryTitle') + ' title'
            }
          >
            {text}
          </h1>
          {category === 'search' ? (
            <span className="searchResult"> 로 검색한 결과입니다.</span>
          ) : (
            ''
          )}
        </header>
        {children}
      </div>
    );
  }
}
