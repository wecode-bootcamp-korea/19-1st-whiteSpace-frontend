import React, { Component } from 'react';
import Slider from './Components/Slider/Slider';
import BestProduct from './Components/BestProduct/BestProduct';
import '@brainhubeu/react-carousel/lib/style.css';
import './Main.scss';

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <Slider />
        <BestProduct />
      </div>
    );
  }
}
