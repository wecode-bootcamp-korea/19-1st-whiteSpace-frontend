import React, { Component } from 'react';
import './SliderContents.scss';

export default class SliderContents extends Component {
  render() {
    const { imgSrc } = this.props;
    return (
      <li className="slideImageWrap">
        <img alt="slideImage" className="slideImage" src={imgSrc} />
      </li>
    );
  }
}
