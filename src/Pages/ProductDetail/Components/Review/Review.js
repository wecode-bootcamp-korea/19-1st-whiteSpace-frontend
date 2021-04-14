import React, { Component } from 'react';
import AddReview from '../AddReview/AddReview';
import ReviewStar from '../ReviewStar/ReviewStar';

export default class Review extends Component {
  render() {
    return (
      <>
        <AddReview />
        <ReviewStar />
      </>
    );
  }
}
