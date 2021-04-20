import React, { Component } from 'react';
import { stars } from '../ProductReview/reviewData';
import './AddReview.scss';

export default class AddReview extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      changedFileIndex: -1,
      review: [],
      reviewContents: '',
      star: '5',
    };
    this.fileUploader = React.createRef();
  }

  handleReviewValue = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onClickTextArea = e => {
    if (true) {
      // e.target.disabled = true;
      // alert('구매한 상품에만 리뷰를 작성할 수 있습니다.');
    }
  };

  deleteFile = file => {
    this.setState(prevState => {
      const list = [];
      prevState.files.map(prevStateFile => {
        prevStateFile !== file && list.push(prevStateFile);
      });

      return {
        files: list,
        changedFileIndex: -1,
      };
    });
  };

  changeFile = index => {
    this.setState({ changedFileIndex: index });
    this.fileUploader.current.click();
  };

  fileUpload = e => {
    const { changedFileIndex, files } = this.state;
    let changedFile = e.target.files[0];
    let uploadedFiles = e.target.files;

    if (changedFileIndex >= 0) {
      this.setState(prevState => {
        const list = [];
        prevState.files.map((file, index) => {
          list.push(index === prevState.changedFileIndex ? changedFile : file);
        });
        return {
          files: list,
          changedFileIndex: -1,
        };
      });
    } else if (files.length > 0) {
      this.setState(prevState => {
        return { files: [...prevState.files, ...uploadedFiles] };
      });
    } else this.setState({ files: [...e.target.files] });
  };

  addReview = () => {
    const { reviewContents, review, star, files } = this.state;
    const { fetchReview } = this;

    if (!reviewContents.trim()) {
      alert('리뷰 내용을 입력해주세요.');
    } else {
      const newReview = [
        ...review,
        { star, reviewContents: reviewContents.trim() },
      ];
      this.setState({ review: newReview });

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`files${i}`, files[i]);
      }
      fetchReview(newReview, formData);
    }
  };

  fetchReview = (newReview, formData) => {
    //formdata 확인방법
    // for (let [key, value] of formData) {
    //   console.log(`${key}: ${value}`);
    // }
    // console.log(newReview);
    // fetch('url', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': localStorage.getItem('token')
    //   },
    //   body: JSON.stringify({
    //     images: formData,
    //     review: newReview
    //   })
    // })
    //   .then(res => {})
    //   .then(res => {});
  };

  render() {
    const { files } = this.state;
    const {
      deleteFile,
      handleReviewValue,
      changeFile,
      addReview,
      fileUpload,
    } = this;

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
          <textarea
            onClick={this.onClickTextArea}
            onChange={handleReviewValue}
            name="reviewContents"
          />
          {files.map((file, index) => {
            const { lastModified } = file;
            return (
              <div key={lastModified} className="reviewImageWrap">
                <button onClick={() => changeFile(index)}>
                  <i className="xi-renew"></i>
                </button>
                <button onClick={() => deleteFile(file)}>
                  <i className="xi-close"></i>
                </button>
                <img src={window.URL.createObjectURL(file)} alt="reviewImage" />
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
              multiple
              onChange={fileUpload}
              ref={this.fileUploader}
            />
          </div>
          <select onChange={handleReviewValue} name="star">
            {stars.reverse().map(star => {
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
