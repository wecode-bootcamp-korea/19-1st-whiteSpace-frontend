import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableWrap from '../TableWrap/TableWrap';
import './OrderInfo.scss';

class OrderInfo extends Component {
  render() {
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
                {data &&
                  data.map(item => {
                    return (
                      <tr key={data.id}>
                        <td>
                          <img
                            className="orderProductThum"
                            src={item.thumbnail_image}
                            alt="orderProductThum"
                          />
                        </td>
                        <td>
                          {data && (
                            <p>
                              {item.name}
                              {data && (
                                <p>
                                  {item.color_name}/{item.size_name}/
                                  {item.bundle_name}
                                </p>
                              )}
                            </p>
                          )}
                        </td>
                        <td>
                          {data && (
                            <p>
                              {(
                                item.default_price * (1 - item.discount_rate) +
                                Number(item.price_gap)
                              ).toLocaleString('ko') + '원'}
                            </p>
                          )}
                        </td>
                        <td>{data && <p>{item.quantity}</p>}</td>
                        <td>-</td>
                        <td className="bold">
                          {data && (
                            <p>
                              {(
                                (item.default_price * (1 - item.discount_rate) +
                                  Number(item.price_gap)) *
                                item.quantity
                              ).toLocaleString() + '원'}
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
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
