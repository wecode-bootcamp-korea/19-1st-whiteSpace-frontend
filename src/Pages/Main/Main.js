import React, { Component } from 'react';
import { left, right } from '../../config';
import Carousel, { arrowsPlugin } from '@brainhubeu/react-carousel';
import SlideContents from './Components/SliderContents/SliderContents';
import BestProduct from './Components/BestProduct/BestProduct';
import '@brainhubeu/react-carousel/lib/style.css';
import './Main.scss';

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <Carousel
          plugins={[
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: (
                  <svg width="53" height="44" className="arrowLeft">
                    {left.one}
                    {left.two}
                    {left.three}
                  </svg>
                ),
                arrowRight: (
                  <svg width="53" height="44" className="arrowRight">
                    {right.one}
                    {right.two}
                    {right.three}
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
        <BestProduct />
      </div>
    );
  }
}
