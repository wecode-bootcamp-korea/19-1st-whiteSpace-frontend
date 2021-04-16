import React, { Component } from 'react';
import Modal from './Components/Modal/Modal';
import './ReviewStar.scss';

export default class ReviewStar extends Component {
  constructor() {
    super();
    this.state = {
      reviewArr: [],
      modalOpen: false,
    };
  }

  handelModal = modalOpen => {
    this.setState({
      modalOpen,
    });
  };

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
    const { children } = this.props;
    const { modalOpen } = this.state;
    const { handelModal } = this;
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
              <div className="starBarContentWrap" key={index}>
                <span>{star} stars</span>
                <div className="starBar"></div>
                <span>(76)</span>
              </div>
            );
          })}
        </div>
        <div className="reviewThumWrap">
          <div>
            {REVIEW_THUM_ARR.map((image, index) => {
              return (
                <a href="#!">
                  <img
                    key={index}
                    className="reviewThum"
                    src={image}
                    alt=""
                    onClick={() => {
                      handelModal(1);
                    }}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <Modal
          open={modalOpen}
          close={() => {
            handelModal(0);
          }}
        >
          <main> {children} </main>
        </Modal>
      </div>
    );
  }
}

const REVIEW_STAR = [...Array(5).keys()].reverse().map(v => v + 1);
const REVIEW_THUM_ARR = [
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/75/image1/thumbnail_4d06231defbcfa21.jpg',
];
