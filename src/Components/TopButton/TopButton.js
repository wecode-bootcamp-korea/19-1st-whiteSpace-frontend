import React, { Component } from 'react';
import './TopButton.scss';

export default class TopButton extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      this.showButton();
    });
  }

  showButton() {
    this.setState({
      show: window.pageYOffset > 200,
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  render() {
    const { show } = this.state;
    const { scrollToTop } = this;
    return (
      <div className="topButton">
        {show && (
          <button onClick={scrollToTop}>
            <i className="xi-caret-up-circle-o"></i>
          </button>
        )}
      </div>
    );
  }
}
