import React, { Component } from 'react';
import './CartButton.scss';

export default class CartButton extends Component {
  render() {
    const { className, onClick, disabled, children } = this.props;
    return (
      <div className="CartButton">
        <button className={className} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      </div>
    );
  }
}
