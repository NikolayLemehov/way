import Form from './form';
import {KEY_CODE_ESC, BETWEEN_ANIMATION_TIME, getScrollbarWidth} from './utils';

export default class PopupBuyTour {
  constructor(element) {
    this.element = element;
    this.formEntity = new Form(this.element.querySelector(`form`));
    this.closeBtn = this.element ? this.element.querySelector(`.buy-tour__close-btn`) : null;
    this.submitBtn = this.element ? this.element.querySelector(`.buy-tour__submit-btn`) : null;
    this.isAllExisting = this.element && this.closeBtn && this.submitBtn && this.formEntity.active();
    this.storage = {
      phone: ``,
      email: ``,
      isSupport: true,
    };

    this._onDocumentPopupEscKeyDown = this._onDocumentPopupEscKeyDown.bind(this);
    this._onClickOutsideForm = this._onClickOutsideForm.bind(this);
  }

  active() {
    if (!this.isAllExisting) {
      return;
    }

    this._loadStorage();

    this.closeBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._close();
    });

    this.submitBtn.addEventListener(`click`, (evt) => {
      this.formEntity.validatePhone();
      this.formEntity.validateEmail();
      if (this.formEntity.form.checkValidity()) {
        evt.preventDefault();
        this._saveStorage();
      }
    });
  }

  show() {
    if (!this.isAllExisting) {
      return;
    }
    document.documentElement.style.overflow = `hidden`;
    document.documentElement.style.paddingRight = `${getScrollbarWidth()}px`;
    this.element.style.display = ``;

    if (this.storage.phone) {
      this.formEntity.iMaskPhone.value = this.storage.phone;
    }
    if (this.storage.email) {
      this.formEntity.email.value = this.storage.email;
    }

    setTimeout(() => this.element.classList.add(`buy-tour--open`), BETWEEN_ANIMATION_TIME);
    document.addEventListener(`keydown`, this._onDocumentPopupEscKeyDown);
    window.addEventListener(`click`, this._onClickOutsideForm);
  }

  _close() {
    if (!this.isAllExisting) {
      return;
    }
    document.documentElement.style.overflow = ``;
    document.documentElement.style.paddingRight = ``;
    if (this.element.classList.contains(`buy-tour--open`)) {
      this.element.classList.remove(`buy-tour--open`);
    }
    this.element.addEventListener(`transitionend`, this._removeDisplay);
    this.element.removeEventListener(`transitionend`, this._removeDisplay);
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

  _removeDisplay() {
    this.element.style.display = ``;
  }

  _onDocumentPopupEscKeyDown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      this._close();
    }
  }

  _onClickOutsideForm(evt) {
    if (evt.target.classList.contains(`buy-tour`)) {
      this._close();
    }
  }
}
