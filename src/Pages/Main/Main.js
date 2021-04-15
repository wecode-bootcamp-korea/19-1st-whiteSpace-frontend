import React, { Component } from 'react';
import Slider from './Components/Slider/Slider';
import SlideTest from './Components/Slider/SlideTest';
import Paging from '../../Components/Paging/Paging';
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
  // componentDidMount() {
  //   fetch('http://10.58.0.130:8000')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data.banner_images);
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
        {/* <SlideTest mainImageArr={mainImageArr} /> */}
        <BestProduct productArr={productArr} />
        {/* <Paging /> */}
      </div>
    );
  }
}
