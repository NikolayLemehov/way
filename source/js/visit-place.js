export default class VisitPlace {
  constructor(element) {
    this.element = element;
    this.links = element.querySelectorAll(`.visit-place__image-link`);
    this.isAllExisting = this.element && this.links.length > 0;
    this.country = null;
  }

  active(country) {
    if (!this.isAllExisting) {
      return;
    }

    this.country = country;
    this.links.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const countryName = it.dataset.href;
        this.country.checkTab(countryName);
      });
    });
  }
}
