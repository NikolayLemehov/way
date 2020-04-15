import {KEY_CODE_ESC, openPopup, closePopup} from './utils';

export default class PopupSuccess {
  constructor(className) {
    this.className = className;
    this.element = document.querySelector(`.${this.className}`);
    this.closeBtn = this.element ? this.element.querySelector(`.${this.className}__close-btn`) : null;
    this.isAllExisting = !!this.element;

    this._onDocumentPopupEscKeyDown = this._onDocumentPopupEscKeyDown.bind(this);
    this._onClickOutsideForm = this._onClickOutsideForm.bind(this);
  }

  active() {
    if (!this.isAllExisting) {
      return;
    }

    this.closeBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._close();
    });
  }

  show() {
    if (!this.isAllExisting) {
      return;
    }
    openPopup(this.element);
    document.addEventListener(`keydown`, this._onDocumentPopupEscKeyDown);
    window.addEventListener(`mousedown`, this._onClickOutsideForm);
  }

  _close() {
    if (!this.isAllExisting) {
      return;
    }
    closePopup(this.element);
    document.removeEventListener(`keydown`, this._onDocumentPopupEscKeyDown);
    window.removeEventListener(`mousedown`, this._onClickOutsideForm);
  }

  _onDocumentPopupEscKeyDown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      this._close();
    }
  }

  _onClickOutsideForm(evtDown) {
    const onMouseDown = (evtUp) => {
      if (evtDown.target.classList.contains(`${this.className}`) && evtUp.target.classList.contains(`${this.className}`)) {
        this._close();
      }
      document.removeEventListener(`mouseup`, onMouseDown);
    };
    document.addEventListener(`mouseup`, onMouseDown);
  }
}
