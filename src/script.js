 /* About Us Read More */
//get elements 
const openModal = document.querySelectorAll('.gallery-inner')
const imageContainer = document.querySelector('.gallery-image-container');
const modal = document.querySelector('.modal');
const newImg = document.querySelector('.new-images');

//click on text to open modal
openModal.forEach(modalImage => {
  modalImage.addEventListener('click', () => {
    imageContainer.classList.add('active');

    modal.style.display = 'block';
    modalImages();
  });
});


//modal images
function modalImages() {

  console.log(imageContainer);

  const images = document.querySelectorAll('.active img');

  images.forEach(image => {
    const imgSrc = image.getAttribute('src');
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imgSrc);
    newImg.appendChild(newImage);
  });

}

//click on close button to close modal
const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});
//hamburger menu

const menu = document.querySelector('.burger-menu');
const list = document.querySelector('.header-list');
const closeButton = document.querySelector('.close-menu')
menu.addEventListener('click', function openMenu() {
  console.log('clicked')


  list.style.display = "block";
  menu.style.display = "none"
  closeButton.style.display = "block"
})
closeButton.addEventListener('click', function closeMenu() {

  menu.style.display = "block";
  closeButton.style.display = "none"
  list.style.display = "none";
})

  /* About Us Read More */

  // js/about-toggle.js
  (function () {
    function initParagraphToggle({
      containerSelector = '#aboutContent',
      buttonSelector = '#aboutToggle',
      initiallyShowCount = 1        // show first paragraph, reveal the rest on click
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

/* Team */
/* team.js
   Carousel that shows 3 team members per view on desktop,
   advances by 1 card with left/right arrows, and adapts on smaller screens.
*/

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.team-container');
  const members = Array.from(container?.querySelectorAll('.team-member') || []);
  const btnPrev = document.querySelector('.team-arrow.left');
  const btnNext = document.querySelector('.team-arrow.right');

  if (!container || members.length === 0 || !btnPrev || !btnNext) return;

  const total = members.length;      
  const VISIBLE_DESKTOP = 3;
  const VISIBLE_TABLET = 3;
  const VISIBLE_MOBILE = 1;

  let startIndex = 0;

  // Match CSS breakpoints
  const mqTablet = window.matchMedia('(min-width: 769px)');
  const mqMobile = window.matchMedia('(max-width: 768px)');

  function getVisibleCount() {
    if (mqMobile.matches) return VISIBLE_MOBILE;
    if (mqTablet.matches) return VISIBLE_TABLET;
    return VISIBLE_DESKTOP;
  }

  function render() {
    const visible = getVisibleCount();

    // Show only [startIndex, startIndex + visible)
    members.forEach((el, idx) => {
      const inRange = idx >= startIndex && idx < startIndex + visible;
      el.style.display = inRange ? '' : 'none';
    });

    // Disable arrows at bounds (no wrap)
    btnPrev.disabled = (startIndex === 0);
    btnNext.disabled = (startIndex >= total - visible);
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

  // Events
  btnPrev.addEventListener('click', goPrev);
  btnNext.addEventListener('click', goNext);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  // Respond to breakpoint changes
  mqTablet.addEventListener?.('change', render);
  mqMobile.addEventListener?.('change', render);
  window.addEventListener('resize', render);

  // Initial paint
  render();
});
