import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import './PayMethod.scss';

export default class PayMethod extends Component {
  render() {
    return (
      <div className="payMethod">
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>
                  <input type="radio" id="card" value="카드결제" />
                  <label for="card">카드결제</label>
                </th>
                <th>
                  <input type="radio" id="cash" value="무통장 결제" />
                  <label for="cash">무통장 결제</label>
                </th>
                <th>
                  <input type="radio" id="payco" value="페이코 (간편결제)" />
                  <label for="payco">페이코 (간편결제)</label>
                </th>
                <th>
                  <input type="radio" id="kakao" value="카카오 (간편결제)" />
                  <label for="kakao">카카오 (간편결제)</label>
                </th>
                <th rowSpan="3">최종 결제 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4">1</td>
                <td className="totalPrice">
                  <span>159,600원</span>
                </td>
              </tr>
              <tr>
                <td colSpan="4">1</td>
                <td>
                  <button className="payBtn">결제하기</button>
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}
