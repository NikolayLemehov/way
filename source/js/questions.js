import Form from './form';

export default class Questions {
  constructor(className) {
    this.className = className;
    this.element = document.querySelector(`.${this.className}`);
    this.formEntity = new Form(this.element.querySelector(`form`));
    this.isAllExisting = this.element && this.formEntity.active();
  }

  active(popupSuccess) {
    if (!this.isAllExisting) {
      return;
    }

    this.formEntity.submitBtn.addEventListener(`click`, (evt) => {
      this.formEntity.validatePhone();
      this.formEntity.validateEmail();
      if (this.formEntity.form.checkValidity()) {
        evt.preventDefault();
        popupSuccess.show();
      }
    });
  }
}
