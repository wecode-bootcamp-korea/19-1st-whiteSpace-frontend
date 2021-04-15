import React, { Component } from 'react';
import './Popup.scss';

const SHOWING_CLASS = 'showing';

export class Popup extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div id="Popup">
        <div className="slider_item">
          <span>팝업1</span>
        </div>
        <div className="slider_item">
          <span>팝업2</span>
        </div>
      </div>
    );
  }
}

export default Popup;
