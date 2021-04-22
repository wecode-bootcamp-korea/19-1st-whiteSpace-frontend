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
    this.slideWrapper = React.createRef();
    this.slider = React.createRef();
  }

  componentDidUpdate() {
    const { slideIndex } = this.state;
    this.slider.current.style.left = `-${slideIndex * 1450}px`;
  }

  plusSlide = num => {
    const { slideIndex } = this.state;
    const { mainImageArr } = this.props;
    const totalSlides = mainImageArr.length - 1;

    if (slideIndex === totalSlides) {
      this.setState({
        slideIndex: 0,
      });
    } else if (slideIndex < 0) {
      this.setState({
        slideIndex: totalSlides - 1,
      });
    } else {
      this.setState({
        slideIndex: slideIndex + num,
      });
    }
  };

  render() {
    const { mainImageArr } = this.props;
    const { slideWrapper, slider, plusSlide } = this;
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
          <svg
            className="prev"
            onClick={() => {
              plusSlide(-1);
            }}
          >
            {left.one}
            {left.two}
            {left.three}
          </svg>
          <svg
            className="next"
            onClick={() => {
              plusSlide(1);
            }}
          >
            {right.one}
            {right.two}
            {right.three}
          </svg>
        </div>
      </div>
    );
  }
}
