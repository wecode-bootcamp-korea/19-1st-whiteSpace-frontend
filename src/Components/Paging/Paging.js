import React, { Component } from 'react';
import './Paging.scss';

export default class Paging extends Component {
  constructor() {
    super();
    const { currentIdx, btnAmount, offset, fetchDrink } = this.props;
    this.state = {
      btnArr: [...Array(btnAmount).keys()],
    };
  }
  render() {
    const { btnArr } = this.state;

    return (
      <>
        <div className="paging">
          {btnArr.map(btn => {
            <div class="pagingBtn">btn</div>;
          })}
        </div>
      </>
    );
  }
}
