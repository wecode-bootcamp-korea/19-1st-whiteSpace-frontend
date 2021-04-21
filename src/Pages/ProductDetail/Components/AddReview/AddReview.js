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
      imageUrl: '',
      imageArr: [],
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
      // alert('로그인 후 작성하실 수 있습니다.');
    }
  };

  // deletePhoto = id => {
  //   const { imageArr } = this.state;
  //   this.setState({
  //     imageArr: imageArr.filter(file => file.id !== id),
  //   });
  // };

  deleteFile = file => {
    this.setState(prevState => {
      const list = [];
      prevState.files.filter(prevStateFile => {
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
        prevState.files.filter((file, index) => {
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

  // handleInput = e => {
  //   const { value } = e.target;
  //   const { imageUrl, imageArr } = this.state;
  //   this.setState({
  //     imageUrl: value,
  //   });

  //   if (e.key === 'Enter') {
  //     this.setState({
  //       imageArr: [
  //         ...imageArr,
  //         {
  //           id: imageArr.length + 1,
  //           url: imageUrl,
  //         },
  //       ],
  //       imageUrl: '',
  //     });
  //   }
  // };

  addReview = () => {
    console.log('addreview');
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
    // console.log(newReview[0].reviewContents);
    // console.log(newReview[0].star);
    fetch('http://10.58.7.33:8000/products/3/reviews', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        image_urls: [],
        // image_urls: formData,
        text: newReview[0].reviewContents,
        rating: newReview[0].star,
        bundle_id: null,
        color_size_id: null,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  render() {
    const { files, imageUrl } = this.state;
    const { handleReviewValue, addReview, deletePhoto, handleInput } = this;

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
          {/* {this.state.imageArr.map((image, index) => {
            console.log(this.state.imageArr[index]);
            return (
              <div
                key={this.state.imageArr[index].url}
                className="reviewImageWrap"
                onClick={() => deletePhoto(this.state.imageArr[index].id)}
              >
                <img src={this.state.imageArr[index].url} alt="reviewImage" />
                <div className="deleteImage">삭제</div>
              </div>
            );
          })} */}
          {files.map((file, index) => {
            const { lastModified } = file;
            return (
              <div key={lastModified} className="reviewImageWrap">
                <button onClick={() => this.changeFile(index)}>
                  <i className="xi-renew"></i>
                </button>
                <button onClick={() => this.deleteFile(file)}>
                  <i className="xi-close"></i>
                </button>
                <img src={window.URL.createObjectURL(file)} alt="reviewImage" />
              </div>
            );
          })}
        </div>
        <div className="reviewFooter">
          <div className="addPhoto">
            {/* <input
              class="addPhotoInput"
              type="text"
              placeholder="이미지 url을 입력하세요"
              onChange={handleInput}
              onKeyUp={handleInput}
              value={imageUrl}
            /> */}
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
              onChange={this.fileUpload}
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
