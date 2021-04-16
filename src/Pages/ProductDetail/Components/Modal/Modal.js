import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

export default class Modal extends Component {
  render() {
    const { open, close, header, children } = this.props;

    return (
      <div className={(open && 'openModal') + ' modal'}>
        {open && (
          <section className="modalSection">
            <header>
              {header}
              <button className="close" onClick={close}>
                <i className="xi-close"></i>
              </button>
            </header>
            <main>{children}</main>
          </section>
        )}
      </div>
    );
  }
}
