import React, { Component } from 'react';
import Carousel, { arrowsPlugin } from '@brainhubeu/react-carousel';
import SlideContents from './Components/SliderContents/SliderContents';
import '@brainhubeu/react-carousel/lib/style.css';

export default class Slider extends Component {
  render() {
    return (
      <>
        <Carousel
          plugins={[
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: (
                  <svg width="53" height="44">
                    <line
                      x1="22"
                      y1="1"
                      x2="1"
                      y2="22"
                      stroke-linecap="round"
                      stroke="#d4d4d4"
                      stroke-width="2"
                    ></line>
                    <line
                      x1="22"
                      y1="43"
                      x2="1"
                      y2="22"
                      stroke-linecap="round"
                      stroke="#d4d4d4"
                      stroke-width="2"
                    ></line>
                    <line
                      x1="1"
                      y1="22"
                      x2="52"
                      y2="22"
                      stroke-linecap="round"
                      stroke="#d4d4d4"
                      stroke-width="2"
                    ></line>
                  </svg>
                ),
                arrowRight: (
                  <svg width="53" height="44">
                    <line
                      x1="31"
                      y1="1"
                      x2="52"
                      y2="22"
                      stroke-linecap="round"
                      stroke="#d4d4d4"
                      stroke-width="2"
                    ></line>
                    <line
                      x1="1"
                      y1="22"
                      x2="52"
                      y2="22"
                      stroke-linecap="round"
                      stroke="#d4d4d4"
                      stroke-width="2"
                    ></line>
                    <line
                      x1="31"
                      y1="43"
                      x2="52"
                      y2="22"
                      stroke-linecap="round"
                      stroke="#d4d4d4"
                      stroke-width="2"
                    ></line>
                  </svg>
                ),
                addArrowClickHandler: true,
              },
            },
          ]}
        >
          <SlideContents />
          <SlideContents />
          <SlideContents />
        </Carousel>
      </>
    );
  }
}
