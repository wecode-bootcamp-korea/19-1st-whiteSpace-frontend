import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfomationWrap from '../../../../Components/InfomationWrap/InfomationWrap';
import PayInfo from '../PayInfo/PayInfo';
import './OrderComplete.scss';

export default class OrderComplete extends Component {
  render() {
    const totalPrice = this.props.location.state.totalPrice;
    const name = this.props.location.state.name;
    return (
      <>
        <InfomationWrap>
          <div className="orderComplete">
            <header>고객님의 주문이 완료되었습니다.</header>
            <p>주문번호 : 20210418-0000355</p>
            <button>
              <Link to="/category">쇼핑 더하기</Link>
            </button>
          </div>
        </InfomationWrap>
        <PayInfo totalPrice={totalPrice} name={name} />
      </>
    );
  }
}
