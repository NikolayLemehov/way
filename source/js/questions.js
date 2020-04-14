import Form from './form';

export default class Questions {
  constructor(className) {
    this.className = className;
    this.element = document.querySelector(`.${this.className}`);
    this.formEntity = new Form(this.element.querySelector(`form`));
    this.submitBtn = this.element ? this.element.querySelector(`.${this.className}__submit-btn`) : null;
    this.isAllExisting = this.element && this.submitBtn && this.formEntity.active();
  }

  active() {
    if (!this.isAllExisting) {
      return;
    }

    this.submitBtn.addEventListener(`click`, (evt) => {
      this.formEntity.validatePhone();
      this.formEntity.validateEmail();
      if (this.formEntity.form.checkValidity()) {
        evt.preventDefault();
      }
    });
  }
}
