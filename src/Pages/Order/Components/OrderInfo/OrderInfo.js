import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import { ORDERCOMPLETE } from '../../../../config';
import './OrderInfo.scss';

export default class OrderInfo extends Component {
  state = {
    detailAddress: '',
    phoneNum: '',
  };

  // goToPay = () => {
  //   const cartId = this.props.location.state.cartId;
  //   const totalPrice = this.props.location.state.totalPrice;
  //   const deliveryPrice = this.props.location.state.deliveryPrice;
  //   const postCode = localStorage.getItem('postCode');
  //   const mainAddress = localStorage.getItem('mainAddress');
  //   const { detailAddress, phoneNum } = this.state;
  //   fetch(
  //     { ORDERCOMPLETE },
  //     {
  //       method: 'POST',
  //       body: {
  //         cart_id: cartId,
  //         total_price: totalPrice + deliveryPrice,
  //         product_id: 'q',
  //         user_name: 'q',
  //         postal_code: postCode,
  //         main_address: mainAddress,
  //         detail_address: detailAddress,
  //         phone_number: phoneNum,
  //       },
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(res => {
  //       this.props.history.push('/ordercomplete');
  //     });
  // };

  render() {
    // const { goToPay } = this;
    // const cartId = this.props.location.state.cartId;
    // const totalPrice = this.props.location.state.totalPrice;
    // const deliveryPrice = this.props.location.state.deliveryPrice;
    // const data = this.props.location.state.cartData;
    // const { status } = this.props;

    return (
      <>
        {status === 'ing' && <div className="orderHeader">ORDER</div>}
        <div className="orderInfo">
          <TableWrap title="주문 상품 정보">
            <table>
              <thead>
                <tr>
                  {THEADS.map((head, index) => {
                    return <th key={index}>{head}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {data.map(thumbnail => {
                      return (
                        <img
                          className="orderProductThum"
                          src={thumbnail.thumbnail_image}
                          alt="orderProductThum"
                        />
                      );
                    })}
                    ;
                  </td>
                  <td className="orderProductName">
                    {data.map(name => {
                      return <p>{name.name}</p>;
                    })}
                    {data.map(option => {
                      return (
                        <p>
                          {option.color_name}/{option.size_name}/
                          {option.bundle_name}
                        </p>
                      );
                    })}
                  </td>
                  {data.map(price => {
                    return <td>{price.default_price + price.price_gap}원</td>;
                  })}
                  {data.map(qty => {
                    return <td>{qty.quantity}</td>;
                  })}
                  <td>-</td>
                  {data.map(sum => {
                    return (
                      <td className="bold">
                        {(sum.default_price + sum.price_gap) * sum.quantity}원
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td colSpan="6" className="totalPrice">
                    <span>상품구매금액 {totalPrice} + 배송비 2,500 =</span>
                    <span className="bold">
                      합계 : {totalPrice + deliveryPrice}원
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
        </div>
      </>
    );
  }
}
const THEADS = ['이미지', '상품정보', '판매가', '수량', '적립금', '합계'];
