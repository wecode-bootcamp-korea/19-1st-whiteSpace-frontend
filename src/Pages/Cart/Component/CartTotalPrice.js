import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import './TotalPrice.scss';

export default class TotalPrice extends Component {
  render() {
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
                <td>159,600원</td>
                <td>
                  <p className="blue">159,600원</p>
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}
