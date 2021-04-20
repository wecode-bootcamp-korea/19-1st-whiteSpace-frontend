import React, { Component } from 'react';
import './Paging.scss';

export default class Paging extends Component {
  render() {
    const { pagingBtnOnClick, currentIdx, btnAmount } = this.props;
    const pagesArr = [...Array(btnAmount).keys()].map(v => v + 1);

    return (
      <div className="paging">
        {currentIdx !== 1 && (
          <>
            <button
              className="firstPageBtn"
              onClick={() => {
                pagingBtnOnClick(1);
              }}
            >
              <i className="fas fa-angle-double-left"></i>
            </button>
            <button
              className="prevBtn"
              onClick={() => {
                pagingBtnOnClick(currentIdx - 1);
              }}
            >
              <i className="fas fa-angle-left"></i>
            </button>
          </>
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
          <>
            <button
              className="nextBtn"
              onClick={() => {
                pagingBtnOnClick(currentIdx + 1);
              }}
            >
              <i className="fas fa-angle-right"></i>
            </button>
            <button
              className="nextBtn"
              onClick={() => {
                pagingBtnOnClick(btnAmount);
              }}
            >
              <i className="fas fa-angle-double-right"></i>
            </button>
          </>
        )}
      </div>
    );
  }
}
