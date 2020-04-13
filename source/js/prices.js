export default class Prices {
  constructor(element) {
    this.element = element;
    this.btns = this.element ? this.element.querySelectorAll(`.offer__btn`) : [];
    this.isAllExisting = this.element && this.btns.length > 0;
    this.popupByTour = null;
  }

  active(popupByTour) {
    if (!this.isAllExisting) {
      return;
    }
    this.popupByTour = popupByTour;
    this.btns.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.popupByTour.show();
      });
    });
  }
}
