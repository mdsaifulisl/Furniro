
const nav = document.querySelector('.nav');
const risponsive = document.querySelector('.risponsive');

risponsive.onclick = () =>{
    nav.classList.toggle('active');
    
};

const delate = document.querySelector('.delate');
delate.onclick = () =>{
    nav.classList.remove('active');

}

window.onscroll = () =>{
    nav.classList.remove('active');
    
} 
// Active Link Highlight Based on URL
const currentLocation = window.location.href;
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    if (link.href === currentLocation) {
        link.classList.add('actives');
    }
});
// header cart
const carts = document.querySelector('.carts');
const cartss = document.querySelector('.cart');
const cln = document.querySelector('.cart-cl');

if(carts !== null){
    carts.onclick = () =>{
        cartss.classList.toggle('active');
    }
}

cln.onclick = () =>{
    cartss.classList.remove('active');
}




// cart start

// Initialize the cart and total price from localStorage or default values
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Ensure cart is initialized as an array
const cartItem = document.querySelector('.cart-items');
const chackOut = document.querySelector('.chackout-items');
const cartcnt = document.querySelector('.ct-contant');
let totalPrice = localStorage.getItem('totalPrice') ? parseFloat(localStorage.getItem('totalPrice')) : 0; // Parse total price from localStorage

if (isNaN(totalPrice)) {
    totalPrice = 0; // If totalPrice is NaN, reset to 0
}

// Render cart if cartItem exists on page load
if (cartItem) {
    renderCart(); // Call renderCart to display items if they exist
}
if (chackOut) {
    renderCart(); // Call renderCart to display items if they exist
}

document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const img = product.querySelector('img').src;
        const ptitle = product.querySelector('.product-title h5').innerText;
        const pamound = product.querySelector('.product-title .price').innerText.replace(/[^\d.-]/g, ''); // Extract numeric value
        const amound = parseFloat(pamound); // Ensure it's a number
        
        if (isNaN(amound)) {
            console.error('Invalid price format');
            return;
        }
        
        allProductItem(img, ptitle, amound);
    });
});

function allProductItem(img, ptitle, amound) {
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.ptitle === ptitle);

    if (existingItemIndex > -1) {
        // If the item exists, increment the quantity and update the total price
        const existingItem = cart[existingItemIndex];
        existingItem.quantity += 1; // Increment quantity
        existingItem.totalPrice = existingItem.quantity * existingItem.amound; // Update total price for the item
        totalPrice += existingItem.amound; // Update total price of the cart
    } else {
        // If the item doesn't exist, add a new item to the cart
        cart.push({ img, ptitle, amound, quantity: 1, totalPrice: amound });
        totalPrice += amound;
    }

    // Store the updated cart and total price in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    
    renderCart(); // Re-render the cart when an item is added or updated
    updateTotalPrice(); // Update the total price in the UI
}

