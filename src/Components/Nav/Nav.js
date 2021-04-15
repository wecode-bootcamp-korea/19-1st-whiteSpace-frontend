import React, { Component } from 'react';
import './Nav.scss';

export class Nav extends Component {
  render() {
    return (
      <div className="navWrapper">
        <h1>여백 0100</h1>
        <ul>
          <li>ALL</li>
          <li>패브릭</li>
          <li>주방/욕실</li>
          <li>생활/홈케어</li>
        </ul>
        <ul>
          <li>로그인</li>
          <li>회원가입</li>
          <li>장바구니</li>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default Nav;
