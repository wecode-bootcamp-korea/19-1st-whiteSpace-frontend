import React, { Component } from 'react';
import './Popup.scss';

const SHOWING_CLASS = 'showing';

export class Popup extends Component {
  constructor() {
    super();
    this.state = {};
    this.firstSlide = React.createRef();
    this.currentSlide = React.createRef();
  }

  componentDidMount() {
    this.firstSlide.current.classList.add(SHOWING_CLASS);
  }

  slide() {
    // currentSlide =
  }

  render() {
    return (
      <div id="Popup">
        <div className="slider_item " ref={this.firstSlide}>
          <span>팝업1</span>
        </div>
        <div className="slider_item">
          <span>팝업2</span>
        </div>
      </div>
    );
  }
}

export default Popup;

const POPUP_DATA = [
  {
    content: '지금 회원가입시 여백 3천원 할인 쿠폰 발급',
    color: '$blue',
  },
  {
    content: '카카오 플친 추가시 2,000원 할인 쿠폰 지급!',
    color: '$blue',
  },
];
