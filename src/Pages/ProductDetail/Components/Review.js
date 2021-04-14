import React, { Component } from 'react';
import AddReview from './AddReview';
import ReviewStar from './ReviewStar';

export default class Review extends Component {
  render() {
    return (
      <div>
        <AddReview />
        <ReviewStar />
      </div>
    );
  }
}
