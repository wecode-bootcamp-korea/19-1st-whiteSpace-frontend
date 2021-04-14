import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Category.scss';

export class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categoryList } = this.props;
    return (
      <>
        <ul>
          {categoryList.map(data => {
            return (
              <li key={data.category_id}>
                <Link to="/category" categoryId={data.category_id}>
                  {data.category_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Category;
