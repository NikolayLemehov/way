import {KEY_CODE_ESC, BETWEEN_ANIMATION_TIME, getScrollbarWidth} from './utils';

export default class PopupBuyTour {
  constructor(element) {
    this.element = element;
    this.form = this.element ? this.element.querySelector(`form`) : null;
    this.phone = this.form ? this.form.querySelector(`input[name="phone"]`) : null;
    this.closeBtn = this.element ? this.element.querySelector(`.buy-tour__close-btn`) : null;
    this.submitBtn = this.element ? this.element.querySelector(`.buy-tour__submit-btn`) : null;
    this.isAllExisting = this.element && this.form && this.phone && this.closeBtn && this.submitBtn;

    this._onDocumentPopupEscKeyDown = this._onDocumentPopupEscKeyDown.bind(this);
    this._onClickOutsideForm = this._onClickOutsideForm.bind(this);
  }

  active() {
    if (!this.isAllExisting) {
      return;
    }

    const validatePhone = (input) => {
      return new window.IMask(input, {
        mask: `(000)000-00-00`
      });
    };

    if (this.phone) {
      validatePhone(this.phone);
    }

    this.closeBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._close();
    });

    this.submitBtn.addEventListener(`click`, (evt) => {
      this._validatePhone();
      const isCheckForm = this.form.checkValidity();
      if (isCheckForm) {
        evt.preventDefault();
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

  _removeDisplay() {
    this.element.style.display = ``;
  }

  _validatePhone() {
    const string = this.phone.value;
    const result = string.match(/\(\d{3}\)\d{3}-\d{2}-\d{2}/);
    const foundMatch = result ? result[0] : null;
    if (foundMatch === string) {
      this.phone.setCustomValidity(``);
    } else {
      this.phone.setCustomValidity(`Номер телефона должен соответствовать следующий маске (000)000-00-00`);
    }
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
