const activeForEeachNodeListForIE = () => {
  if (typeof NodeList.prototype.forEach !== `function`) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
};

export {activeForEeachNodeListForIE};
