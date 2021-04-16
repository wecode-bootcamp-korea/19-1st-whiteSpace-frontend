import React, { Component } from 'react';
import './ProductDetail.scss';
import ProductImg from './Components/ProductImg';
import ProductInfo from './Components/ProductInfo';

class ProductDetail extends Component {
  state = {
    productImgArr: [],
    productInfoArr: [],
  };

  componentDidMount() {
    fetch('data/ProductData.json')
      .then(res => res.json())
      .then(data => {
        console.log(data['id']);
        this.setState({
          productImgArr: data.imgSrc,
          productInfoArr: data.imgSrc,
        });
      });
  }

  render() {
    const { productImgArr, productInfoArr } = this.state;

    return (
      <div className="ProductMaiImg">
        <ProductImg productImgArr={productImgArr} />
        <ProductInfo productInfoArr={productInfoArr} />
      </div>
    );
  }
}

export default ProductDetail;

//   name: [],
//   originPrice: [],
//   dcPrice: [],
//   subImgs: [],
//   brandOptions: [],
// };
