import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import './TotalPrice.scss';

export default class TotalPrice extends Component {
  render() {
    // const totalPrice = this.props.location.state.totalPrice;
    // const deliveryPrice = this.props.location.state.deliveryPrice;

    return (
      <div className="totalPrice">
        <TableWrap title=" ">
          <table>
            <thead>
              <tr>
                <th>총 주문 금액</th>
                <th>총 결제금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{totalPrice + deliveryPrice}원</td> */}
                <td>
                  {/* <p className="blue">{totalPrice + deliveryPrice}원</p> */}
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}
