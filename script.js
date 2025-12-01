// Product Data
const products = [
    // Aromatic Plants
    {
        id: 1,
        name: "Lavender",
        description: "Fragrant purple flowers perfect for relaxation and aromatherapy. Known for its calming properties.",
        price: 12.99,
        image: "🌿",
        category: "aromatic"
    },
    {
        id: 2,
        name: "Rosemary",
        description: "Aromatic evergreen herb with needle-like leaves. Great for cooking and garden borders.",
        price: 9.99,
        image: "🌱",
        category: "aromatic"
    },
    {
        id: 3,
        name: "Basil",
        description: "Sweet, fragrant herb essential for Italian cuisine. Easy to grow and highly aromatic.",
        price: 8.99,
        image: "🌿",
        category: "aromatic"
    },
    {
        id: 4,
        name: "Mint",
        description: "Refreshing and cooling herb perfect for teas and culinary uses. Fast-growing and hardy.",
        price: 7.99,
        image: "🌱",
        category: "aromatic"
    },
    {
        id: 5,
        name: "Jasmine",
        description: "Beautiful white flowers with intoxicating sweet fragrance. Perfect for gardens and patios.",
        price: 15.99,
        image: "🌸",
        category: "aromatic"
    },
    {
        id: 6,
        name: "Sage",
        description: "Aromatic herb with soft, fuzzy leaves. Used in cooking and traditional smudging rituals.",
        price: 10.99,
        image: "🌿",
        category: "aromatic"
    },
    // Medicinal Plants
    {
        id: 7,
        name: "Aloe Vera",
        description: "Healing succulent known for soothing burns and skin conditions. Low maintenance plant.",
        price: 11.99,
        image: "🌵",
        category: "medicinal"
    },
    {
        id: 8,
        name: "Echinacea",
        description: "Immune-boosting flower with beautiful purple petals. Supports natural wellness.",
        price: 13.99,
        image: "🌺",
        category: "medicinal"
    },
    {
        id: 9,
        name: "Chamomile",
        description: "Gentle calming herb with daisy-like flowers. Perfect for soothing teas and relaxation.",
        price: 9.99,
        image: "🌼",
        category: "medicinal"
    },
    {
        id: 10,
        name: "Ginseng",
        description: "Powerful adaptogenic root known for energy and vitality support. Premium medicinal plant.",
        price: 24.99,
        image: "🌿",
        category: "medicinal"
    },
    {
        id: 11,
        name: "Turmeric",
        description: "Golden spice plant with powerful anti-inflammatory properties. Grows beautiful green leaves.",
        price: 14.99,
        image: "🌱",
        category: "medicinal"
    },
    {
        id: 12,
        name: "Ginger",
        description: "Aromatic rhizome plant great for digestion and immune support. Easy to grow indoors.",
        price: 12.99,
        image: "🌿",
        category: "medicinal"
    }
];

// Cart Functions
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        if (totalItems === 0) {
            element.style.display = 'none';
        } else {
            element.style.display = 'inline-block';
        }
    });
}

function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added! ✓';
    btn.style.backgroundColor = '#4a7c24';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
    }, 1000);
}

function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
}

function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
            if (window.location.pathname.includes('cart.html')) {
                loadCart();
            }
        }
    }
}

// Load Products on Products Page
function loadProducts() {
    const aromaticContainer = document.getElementById('aromatic-plants');
    const medicinalContainer = document.getElementById('medicinal-plants');
    
    if (!aromaticContainer || !medicinalContainer) return;
    
    aromaticContainer.innerHTML = '';
    medicinalContainer.innerHTML = '';
    
    const aromaticPlants = products.filter(p => p.category === 'aromatic');
    const medicinalPlants = products.filter(p => p.category === 'medicinal');
    
    aromaticPlants.forEach(product => {
        aromaticContainer.appendChild(createProductCard(product));
    });
    
    medicinalPlants.forEach(product => {
        medicinalContainer.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
        <div class="plant-image">${product.image}</div>
        <div class="plant-info">
            <h3 class="plant-name">${product.name}</h3>
            <p class="plant-description">${product.description}</p>
            <div class="plant-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Load Cart on Cart Page
function loadCart() {
    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        if (emptyCart) {
            emptyCart.style.display = 'block';
        }
        if (cartSummary) {
            cartSummary.style.display = 'none';
        }
        // Clear any existing cart items
        const existingItems = document.getElementById('cart-items');
        if (existingItems) {
            existingItems.remove();
        }
        return;
    }
    
    if (emptyCart) {
        emptyCart.style.display = 'none';
    }
    if (cartSummary) {
        cartSummary.style.display = 'block';
    }
    
    // Remove existing cart items if any
    const existingItems = document.getElementById('cart-items');
    if (existingItems) {
        existingItems.remove();
    }
    
    const cartItems = document.createElement('div');
    cartItems.className = 'cart-items';
    cartItems.id = 'cart-items';
    
    cart.forEach(item => {
        cartItems.appendChild(createCartItemCard(item));
    });
    
    cartContainer.insertBefore(cartItems, emptyCart);
    
    updateCartSummary();
}

function createCartItemCard(item) {
    const card = document.createElement('div');
    card.className = 'cart-item-card';
    card.innerHTML = `
        <div class="cart-item-image">${item.image}</div>
        <div class="cart-item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">Unit Price: $${item.price.toFixed(2)}</p>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="delete-btn" onclick="removeFromCart(${item.id})">Delete</button>
            </div>
        </div>
        <div class="cart-item-total">
            $${(item.price * item.quantity).toFixed(2)}
        </div>
    `;
    return card;
}

function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your order! Your plants will be delivered soon. 🌿');
    saveCart([]);
    loadCart();
    updateCartCount();
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

