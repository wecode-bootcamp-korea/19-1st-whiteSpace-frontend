import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import './OrderInfo.scss';

export default class OrderInfo extends Component {
  render() {
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
                    <img
                      className="orderProductThum"
                      src="http://img.echosting.cafe24.com/thumb/img_product_small.gif"
                      alt="orderProductThum"
                    />
                  </td>
                  <td className="orderProductName">
                    <p>풍성 스테디셀러 세트</p>
                    <p>
                      [옵션:
                      풍성세트(세탁조크리너2+곰팡이제거젤2+주방세제+기름때크리너)]
                    </p>
                  </td>
                  <td>39,900원</td>
                  <td>4</td>
                  <td>-</td>
                  <td className="bold">159,600원</td>
                </tr>
                <tr>
                  <td colSpan="6" className="totalPrice">
                    <span>상품구매금액 159,600 + 배송비 0 =</span>
                    <span className="bold">합계 : 159,600원</span>
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
