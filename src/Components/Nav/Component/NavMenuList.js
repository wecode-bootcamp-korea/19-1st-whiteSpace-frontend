import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenuList.scss';

export class navMenuList extends Component {
  render() {
    const { dataList, className } = this.props;
    return (
      <div className={className}>
        <ul>
          {dataList.map(data => {
            const keys = Object.keys(data);
            const urlName =
              className === 'navRightMenu'
                ? data[keys[2]]
                : '/category/' + data[keys[0]];

            return (
              <li key={data[keys[0]]}>
                <Link
                  to={{
                    pathname: urlName,
                    state: {
                      categoryId: data[keys[0]],
                    },
                  }}
                >
                  {data[keys[1]]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default navMenuList;
