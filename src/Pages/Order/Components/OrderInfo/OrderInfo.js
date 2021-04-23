import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableWrap from '../TableWrap/TableWrap';
import { API } from '../../../../config';
import './OrderInfo.scss';

class OrderInfo extends Component {
  state = {
    detailAddress: '',
    phoneNum: '',
  };

  goToPay = () => {
    console.log('gotopay');
    const cartId = this.props.location.state.cartId;
    const totalPrice = this.props.location.state.totalPrice;
    const deliveryPrice = this.props.location.state.deliveryPrice;
    const postCode = localStorage.getItem('postCode');
    const mainAddress = localStorage.getItem('mainAddress');
    const { detailAddress, phoneNum } = this.state;

    fetch(`${API}/order/complete`, {
      method: 'POST',
      body: {
        cart_id: cartId,
        total_price: totalPrice + deliveryPrice,
        product_id: 'q',
        user_name: 'q',
        postal_code: postCode,
        main_address: mainAddress,
        detail_address: detailAddress,
        phone_number: phoneNum,
      },
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push('/order/complete');
      });
  };

  render() {
    const { goToPay } = this;
    const cartId = this.props.location.state.cartId;
    const totalPrice = this.props.location.state.totalPrice;
    const deliveryPrice = this.props.location.state.deliveryPrice;
    const data = this.props.location.state.cartData;
    const { status } = this.props;

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
                    return (
                      <td>
                        {Number(
                          (price.default_price + price.price_gap).split('.')[0]
                        ).toLocaleString()}
                        원
                      </td>
                    );
                  })}
                  {data.map(qty => {
                    return <td>{qty.quantity}</td>;
                  })}
                  <td>-</td>
                  {data.map(sum => {
                    return (
                      <td className="bold">
                        {(
                          (Number(sum.default_price.split('.')[0]) +
                            Number(sum.price_gap.split('.')[0])) *
                          sum.quantity
                        ).toLocaleString()}
                        원
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td colSpan="6" className="totalPrice">
                    <span>
                      상품구매금액 {totalPrice.toLocaleString()} + 배송비 2,500
                      =
                    </span>
                    <span className="bold">
                      합계 : {(totalPrice + deliveryPrice).toLocaleString()}원
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

export default withRouter(OrderInfo);
const THEADS = ['이미지', '상품정보', '판매가', '수량', '적립금', '합계'];
