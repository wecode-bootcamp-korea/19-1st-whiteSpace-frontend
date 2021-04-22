import React, { Component } from 'react';
import TableWrap from '../TableWrap/TableWrap';
import AddressModal from './AddressModal';
import './ShippingLocation.scss';

export default class ShippingLocation extends Component {
  render() {
    const { status } = this.props;
    return (
      <div className="shippingLocation">
        <TableWrap title="배송지정보">
          <table>
            <thead>
              <tr>
                <th>받으시는분</th>
                <th>
                  <input type="text" value="김남선" disabled />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>주소</td>
                <td classNam>
                  <AddressModal />
                </td>
              </tr>
              <tr>
                <td>휴대전화</td>
                <td>
                  <input type="phone" value="01012345678" disabled />
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}
