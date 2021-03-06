import React, { Component } from 'react';
import NavMenuList from './Component/NavMenuList';
import Popup from './Popup';
import { API } from '../../config';
import { Link, withRouter } from 'react-router-dom';
import './Nav.scss';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkScrollTop: true,
      categoryList: [],
      searchInputValue: '',
      isSearchBox: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // fetch('data/category.json', {
    //(back-end와 통신 테스트 성공 - category 목록 받아오기)
    fetch(`${API}/nav`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        data.categories.unshift({
          category_id: 0,
          category_name: 'All',
        });
        this.setState({
          categoryList: data.categories,
        });
      });
  }

  handleScroll = e => {
    // const { innerHeight } = window;
    // const { scrollHeight } = document.body;
    const myScroll = e.srcElement.scrollingElement.scrollTop;

    // 스크롤이 최상단이거나 아니거나 변경할 필요가 있을 때만 변경해주도록 함.
    const checkScroll =
      (this.state.checkScrollTop === true && myScroll > 0) ||
      (this.state.checkScrollTop === false && Number(myScroll) === 0);

    if (checkScroll) {
      this.setState({
        checkScrollTop: myScroll > 0 ? false : true,
      });
    }
  };

  searchInputChange = e => {
    this.setState({
      searchInputValue: e.target.value,
    });
  };

  searchInputEnter = e => {
    if (this.state.searchInputValue.length > 0 && e.keyCode === 13) {
      this.props.history.push(`/search?keyword=${this.state.searchInputValue}`);
      this.setState({
        searchInputValue: '',
        isSearchBox: false,
      });
    }
  };

  searchIconClick = () => {
    this.setState({
      isSearchBox: this.state.isSearchBox ? false : true,
    });
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  logoutCheck = (urlName, menuName, id) => {
    const state = {
      pathname: urlName,
      state: {
        categoryId: id,
      },
    };

    if (
      menuName === '로그아웃' &&
      localStorage.getItem('access_token') !== null
    ) {
      localStorage.removeItem('access_token');
      this.props.history.push(`/`);
      return;
    } else {
      this.props.history.push(state);
    }
  };

  render() {
    const { categoryList, checkScrollTop, searchInputValue } = this.state;
    const { searchInputChange, searchInputEnter, searchIconClick } = this;
    const rightMenuData =
      localStorage.getItem('access_token') !== null
        ? LOGIN_STATE
        : NAV_RIGHT_MENU;

    return (
      <div id="nav" className={checkScrollTop ? 'scrollTopON' : 'scrollTopOff'}>
        <Popup />
        <nav>
          <h1>
            <Link to="/">여백 0100</Link>
          </h1>

          <NavMenuList
            className="navLeftMenu"
            dataList={categoryList}
            onClick={this.logoutCheck}
          />
          <NavMenuList
            className="navRightMenu"
            dataList={rightMenuData}
            onClick={this.logoutCheck}
          />
          <div className="searchBox">
            <i className="fas fa-search" onClick={searchIconClick}></i>
            <input
              className={
                this.state.isSearchBox ? 'searchInputShow' : 'searchInputNone'
              }
              placeholder="검색어를 입력해주세요."
              onChange={searchInputChange}
              onKeyUp={searchInputEnter}
              value={searchInputValue}
            />
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Nav);

const NAV_RIGHT_MENU = [
  {
    id: 1,
    text: '로그인',
    path: '/login',
  },
  {
    id: 2,
    text: '회원가입',
    path: '/signup',
  },
];

const LOGIN_STATE = [
  {
    id: 1,
    text: '로그아웃',
    path: '/',
  },
  {
    id: 3,
    text: '장바구니',
    path: '/cart',
  },
];
