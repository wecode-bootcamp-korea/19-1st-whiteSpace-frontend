import React, { Component } from 'react';
import { left, right } from '../../../../config';
import Carousel, { arrowsPlugin } from '@brainhubeu/react-carousel';
import SlideContents from '../SliderContents/SliderContents';
import '@brainhubeu/react-carousel/lib/style.css';
import './Slider.scss';

let slideIndex = 0;

export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
      mainImageArr: [],
    };
  }
  componentDidMount() {
    fetch('data/mainImageData.json')
      .then(res => res.json())
      .then(mainImageData => {
        this.setState({
          mainImageArr: mainImageData,
        });
      });
  }

  showSlides(num) {
    const slideWrapper = document.querySelector('.sliderWrap');
    const slides = document.querySelectorAll('.slideImageWrap');
    const slider = document.querySelector('.slider');
    const totalSlides = slides.length;

    // let sliderWidth = 100 / totalSlides + '%';
    let sliderWidth = slideWrapper.clientWidth;
    slider.style.width = sliderWidth * totalSlides + 'px';

    slideIndex = num;

    if (slideIndex === -1) {
      slideIndex = totalSlides - 1;
    } else if (slideIndex === totalSlides) {
      slideIndex = 0;
    }

    slider.style.left = -(sliderWidth * slideIndex) + 'px';
  }

  plusSlide = num => {
    const { showSlides } = this;
    showSlides((slideIndex += num));
  };

  render() {
    const { mainImageArr } = this.state;
    return (
      <div className="sliderWrap">
        <div className="sliderContainer">
          <ul className="slider">
            {mainImageArr.map((mainImage, index) => {
              return <SlideContents key={index} imgSrc={mainImage.imgSrc} />;
            })}
          </ul>
        </div>
        <div className="btn">
          <svg
            className="prev"
            onClick={() => {
              this.plusSlide(-1);
            }}
          >
            {left.one}
            {left.two}
            {left.three}
          </svg>
          <svg
            className="next"
            onClick={() => {
              this.plusSlide(1);
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
