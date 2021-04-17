import React, { Component } from 'react';
import './ProductWrap.scss';

export default class ProductWrap extends Component {
  render() {
    const { children, category, text } = this.props;
    return (
      <div className="productWrap">
        <header>
          <h1
            className={
              (category === 'best' ? 'bestTitle' : 'categoryTitle') + ' title'
            }
          >
            {text}
          </h1>
        </header>
        {children}
      </div>
    );
  }
}
