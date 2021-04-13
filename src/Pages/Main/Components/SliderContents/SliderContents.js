import React, { Component } from 'react';
import './SliderContents.scss';

export default class SliderContents extends Component {
  render() {
    return (
      <>
        <div className="slideWrap">
          <img
            alt="slideImage"
            className="slideImage"
            src="https://images.unsplash.com/photo-1546177461-3283e4aa3b0c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
          />
        </div>
      </>
    );
  }
}
