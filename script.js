// === MOBILE MENU TOGGLE (Your original logic) ===
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// === CART CORE FUNCTIONS ===

// Retrieve cart from local storage or return an empty array
function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to local storage
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    // Optional: Add a function call here to update the small cart icon count
}

/**
 * Adds a product to the cart or increments quantity if it already exists.
 * This is the function called from the 'Add to Cart' buttons on all shop/index pages.
 * @param {object} product - Must contain {id, name, price, image}
 */
window.addToCart = function(product) {
    let cartItems = getCart();
    
    // Check if item already exists
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        // If it exists, increment the quantity
        existingItem.quantity += 1;
    } else {
        // If it's new, add it with a starting quantity of 1
        cartItems.push({ ...product, quantity: 1 });
    }

    saveCart(cartItems);

    // Show the confirmation popup (as requested)
    alert(`✅ Added to cart! ${product.name}`);
};

// === CART PAGE SPECIFIC FUNCTIONS (Used by cart.html) ===

window.updateQuantity = function(itemId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1 || isNaN(newQuantity)) {
        alert("Quantity must be at least 1.");
        // Re-render to revert invalid input if needed
        document.getElementById('cart-items').dispatchEvent(new Event('cartUpdate'));
        return;
    }
    
    let cartItems = getCart();
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity = newQuantity;
        saveCart(cartItems);
        document.getElementById('cart-items').dispatchEvent(new Event('cartUpdate'));
    }
}

window.removeItem = function(itemId) {
    if (confirm("Are you sure you want to remove this item?")) {
        let cartItems = getCart();
        cartItems = cartItems.filter(item => item.id !== itemId);
        saveCart(cartItems);
        document.getElementById('cart-items').dispatchEvent(new Event('cartUpdate'));
    }
}