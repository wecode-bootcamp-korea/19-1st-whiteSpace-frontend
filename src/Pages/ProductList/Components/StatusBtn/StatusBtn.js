import React, { Component } from 'react';
import './StatusBtn.scss';

export default class StatusBtn extends Component {
  render() {
    const { text, color } = this.props;
    return (
      <div className="badgeWrap">
        <span className={`badge ${color}`}>{text}</span>
      </div>
    );
  }
}
