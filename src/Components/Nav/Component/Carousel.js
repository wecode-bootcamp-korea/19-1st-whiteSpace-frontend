import React, { Component } from 'react';
import './Carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      length: 0,
      isMouseEvent: false,
      startX: 0,
      offsetLeft: 0,
      direction: 0,
    };
    this.transRef = React.createRef();
    this.contentParent = React.createRef();
  }

  componentDidMount() {
    this.setState({
      length: this.props.children.length,
    });
    // console.log(this.props.children);
    // console.log(this.props.children.length);
  }

  componentDidUpdate() {
    // console.log(this.state.currentIndex);
    this.transRef.current.style.transform =
      'translateX(-' + this.state.currentIndex * 100 + '%)';
  }

  cursorOn() {
    this.contentParent.current.style.cursor = 'pointer';
  }

  onMouseDown = e => {
    this.setState({
      isMouseEvent: true,
      startX: e.pageX - this.transRef.current.offsetLeft,
    });
    // console.log(index);
    // this.Slides[index].classList.add('active');
  };

  onMouseMove = e => {
    if (!this.state.isMouseEvent) return;

    e.preventDefault();
    const x = e.pageX - this.transRef.current.offsetLeft;
    const walk = (x - this.state.startX) * 1;

    if (walk > 150) {
      this.prev();
    }

    if (walk < -150) {
      this.next();
    }
  };

  onMouseLeave = index => {
    this.setState({
      isMouseEvent: false,
    });
    this.contentParent.current.style.cursor = 'default';
    // this.Slides[index].classList.remove('active');
  };

  onMouseUp = index => {
    this.setState({
      isMouseEvent: false,
    });
    // this.Slides[index].classList.remove('active');
  };

  transitionEnd() {
    if (this.state.direction === 1) {
      this.contentParent.style.justifyContent = 'flex-end';
      this.contentParent.prepend(this.contentParent);
    } else {
      this.contentParent.style.justifyContent = 'flex-start';
      this.contentParent.appendChild(this.contentParent);
    }
  }

  next = () => {
    // if (this.state.currentIndex === this.state.length - 1) {
    //   this.setState({
    //     direction: 1,
    //   });
    //   this.contentParent.style.justifyContent = 'flex-start';
    //   this.transitionEnd();
    // }
    if (this.state.currentIndex < this.state.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        isMouseEvent: false,
      });
    }
  };

  prev = () => {
    // if (this.state.currentIndex === 0) {
    //   this.setState({
    //     direction: -1,
    //   });
    // }
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
        isMouseEvent: false,
      });
    }
    // this.transitionEnd();
  };

  popupClick() {
    if (this.state.length - 1 > this.state.currentIndex) {
      this.next();
    } else {
      this.prev();
    }
  }

  render() {
    const { children } = this.props;
    console.log(this.state.isMouseEvent);

    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {this.state.currentIndex > 0 && (
            <button className="left-arrow" onClick={this.prev}>
              &lt;
            </button>
          )}
          <div
            className="carousel-content-wrapper"
            onMouseDown={e => this.onMouseDown(e)}
            onMouseLeave={() => this.onMouseLeave()}
            onMouseUp={() => this.onMouseUp()}
            onMouseMove={e => this.onMouseMove(e)}
            onMouseOver={() => this.cursorOn()}
            onClick={() => this.popupClick()}
            ref={this.contentParent}
          >
            <div
              className="carousel-content"
              ref={this.transRef}
              // style={{
              //   transform:
              //     'translateX(-' + this.state.currentIndex * 100 + '%)',
              // }}
            >
              {children}
            </div>
          </div>
          {this.state.currentIndex < this.state.length - 1 && (
            <button className="right-arrow" onClick={this.next}>
              &gt;
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
