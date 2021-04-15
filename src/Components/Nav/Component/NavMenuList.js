import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenuList.scss';

export class navMenuList extends Component {
  render() {
    // console.log(this.props.dataList);
    const { dataList, className } = this.props;
    return (
      <div className={className}>
        <ul>
          {dataList.map(data => {
            // console.log(data);
            // console.log(Object.keys(data));
            const keys = Object.keys(data);
            // console.log(keys[2]);
            // console.log(data[keys[2]]);
            const linkToData =
              className === 'navLeftMenu'
                ? {
                    pathname: '/products',
                    state: {
                      categoryId: data[keys[0]],
                    },
                  }
                : {
                    pathname: data[keys[2]],
                    state: {
                      categoryId: data[keys[0]],
                    },
                  };

            return (
              <li key={data[keys[0]]}>
                <Link to={linkToData}>{data[keys[1]]}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default navMenuList;
