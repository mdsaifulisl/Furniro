const modals = document.getElementById("myModals");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".close");

// Open modal on click
document.querySelectorAll(".gallery-item img").forEach(image => {
    image.addEventListener("click", function() {
        modals.style.display = "flex";
        modalImage.src = this.src;
    });
});

// Close modal when close button is clicked
closeModal.addEventListener("click", function() {
    modals.style.display = "none";
});

// Close modal when clicking outside of the modal content
modals.addEventListener("click", function(e) {
    if (e.target !== modalImage) {
        modals.style.display = "none"; 
    }
});

// slide
let currentSlide = 0;
const slideImg = document.querySelectorAll('.room-img2 img');
const slider = document.querySelector('.room-img2');
const sliderln = slideImg.length;
const slideWidth = slideImg[0].clientWidth;

const dots = document.querySelectorAll('.dot');
const next = document.querySelector('.rigth'); // Corrected class name spelling here
const left = document.querySelector('.left');

// Function to slide images
function slidss(index) {
    if(index >= sliderln) {
        currentSlide = 0; // Go to the first slide if index exceeds the total number of slides
    } else if(index < 0) {
        currentSlide = sliderln - 1; // Go to the last slide if index is less than 0
    } else {
        currentSlide = index; // Update current slide
    }

    // Move the slider
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots(); // Update the active dot
}

// Function to update the active dot
function updateDots() {
    dots.forEach(dot => dot.classList.remove('active')); // Remove active class from all dots
    dots[currentSlide].classList.add('active'); // Add active class to the current dot
}

// Initialize the slider
slidss(currentSlide);

// Next button functionality
next.addEventListener('click', () => {
    slidss(currentSlide + 1); // Move to the next slide
});



// Previous button functionality
left.addEventListener('click', () => {
    slidss(currentSlide - 1); // Move to the previous slide
});



// Dot click functionality
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide')); // Get the index from the clicked dot
        slidss(slideIndex); // Slide to the corresponding image
    });
});
