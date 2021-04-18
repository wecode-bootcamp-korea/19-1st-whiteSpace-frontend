import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import './ReviewStar.scss';

export default class ReviewStar extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      modalId: '',
      modalImage: '',
      modalContents: '',
      modalAutor: '',
      modalOption: '',
      starAvg: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handelModal = (modalOpen, modalId, image) => {
    const { reviewArr } = this.props;
    this.setState({
      modalOpen,
      modalImage: image,
      modalId,
      modalStar:
        '★'.repeat(reviewArr[modalId - 1].star) +
        '☆'.repeat(5 - reviewArr[modalId - 1].star),
      modalAutor: reviewArr[modalId - 1].author,
      modalContents: reviewArr[modalId - 1].content,
      modalOption: reviewArr[modalId - 1].option,
    });
  };

  handleClickOutside = e => {
    const { className } = e.target;
    if (className.includes('openModal')) {
      this.setState({
        modalOpen: false,
      });
    }
  };

  starAvg = str => {
    console.log(str);
    const { starArr } = this.props;
    console.log(this.props.starArr);
    /* ((5 * 5점 개수) + (4 * 4점 개수) + (3 * 3점 개수) + (2 * 2점 개수) + (1 * 1점 개수) ) / 5 */
    const newArr = [];
    for (let i = 5; i <= 1; i--) {
      // newArr.push(arr[i - 1] * i);
      console.log(i);
    }
    // const totalScore = newArr.reduce((prev, current) => (prev += current));
    // return totalScore / 5;
    return 1;
  };

  render() {
    const { total, reviewArr, productName, productUrl, starArr } = this.props;
    const {
      modalOpen,
      modalImage,
      modalStar,
      modalAutor,
      modalContents,
      modalOption,
    } = this.state;
    const { handelModal } = this;
    console.log(starArr);

    return (
      <div className="reviewStar">
        <div className="starAvgWrap">
          <div>
            <div className="starAvg">요기</div>
            <span>{total}개 리뷰 평점</span>
          </div>
        </div>
        <div className="starBarWrap">
          {REVIEW_STAR.map((star, index) => {
            return (
              <div className="starBarContentWrap" key={index}>
                <span>{star} stars</span>
                <div className="starBar">
                  <div
                    className="innerStarBar redStarBar"
                    style={{
                      // width: starArr[index] * (total / 500) + 'px',
                      // width: (500 / 100) * (100 / total) * starArr[index] + '%',
                      width: (100 / total) * starArr[index] + 'px',
                    }}
                  ></div>
                </div>
                <span>({starArr[index]})</span>
              </div>
            );
          })}
        </div>
        <div className="reviewThumWrap">
          <div>
            {reviewArr.map((review, index) => {
              return (
                <a href="#!" key={index}>
                  <img
                    className="reviewThum"
                    src={review.images[0]}
                    alt="reviewThumnail"
                    onClick={() => {
                      handelModal(1, review.id, review.images[0]);
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
          <div className="modalReviewWrap">
            <div>
              <div className="reviewImageWrap">
                <img src={modalImage} alt="modalImage" />
              </div>
              <div className="reviewContentWrap">
                <div>
                  <img alt="reviewProductImage" src={productUrl} />
                  <div>
                    <p>{productName}</p>
                    <p>{modalStar}</p>
                    <p className="reviewAuthor">{modalAutor}</p>
                  </div>
                </div>
                <div className="reviewOption">
                  <span>선택한 옵션</span>
                  <span>{modalOption}</span>
                </div>
                <p className="reviewContent">{modalContents}</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const REVIEW_STAR = [...Array(5).keys()].reverse().map(v => v + 1);
