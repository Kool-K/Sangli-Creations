// --- DATA ---
const products = [
    { id: 1, name: "Pure Brass Ganpati Murti", categories: ["Brass", "Decor", "Gifts"], tag: "Best Seller", image: "assets/Pure_Brass_Ganpati_Murti.jpeg" },
    { id: 2, name: "Pure Brass Lamp", categories: ["Brass", "Decor", "Gifts"], tag: "New Arrival", image: "assets/Pure_Brass_Lamp.jpeg" },
    { id: 3, name: "ACP Designer Rangoli - Style 1", categories: ["Rangoli", "Gifts"], tag: "Trending", image: "assets/ACP_Rangoli_01.jpeg" },
    { id: 4, name: "ACP Designer Rangoli - Style 2", categories: ["Rangoli", "Gifts"], tag: null, image: "assets/ACP_Rangoli_02.jpeg" },
    { id: 5, name: "ACP Designer Rangoli - Style 3", categories: ["Rangoli", "Gifts"], tag: null, image: "assets/ACP_Rangoli_03.jpeg" },
    { id: 6, name: "ACP Designer Rangoli - Style 4", categories: ["Rangoli", "Gifts"], tag: null, image: "assets/ACP_Rangoli_04.jpeg" },
    { id: 7, name: "Fabric Peacock Pair Decor", categories: ["Textile", "Decor", "Gifts"], tag: "Unique", image: "assets/Fabric_Peacock_Pair.jpeg" },
    { id: 8, name: "Fabric Leaves - Mango and Betel", categories: ["Textile", "Decor", "Gifts"], tag: null, image: "assets/Fabric_Leaves_Mango_Betel.jpeg" },
    { id: 9, name: "Ready-made Fabric Rangoli", categories: ["Textile", "Rangoli", "Gifts"], tag: "New", image: "assets/Fabric_Readymade_Rangoli.jpeg" },
    { id: 10, name: "Designer Hanging Lantern - Red", categories: ["Decor", "Gifts"], tag: null, image: "assets/Lantern_01.jpeg" },
    { id: 11, name: "Designer Hanging Lantern - Gold", categories: ["Decor", "Gifts"], tag: null, image: "assets/Lantern_02.jpeg" },
    { id: 12, name: "Rangoli Wall Art", categories: ["Rangoli", "Decor"], tag: "Premium", image: "assets/Rangoli_Wall_Art.jpeg" }
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
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No items found.</p>';
        return;
    }

    items.forEach(product => {
        const isWishlisted = wishlist.includes(product.id) ? 'active' : '';
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-img-wrapper" onclick="openImageModal('${product.image}')" style="cursor: pointer;" title="Click to view image">
                ${product.tag ? `<span class="ribbon">${product.tag}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="img-zoom">
            </div>
            <div class="card-details">
                <span class="card-cat">${product.categories[0]}</span>
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
    document.querySelector('.controls-section').classList.remove('hidden');
    document.getElementById('product-grid').classList.remove('hidden');
    document.getElementById('about-section').style.display = 'none';

    document.getElementById('page-title').innerText = cat === 'all' ? "All Products" : `${cat} Collection`;
    document.getElementById('searchInput').value = ''; 
    
    let filtered = cat === 'all' ? products : products.filter(p => p.categories.includes(cat));
    sortProducts(filtered);
    
    updateNavHighlight(cat);
    toggleMenu(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if(document.getElementById('product-grid').classList.contains('hidden')) {
        filterCategory('all');
    }

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.categories.some(c => c.toLowerCase().includes(query))
    );
    renderProducts(filtered);
}

function sortProducts(itemsToList = null) {
    const sortValue = document.getElementById('sortSelect').value;
    let list = itemsToList || (currentCategory === 'all' ? products : products.filter(p => p.categories.includes(currentCategory)));
    
    let sortedList = [...list];
    if (sortValue === 'az') sortedList.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortValue === 'za') sortedList.sort((a, b) => b.name.localeCompare(a.name));
    
    renderProducts(sortedList);
}

function showAboutPage() {
    document.querySelector('.controls-section').classList.add('hidden');
    document.getElementById('product-grid').classList.add('hidden');
    document.getElementById('about-section').style.display = 'block';
    updateNavHighlight('About');
    toggleMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavHighlight(identifier) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-nav="${identifier}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// --- WISHLIST LOGIC ---
function toggleWishlistItem(id, btnElement) {
    const isAdding = !wishlist.includes(id);

    if (isAdding) {
        wishlist.push(id);
    } else {
        wishlist = wishlist.filter(itemId => itemId !== id);
    }

    // Only update the icon if the button clicked is a heart button (not the "Remove" text in sidebar)
    if (btnElement && btnElement.classList.contains('btn-wishlist')) {
        if (isAdding) {
            btnElement.classList.add('active');
            btnElement.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
            btnElement.classList.remove('active');
            btnElement.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
    }

    localStorage.setItem('sangliWishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    
    // If we're on the main grid, re-render to ensure hearts stay in sync
    if(!document.getElementById('product-grid').classList.contains('hidden')) {
        const currentItems = currentCategory === 'all' ? products : products.filter(p => p.categories.includes(currentCategory));
        renderProducts(currentItems);
    }
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
            // FIX: Changed item.image1 to item.image
            return `
                <div class="wishlist-item">
                    <img src="${item.image}" alt="${item.name}">
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

// --- IMAGE MODAL LOGIC ---
function openImageModal(imgSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.classList.add('show');
    }
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('show');
        // Clear src to prevent flashing old image next time
        setTimeout(() => {
            const modalImg = document.getElementById('modal-image');
            if (modalImg) modalImg.src = '';
        }, 300);
    }
}