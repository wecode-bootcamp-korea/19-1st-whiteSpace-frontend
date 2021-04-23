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
      modalStar: '',
    };
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleModal = (modalOpen, modalId, image) => {
    const { reviewArr } = this.props;
    if (!modalOpen) {
      this.setState({
        modalOpen,
      });
    } else {
      this.setState({
        modalOpen,
        modalImage: image,
        modalId,
        modalStar:
          '★'.repeat(reviewArr[modalId].rating) +
          '☆'.repeat(5 - reviewArr[modalId].rating),
        modalAutor: reviewArr[modalId].author,
        modalContents: reviewArr[modalId].text,
        modalOption: reviewArr[modalId].bundle,
      });
    }
  };

  handleClickOutside = e => {
    const { className } = e.target;

    if (className.includes('openModal')) {
      this.setState({
        modalOpen: false,
      });
    }
  };

  render() {
    const {
      total,
      reviewArr,
      productName,
      productUrl,
      starArr,
      ratingAvg,
    } = this.props;
    const {
      modalOpen,
      modalImage,
      modalStar,
      modalAutor,
      modalContents,
      modalOption,
    } = this.state;
    const { handleModal } = this;

    return (
      <div className="reviewStar">
        <div className="starAvgWrap">
          <div>
            <div className="starAvg">{ratingAvg.toFixed(1)}</div>
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
                      width: (100 / total) * starArr[index] * total + 'px',
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
                review.image_urls.length > 0 && (
                  <a href="#!" key={index}>
                    <img
                      className="reviewThum"
                      src={review.image_urls[0]}
                      alt="reviewThumnail"
                      onClick={() => {
                        handleModal(1, index, review.image_urls[0]);
                      }}
                    />
                  </a>
                )
              );
            })}
          </div>
        </div>
        <Modal
          open={modalOpen}
          close={() => {
            handleModal(0);
          }}
        >
          <div className="modalReviewWrap" ref={this.modalRef}>
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
                  <span>선택한 옵션 : </span>
                  <span>{modalOption === null ? '없음' : modalOption}</span>
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
