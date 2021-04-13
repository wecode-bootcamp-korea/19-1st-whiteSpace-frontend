import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import '../../Styles/common.scss';

class Login extends Component {
  state = {
    loginId: '',
    loginPw: '',
    IsDisabled: true,
  };

  checkValidation = () => {
    const { loginId, loginPw } = this.state;
    fetch('url', {
      method: 'POST',
      body: JSON.stringify({
        email: loginId,
        password: loginPw,
      }),
    })
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
    this.setState({ [id]: value }, () => {
      this.checkLogin();
    });
  };

  checkLogin = () => {
    const { loginId, loginPw } = this.state;
    this.setState({
      IsDisabled: !(loginPw.length >= 5 && loginId.includes('@')),
    });
  };

  render() {
    const { loginId, loginPw, IsDisabled } = this.state;
    const { handleValueInput, checkValidation } = this;

    return (
      <div className="Login">
        <div className="LoginContainer">
          <header>로그인</header>
          <div className="Containers">
            <div className="inputContainer">
              <div className="idContainer">
                <input
                  type="text"
                  id="loginId"
                  value={loginId}
                  onChange={handleValueInput}
                  placeholder="아이디"
                />
              </div>
              <div className="passwordContainer">
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
              disabled={IsDisabled}
              onClick={checkValidation}
            >
              <Link to="/Main">Login</Link>
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
    );
  }
}

export default Login;
