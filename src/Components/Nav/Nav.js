import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavMenuList from './Component/NavMenuList';
import Popup from './Popup';
import { Link } from 'react-router-dom';
import './Nav.scss';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      checkScrollTop: true,
      categoryList: [],
      searchInputValue: '',
      isSearchBox: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    fetch('data/category.json', {
      // fetch('http://10.58.0.130:8000/nav', {  (back-end와 통신 테스트 성공 - category 목록 받아오기)
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
    // console.log('전체 body 의 높이 : ' + scrollHeight);
    // console.log('전체 스크롤바 높이 : ' + innerHeight);
    // console.log('현재 스크롤 위치 : ' + myScroll);

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
      // console.log(this.state.searchInputValue);

      this.props.history.push(`products?search=${this.state.searchInputValue}`);
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

  render() {
    const { categoryList, checkScrollTop } = this.state;
    const { searchInputChange, searchInputEnter, searchIconClick } = this;
    return (
      <div id="nav" className={checkScrollTop ? 'scrollTopON' : 'scrollTopOff'}>
        <Popup />
        <nav>
          <h1>
            <Link to="/">여백 0100</Link>
          </h1>

          <NavMenuList className="navLeftMenu" dataList={categoryList} />
          <NavMenuList className="navRightMenu" dataList={NAV_RIGHT_MENU} />
          <div className="searchBox">
            <i className="fas fa-search" onClick={searchIconClick}></i>
            <input
              className={
                this.state.isSearchBox ? 'searchInputShow' : 'searchInputNone'
              }
              placeholder="검색어"
              onChange={searchInputChange}
              onKeyUp={searchInputEnter}
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
  {
    id: 3,
    text: '장바구니',
    path: '/cart',
  },
];
