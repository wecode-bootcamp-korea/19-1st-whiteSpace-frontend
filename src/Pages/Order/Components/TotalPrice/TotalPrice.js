import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import TableWrap from '../TableWrap/TableWrap';
import './TotalPrice.scss';

export default class TotalPrice extends Component {
  render() {
    const { totalPrice, deliveryPrice } = this.props;
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
                <td>{(totalPrice + deliveryPrice).toLocaleString()}원</td>
                <td>
                  <p className="blue">
                    {(totalPrice + deliveryPrice).toLocaleString()}원
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

// export default withRouter(TotalPrice);
