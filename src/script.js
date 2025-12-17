 /* About Us Read More */
  

(function () {
  function initParagraphToggle({
    containerSelector = '#aboutContent',
    buttonSelector = '#aboutToggle',
    initiallyShowCount = 1        
  } = {}) {
    const container = document.querySelector(containerSelector);
    const btn = document.querySelector(buttonSelector);
    if (!container || !btn) return;

    const paragraphs = Array.from(container.querySelectorAll('p'));
    if (paragraphs.length <= initiallyShowCount) {
      btn.style.display = 'none';
      return;
    }

    let expanded = false;

    function apply() {
      paragraphs.forEach((p, i) => {
        p.style.display = (!expanded && i >= initiallyShowCount) ? 'none' : '';
      });
      btn.textContent = expanded ? 'Show less' : 'Read more';
      btn.setAttribute('aria-expanded', String(expanded));
    }

    apply();

    btn.addEventListener('click', () => {
      expanded = !expanded;
      apply();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initParagraphToggle());
  } else {
    initParagraphToggle();
  }

  window.initParagraphToggle = initParagraphToggle;
})();


/* Team carousel  */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.mf-team__container, .team-container');
  const members = Array.from(
    container?.querySelectorAll('.mf-team__member, .team-member') || []
  );

  const btnPrev = document.querySelector('.mf-team__arrow--left, .team-arrow.left');
  const btnNext = document.querySelector('.mf-team__arrow--right, .team-arrow.right');

  if (!container || members.length === 0 || !btnPrev || !btnNext) return;

  const total = members.length;

  // Match the CSS breakpoints 
  const mqTablet = window.matchMedia('(max-width: 900px)');
  const mqMobile = window.matchMedia('(max-width: 560px)');

  let startIndex = 0;

  function getVisibleCount() {
    if (mqMobile.matches) return 1;
    if (mqTablet.matches) return 2;
    return 3;
  }

  function clampStartIndex() {
    const visible = getVisibleCount();
    const maxStart = Math.max(0, total - visible);
    startIndex = Math.min(startIndex, maxStart);
  }

  function render() {
    const visible = getVisibleCount();

    members.forEach((el, idx) => {
      const inRange = idx >= startIndex && idx < startIndex + visible;
      el.style.display = inRange ? '' : 'none';
    });

    btnPrev.disabled = startIndex === 0;
    btnNext.disabled = startIndex >= total - visible;
  }

  function goNext() {
    const visible = getVisibleCount();
    if (startIndex < total - visible) {
      startIndex += 1;
      render();
    }
  }

  function goPrev() {
    if (startIndex > 0) {
      startIndex -= 1;
      render();
    }
  }

  btnPrev.addEventListener('click', goPrev);
  btnNext.addEventListener('click', goNext);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  function rerender() {
    clampStartIndex();
    render();
  }

  mqTablet.addEventListener?.('change', rerender);
  mqMobile.addEventListener?.('change', rerender);
   window.addEventListener('resize', rerender);

  rerender();})
