import Form from './form';
import {KEY_CODE_ESC, openPopup, closePopup} from './utils';

export default class PopupBuyTour {
  constructor(className) {
    this.className = className;
    this.element = document.querySelector(`.${this.className}`);
    this.formEntity = new Form(this.element.querySelector(`form`));
    this.closeBtn = this.element ? this.element.querySelector(`.${this.className}__close-btn`) : null;
    this.isAllExisting = this.element && this.closeBtn && this.formEntity.active();
    this.storage = {
      phone: ``,
      email: ``,
      isSupport: true,
    };

    this._onDocumentPopupEscKeyDown = this._onDocumentPopupEscKeyDown.bind(this);
    this._onClickOutsideForm = this._onClickOutsideForm.bind(this);
  }

  active(popupSuccess) {
    if (!this.isAllExisting) {
      return;
    }

    this._loadStorage();

    this.closeBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._close();
    });

    this.formEntity.submitBtn.addEventListener(`click`, (evt) => {
      this.formEntity.validatePhone();
      this.formEntity.validateEmail();
      if (this.formEntity.form.checkValidity()) {
        evt.preventDefault();
        this._saveStorage();
        this._close();
        popupSuccess.show();
      }
    });
  }

  show() {
    if (!this.isAllExisting) {
      return;
    }

    if (this.storage.phone) {
      this.formEntity.iMaskPhone.value = this.storage.phone;
    }
    if (this.storage.email) {
      this.formEntity.email.value = this.storage.email;
    }
    openPopup(this.element);
    document.addEventListener(`keydown`, this._onDocumentPopupEscKeyDown);
    window.addEventListener(`click`, this._onClickOutsideForm);
  }

  _close() {
    if (!this.isAllExisting) {
      return;
    }
    closePopup(this.element);
    document.removeEventListener(`keydown`, this._onDocumentPopupEscKeyDown);
    window.removeEventListener(`click`, this._onClickOutsideForm);
  }

  _loadStorage() {
    try {
      this.storage.phone = localStorage.getItem(`phoneField`);
      this.storage.email = localStorage.getItem(`emailField`);
    } catch (err) {
      this.storage.isSupport = false;
    }
  }

  _saveStorage() {
    if (this.storage.isSupport) {
      localStorage.setItem(`phoneField`, this.formEntity.phone.value);
      localStorage.setItem(`questionField`, this.formEntity.email.value);
    }
  }

  _onDocumentPopupEscKeyDown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      this._close();
    }
  }

  _onClickOutsideForm(evt) {
    if (evt.target.classList.contains(`${this.className}`)) {
      this._close();
    }
  }
}
