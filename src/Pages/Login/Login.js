import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../config';
import './Login.scss';

class Login extends Component {
  state = {
    loginId: '',
    loginPw: '',
  };

  checkValidation = () => {
    const { loginId, loginPw } = this.state;
    fetch(
      { LOGIN },
      {
        method: 'POST',
        body: JSON.stringify({
          email: loginId,
          password: loginPw,
        }),
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.access_token) {
          alert('여백 0100 환영합니다');
          localStorage.setItem('access_token', res.access_token);
          this.props.history.push('/Main');
        }
      });
  };

  handleValueInput = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    const { loginId, loginPw } = this.state;
    const { handleValueInput, checkValidation } = this;
    const isDisabledBtn = !(
      loginId.includes('@') &&
      loginId.includes('.com') &&
      loginPw.length >= 8
    );

    return (
      <>
        <div className="Login">
          <div className="LoginContainer">
            <header>로그인</header>
            <div className="Containers">
              <div className="inputContainer">
                <div className="container id">
                  <input
                    type="text"
                    id="loginId"
                    value={loginId}
                    onChange={handleValueInput}
                    placeholder="아이디"
                  />
                </div>
                <div className="container pw">
                  <input
                    type="password"
                    id="loginPw"
                    value={loginPw}
                    onChange={handleValueInput}
                    placeholder="비밀번호"
                  />
                </div>
              </div>
              <button
                className="loginButton"
                disabled={isDisabledBtn}
                onClick={checkValidation}
              >
                Login
              </button>
            </div>

            <footer>
              <span>
                <Link to="/Signup">회원가입</Link>
              </span>
              <span>
                <Link to="/">아이디찾기</Link>
              </span>
              <span>
                <Link to="/">비밀번호찾기</Link>
              </span>
            </footer>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
