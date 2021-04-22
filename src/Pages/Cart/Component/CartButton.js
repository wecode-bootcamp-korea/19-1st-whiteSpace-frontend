import React, { Component } from 'react';
import './CartButton.scss';

export default class CartButton extends Component {
  render() {
    return (
      <div className="CartButton">
        <div className={this.props.className} onClick={this.props.onClick}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
