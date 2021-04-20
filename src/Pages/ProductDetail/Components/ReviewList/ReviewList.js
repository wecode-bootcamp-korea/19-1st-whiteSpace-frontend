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

  newSorting = () => {
    // fetch('url')
    //   .then(res => res.json())
    //   .then(reviewData => {
    //     this.setState({
    //       reviewArr: reviewData,
    //     });
    //   });
  };

  starSorting = () => {
    // fetch('url')
    //   .then(res => res.json())
    //   .then(reviewData => {
    //     this.setState({
    //       reviewArr: reviewData,
    //     });
    //   });
  };

  render() {
    const { total, reviewArr } = this.props;
    const { newSorting, starSorting } = this;
    return (
      <div className="reviewListWrap">
        <header className="listHeader">
          <span>리뷰 ({total}) </span>
          <span> | </span>
          <span className="newSortingList" onClick={newSorting}>
            최신순
          </span>
          <span> | </span>
          <span className="starSortingList" onClick={starSorting}>
            별점순
          </span>
        </header>
        {reviewArr.map(review => {
          const { id, star, content, starComment, author, images } = review;
          return (
            <Review
              key={id}
              id={id}
              star={star}
              content={content}
              starComment={starComment}
              author={author}
              images={images}
            />
          );
        })}
      </div>
    );
  }
}
