import React, { Component } from 'react';
import OrderInfo from '../Order/Components/OrderInfo/OrderInfo';
import ShippingLocation from '../Order/Components/ShippingLocation/ShippingLocation';
import TotalPrice from '../Order/Components/TotalPrice/TotalPrice';
import PayMethod from '../Order/Components/PayMethod/PayMethod';
import './Order.scss';

export default class Order extends Component {
  render() {
    return (
      <>
        <OrderInfo status="ing" />
        <ShippingLocation status="ing" />
        <TotalPrice />
        <PayMethod />
      </>
    );
  }
}
