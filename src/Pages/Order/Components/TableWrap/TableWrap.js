import React, { Component } from 'react';
import './TableWrap.scss';

export default class TableWrap extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="tableWrap">
        <header>
          <span>{title}</span>
        </header>
        {children}
      </div>
    );
  }
}
