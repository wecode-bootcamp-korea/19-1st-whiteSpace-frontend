import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import './ShippingLocation.scss';

export default class ShippingLocation extends Component {
  render() {
    return (
      <div className="shippingLocation">
        <TableWrap title="배송지정보">
          <table>
            <thead>
              <tr>
                <th>받으시는분</th>
                <th>김남선</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>우편번호</td>
                <td>
                  <p>98765</p>
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td>
                  <p>서울시 강남구 테헤란로 427 위워크 타워</p>
                </td>
              </tr>
              <tr>
                <td>휴대전화</td>
                <td>
                  <p>01012345678</p>
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}