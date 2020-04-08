import CountryTab from './country-tab';

export default class Country {
  constructor(element) {
    this.element = element;
    this.bookmarkItems = element.querySelectorAll(`.country__bookmark-item`);
    this.isAllExisting = !!this.element && this.bookmarkItems.length > 0;
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
        if (it.bookmarkItem.classList.contains(`country__bookmark-item--active`)) {
          return;
        }
        const oldTab = this.currentTab;
        oldTab.uncheck();
        this.currentTab = it;
        it.check();
      });
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
