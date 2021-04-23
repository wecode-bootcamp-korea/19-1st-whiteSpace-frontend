import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableWrap from '../TableWrap/TableWrap';
import AddressModal from './AddressModal';
import './ShippingLocation.scss';

class ShippingLocation extends Component {
  render() {
    const { name, phoneNumber } = this.props;
    return (
      <div className="shippingLocation">
        <TableWrap title="배송지정보">
          <table>
            <thead>
              <tr>
                <th>받으시는분</th>
                <th>
                  <input type="text" value={name} disabled />
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
                  <input type="phone" value={phoneNumber} disabled />
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  }
}

export default withRouter(ShippingLocation);
