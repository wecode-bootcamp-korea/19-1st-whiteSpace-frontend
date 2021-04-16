import React, { Component } from 'react';
import Nav from '../../Components/Nav/Nav';
import './Signup.scss';
import { SIGNUP } from '../../config';
import { EMAIL_CHECK } from '../../config';

const ID_REGEX = /^[a-zA-Z0-9+-_]+@[a-z]+\.[a-z]+$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(\S){8,16}$/;
const PHONE_NUMBER_REGEX = /^\d{9,11}$/;

class Signup extends Component {
  state = {
    signId: '',
    signPw: '',
    signPwCheck: '',
    name: '',
    phone_number: '',
  };

  signUp = () => {
    const { signId, signPw, signPwCheck, name, phone_number } = this.state;

    fetch(
      { SIGNUP },
      {
        method: 'POST',
        body: JSON.stringify({
          email: signId,
          password: signPw,
          password_check: signPwCheck,
          name: name,
          phone_number: phone_number,
        }),
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res['MESSAGE'] === 'SUCCESS') {
          this.props.history.push({
            pathname: '/welcome',
            state: { name: name },
          });
        }
      });
  };

  checkIdValid = () => {
    const { signId } = this.state;

    fetch(
      { EMAIL_CHECK },
      {
        method: 'POST',
        body: JSON.stringify({
          email: signId,
        }),
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res['MESSAGE'] === 'EMAIL ALREADY EXISTS') {
          alert('아이디 중복!');
        } else {
          alert('사용하실 수 있는 아이디입니다');
        }
      });
  };

  handleValueInput = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    const { signId, signPw, signPwCheck, name, phone_number } = this.state;
    const { handleValueInput, signUp, checkIdValid } = this;
    const isAllValid =
      ID_REGEX.test(signId) &&
      signPw === signPwCheck &&
      PHONE_NUMBER_REGEX.test(phone_number) &&
      name.length > 1;

    return (
      <>
        <Nav />
        <div className="Signup">
          <header>회원가입</header>
          <div className="containers">
            <div className="process">
              <span>정보입력</span>
              <span>&gt;</span>
              <span>가입완료</span>
            </div>
            <div className="container">
              <div className="nameContainer">
                <span>아이디(이메일)</span>
                <span> * </span>
              </div>
              <div className="caution">
                <input
                  type="text"
                  id="signId"
                  value={signId}
                  onChange={handleValueInput}
                />
                {ID_REGEX.test(signId) ? (
                  <span id="validPass">
                    <i className="fas fa-check-circle"></i>&nbsp;사용하실 수
                    있는 아이디입니다.
                  </span>
                ) : (
                  <span id="validFail">
                    <i className="fas fa-check-circle"></i>&nbsp;아이디를
                    입력하세요
                  </span>
                )}
              </div>
              <button className="checkId" onClick={checkIdValid}>
                아이디 중복검사
              </button>
              <span className="required">
                (숫자와 영문으로 이루어진 이메일)
              </span>
            </div>
            <div className="container">
              <div className="nameContainer">
                <span>비밀번호</span>
                <span> * </span>
              </div>
              <div className="caution">
                <input
                  type="password"
                  id="signPw"
                  value={signPw}
                  onChange={handleValueInput}
                />
                {!PASSWORD_REGEX.test(signPw) && (
                  <span id="validFail">
                    <i className="fas fa-check-circle"></i>&nbsp;비밀번호를
                    입력하세요
                  </span>
                )}
              </div>
              <span className="required">
                (영문 대/소문자 중 1개, 특수문자 1개, 숫자 포함 8~16자)
              </span>
            </div>
            <div className="container">
              <div className="nameContainer">
                <span>비밀번호 확인</span>
                <span> * </span>
              </div>
              <div className="caution">
                <input
                  type="password"
                  id="signPwCheck"
                  value={signPwCheck}
                  onChange={handleValueInput}
                />
                {signPw === signPwCheck && signPwCheck.length > 1 && (
                  <span id="validPass">
                    <i className="fas fa-check-circle"></i>&nbsp;비밀번호가
                    일치합니다
                  </span>
                )}
              </div>
            </div>
            <div className="container">
              <div className="nameContainer">
                <span>이름</span>
                <span> * </span>
              </div>
              <div className="caution">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleValueInput}
                />
              </div>
            </div>
            <div className="container">
              <div className="nameContainer">
                <span>휴대전화</span>
                <span> * </span>
              </div>
              <div className="caution">
                <input
                  className="phoneNumber"
                  type="text"
                  id="phone_number"
                  value={phone_number}
                  onChange={handleValueInput}
                  placeholder="-없이 번호로만 입력하세요"
                  minLength="9"
                  maxLength="11"
                />
                {PHONE_NUMBER_REGEX.test(phone_number) ? (
                  <span id="validPass">
                    <i className="fas fa-check-circle"></i>&nbsp;사용가능한
                    핸드폰 번호입니다
                  </span>
                ) : (
                  <span id="validFail">
                    <i className="fas fa-check-circle"></i>&nbsp;핸드폰 번호를
                    입력하세요
                  </span>
                )}
              </div>
            </div>
            <button
              className="signupBtn"
              disabled={!isAllValid}
              onClick={signUp}
            >
              회원가입
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
