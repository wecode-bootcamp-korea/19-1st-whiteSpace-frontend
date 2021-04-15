import React, { Component } from 'react';
import './Paging.scss';

export default class Paging extends Component {
  render() {
    return (
      <>
        <div className="paging">
          <a href="#!">
            <div className="prevBtn">
              <i className="xi-angle-left-min"></i>
            </div>
          </a>
          <a href="#!">
            <div className="pagingBtn">1</div>
          </a>
          <a href="#!">
            <div className="pagingBtn">2</div>
          </a>
          <a href="#!">
            <div className="pagingBtn">3</div>
          </a>
          <a href="#!">
            <div className="pagingBtn">4</div>
          </a>
          <a href="#!">
            <div className="pagingBtn">5</div>
          </a>
          <a href="#!">
            <div className="nextBtn">
              <i className="xi-angle-right-min"></i>
            </div>
          </a>
        </div>
      </>
    );
  }
}
