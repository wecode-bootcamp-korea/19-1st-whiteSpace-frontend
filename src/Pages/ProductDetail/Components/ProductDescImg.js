import React, { Component } from 'react';
import './ProductDescImg.scss';

class ProductDescImg extends Component {
  render() {
    const { descImgArr } = this.props;

    return (
      <div className="infoWrap">
        <div className="infoCategory">
          <li>상세정보&emsp;|</li>
          <li>&emsp; 후기</li>
        </div>
        <div className="descImgArr">
          {descImgArr.map((img, index) => {
            return (
              <img key={index} alt="descImg" className="descImg" src={img} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductDescImg;
