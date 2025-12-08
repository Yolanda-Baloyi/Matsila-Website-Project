//get elements 
const openModal=document.querySelectorAll('.gallery-inner')
const allImages=document.querySelector('.gallery-image-container');
const modal = document.querySelector('.modal');
const newImg= document.querySelector('.new-images');

//click on text to open modal
openModal.forEach(modalText => {
    modalText.addEventListener('click', () => {
        modal.style.display = 'block';
        
    });
});
//click on close button to close modal
const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

