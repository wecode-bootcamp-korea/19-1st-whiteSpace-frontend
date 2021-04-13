import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signup.scss';
import '../../Styles/common.scss';

class Signup extends Component {
  state = {
    loginId: '',
    loginPw: '',
    loginPwCheck: '',
  };

  checkValidation = () => {
    const { loginId, loginPw } = this.state;
    fetch('url', {
      method: 'POST',
      body: JSON.stringify({
        email: loginId,
        password: loginPw,
      }),
    });
  };

  handleValueInput = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value }, () => {});
  };

  render() {
    const { loginId, loginPw, loginPwCheck } = this.state;
    const { handleValueInput } = this;

    return (
      <div className="Signup">
        <header>회원가입</header>
        <div className="containers">
          <div className="container">
            <div className="nameContainer">
              <span>아이디(이메일)</span>
              <span> * </span>
            </div>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={handleValueInput}
            />
            <span> (영문소문자/숫자, 4~16자) </span>
          </div>
          <div className="container">
            <div className="nameContainer">
              <span>비밀번호</span>
              <span> * </span>
            </div>
            <input
              type="password"
              id="loginPw"
              value={loginPw}
              onChange={handleValueInput}
            />
            <span>
              (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)
            </span>
          </div>
          <div className="container">
            <div className="nameContainer">
              <span>비밀번호 확인</span>
              <span> * </span>
            </div>
            <input
              type="password"
              id="loginPwCheck"
              value={loginPwCheck}
              onChange={handleValueInput}
            />
          </div>
          <div className="container">
            <div className="nameContainer">
              <span>이름</span>
              <span> * </span>
            </div>
            <input type="text" />
          </div>
          <div className="container">
            <div className="nameContainer">
              <span>휴대전화</span>
              <span> * </span>
            </div>
            <input className="phoneNumber" type="text" />
            <span>-</span>
            <input className="phoneNumber" type="text" />
            <span>-</span>
            <input className="phoneNumber" type="text" />
          </div>
          <div className="container">
            <div className="nameContainer">
              <span>이메일</span>
              <span> * </span>
            </div>
            <input type="text" />
          </div>
          <button className="signupBtn">
            <Link to="/">회원가입</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
