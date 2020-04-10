import {BREAK_POINT_DESKTOP, getScrollbarWidth} from './utils';
import {debounce} from './debounce';

const KEY_CODE_ESC = 27;
const DELAY_DEL_ATTRIBUTE = 300;

export default class PageHeader {
  constructor(element) {
    this.element = element;
    this.btn = element ? element.querySelector(`.page-header__menu > button`) : null;
    this.menu = element ? element.querySelector(`.page-header__menu ul`) : null;
    this.menuItems = element ? element.querySelectorAll(`.page-header__menu .scroll-to`) : null;
    this.isAllExisting = element && this.btn && this.menu && this.menuItems.length > 0;

    this._onDocumentMenuEscKeyDown = this._onDocumentMenuEscKeyDown.bind(this);
  }

  active() {
    if (!this.isAllExisting) {
      return;
    }
    if (this.element.classList.contains(`page-header--nojs`)) {
      this.element.classList.remove(`page-header--nojs`);
    }
    this.btn.removeAttribute(`style`);
    this._closeMenu();

    this.menuItems.forEach((it) => {
      it.addEventListener(`click`, () => {
        this._closeMenu();
      });
    });
    this.btn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (this.element.classList.contains(`page-header--close`)) {
        this._openMenu();
      } else {
        this._closeMenu();
      }
    });
    const delAttribute = () => {
      this.menu.removeAttribute(`style`);
    };
    const debounceDelAttribute = debounce(delAttribute, DELAY_DEL_ATTRIBUTE);
    window.addEventListener(`resize`, () => {
      if (!this.element.classList.contains(`page-header--close`) || window.innerWidth >= BREAK_POINT_DESKTOP) {
        return;
      }
      this.menu.style.display = `none`;
      debounceDelAttribute();
    });
  }

  _closeMenu() {
    document.documentElement.style.overflow = ``;
    document.documentElement.style.paddingRight = ``;

    if (!this.element.classList.contains(`page-header--close`)) {
      this.element.classList.add(`page-header--close`);
    }
    document.removeEventListener(`keydown`, this._onDocumentMenuEscKeyDown);
    this.menuItems.forEach((it) => {
      it.tabIndex = `-1`;
    });
  }

  _openMenu() {
    document.documentElement.style.overflow = `hidden`;
    document.documentElement.style.paddingRight = `${getScrollbarWidth()}px`;

    if (this.element.classList.contains(`page-header--close`)) {
      this.element.classList.remove(`page-header--close`);
    }
    document.addEventListener(`keydown`, this._onDocumentMenuEscKeyDown);
    this.menuItems.forEach((it) => {
      it.removeAttribute(`tabindex`);
    });
  }

  _onDocumentMenuEscKeyDown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      this._closeMenu();
    }
  }
}
