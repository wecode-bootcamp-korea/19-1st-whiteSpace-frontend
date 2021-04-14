import React, { Component } from 'react';
import './ReviewStar.scss';

export default class ReviewStar extends Component {
  constructor() {
    super();
    this.state = {
      reviewArr: [],
    };
  }

  componentDidMount() {
    const { reviewArr } = this.state;
    this.setState({
      reviewArr: [
        ...reviewArr,
        {
          id: '',
          star: '',
          contents: '',
        },
      ],
    });
  }
  render() {
    return (
      <div className="reviewStar">
        <div className="starAvgWrap">
          <div>
            <div className="starAvg">4.8</div>
            <span>88개 리뷰 평점</span>
          </div>
        </div>
        <div className="starBarWrap">
          {REVIEW_STAR.map((star, index) => {
            return (
              <a href="#!" key={index}>
                <div className="starBarContentWrap">
                  <span>{star} stars</span>
                  <div className="starBar"></div>
                  <span>(76)</span>
                </div>
              </a>
            );
          })}
        </div>
        <div>
          <span>이 상품의 포토/동영상 모아보기</span>
        </div>
      </div>
    );
  }
}

const REVIEW_STAR = [...Array(5).keys()].reverse().map(v => v + 1);
