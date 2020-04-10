import {BETWEEN_ANIMATION_TIME} from './utils';

export default class CountryTab {
  constructor(bookmarkItem) {
    this.bookmarkItem = bookmarkItem;
    this.tab = bookmarkItem ? bookmarkItem.querySelector(`a`) : null;
    this.isActive = null;
    this.country = null;
    this.descriptionItem = null;
    this.isAllExisting = this._active();
  }

  uncheckAnimated() {
    this.bookmarkItem.classList.remove(`country__bookmark-item--active`);
    this._hideAnimateCountry();
    this.isActive = false;
  }

  checkAnimated() {
    this.bookmarkItem.classList.add(`country__bookmark-item--active`);
    this._showAnimateCountry();
    this.isActive = true;
  }

  uncheck() {
    this.bookmarkItem.classList.remove(`country__bookmark-item--active`);
    this._hideCountry();
    this.isActive = false;
  }

  check() {
    this.bookmarkItem.classList.add(`country__bookmark-item--active`);
    this._showCountry();
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

  _showAnimateCountry() {
    this.descriptionItem.classList.add(`country__description-item--display`);
    setTimeout(() => {
      this.descriptionItem.classList.add(`country__description-item--opacity`);
    }, BETWEEN_ANIMATION_TIME);
  }

  _hideAnimateCountry() {
    this.descriptionItem.classList.remove(`country__description-item--opacity`);
    this.descriptionItem.addEventListener(`transitionend`, () => {
      this._removeDisplayCountry();
    });
  }

  _showCountry() {
    this.descriptionItem.classList.add(`country__description-item--display`);
    this.descriptionItem.classList.add(`country__description-item--opacity`);
  }

  _hideCountry() {
    this.descriptionItem.classList.remove(`country__description-item--opacity`);
    this._removeDisplayCountry();
  }

  _removeDisplayCountry() {
    this.descriptionItem.classList.remove(`country__description-item--display`);
  }
}
