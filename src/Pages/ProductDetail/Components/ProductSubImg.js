import React, { Component } from 'react';
import './ProductSubImg.scss';

class ProductSubImg extends Component {
  render() {
    const { ImgArr, changeImg } = this.props;

    return (
      <div className="productSubImg">
        {ImgArr.map((img, index) => {
          return (
            <img
              key={index}
              alt="subImg"
              className="subImg"
              src={img}
              onClick={() => changeImg(index)}
            />
          );
        })}
      </div>
    );
  }
}

export default ProductSubImg;
