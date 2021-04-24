import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './NavMenuList.scss';

export class navMenuList extends Component {
  render() {
    const { dataList, className, onClick } = this.props;
    return (
      <div className={className}>
        <ul>
          {dataList.map(data => {
            const keys = Object.keys(data);
            const urlName =
              className === 'navRightMenu'
                ? data[keys[2]]
                : '/category' + (!data[keys[0]] ? '' : '/' + data[keys[0]]);
            return (
              <li
                key={data[keys[0]]}
                onClick={() => onClick(urlName, data[keys[1]], data[keys[0]])}
              >
                {data[keys[1]]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default navMenuList;