function renderCart() {
    cartItem.innerHTML = ''; // Clear the current cart items
    if(chackOut !== null){
        chackOut.innerHTML = '';
    }
    if(cartcnt !== null){
        cartcnt.innerHTML = '';
    }
    
    cart.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const amound = item.amound || 0;
        const totalPriceForItem = item.totalPrice || (amound * quantity);

        const cartIte3 = document.createElement('div');
        cartIte3.classList.add('items-cart');

        const img = document.createElement('img');
        img.src = item.img;
        cartIte3.appendChild(img);

        const cartText = document.createElement('div');
        cartText.classList.add('cart-text');

        const h5 = document.createElement('h5');
        h5.innerHTML = item.ptitle;
        cartText.appendChild(h5);

        const cartPrice = document.createElement('div');
        cartPrice.classList.add('cart-price');

        const input = document.createElement('input');
        input.type = "number";
        input.value = quantity; // Set the input value to the item's quantity
        input.min = 1; // Minimum quantity is 1
        cartPrice.appendChild(input);
        console.log(input.value)

        const p = document.createElement('p');
        p.innerHTML = 'Rs.';

        const span = document.createElement('span');
        span.innerHTML = totalPriceForItem.toFixed(2); // Display the total price for that item
        p.appendChild(span);
        cartPrice.appendChild(p);

        cartText.appendChild(cartPrice);
        cartIte3.appendChild(cartText);

        const i = document.createElement('i');
        i.classList.add('fa-solid', 'fa-xmark');
        cartIte3.appendChild(i);

        i.addEventListener('click', () => {
            cartIte3.remove();
            removeItemFromCart(index); // Update cart and localStorage when an item is removed
            cartLength();
            chack.remove();
            cartap.remove();
        });

        input.addEventListener('input', (e) => {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) {
                const priceDifference = (newQuantity - item.quantity) * item.amound;
                item.quantity = newQuantity;
                item.totalPrice = newQuantity * item.amound; // Update total price for that item

                totalPrice += priceDifference; // Adjust total price of the cart
                span.innerHTML = item.totalPrice.toFixed(2); // Update the display price

                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                localStorage.setItem('totalPrice', totalPrice.toFixed(2)); // Update total price

                updateTotalPrice(); // Update total price display

                // Update the checkout section with the new quantity
                chack.innerHTML = `<p class="mb-0">${item.ptitle} <span>${newQuantity}</span></p><p class="mb-0">Rs. ${item.totalPrice.toFixed(2)}</p>`;


                cartap.innerHTML = `
                            <img src="${item.img}" alt="">
                            <div class="c-contant-itm">
                                <p class="mb-0">L${item.ptitle}</p>
                                <p class="mb-0">${item.totalPrice.toFixed(2)}</p>
                                <p class="p mb-0">${newQuantity}</p>
                                <i class="fa-solid fa-trash delate-items"></i>
                            </div>`;
            }
           
        });

        
        const chack = document.createElement('div');
        chack.classList.add('chack');
        chack.innerHTML = `<p class="mb-0">${item.ptitle}<span>${input.value}</span></p><p class="mb-0">Rs. ${totalPriceForItem.toFixed(2)}</p>`;


        const cartap = document.createElement('div');
        cartap.classList.add('c-contant');
        cartap.innerHTML = `
                            <img src="${item.img}" alt="">
                            <div class="c-contant-itm">
                                <p class="mb-0">L${item.ptitle}</p>
                                <p class="mb-0">${totalPriceForItem.toFixed(2)}</p>
                                <p class="p mb-0">${input.value}</p>
                                <i class="fa-solid fa-trash delate-items"></i>
                            </div>`;

                            
        // Get the trash icon element inside cartap
        const trashIcon = cartap.querySelector('.delate-items');

        // Add event listener to the trash icon to handle deletion
        trashIcon.addEventListener('click', () => {
            cartIte3.remove();
            removeItemFromCart(index); 
            cartLength();
        });

        cartItem.appendChild(cartIte3);
        if(chackOut !== null){
            chackOut.appendChild(chack);
        }
        if(cartcnt !== null){
            cartcnt.appendChild(cartap);
        }
        cartLength();
    });
}

function removeItemFromCart(index) {
    totalPrice -= cart[index].totalPrice; // Subtract the item's total price from total cart price
    cart.splice(index, 1); // Remove item from the cart array

    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    localStorage.setItem('totalPrice', totalPrice.toFixed(2)); // Update total price in localStorage

    renderCart(); // Re-render the cart after removal
    updateTotalPrice(); // Update total price display
}

function updateTotalPrice() {
    const totalpriceDiv = document.querySelector('#total-pricea');
    const totle = document.querySelector('.totle');
    const totlecart = document.querySelector('.subtotle');
    const subtotle = document.querySelector('.subtotleall')

    if(totalpriceDiv !== null) {
        totalpriceDiv.innerHTML = `Total Price: Rs. ${totalPrice.toFixed(2)}`;
    }

    if(totle !== null){
        totle.innerHTML = `Rs. ${totalPrice.toFixed(2)}`;
        
    }else if(totlecart || subtotle  !== null){
        totlecart.innerHTML = `${totalPrice.toFixed(2)}`;
        subtotle.innerHTML = `${totalPrice.toFixed(2)}`;
        
    }
}

function cartLength(){
    const catln = document.querySelector('.cart-length');
    catln.innerHTML = cart.length;
}
// Initial update on page load
updateTotalPrice();
// cart end

