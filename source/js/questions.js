export default class Questions {
  constructor(element) {
    this.element = element;
    this.form = this.element ? this.element.querySelector(`form`) : null;
    this.phone = this.form ? this.form.querySelector(`input[name="phone"]`) : null;
    this.email = this.form ? this.form.querySelector(`input[name="email"]`) : null;
    this.submitBtn = this.element ? this.element.querySelector(`.questions__submit-btn`) : null;
    this.isAllExisting = this.element && this.form && this.phone && this.email && this.submitBtn;
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

    this.submitBtn.addEventListener(`click`, (evt) => {
      this._validatePhone();
      const isCheckForm = this.form.checkValidity();
      if (isCheckForm) {
        evt.preventDefault();
      }
    });
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
}
