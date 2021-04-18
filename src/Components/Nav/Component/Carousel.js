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

    console.log(x);
    console.log(walk);
    if (walk > 150) {
      this.prev();
    }

    if (walk < -150) {
      this.next();
    }

    // console.log(
    //   'this.Slides[index].offsetLeft' + this.Slides[index].offsetLeft
    // );
  };

  onMouseLeave = index => {
    this.setState({
      isMouseEvent: false,
    });
    // this.Slides[index].classList.remove('active');
  };

  onMouseUp = index => {
    this.setState({
      isMouseEvent: false,
    });
    // this.Slides[index].classList.remove('active');
  };

  //페이징할 스크롤 양을 계산하기. 양옆에 padding 만큼을 빼준다.
  // getPageSize(index) {
  //   // const padding = this.getSliderPadding() * 2;
  //   return this.Slides[index].offsetWidth; //- padding
  // }
  // stopMove() {
  //   this.setState({
  //     isMouseEvent: false,
  //   });
  // }

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

  transitionEnd() {
    if (this.state.direction === 1) {
      this.contentParent.style.justifyContent = 'flex-end';
      this.contentParent.prepend(this.contentParent);
    } else {
      this.contentParent.style.justifyContent = 'flex-start';
      this.contentParent.appendChild(this.contentParent);
    }
  }

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

  render() {
    const { children } = this.props;

    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {/* {this.state.currentIndex > 0 && (
            <button className="left-arrow" onClick={this.prev}>
              &lt;
            </button>
          )} */}
          <div
            className="carousel-content-wrapper"
            onMouseDown={e => this.onMouseDown(e)}
            onMouseLeave={() => this.onMouseLeave()}
            onMouseUp={() => this.onMouseUp()}
            onMouseMove={e => this.onMouseMove(e)}
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
          {/* {this.state.currentIndex < this.state.length - 1 && (
            <button className="right-arrow" onClick={this.next}>
              &gt;
            </button>
          )} */}
        </div>
      </div>
    );
  }
}

export default Carousel;
