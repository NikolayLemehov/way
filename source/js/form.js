const RegEx = {
  EMAIL_SEND: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  EMAIL_INPUT: /[А-я]/g,
  PHONE: /\(\d{3}\)\d{3}-\d{2}-\d{2}/,
};
export default class Form {
  constructor(form) {
    this.form = form;
    this.phone = this.form ? this.form.querySelector(`input[name="phone"]`) : null;
    this.email = this.form ? this.form.querySelector(`input[name="email"]`) : null;
    this.submitBtn = this.form ? this.form.querySelector(`button[type="submit"]`) : null;
    this.isAllExisting = this.form && this.phone && this.email && this.submitBtn;
    this.iMaskPhone = {};

    this._onValidateInputEmail = this._onValidateInputEmail.bind(this);
  }

  active() {
    if (!this.isAllExisting) {
      return false;
    }
    this.iMaskPhone = this._validateIMaskPhone();
    this.email.addEventListener(`input`, this._onValidateInputEmail);
    return true;
  }

  validatePhone() {
    const string = this.phone.value;
    const result = string.match(RegEx.PHONE);
    const foundMatch = result ? result[0] : null;
    if (foundMatch === string) {
      this.phone.setCustomValidity(``);
      if (this.phone.classList.contains(`input-error`)) {
        this.phone.classList.remove(`input-error`);
      }
    } else {
      this.phone.classList.add(`input-error`);
      this.phone.setCustomValidity(`Номер телефона должен соответствовать следующей маске (000)000-00-00`);
    }
  }

  validateEmail() {
    if (RegEx.EMAIL_SEND.test(this.email.value) || this.email.value === ``) {
      this.email.setCustomValidity(``);
      if (this.email.classList.contains(`input-error`)) {
        this.email.classList.remove(`input-error`);
      }
    } else {
      this.email.classList.add(`input-error`);
      this.email.setCustomValidity(`Email не правильный`);
    }
  }

  _onValidateInputEmail() {
    this.email.value = this.email.value.replace(RegEx.EMAIL_INPUT, ``);
  }

  _validateIMaskPhone() {
    const phone = this.phone;
    return phone ? new window.IMask(phone, {
      mask: `(000)000-00-00`
    }) : null;
  }
}
