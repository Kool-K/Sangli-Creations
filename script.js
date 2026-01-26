// --- DATA ---
const products = [
    { id: 1, name: "Antique Brass Vase", category: "Brass", tag: "Best Seller", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 2, name: "Hand-Block Print Bedsheet", category: "Textile", tag: "New Arrival", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 3, name: "Ganesha Idol (Small)", category: "Brass", tag: "Trending", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 4, name: "Decorative Rangoli Tiles", category: "Rangoli", tag: "5% Off", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 5, name: "Vintage Wall Hanging", category: "Decor", tag: "Unique", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 6, name: "Brass Diya Set", category: "Gifts", tag: "Buy 1 Get 1", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 7, name: "Cotton Cushion Covers", category: "Textile", tag: null, image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 8, name: "Peacock Door Handle", category: "Decor", tag: "Premium", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 9, name: "Laxmi Charan Paduka", category: "Brass", tag: null, image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 10, name: "Jaipuri Razai (Quilt)", category: "Textile", tag: "Winter Special", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 11, name: "Toran Door Hanging", category: "Decor", tag: null, image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 12, name: "Brass Pooja Thali", category: "Brass", tag: "Essentials", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 13, name: "Wooden Spice Box", category: "Decor", tag: null, image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 14, name: "German Silver Bowl", category: "Gifts", tag: "Gifting", image1: "assets/image1.png", image2: "assets/image2.png" },
    { id: 15, name: "Acrylic Rangoli Set", category: "Rangoli", tag: null, image1: "assets/image1.png", image2: "assets/image2.png" }
];

// --- APP STATE ---
let wishlist = JSON.parse(localStorage.getItem('sangliWishlist')) || [];
let currentCategory = 'all';

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateWishlistUI();
});

// --- RENDER FUNCTION ---
function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    const countLabel = document.getElementById('result-count');
    
    grid.innerHTML = '';
    countLabel.innerText = `Showing ${items.length} items`;

    if (items.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No items found in this category.</p>';
        return;
    }

    items.forEach(product => {
        const isWishlisted = wishlist.includes(product.id) ? 'active' : '';
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                ${product.tag ? `<span class="ribbon">${product.tag}</span>` : ''}
                <img src="${product.image1}" alt="${product.name}" class="img-primary">
                <img src="${product.image2}" alt="${product.name} View 2" class="img-secondary">
            </div>
            <div class="card-details">
                <span class="card-cat">${product.category}</span>
                <h3 class="card-title">${product.name}</h3>
                <div class="card-actions">
                    <button class="btn-enquire" onclick="enquireProduct('${product.name}')">
                        <i class="fa-brands fa-whatsapp"></i> Enquire
                    </button>
                    <button class="btn-wishlist ${isWishlisted}" onclick="toggleWishlistItem(${product.id}, this)">
                        <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- FILTER & VIEW SWITCHING LOGIC ---

function filterCategory(cat) {
    currentCategory = cat;
    
    // 1. SHOW Product Views
    document.querySelector('.controls-section').classList.remove('hidden');
    document.getElementById('product-grid').classList.remove('hidden');
    
    // 2. HIDE About View
    document.getElementById('about-section').style.display = 'none';

    // 3. Update Title & Data
    document.getElementById('page-title').innerText = cat === 'all' ? "All Products" : `${cat} Collection`;
    document.getElementById('searchInput').value = ''; 
    
    let filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
    sortProducts(filtered);
    
    // 4. Update Navigation Highlight
    updateNavHighlight(cat);

    // 5. Close Mobile Menu & Scroll
    toggleMenu(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAboutPage() {
    // 1. HIDE Product Views
    document.querySelector('.controls-section').classList.add('hidden');
    document.getElementById('product-grid').classList.add('hidden');

    // 2. SHOW About View
    document.getElementById('about-section').style.display = 'block';

    // 3. Update Navigation Highlight
    updateNavHighlight('About');

    // 4. Close Mobile Menu & Scroll
    toggleMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavHighlight(identifier) {
    // Remove active from all
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    // Add active to matching link using data-nav attribute
    const activeLink = document.querySelector(`.nav-link[data-nav="${identifier}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    // Ensure we are in product view if searching
    if(document.getElementById('product-grid').classList.contains('hidden')) {
        filterCategory('all');
    }

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

function sortProducts(itemsToList = null) {
    const sortValue = document.getElementById('sortSelect').value;
    let list = itemsToList || (currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory));
    
    let sortedList = [...list];

    if (sortValue === 'az') {
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'za') {
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
    }
    renderProducts(sortedList);
}

// --- WISHLIST LOGIC ---
function toggleWishlistItem(id, btnElement) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(itemId => itemId !== id);
        btnElement.classList.remove('active');
        btnElement.innerHTML = '<i class="fa-regular fa-heart"></i>';
    } else {
        wishlist.push(id);
        btnElement.classList.add('active');
        btnElement.innerHTML = '<i class="fa-solid fa-heart"></i>';
    }
    localStorage.setItem('sangliWishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    const countBadge = document.getElementById('wishlist-count');
    const wishlistContainer = document.getElementById('wishlist-items');
    countBadge.innerText = wishlist.length;

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p class="empty-msg">Your wishlist is empty.</p>';
    } else {
        wishlistContainer.innerHTML = wishlist.map(id => {
            const item = products.find(p => p.id === id);
            return `
                <div class="wishlist-item">
                    <img src="${item.image1}" alt="${item.name}">
                    <div class="wishlist-item-info">
                        <h4>${item.name}</h4>
                        <span class="remove-btn" onclick="toggleWishlistItem(${item.id}, this)">Remove</span>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function toggleWishlist() {
    document.getElementById('wishlist-sidebar').classList.toggle('open');
}

// --- WHATSAPP ---
const PHONE_NUMBER = "61469029362"; 

function enquireProduct(name) {
    const text = `Hello Sangli Creations, I am interested in knowing more about: ${name}`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

function enquireWishlist() {
    if (wishlist.length === 0) return alert("Wishlist is empty!");
    const items = wishlist.map(id => {
        const p = products.find(prod => prod.id === id);
        return `- ${p.name}`;
    }).join('\n');
    const text = `Hello! I would like to enquire about the following items in my wishlist:\n${items}`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

function toggleMenu(forceState = null) {
    const nav = document.getElementById('main-nav');
    const overlay = document.querySelector('.overlay');
    
    if (forceState === false) {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}