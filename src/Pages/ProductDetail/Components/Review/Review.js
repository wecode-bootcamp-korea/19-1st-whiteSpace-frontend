import React, { Component } from 'react';
import AddReview from '../AddReview/AddReview';
import ReviewTest from '../AddReview/ReviewTest';
import ReviewStar from '../ReviewStar/ReviewStar';
import ReviewList from '../ReviewList/ReviewList';

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
      reviewArr: [],
      starArr: [],
      productName: '',
      productUrl: '',
    };
  }
  componentDidMount() {
    fetch('data/review.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          reviewArr: data.reviews,
          productName: data.product_name,
          productUrl: data.product_url,
          starArr: [
            data.five_star,
            data.four_star,
            data.three_star,
            data.two_star,
            data.one_star,
          ],
        });
      });
  }
  render() {
    const { reviewArr, productName, productUrl, starArr } = this.state;
    return (
      <>
        <AddReview />
        <ReviewTest />
        {/* <ReviewStar
          total={reviewArr.length}
          starArr={starArr}
          productName={productName}
          productUrl={productUrl}
          reviewArr={reviewArr}
        />
        <ReviewList
          total={reviewArr.length}
          starArr={starArr}
          productName={productName}
          productUrl={productUrl}
          reviewArr={reviewArr}
        /> */}
      </>
    );
  }
}
