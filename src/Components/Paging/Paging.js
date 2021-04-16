import React, { Component } from 'react';
import './Paging.scss';

export default class Paging extends Component {
  render() {
    const { pagingBtnOnClick, currentIdx, btnAmount } = this.props;
    // console.log(currentIdx);
    const pagesArr = [...Array(btnAmount).keys()].map(v => v + 1);

    return (
      <div className="paging">
        {currentIdx !== 1 && (
          <button
            className="prevBtn"
            onClick={() => {
              pagingBtnOnClick('prev');
            }}
          >
            <i className="xi-angle-left-min"></i>
          </button>
        )}
        {pagesArr.map(page => {
          return (
            <button
              key={page}
              className={'pagingBtn ' + (page === currentIdx && 'currentBtn')}
              onClick={() => {
                pagingBtnOnClick(page);
              }}
            >
              {page}
            </button>
          );
        })}
        {currentIdx < btnAmount && (
          <button
            className="nextBtn"
            onClick={() => {
              pagingBtnOnClick('next');
            }}
          >
            <i className="xi-angle-right-min"></i>
          </button>
        )}
      </div>
    );
  }
}
