carousel = document.querySelector('.carousel');
document.querySelector('.pagination .fa-arrow-right').addEventListener('click',()=>{
    items = document.querySelectorAll('.item')
    carousel.appendChild(items[0]);
})
document.querySelector('.pagination .fa-arrow-left').addEventListener('click',()=>{
    items = document.querySelectorAll('.item')
    carousel.prepend(items[4]);
})

setInterval(()=>{
    items = document.querySelectorAll('.item')
    carousel.appendChild(items[0]);
},4000);
