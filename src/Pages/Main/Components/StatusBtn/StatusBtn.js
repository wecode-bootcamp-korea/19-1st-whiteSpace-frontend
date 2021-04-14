import React, { Component } from 'react';
import './StatusBtn.scss';

export default class StatusBtn extends Component {
  render() {
    const { text, color, stock } = this.props;
    return (
      <div className="badgeWrap">
        {!stock ? (
          <span className={`badge red`}>SOLDOUT</span>
        ) : (
          <span className={`badge ${color}`}>{text}</span>
        )}
      </div>
    );
  }
}
