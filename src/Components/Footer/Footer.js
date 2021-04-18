import React, { Component } from 'react';
import Tos from './Component/Tos';
import CorpLi from './Component/CorpLi';
import './Footer.scss';

export class Footer extends Component {
  render() {
    return (
      <>
        <div id="footer">
          <footer>
            <div className="footerLeftBox">
              <h1>whileSpace Corp.</h1>
              <CorpLi fontSize={'fontSize07'} liData={COPERATION_DATA} />
            </div>
            <div className="footerRightBox">
              <div>
                <h2>CUSTOMER CENTER</h2>
                <div>02-2051-1234</div>
              </div>
              <CorpLi fontSize={'fontSize08'} liData={CENTER_DATA} />
            </div>
          </footer>
        </div>
        <Tos />
      </>
    );
  }
}

export default Footer;

const COPERATION_DATA = [
  {
    id: 1,
    title: 'Team No.',
    content: '045-79-1750',
  },
  {
    id: 2,
    title: 'NumSa Wall.',
    content: 'HeeWon Moon',
  },
  {
    id: 3,
    title: 'Team member',
    content: 'kimNam Sun, DanBi Park, DongHyun Kim, Jason(TaeKyung)',
  },
  {
    id: 4,
    title: 'GitHub Address',
    content:
      'https://github.com/wecode-bootcamp-korea/19-1st-whiteSpace-frontend.git',
  },
];

const CENTER_DATA = [
  {
    id: 1,
    title: 'OPEN',
    content: 'AM 10:00 ~ PM 17:00 / Sat. Sun, Holiday OFF',
  },
  {
    id: 2,
    title: 'LUNCH TIME',
    content: 'IF You hungry, sonoToKi',
  },
];
