
let currentSlidee = 0;
const slideItems = document.querySelectorAll('.our-product-all .our-product-items');
const allslide = document.querySelector('.our-product-all');
const slideln = slideItems.length;
const slideWidth = slideItems[0].clientWidth;

const number = document.querySelectorAll('.dot-btn');
const nextshop = document.querySelector('.next')

function shopSlide(index) {
    if(index >= slideln) {
        currentSlidee = 0;
    }else if(index < 0){
        currentSlidee = slideln - 1 ;
    }else{
        currentSlidee = index;
    }

    allslide.style.transform = `translateX(-${currentSlidee * 105}%)`;
    updatenumber();

};

function updatenumber() {
    number.forEach(number => number.classList.remove('active'));
    number[currentSlidee].classList.add('active');
};

shopSlide(currentSlidee);

nextshop.addEventListener('click', () => {
    shopSlide(currentSlidee + 1);
});

number.forEach(number => {
    number.addEventListener('click', (e) => {
        const numberIndex = parseInt(e.target.getAttribute('data-slide'));
        shopSlide(numberIndex);
    });
});