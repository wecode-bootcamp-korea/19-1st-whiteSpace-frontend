import React, { Component } from 'react';
import './Tos.scss';

export class Tos extends Component {
  render() {
    return (
      <div id="Tos">
        <div>
          <div className="tosLeftBox">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <span>이용안내</span>
          </div>
          <div className="tosRightBox">
            This is clone Web Site, So No copyright
          </div>
        </div>
      </div>
    );
  }
}

export default Tos;
