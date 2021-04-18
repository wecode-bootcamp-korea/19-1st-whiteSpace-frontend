import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import './ReviewList.scss';

export default class ReviewList extends Component {
  constructor() {
    super();
    this.state = {
      reviewArr: [],
      modalOpen: false,
      modalContents: '',
      show: false,
      starComment: '',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  showToggle = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    window.scrollTo({ bottom: 2 });
  };

  handelModal = (modalOpen, image) => {
    this.setState({
      modalOpen,
      modalContents: image,
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
    const { modalOpen, modalContents, show } = this.state;
    const { handelModal, showToggle, newSorting, starSorting } = this;
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
        <div className="reviewContentWrap">
          {reviewArr.map(review => {
            return (
              <section className="reviewContentSection" key={review.id}>
                <span className="star">
                  {'★'.repeat(review.star) + '☆'.repeat(5 - review.star)}
                  <span className="desc"> - {review.starComment}</span>
                </span>
                <div className="reviewContent">
                  <p className="content">{review.content}</p>
                  <div>
                    <p>작성자</p>
                    <p>{review.author.slice(0, -3) + '*'.repeat(3)}</p>
                  </div>
                </div>
                <div className="reviewImage">
                  {review.images.map((image, index) => {
                    return (
                      <a href="#!" key={index}>
                        <img
                          className="reviewThum"
                          src={image}
                          alt="reviewThumnail"
                          onClick={() => {
                            handelModal(1, image);
                          }}
                        />
                      </a>
                    );
                  })}
                </div>
                <span
                  className="toggleText blue"
                  onClick={() => showToggle(review.id)}
                >
                  {show ? '접기' : '1개의 댓글이 있습니다.'}
                </span>
                {show && (
                  <div className="reviewComment">
                    <span className="blue">여백</span>
                    <span>
                      안녕하세요, 고객님. 여백 상담사 김남선입니다.
                      <br />
                      저희 여백을 믿고 구매하신 뒤 소중한 시간을 내어 후기글을
                      남겨주셔서 감사합니다.
                      <br />
                      무엇이든 담을 수 있고 무엇이든 비울 수 있는 공간, 그
                      공간의 가치를 만드는 여백이 되겠습니다.
                      <br />
                      추가 문의 사항은 언제든지 고객센터로 연락주시면 빠르게
                      상담 도와드리겠습니다.
                      <br />
                      앞으로도 고객님의 변함없는 성원을 부탁드리며, 늘 건강과
                      행복이 가득하시길 기원합니다. 감사합니다.
                      <br />
                      <br />● 여백 고객센터 유선연결 02-4504-9209로 전화주시면
                      상담 가능합니다.
                    </span>
                  </div>
                )}
              </section>
            );
          })}
        </div>
        <Modal
          open={modalOpen}
          close={() => {
            handelModal(0);
          }}
        >
          <img className="originImage" alt="originImage" src={modalContents} />
        </Modal>
      </div>
    );
  }
}
