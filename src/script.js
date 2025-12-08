//get elements 
const openModal = document.querySelectorAll('.gallery-inner')
const imageContainer = document.querySelector('.gallery-image-container');
const modal = document.querySelector('.modal');
const newImg = document.querySelector('.new-images');

//click on text to open modal
openModal.forEach(modalImage => {
    modalImage.addEventListener('click', () => {
        modal.style.display = 'block';


        modalImages();
    });
});


//modal images
function modalImages() {
   
    imageContainer.classList.add('active');
    const images = document.querySelectorAll('.active img');
    console.log(imageContainer)
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
