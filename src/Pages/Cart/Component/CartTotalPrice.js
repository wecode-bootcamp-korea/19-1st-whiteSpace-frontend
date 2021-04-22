import React, { Component } from 'react';
import TableWrap from '../../Order/Components/TableWrap/TableWrap';
import './CartTotalPrice.scss';

export default class CartTotalPrice extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {}
  render() {
    const { totalCartInfo, priceComma } = this.props;
    return (
      <div className="CartTotalPrice">
        <TableWrap title=" ">
          <table>
            <thead>
              <tr>
                <th>총 상품 금액</th>
                <th>총 배송비</th>
                <th>결제예정금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalCartInfo.totalPrice.toLocaleString('ko') + '원'}</td>
                <td>
                  {'+' + totalCartInfo.deliveryPrice.toLocaleString('ko')}
                </td>
                <td>
                  <p className="blue">
                    {'=' +
                      (
                        totalCartInfo.totalPrice + totalCartInfo.deliveryPrice
                      ).toLocaleString('ko') +
                      '원'}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}
