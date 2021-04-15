import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Paging.scss';

export default class Paging extends Component {
  render() {
    return (
      <>
        <div className="paging">
          <Link to="#!">
            <div className="prevBtn">
              <i className="xi-angle-left-min"></i>
            </div>
          </Link>
          <Link to="#!">
            <div className="pagingBtn">1</div>
          </Link>
          <Link to="#!">
            <div className="pagingBtn">2</div>
          </Link>
          <Link to="#!">
            <div className="pagingBtn">3</div>
          </Link>
          <Link to="#!">
            <div className="pagingBtn">4</div>
          </Link>
          <Link to="#!">
            <div className="pagingBtn">5</div>
          </Link>
          <Link to="#!">
            <div className="nextBtn">
              <i className="xi-angle-right-min"></i>
            </div>
          </Link>
        </div>
      </>
    );
  }
}
