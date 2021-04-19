import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import './PayInfo.scss';

export default class OrderInfo extends Component {
  render() {
    return (
      <div className="payInfo">
        <TableWrap title="결제 정보">
          <table>
            <thead>
              <tr>
                <th>최종결제금액</th>
                <th className="totalPrice bold">159,600원</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>결제수단</td>
                <td>
                  <p className="bold">무통장 입금 </p>
                  <p>입금자 : 김남선</p>
                  <p>계좌번호 : 신한은행 140-012-076920 (주) 여백</p>
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}
