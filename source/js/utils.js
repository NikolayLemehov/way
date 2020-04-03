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

export {activeForEeachNodeListForIE, getScrollbarWidth};
