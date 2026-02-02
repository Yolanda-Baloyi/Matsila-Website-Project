// Gallery and Modal Functionality
// Get elements
const galleryItems = document.querySelectorAll('.gallery-inner');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const newImgContainer = document.querySelector('.new-images');
// Variables to track current state
let currentGalleryIndex = 0;
let currentImageIndex = 0;
let allImages = [];

// Open modal when clicking on any gallery item
galleryItems.forEach((galleryItem, index) => {
  galleryItem.addEventListener('click', () => {
    currentGalleryIndex = index;
    loadModalImages();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
});

// Load images from clicked gallery into modal
function loadModalImages() {
  // Clear previous images
  newImgContainer.innerHTML = '';
  allImages = [];

  // Get all images from the clicked gallery
  const galleryImages = galleryItems[currentGalleryIndex].querySelectorAll('img');

  // Create and add images to modal
  galleryImages.forEach((img, index) => {
    const imgSrc = img.getAttribute('src');
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imgSrc);
    newImage.style.display = index === 0 ? 'block' : 'none';
    newImgContainer.appendChild(newImage);
    allImages.push(newImage);
  });

  // Reset to first image
  currentImageIndex = 0;
  updateNavButtons();
}

// Navigation functions
function showNextImage() {
  if (allImages.length === 0) return;

  allImages[currentImageIndex].style.display = 'none';
  currentImageIndex = (currentImageIndex + 1) % allImages.length;
  allImages[currentImageIndex].style.display = 'block';
  updateNavButtons();
}

function showPrevImage() {
  if (allImages.length === 0) return;

  allImages[currentImageIndex].style.display = 'none';
  currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
  allImages[currentImageIndex].style.display = 'block';
  updateNavButtons();
}

// Update navigation button states
function updateNavButtons() {
  // For single image galleries, hide navigation
  if (allImages.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  }
}

// Close modal
function closeModalFunc() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
  newImgContainer.innerHTML = ''; // Clear images
  allImages = [];
}

// Event listeners for navigation
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);
closeModal.addEventListener('click', closeModalFunc);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'Escape') {
      closeModalFunc();
    }
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next image
      showNextImage();
    } else {
      // Swipe right - previous image
      showPrevImage();
    }
  }
}
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
 
 // donate Button 

let donateBTN=document.querySelectorAll('.donate');
let donateModal= document.querySelector('.donate-modal');

donateBTN.forEach(button =>{
button.addEventListener('click', function (){
  donateModal= document.querySelector('.donate-modal');

  donateModal.style.display = "block";
  } )

})


let closeDonateModal =document.querySelector('.close-donate');

closeDonateModal.addEventListener('click', function(){

  let donateModal= document.querySelector('.donate-modal');

  donateModal.style.display = "none";
})

 /* About Us Read More */
 

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
 
  //email and form 
  document.getElementById('response').addEventListener('submit', function(e) {
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Set the email subject
        const subject = `Message from ${name} via Website Contact Form`;
        
        // Construct the mailto URL with subject and body
        const mailtoURL = `mailto:info@matsilaydf.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + "\nEmail: " + email)}`;
        
        // Update the form action
        this.action = mailtoURL;
        
        // The form will open in a new tab due to target="_blank"
        // The current page will remain open
        
        // Optional: Add a slight delay to ensure form submission happens
        setTimeout(() => {
            // Reset the form after submission
            this.reset();
            
            // Optional: Show confirmation message
            alert('Your email client is opening. Please send the email from there.');
        }, 100);
    });