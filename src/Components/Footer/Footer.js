import React, { Component } from 'react';
import './Footer.scss';

export class Footer extends Component {
  render() {
    return (
      <div id="footerWrapper">
        <footer>
          <div></div>
          <div></div>
          <div className="termsOfService">
            <div>
              <span>이용약관</span>
              <span>개인정보처리방침</span>
              <span>이용안내</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
