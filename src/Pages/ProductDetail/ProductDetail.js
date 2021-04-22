import React, { Component } from 'react';
import { PRODUCT_DETAIL } from '../../config';
import { CART } from '../../config';
import { ORDER } from '../../config';
import ProductSubImg from './Components/ProductSubImg';
import ProductDesc from './Components/ProductDesc';
import ProductOpt from './Components/ProductOpt';
import ProductTotalPrice from './Components/ProductTotalPrice';
import ProductBtn from './Components/ProductBtn';
import ProductDescImg from './Components/ProductDescImg';
import ProductReview from './Components/ProductReview/ProductReview';
import './ProductDetail.scss';

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
    cart_id: '',
  };

  componentDidMount() {
    const productId = this.props.location.match.params;
    fetch(`${PRODUCT_DETAIL}/${productId}`)
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
    const productId = this.props.location.match.params;
    const colorId = localStorage.getItem('colorId');
    const sizeId = localStorage.getItem('sizeId');
    const bundleId = localStorage.getItem('bundleId');
    const { price, bundlePrice, count } = this.state;
    fetch(
      { CART },
      {
        method: 'POST',
        body: JSON.stringify({
          total_price: (price + bundlePrice) * count,
          products: [
            {
              product_id: productId,
              bundle_id: bundleId,
              color_id: colorId,
              size_id: sizeId,
              quantity: count,
            },
          ],
        }),
      }
    );
  };

  goToOrder = () => {
    const productId = this.props.location.match.params;
    const colorId = localStorage.getItem('colorId');
    const sizeId = localStorage.getItem('sizeId');
    const bundleId = localStorage.getItem('bundleId');
    const { price, bundlePrice, count } = this.state;
    fetch(
      { ORDER },
      {
        method: 'POST',
        body: JSON.stringify({
          total_price: (price + bundlePrice) * count,
          products: [
            {
              product_id: productId,
              bundle_id: bundleId,
              color_id: colorId,
              size_id: sizeId,
              quantity: count,
            },
          ],
        }),
      }
    );
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
      count: count < 0 ? (0, alert('최소 구매 수량은 1개입니다')) : count,
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
    const {
      incrQty,
      decrQty,
      delProduct,
      calBundlePrice,
      goToCart,
      goToOrder,
    } = this;
    const { changeImg } = this;
    console.log('state::', this.state);
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
            <ProductBtn goToCart={goToCart} goToOrder={goToOrder} />
          </div>
        </main>
        <ProductDescImg descImgArr={descImgArr} />
        <div className="productDetail">
          <ProductReview />
        </div>
      </>
    );
  }
}

export default ProductDetail;
