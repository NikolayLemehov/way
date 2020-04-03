const activeSmoothScroll = () => {
  const anchors = document.querySelectorAll(`a.scroll-to`);

  anchors.forEach((anchor) => {
    anchor.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const blockID = anchor.getAttribute(`href`);
      let target = null;
      try {
        target = document.querySelector(blockID);
      } catch (error) {
        return;
      }
      if (target) {
        doScrolling(target.getBoundingClientRect().top, 800);
      }
    });
  });
};

const doScrolling = (elementY, duration) => {
  const startingY = window.pageYOffset;
  const diff = elementY - startingY;
  let start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
    // Elapsed milliseconds since start of scrolling.
    const time = timestamp - start;
    // Get percent of completion in range [0, 1].
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};
export {activeSmoothScroll};
