import React, { Component } from 'react';
import Popup from '../../Components/Nav/Popup';
import Slider from './Components/Slider/Slider';
import BestProduct from './Components/BestProduct/BestProduct';
import './Main.scss';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      mainImageArr: [],
      productArr: [],
    };
  }
  //백이랑 통신하는 코드
  // componentDidMount() {
  //   fetch('http://10.58.0.130:8000')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         mainImageArr: data.banner_images,
  //         productArr: data.best_sellers,
  //       });
  //     });
  // }

  componentDidMount() {
    fetch('data/productData.json')
      .then(res => res.json())
      .then(data => {
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
