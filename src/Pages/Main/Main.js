import React, { Component } from 'react';
import Slider from './Components/Slider/Slider';
import BestProduct from './Components/BestProduct/BestProduct';
import '@brainhubeu/react-carousel/lib/style.css';
import './Main.scss';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      mainImageArr: [],
      productArr: [],
    };
  }
  componentDidMount() {
    fetch('data/productData.json')
      .then(res => res.json())
      .then(data => {
        // console.log(data[0].best_sellers);
        this.setState({
          mainImageArr: data[0].banner_images,
          productArr: data[0].best_sellers,
        });
      });
  }
  render() {
    const { mainImageArr, productArr } = this.state;
    return (
      <div className="main">
        <Slider mainImageArr={mainImageArr} />
        <BestProduct productArr={productArr} />
      </div>
    );
  }
}
