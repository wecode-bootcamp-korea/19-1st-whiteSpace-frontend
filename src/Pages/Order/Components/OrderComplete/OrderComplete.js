import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfomationWrap from '../../../../Components/InfomationWrap/InfomationWrap';
import PayInfo from '../PayInfo/PayInfo';
import OrderInfo from '../OrderInfo/OrderInfo';
import TotalPrice from '../TotalPrice/TotalPrice';
import ShippingLocation from '../ShippingLocation/ShippingLocation';
import './OrderComplete.scss';

export default class OrderComplete extends Component {
  render() {
    return (
      <>
        <InfomationWrap>
          <div className="orderComplete">
            <header>고객님의 주문이 완료되었습니다.</header>
            <p>주문번호 : 20210418-0000355</p>
            <p>주문일자 : 2021-04-18 16:04:38</p>
            <button>
              <Link to="/products">쇼핑 더하기</Link>
            </button>
          </div>
        </InfomationWrap>
        <PayInfo />
        <OrderInfo status="complete" />
        <TotalPrice />
        <ShippingLocation status="complete" />
      </>
    );
  }
}
