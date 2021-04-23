import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.scss';

class Welcome extends Component {
  render() {
    const name = this.props.location.state.name;

    return (
      <div id="mainBox">
        <main>
          <p>
            안녕하세요, <span id="nameId">{name}</span>님
          </p>
          <p>여백 0100의 회원이 되신 것을</p>
          <p>진심으로 환영합니다.</p>
          <p>당신의 일상에 여백을 더하세요</p>
          <button>
            <Link to="/login">로그인하기</Link>
          </button>
        </main>
      </div>
    );
  }
}

export default Welcome;
