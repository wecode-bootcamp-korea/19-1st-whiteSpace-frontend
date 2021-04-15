import React, { Component } from 'react';
import { left, right } from '../../../../config';
import SlideContents from '../SliderContents/SliderContents';
import './Slider.scss';

export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 0,
    };
  }

  slider = num => {
    const { mainImageArr } = this.props;
    const { slideIndex } = this.state;
    let totalSlides = mainImageArr.length;

    if (num < 0) {
      //전 버튼 눌렀을때
      this.setState({
        slideIndex: slideIndex === 0 ? totalSlides : slideIndex - 1,
      });
    } else {
      // 다음 버튼 눌렀을때
      this.setState({
        slideIndex: totalSlides === slideIndex ? 0 : slideIndex + 1,
      });
    }
  };

  render() {
    const { mainImageArr } = this.props;
    const { slideWrapper, slider } = this;
    return (
      <div className="sliderWrap" ref={slideWrapper}>
        <div className="sliderContainer">
          <ul className="slider" ref={slider}>
            {mainImageArr.map((mainImage, index) => {
              return <SlideContents key={index} imgSrc={mainImage} />;
            })}
          </ul>
        </div>
        <div className="btn">
          <svg className="prev" onClick={() => this.slider(-1)}>
            {left.one}
            {left.two}
            {left.three}
          </svg>
          <svg className="next" onClick={() => this.slider(1)}>
            {right.one}
            {right.two}
            {right.three}
          </svg>
        </div>
      </div>
    );
  }
}
