import React, { Component } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import { stars } from '../Review/reviewData';
import './AddReview.scss';

export default class AddReview extends Component {
  constructor() {
    super();
    this.state = {
      fileArr: [],
      review: [],
      reviewContents: '',
      star: '5',
    };
  }

  handleFileInput = e => {
    const { fileArr } = this.state;
    const { files } = e.target;
    const newArr = [];

    for (let i = 0; i < files.length; i++) {
      newArr.push({
        id: i,
        files: files[i],
        src: window.URL.createObjectURL(files[i]),
      });
    }

    console.log(newArr);

    // const newFile = [...fileArr, newArr];

    // this.setState({
    //   fileArr: newFile,
    // });
  };

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

  addReview = e => {
    const { reviewContents, review, star, fileArr } = this.state;
    const { fetchReview } = this;

    if (!reviewContents.trim()) {
      alert('리뷰 내용을 입력해주세요.');
    } else {
      // const newReview = [
      //   ...review,
      //   { star, reviewContents: reviewContents.trim() },
      // ];
      // this.setState({ review: newReview });
      // const reviewImg = new FormData();
      // fileArr.map( (file) => {
      // });
      // reviewImg.append('reviewImg', fileArr.files);
      // fetchReview(newReview);
    }
  };

  fetchReview = nextReview => {
    // console.log(nextReview);
    // fetch('url', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': localStorage.getItem('token')
    //   },
    //   body: JSON.stringify({
    //     img_url: ['url',
    //       'url',
    //     ],
    //     review: review
    //   })
    // })
    //   .then(res => {})
    //   .then(res => {});
  };

  render() {
    const { fileArr } = this.state;
    const { deletePhoto, handleReviewValue, handleFileInput, addReview } = this;
    return (
      <div className="addReviewWrap">
        <p>후기</p>
        <div className="reviewHeader">
          <span>REVIEW&emsp;| </span>
          <span className="reviewDesc">
            리뷰의 글자수, 구매도움수, 사진 여부, 최신작성일 등을 바탕으로 여백
            0100이 추천하는 리뷰를 정합니다.
          </span>
        </div>
        <div className="textareaWrap">
          <textarea onChange={handleReviewValue} name="reviewContents" />
          {fileArr.map(images => {
            console.log(fileArr);
            images.map(image => {
              const { id, src } = image;
              return (
                <div
                  key={id}
                  className="reviewImageWrap"
                  onClick={() => deletePhoto(id)}
                >
                  <img src={src} alt="reviewImage" />
                  <div className="deleteImage">삭제</div>
                </div>
              );
            });
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
              multiple
              onChange={handleFileInput}
            />
          </div>
          <select onChange={handleReviewValue} name="star">
            {stars.map(star => {
              const { value, reviewStar, comment } = star;
              return (
                <option key={value} value={value}>
                  {reviewStar}&emsp;
                  {comment}
                </option>
              );
            })}
          </select>
          <button type="submit" className="addReview" onClick={addReview}>
            <i className="xi-check-circle"></i>
            리뷰 등록하기
          </button>
        </div>
      </div>
    );
  }
}
