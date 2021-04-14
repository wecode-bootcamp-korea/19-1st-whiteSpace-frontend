import React, { Component } from 'react';
import './Review.scss';

const STARS = [
  {
    value: 5,
    reviewStar: '★★★★★',
    comment: '아주 좋아요',
  },
  {
    value: 4,
    reviewStar: '★★★★☆',
    comment: '맘에 들어요',
  },
  {
    value: 3,
    reviewStar: '★★★☆☆',
    comment: '보통이예요',
  },
  {
    value: 2,
    reviewStar: '★★☆☆☆',
    comment: '그냥 그래요',
  },
  {
    value: 1,
    reviewStar: '★☆☆☆☆',
    comment: '별로예요',
  },
];

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      reviewContents: '',
      star: '5',
      fileArr: [],
    };
  }

  handleFileInput(e) {
    const { fileArr } = this.state;
    const { files } = e.target;
    this.setState(
      {
        fileArr: [
          ...fileArr,
          {
            // id: fileArr.length + 1,
            // files: files[0],
            src: window.URL.createObjectURL(files[0]),
          },
        ],
      },
      () => {
        // console.log(fileArr);
      }
    );
  }

  handleReviewValue = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  deletePhoto = id => {
    const { fileArr } = this.state;
    this.setState({
      fileArr: fileArr.filter(file => file.id !== id),
    });
  };

  addReview = () => {
    const { reviewContents, review, star } = this.state;
    if (!reviewContents) {
      alert('리뷰 내용을 입력해주세요.');
    } else {
      this.setState(
        {
          review: [
            ...review,
            {
              star,
              reviewContents,
            },
          ],
        },
        () => {
          // console.log(review);
        }
      );
    }
  };

  render() {
    const { fileArr } = this.state;
    const { deletePhoto, handleReviewValue, handleFileInput, addReview } = this;
    return (
      <div className="reviewWrap">
        <p>후기</p>
        <div className="reviewHeader">
          <span>REVIEW</span>
          <span>|</span>
          <span className="reviewDesc">
            리뷰의 글자수, 구매도움수, 사진 여부, 최신작성일 등을 바탕으로 여백
            0100이 추천하는 리뷰를 정합니다.
          </span>
        </div>
        <div className="textareaWrap">
          <textarea
            onChange={e => handleReviewValue(e)}
            name="reviewContents"
          ></textarea>
          {fileArr.map(image => {
            const { id, src } = image;
            return (
              <div
                key={id}
                className="reviewImageWrap"
                onClick={() => {
                  deletePhoto(id);
                }}
              >
                <img src={src} alt="reviewImage" />
                <div className="deleteImage">삭제</div>
              </div>
            );
          })}
        </div>
        <div className="reviewFooter">
          <div className="addPhoto">
            <div>
              <label htmlFor="inputFile">
                <i className="xi-camera"></i>
                <span>+ 사진 추가</span>
              </label>
            </div>
            <input
              type="file"
              id="inputFile"
              onChange={e => handleFileInput(e)}
            />
          </div>
          <select onChange={e => handleReviewValue(e)} name="star">
            {STARS.map(star => {
              const { value, reviewStar, comment } = star;
              return (
                <option value={value}>
                  {reviewStar}
                  {comment}
                </option>
              );
            })}
          </select>
          <button className="addReview" onClick={addReview}>
            <i className="xi-check-circle"></i>
            리뷰 등록하기
          </button>
        </div>
      </div>
    );
  }
}
