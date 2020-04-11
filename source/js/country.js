import CountryTab from './country-tab';
import {BETWEEN_ANIMATION_TIME} from './utils';

export default class Country {
  constructor(element) {
    this.element = element;
    this.bookmarkList = element ? element.querySelector(`.country__bookmark-list`) : null;
    this.bookmarkItems = element ? element.querySelectorAll(`.country__bookmark-item`) : null;
    this.descriptionList = element ? element.querySelector(`.country__description-list`) : null;
    this.isAllExisting = this.element && this.bookmarkList && this.descriptionList && this.bookmarkItems.length > 0;
    this.countryTabs = null;
    this.currentTab = null;
  }

  active() {
    if (!this.isAllExisting) {
      return;
    }
    this.countryTabs = Array.from(this.bookmarkItems).map((it) => new CountryTab(it));
    const isAllCountryTabExisting = this.countryTabs.some((it) => it.isAllExisting);
    if (!isAllCountryTabExisting) {
      return;
    }

    if (this.element.classList.contains(`country--nojs`)) {
      this.element.classList.remove(`country--nojs`);
    }

    this._onViewChange();
    this.countryTabs[0].check();
    this.currentTab = this.countryTabs[0];

    this.countryTabs.forEach((it) => {
      it.tab.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._replaceTab(it);
      });

      it.setFocusTabHandler(() => {
        this.bookmarkList.classList.add(`country__bookmark-list--focus`);
      });
      it.setBlurTabHandler(() => {
        this.bookmarkList.classList.remove(`country__bookmark-list--focus`);
      });
    });
  }

  checkTab(countryName) {
    const newTab = Array.from(this.countryTabs).find((it) => it.country === countryName);
    this._replaceTab(newTab);
  }

  _replaceTab(newTab) {
    if (newTab.bookmarkItem.classList.contains(`country__bookmark-item--active`)) {
      return;
    }
    const oldTab = this.currentTab;
    this.currentTab = newTab;

    oldTab.uncheckAnimated();
    oldTab.descriptionItem.addEventListener(`transitionend`, () => {
      setTimeout(this.currentTab.checkAnimated(), BETWEEN_ANIMATION_TIME);
    });
  }

  _onViewChange() {
    this.countryTabs.forEach((it) => {
      if (it.isActive) {
        it.uncheck();
      }
    });
  }
}
