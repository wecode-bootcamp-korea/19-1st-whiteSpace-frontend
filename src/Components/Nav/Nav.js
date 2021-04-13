import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export class Nav extends Component {
  constructor() {
    super();
    this.state = {
      checkScrollTop: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = e => {
    // const { innerHeight } = window;
    // const { scrollHeight } = document.body;
    const myScroll = e.srcElement.scrollingElement.scrollTop;
    // console.log('전체 body 의 높이 : ' + scrollHeight);
    // console.log('전체 스크롤바 높이 : ' + innerHeight);
    // console.log('현재 스크롤 위치 : ' + myScroll);

    this.setState({
      checkScrollTop: myScroll > 0 ? false : true,
    });
  };

  render() {
    return (
      <div
        id="navWrapper"
        className={this.state.checkScrollTop ? '' : 'scrollTopOff'}
      >
        <nav>
          <h1>여백 0100</h1>
          <div className="navLeftMenu">
            <ul>
              <li>
                <Link to="/">ALL</Link>
              </li>
              <li>
                <Link to="/">패브릭</Link>
              </li>
              <li>
                <Link to="/">주방/욕실</Link>
              </li>
              <li>
                <Link to="/">생활/홈케어</Link>
              </li>
            </ul>
          </div>
          <div className="navRightMenu">
            <ul>
              <li>
                <Link to="/">로그인</Link>
              </li>
              <li>
                <Link to="/">회원가입</Link>
              </li>
              <li>
                <Link to="/">장바구니</Link>
              </li>
              <li>
                <button>
                  <i class="fas fa-search"></i>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
