import React, { Component } from 'react';
import './Modal.scss';

export default class Modal extends Component {
  render() {
    const { open, close, header } = this.props;

    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open && (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                {' '}
                &times;{' '}
              </button>
            </header>
            <main>{this.props.children}</main>
          </section>
        )}
      </div>
    );
  }
}
