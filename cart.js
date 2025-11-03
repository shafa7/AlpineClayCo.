// Sample Products (In a real app, this would come from a database)
const availableCoupons = {
    'SUMMER25': 0.25, // 25% discount
    'CLAY10': 0.10,   // 10% discount
};

const cartElement = document.getElementById('cartItemsBody');
const cartSubtotalElement = document.getElementById('cartSubtotal');
const couponDiscountElement = document.getElementById('couponDiscount');
const cartTotalElement = document.getElementById('cartTotal');
const couponMessageElement = document.getElementById('couponMessage');
const couponInput = document.getElementById('couponInput');

let appliedDiscount = 0;

// --- Helper Functions ---

function formatPrice(price) {
    return `Rs. ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// --- Cart Core Logic ---

function updateCartTotal() {
    let subtotal = 0;
    const cartRows = cartElement.querySelectorAll('tr');

    cartRows.forEach(row => {
        const quantityInput = row.querySelector('.item-quantity');
        const priceElement = row.querySelector('.unit-price');
        const subtotalElement = row.querySelector('.item-subtotal');
        
        const price = parseFloat(priceElement.dataset.price);
        const quantity = parseInt(quantityInput.value);

        // Calculate item subtotal
        const itemSubtotal = price * quantity;
        subtotal += itemSubtotal;
        
        // Update item subtotal display
        subtotalElement.textContent = formatPrice(itemSubtotal);
    });

    // Apply discount logic
    const finalDiscountAmount = subtotal * appliedDiscount;
    const finalTotal = subtotal - finalDiscountAmount;

    // Update Totals Display
    cartSubtotalElement.textContent = formatPrice(subtotal);
    couponDiscountElement.textContent = `Rs. -${formatPrice(finalDiscountAmount)}`;
    cartTotalElement.textContent = formatPrice(finalTotal);
}

// --- Coupon Logic ---

function applyCoupon() {
    const couponCode = couponInput.value.trim().toUpperCase();
    
    if (availableCoupons[couponCode]) {
        appliedDiscount = availableCoupons[couponCode];
        couponMessageElement.textContent = `Coupon '${couponCode}' applied! You saved ${Math.round(appliedDiscount * 100)}%.`;
        couponMessageElement.style.color = 'green';
    } else {
        appliedDiscount = 0;
        couponMessageElement.textContent = `Invalid coupon code.`;
        couponMessageElement.style.color = 'red';
    }
    updateCartTotal();
}

// --- Event Listeners (Add/Remove) ---

// Add a single listener to the parent table body for efficiency
cartElement.addEventListener('click', (e) => {
    // 1. Remove Item Logic
    if (e.target.closest('.remove-item')) {
        e.preventDefault();
        const row = e.target.closest('tr');
        if (row) {
            row.remove();
            updateCartTotal();
        }
    }
});

// Run calculation on page load
window.onload = updateCartTotal;