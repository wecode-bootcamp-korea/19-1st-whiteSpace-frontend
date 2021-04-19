import React, { Component } from 'react';
import './InfomationWrap.scss';

export default class InfomationWrap extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="infomationWrap">
        <main>{children}</main>
      </div>
    );
  }
}
