// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 49.99,
        rating: 4.5,
        image: "/api/placeholder/300/300"
    },
    {
        id: 2,
        title: "Smartphone With 6.5\" Display and Quad Camera",
        price: 399.99,
        rating: 4.2,
        image: "/api/placeholder/300/300"
    },
    {
        id: 3,
        title: "Laptop 15.6\" FHD Display, 16GB RAM, 512GB SSD",
        price: 849.99,
        rating: 4.8,
        image: "/api/placeholder/300/300"
    },
    {
        id: 4,
        title: "Smart Watch with Heart Rate Monitor",
        price: 79.99,
        rating: 4.0,
        image: "/api/placeholder/300/300"
    },
    {
        id: 5,
        title: "Wireless Charging Pad Compatible with iPhone and Android",
        price: 24.99,
        rating: 4.3,
        image: "/api/placeholder/300/300"
    },
    {
        id: 6,
        title: "Portable Bluetooth Speaker Waterproof",
        price: 39.99,
        rating: 4.7,
        image: "/api/placeholder/300/300"
    },
    {
        id: 7,
        title: "4K Ultra HD Smart TV 55 Inch",
        price: 499.99,
        rating: 4.6,
        image: "/api/placeholder/300/300"
    },
    {
        id: 8,
        title: "Digital Camera 20MP with 18-55mm Lens",
        price: 349.99,
        rating: 4.4,
        image: "/api/placeholder/300/300"
    }
];

// Shopping cart
let cart = [];

// DOM Elements
const productsContainer = document.querySelector('.products-container');
const cartCountElement = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchCategory = document.getElementById('search-category');

// Load products
function loadProducts(productsToLoad) {
    productsContainer.innerHTML = '';
    
    productsToLoad.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Create a product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    
    // Generate stars based on rating
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">${starsHTML} (${product.rating})</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    
    return card;
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showAddedToCartMessage(product.title);
    }
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Show "Added to Cart" message
function showAddedToCartMessage(productTitle) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('cart-message');
    messageContainer.innerHTML = `
        <div class="cart-message-content">
            <i class="fas fa-check-circle"></i>
            <span>${productTitle} has been added to your cart</span>
        </div>
    `;
    
    document.body.appendChild(messageContainer);
    
    // Apply styles
    Object.assign(messageContainer.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#fff',
        padding: '10px 15px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        display: 'flex',
        alignItems: 'center'
    });
    
    Object.assign(messageContainer.querySelector('.cart-message-content').style, {
        display: 'flex',
        alignItems: 'center'
    });
    
    Object.assign(messageContainer.querySelector('.fa-check-circle').style, {
        color: 'green',
        marginRight: '10px',
        fontSize: '1.2rem'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageContainer.style.opacity = '0';
        messageContainer.style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            document.body.removeChild(messageContainer);
        }, 500);
    }, 3000);
}

// Search products
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = searchCategory.value;
    
    let filteredProducts = products;
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
    }
    
    loadProducts(filteredProducts);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(products);
    
    // Add to cart buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Search functionality
    searchButton.addEventListener('click', searchProducts);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
});
