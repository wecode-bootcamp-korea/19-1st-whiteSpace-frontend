import React, { Component } from 'react';
import Review from '../Review/Review';
import './ReviewList.scss';

export default class ReviewList extends Component {
  constructor() {
    super();
    this.state = {
      reviewArr: [],
    };
  }

  render() {
    const { total, reviewArr } = this.props;
    return (
      <div className="reviewListWrap">
        <header className="listHeader">
          <span>리뷰 ({total}) </span>
          <span> | </span>
          <span className="newSortingList">최신순</span>
          <span> | </span>
          <span className="starSortingList">별점순</span>
        </header>
        {reviewArr.map((review, index) => {
          const { rating, text, author, image_urls } = review;
          return (
            <Review
              key={index}
              id={index}
              star={rating}
              content={text}
              author={author}
              images={image_urls}
            />
          );
        })}
      </div>
    );
  }
}
