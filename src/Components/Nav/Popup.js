import React, { Component } from 'react';
import './Popup.scss';

const SHOWING_CLASS = 'showing';

export class Popup extends Component {
  constructor() {
    super();
    this.state = {
      isMouseEvent: false,
      startX: 0,
      offsetLeft: 0,
      walk: 0,
    };
    this.Slides = [];
    this.currentSlide = React.createRef();
  }

  componentDidMount() {
    // console.log(this.Slides[0]);
    // console.log(this.Slides[1]);
    // this.firstSlide.current.classList.add(SHOWING_CLASS);
    // this.firstSlide.querySelector('.slider_item:first-child');
    // console.log(this.state.firstSlide);
  }

  setRef = (ref, index) => {
    this.Slides[index] = ref;
    // console.log(this.Slides[index]);
    // console.log(index);
  };

  slide = key => {
    this.Slides[key].style.color = 'red';
    // currentSlide =
    // const currentSlide =
  };

  onMouseDown = (e, index) => {
    // console.log(e.pageX);
    // console.log(this.Slides[index].offsetLeft);
    // console.log(this.Slides[index].offsetLeft);
    this.setState({
      isMouseEvent: true,
      startX: e.pageX - this.Slides[index].offsetLeft,
      offsetLeft: this.Slides[index].offsetLeft,
    });
    // console.log(index);
    this.Slides[index].classList.add('active');
  };

  onMouseMove = (e, index) => {
    if (!this.state.isMouseEvent) return;
    console.log(this.Slides[index]);
    // console.log('pageX =' + e.pageX);
    // console.log('offsetLeft =' + this.Slides[index].offsetLeft);

    e.preventDefault();
    const x = e.pageX - this.Slides[index].offsetLeft;
    // console.log(x);

    const walk = (x - this.state.startX) * 1;

    console.log(
      'this.Slides[index].offsetLeft' + this.Slides[index].offsetLeft
    );
    console.log('this.Slides[index]' + this.Slides[index]);
    console.log('this.Slides[index].crrunet' + this.Slides[index].current);
    // console.log(
    //   'this.Slides[index].crrunet.classList' +
    //     this.Slides[index].current.classList
    // );
    console.log(this.currentSlide);
    // this.Slides[index].offsetLeft = this.state.offsetLeft - walk;
  };

  //페이징할 스크롤 양을 계산하기. 양옆에 padding 만큼을 빼준다.
  getPageSize(index) {
    // const padding = this.getSliderPadding() * 2;
    return this.Slides[index].offsetWidth; //- padding
  }

  onMouseLeave = index => {
    this.setState({
      isMouseEvent: false,
    });
    this.Slides[index].classList.remove('active');
  };

  onMouseUp = index => {
    this.setState({
      isMouseEvent: false,
    });
    this.Slides[index].classList.remove('active');
  };

  render() {
    return (
      <div id="Popup">
        <ul className="items">
          {POPUP_DATA.map((popup, index) => (
            <li
              className="slider_item "
              ref={ref => (this.Slides[index] = ref)}
              // ref={this.setRef(ref, index)}
              onMouseDown={e => this.onMouseDown(e, index)}
              onMouseLeave={() => this.onMouseLeave(index)}
              onMouseUp={() => this.onMouseUp(index)}
              onMouseMove={e => this.onMouseMove(e, index)}
              onClick={() => this.slide(index)}
            >
              <span ref={this.currentSlide}>{popup.content}</span>
            </li>
          ))}
        </ul>
        {/* <div className="slider_item">
          <span>팝업2</span>
        </div> */}
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
