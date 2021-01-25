const iconOne = document.querySelector('.icon-one');
const iconTwo = document.querySelector('.icon-two');
const iconThree = document.querySelector('.icon-three');

iconOne.addEventListener('click',() => {
 iconOne.classList.toggle('active-one')
});

iconTwo.addEventListener('click',() => {
 iconTwo.classList.toggle('active-two')
});

iconThree.addEventListener('click',() => {
 iconThree.classList.toggle('active-three')
});