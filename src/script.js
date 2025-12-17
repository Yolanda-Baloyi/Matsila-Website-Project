// Get elements
const galleryItems = document.querySelectorAll('.gallery-inner');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
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

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

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

