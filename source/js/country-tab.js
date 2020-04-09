export default class CountryTab {
  constructor(bookmarkItem) {
    this.bookmarkItem = bookmarkItem;
    this.tab = bookmarkItem ? bookmarkItem.querySelector(`a`) : null;
    this.isActive = null;
    this.country = null;
    this.descriptionItem = null;
    this.isAllExisting = this._active();
  }

  uncheck() {
    this.bookmarkItem.classList.remove(`country__bookmark-item--active`);
    this.descriptionItem.classList.remove(`country__description-item--active`);
    this.isActive = false;
  }

  check() {
    this.bookmarkItem.classList.add(`country__bookmark-item--active`);
    this.descriptionItem.classList.add(`country__description-item--active`);
    this.isActive = true;
  }

  setFocusTabHandler(handler) {
    this.tab.addEventListener(`focus`, handler);
  }

  setBlurTabHandler(handler) {
    this.tab.addEventListener(`blur`, handler);
  }

  _active() {
    this.isAllExisting = this.bookmarkItem && this.tab;
    if (!(this.bookmarkItem && this.tab)) {
      return false;
    }
    this.isActive = this.bookmarkItem.classList.contains(`country__bookmark-item--active`);
    this.country = this.bookmarkItem.dataset.country;
    this.descriptionItem = document.querySelector(`.country__description-item--${this.country}`);
    return !!this.descriptionItem;
  }
}
