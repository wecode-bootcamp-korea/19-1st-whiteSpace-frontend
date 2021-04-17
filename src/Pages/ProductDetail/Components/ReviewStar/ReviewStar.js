import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal/Modal';
import './ReviewStar.scss';

export default class ReviewStar extends Component {
  constructor() {
    super();
    this.state = {
      reviewArr: [],
      modalOpen: false,
      modalContents: '',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);

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

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

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

  render() {
    const { children } = this.props;
    const { modalOpen, modalContents } = this.state;
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
                <img src={modalContents} alt="modalImage" />
              </div>
              <div className="reviewContentWrap">
                <div>
                  <img
                    alt="reviewProductImage"
                    src="https://assets5.cre.ma/p/gong100-kr/products/00/00/00/05/97/image/extra_small_f5170bce8c0ba53b.jpg"
                  />
                  <div>
                    <p>[제습제 증정]사계절 이불 오트밀, 베이지</p>
                    <p>★★★★★</p>
                    <p className="reviewAuthor">applebanana</p>
                  </div>
                </div>
                <div className="reviewOption">
                  <span>선택한 옵션</span>
                  <span>오트밀, 베이지 이불+베개커버 SS</span>
                </div>
                <p className="reviewContent">
                  사계절 침구세트 구입후. 재구매입니다. 까다로운 큰 아이의
                  취향을 온전히 만족했다는게 신기할 정도예요. 피부트러블 포근함.
                  바삭거리는 소리 없음. 예민한 아이가 숙면으로 아침에 일어나기
                  힘들다는 후기에 깜짝 놀랐네요. 이제 저희집은 모두가. 여백과
                  함께 숙면을.... 모두가 적극 추천이랍니다~ 가볍고 몸에 착
                  감겨요 너무 좋아요 보들보들해서 살에 닿는 촉감이 진짜 최고ㅠ
                  겨울에도 솜 넣어 쓰면 좋을 것 같아요 부피가 크지 않아서
                  보관하기도 좋을 것 같아요 색상은 처음에는 너무 진한가 싶었는데
                  보다 보니 또 잘 어울리고 양면이라 그날 그날 기분따라 바꿀 수
                  있다는 것도 좋아요 좋다는 말을 몇 번이나 쓴거죠..? 무튼 좋아요
                  고양이도 좋아해요!!
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const REVIEW_STAR = [...Array(5).keys()].reverse().map(v => v + 1);
const REVIEW_THUM_ARR = [
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/32/80/image1/20e5b79f89a1573e.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/35/73/image1/bab26bc85cb32c9c.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/33/95/image1/4028caddbd3b4097.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/36/42/image1/160fb25e41d80f1f.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/36/19/image1/f6029444fdb72a45.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/36/91/image1/85939d7671a49659.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/28/07/image1/68792f77c6c8d729.jpg',
  'https://assets5.cre.ma/p/gong100-kr/reviews/00/00/10/69/91/image1/600e0f22d5b786cc.jpg',
];
