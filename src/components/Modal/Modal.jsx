import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.toggleModal();
    }
  };
  render() {
    const { children, onClick } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={onClick}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
