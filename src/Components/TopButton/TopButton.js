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

  componentWillUnmount() {
    document.removeEventListener('scroll', () => {
      this.showButton();
    });
  }

  showButton() {
    const { show } = this.state;
    if (show && window.pageYOffset < 200) {
      this.setState({
        show: false,
      });
    } else if (!show && window.pageYOffset > 200) {
      this.setState({
        show: true,
      });
    }
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
            <i className="xi-angle-up-thin"></i>
          </button>
        )}
      </div>
    );
  }
}
