import React, { Component } from 'react';
import { left, right } from '../../../../config';
import SlideContents from '../SliderContents/SliderContents';
import './Slider.scss';

let slideIndex = 0;
let slideWrapper,
  slider = '';

export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
      mainImageArr: [],
    };
    this.slideWrapper = React.createRef();
    this.slider = React.createRef();
  }
  componentDidMount() {
    fetch('data/mainImageData.json')
      .then(res => res.json())
      .then(mainImageData => {
        this.setState({
          mainImageArr: mainImageData,
        });
      });
    slideWrapper = this.slideWrapper.current;
    slider = this.slider.current;
  }

  showSlides(num) {
    const slides = document.querySelectorAll('.slideImageWrap');
    const totalSlides = slides.length;
    // let sliderWidth = 100 / totalSlides + '%';
    let sliderWidth = slideWrapper.clientWidth;
    slider.style.width = `${sliderWidth * totalSlides}px`;
    slideIndex = num;

    if (slideIndex === totalSlides) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = totalSlides - 1;
    }

    slider.style.left = `-${sliderWidth * slideIndex}px`;
  }

  plusSlide = num => {
    const { showSlides } = this;
    showSlides((slideIndex += num));
  };

  render() {
    const { mainImageArr } = this.state;
    const { slideWrapper, slider, plusSlide } = this;
    return (
      <div className="sliderWrap" ref={slideWrapper}>
        <div className="sliderContainer">
          <ul className="slider" ref={slider}>
            {mainImageArr.map((mainImage, index) => {
              const { imgSrc } = mainImage;
              return <SlideContents key={index} imgSrc={imgSrc} />;
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
