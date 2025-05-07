export function smoothScrollTo(target) {
  const scrollDuration = 800;
  const easing = "easeInOutCubic";

  let start = window.scrollY || window.pageYOffset;
  let end = target.getBoundingClientRect().top + start;
  let startTime = performance.now();

  function scrollStep(timestamp) {
    const progress = (timestamp - startTime) / scrollDuration;
    if (progress < 1) {
      window.scrollTo(0, start + (end - start) * ease(progress));
      requestAnimationFrame(scrollStep);
    } else {
      window.scrollTo(0, end);
    }
  }

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  requestAnimationFrame(scrollStep);
}

// scrollToSection function
export function scrollToSection(link) {
  const target = document.querySelector(link);

  if (target) {
    smoothScrollTo(target);
  }
}
