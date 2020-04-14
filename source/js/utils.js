const BETWEEN_ANIMATION_TIME = 50; // ms
const BREAK_POINT_DESKTOP = 1024;
const KEY_CODE_ESC = 27;

const activeForEeachNodeListForIE = () => {
  if (typeof NodeList.prototype.forEach !== `function`) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
};

const getScrollbarWidth = () => {
  const outer = document.createElement(`div`);
  outer.style.visibility = `hidden`;
  outer.style.overflow = `scroll`;
  outer.style.msOverflowStyle = `scrollbar`;
  document.body.appendChild(outer);

  const inner = document.createElement(`div`);
  outer.appendChild(inner);

  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

const openPopup = (element) => {
  document.documentElement.style.overflow = `hidden`;
  document.documentElement.style.paddingRight = `${getScrollbarWidth()}px`;
  element.style.display = ``;
  setTimeout(() => element.classList.add(`popup--open`), BETWEEN_ANIMATION_TIME);
};

const closePopup = (element) => {
  document.documentElement.style.overflow = ``;
  document.documentElement.style.paddingRight = ``;
  if (element.classList.contains(`popup--open`)) {
    element.classList.remove(`popup--open`);
  }
  const removeDisplay = () => {
    element.style.display = ``;
  };
  element.addEventListener(`transitionend`, removeDisplay);
  element.removeEventListener(`transitionend`, removeDisplay);
};

export {BETWEEN_ANIMATION_TIME, BREAK_POINT_DESKTOP, KEY_CODE_ESC, activeForEeachNodeListForIE, getScrollbarWidth,
  openPopup, closePopup};
