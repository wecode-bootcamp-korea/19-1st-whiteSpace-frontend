import React, { Component } from 'react';
import './ProductDetail.scss';
import ProductSubImg from './Components/ProductSubImg';
import ProductDesc from './Components/ProductDesc';
import ProductOpt from './Components/ProductOpt';
import ProductTotalPrice from './Components/ProductTotalPrice';
import ProductBtn from './Components/ProductBtn';
import ProductDescImg from './Components/ProductDescImg';

class ProductDetail extends Component {
  state = {
    productImgArr: [],
    price: '',
    discountRate: '',
    name: '',
    colors: [],
    sizes: [],
    bundles: [],
    bundlePrice: '',
    descImgArr: [],
    index: 0,
    count: 1,
  };

  componentDidMount() {
    fetch('http://10.58.2.3:8000/products/26')
      .then(res => res.json())
      .then(data => {
        this.setState({
          productImgArr: data.product.sub_images,
          price: data.product.price,
          discountRate: data.product.discount_rate,
          name: data.product.name,
          colors: data.product.colors,
          sizes: data.product.sizes,
          bundles: data.product.bundles,
          descImgArr: data.product.description_images,
        });
      });
  }

  goToCart = () => {
    const { count } = this.state;
    fetch('http://10.58.7.33:8000/cart', {
      method: 'POST',
      body: JSON.stringify({
        total_price: 35000,
        products: [
          {
            product_id: 11,
            bundle_id: 6,
            color_id: 2,
            size_id: 1,
            quantity: count,
          },
        ],
      }),
    });
  };

  changeImg = index => {
    this.setState({
      index: index,
    });
  };

  incrQty = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  };

  decrQty = () => {
    const count = this.state.count - 1;
    this.setState({
      count: count < 0 ? 0 : count,
    });
  };

  delProduct = e => {
    e.target.closest('div').remove();
  };

  calBundlePrice = name => {
    const { bundles } = this.state;
    let target;
    for (let item of bundles) {
      if (item.name === name) {
        target = item.price_gap;
      }
    }
    this.setState({
      bundlePrice: target,
    });
  };

  render() {
    const {
      productImgArr,
      price,
      discountRate,
      name,
      colors,
      sizes,
      bundles,
      bundlePrice,
      descImgArr,
      count,
      index,
    } = this.state;
    const { incrQty, decrQty, delProduct, calBundlePrice } = this;
    const { changeImg } = this;

    const intPrice = parseInt(price.replace(',', ''));
    const intBundlePrice = parseInt(bundlePrice.replace(',', ''));
    const intDcPrice = Math.floor(price - price * discountRate);

    const strDcPrice = Math.floor(
      price - price * discountRate
    ).toLocaleString();
    const strPrice = parseInt(price.replace(',', '')).toLocaleString();

    return (
      <>
        <main className="productDetail">
          <div className="productImgWrap">
            <img alt="mainImg" className="mainImg" src={productImgArr[index]} />
            <ProductSubImg ImgArr={productImgArr} changeImg={changeImg} />
          </div>
          <div className="productInfo">
            <ProductDesc
              name={name}
              strPrice={strPrice}
              strDcPrice={strDcPrice}
            />
            <ProductOpt
              colors={colors}
              sizes={sizes}
              bundles={bundles}
              count={count}
              name={name}
              incrQty={incrQty}
              decrQty={decrQty}
              delProduct={delProduct}
              calBundlePrice={calBundlePrice}
            />
            <ProductTotalPrice
              count={count}
              intPrice={intPrice}
              intDcPrice={intDcPrice}
              intBundlePrice={intBundlePrice}
            />
            <ProductBtn />
          </div>
        </main>
        <ProductDescImg descImgArr={descImgArr} />
      </>
    );
  }
}

export default ProductDetail;
