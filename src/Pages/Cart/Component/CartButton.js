import React, { Component } from 'react';
import './CartButton.scss';

export default class CartButton extends Component {
  render() {
    return (
      <div className="CartButton">
        <button
          className={this.props.className}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}
