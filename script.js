// script.js ─ Shared features + Smart Cart Logic

// 1. CONFIGURATION
const IMAGE_CONFIG = {
    basePath: 'images/products/',
    extension: 'jpeg'
};

const categories = {
    products: [
        { id: "training-lecture-chairs", group: "school", icon: "🎓", title: "Training / Lecture Chairs", desc: "Comfortable, durable seating" },
        { id: "single-desk-chair", group: "school", icon: "🪑", title: "Single Student Desk & Chair", desc: "Classic classroom setups" },
        { id: "double-desk-chair", group: "school", icon: "👥", title: "Double Student Desk & Chair", desc: "Space-efficient twin desks" },
        { id: "school-dining-tables", group: "school", icon: "🍽️", title: "School Dining Tables", desc: "Strong frames, easy-clean tops" },
        { id: "kindergarten-furniture", group: "school", icon: "🧸", title: "Kindergarten Furniture", desc: "Safe, colorful, kid-friendly" },
        { id: "library-furniture", group: "school", icon: "📚", title: "Library Furniture", desc: "Shelves, tables, reading seats" },
        { id: "lab-furniture", group: "lab", icon: "🧪", title: "Lab Furniture", desc: "Worktops, benches, storage units" },
        { id: "chemicals-reagents", group: "chem", icon: "⚗️", title: "Chemicals & Reagents", desc: "Supply, packaging, safety guidance" },
        { id: "lab-equipment", group: "lab", icon: "🧰", title: "Lab Equipment", desc: "Glassware, burners, safety gear" },
    ],
    services: [
        { id: "laboratory-installations", group: "services", icon: "🏗️", title: "Laboratory Installations", desc: "Full lab setup (benches, sinks, gas taps)" },
        { id: "safety-compliance", group: "services", icon: "🧯", title: "Safety & Compliance", desc: "Ventilation, storage, signage" },
        { id: "maintenance-repairs", group: "services", icon: "🛠️", title: "Maintenance & Repairs", desc: "Fixes, replacements, upgrades" },
        { id: "delivery-setup", group: "services", icon: "🚚", title: "Delivery & Setup", desc: "Nationwide delivery and on-site setup" },
    ]
};

const products = [
    // SCHOOL ITEMS 
    { featured: true, group: "school", categoryId: "training-lecture-chairs", tag: "SCHOOL", off: "-10%", name: "Lecture Chair (Writing Arm)", desc: "Comfortable seating for lecture rooms.", price: 3750, old: 4500, stock: true, image: "lecture-chairs-kenya" },
    { featured: true, group: "school", categoryId: "training-lecture-chairs", tag: "SCHOOL", off: "HOT", name: "Training Chair (Stackable)", desc: "Compact, easy to store for training halls.", price: 3200, old: 0, stock: true, image: "train-chairs" },
    { featured: true, group: "school", categoryId: "single-desk-chair", tag: "SCHOOL", off: "-7%", name: "Single Student Desk & Chair", desc: "Strong steel frame, classroom-ready.", price: 5800, old: 6500, stock: true, image: "single-desk-and-chair" },
    { featured: true, group: "school", categoryId: "double-desk-chair", tag: "SCHOOL", off: "-5%", name: "Double Student Desk & Chair", desc: "Space-saving twin desk for schools.", price: 6000, old: 6300, stock: true, image: "double-desks" },
    { featured: true, group: "school", categoryId: "school-dining-tables", tag: "SCHOOL", off: "-8%", name: "School Dining Table (3×8)", desc: "Easy-clean top, built for daily use.", price: 16500, old: 17500, stock: true, image: "dining" },
    { featured: true, group: "school", categoryId: "kindergarten-furniture", tag: "KIDS", off: "-20%", name: "Kindergarten Chair (Ages 3–10)", desc: "Safe edges, bright-friendly finish.", price: 2000, old: 2500, stock: true, image: "kid-chair" },
    { featured: true, group: "school", categoryId: "kindergarten-furniture", tag: "KIDS", off: "NEW", name: "Kindergarten Table (Round)", desc: "Rounded corners for safer learning spaces.", price: 0, old: 0, stock: true, image: "kid-round" },
    { featured: true, group: "school", categoryId: "library-furniture", tag: "LIBRARY", off: "-1%", name: "Library Study Table (2 Way)", desc: "Perfect for reading bays & study areas.", price: 7400, old: 7500, stock: true, image: "twoway-study" },

    // LAB ITEMS 
    { featured: true, group: "lab", categoryId: "lab-furniture", tag: "LAB", off: "-14%", name: "Lab Stool (Hardwood Top)", desc: "Stable base and durable seat for labs.", price: 3000, old: 3500, stock: true, image: "lab-chairs" },
    { featured: true, group: "lab", categoryId: "lab-furniture", tag: "LAB", off: "QUOTE", name: "Laboratory Bench Unit", desc: "Worktop + storage options for modern labs.", price: 0, old: 0, stock: true, image: "lab-sink-desk" },
    { featured: true, group: "lab", categoryId: "lab-furniture", tag: "LAB", off: "-6%", name: "Chemical Storage Cabinet", desc: "Safer storage for lab reagents and materials.", price: 0, old: 0, stock: true, image: "chem-storage" },
    { featured: true, group: "lab", categoryId: "lab-equipment", tag: "LAB", off: "HOT", name: "Lab Equipment Starter Kit", desc: "Glassware essentials for school labs.", price: 0, old: 0, stock: true, image: "labkit-starter" },


                    // Add these to your products array
                { group: "lab", categoryId: "lab-equipment", tag: "LAB", off: "QUOTE", name: "Laboratory Gas Tap - One Way", desc: "Single outlet gas tap, brass body, high-quality valve for lab benches.", price: 4500, old: 5200, stock: true, image: "Gas tap one way" },
                { group: "lab", categoryId: "lab-equipment", tag: "LAB", off: "-8%", name: "Laboratory Gas Tap - Four Way", desc: "Four-outlet gas tap for multi-position lab benches, durable and leak-proof.", price: 12500, old: 13600, stock: true, image: "gastap-four-way" },
                { group: "lab", categoryId: "lab-equipment", tag: "SAFETY", off: "QUOTE", name: "Fire Extinguisher - CO₂ 5kg", desc: "5kg carbon dioxide fire extinguisher suitable for labs (Class B & E fires), wall bracket included.", price: 9800, old: 11000, stock: true, image: "fire-extinguisher" },

    // CHEMICALS (Mixed: Some featured, new ones hidden)
    { featured: true, group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "NEW", name: "Standard Reagents Bundle", desc: "Common reagents with packaging guidance.", price: 0, old: 0, stock: true, image: "starter-lab"},
    { featured: true, group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "Bulk Chemical Supply", desc: "Send your list — we'll quote and advise.", price: 0, old: 0, stock: true, image: "dionised-water" },
    
    // NEW HIDDEN CHEMICALS (Only visible in category)
    { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "NEW", name: "Sodium Bi Carbonate", desc: "High grade Sodium Bi Carbonate.", price: 1800, old: 0, stock: true, image: "sodium-bycarbonate" },
    { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "NEW", name: "sodium carbonate decahydrate", desc: "Pure sodium-carbonate-decahydrate.", price: 2500, old: 2800, stock: true, image: "sodium-carbonate-decahydrate" },
    { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "sodium hydroxyide", desc: "Industrial strength Sodium Hydroxide.", price: 3500, old: 0, stock: true, image: "sodium-hydroxyide" },
    { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "pottasium-nitrate", desc: "Pure pottasium-nitrate.", price: 4000, old: 0, stock: true, image: "pottasium-nitrate" },
    { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "copper sulphate pentahydrate", desc: "Pure copper sulphate pentahydrate.", price: 3000, old: 2500, stock: true, image: "copper-sulphate-pentahydrate" },
    { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "glyceryne", desc: "Pure glyceryne.", price: 3500, old: 0, stock: true, image: "glyceryne" },  
    

    // SERVICES 
    { featured: true, group: "services", categoryId: "laboratory-installations", tag: "INSTALL", off: "QUOTE", name: "Lab Installation Package", desc: "Sinks, gas taps, piping & full setup.", price: 0, old: 0, stock: true, image: "lab-installations" },
    { featured: true, group: "services", categoryId: "safety-compliance", tag: "SERVICE", off: "QUOTE", name: "Safety & Compliance Audit", desc: "Ventilation, storage and signage guidance.", price: 0, old: 0, stock: true, image: "compliance" },
    { featured: true, group: "services", categoryId: "maintenance-repairs", tag: "SERVICE", off: "QUOTE", name: "Maintenance & Repairs", desc: "Fixes, replacements, upgrades (on-site).", price: 0, old: 0, stock: true, image: "maintenance" },
    { featured: true, group: "services", categoryId: "delivery-setup", tag: "SERVICE", off: "QUOTE", name: "Delivery & Setup", desc: "Nationwide delivery + on-site setup support.", price: 0, old: 0, stock: true, image: "delivery"}
];


// ──────────────────────────────────────────────
// 2. SMART CART SYSTEM
// ──────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('apexCart')) || [];

function initCartSystem() {
    // Inject Cart HTML if not present
    if (!document.getElementById('cartDrawer')) {
        const cartHTML = `
            <div class="cart-overlay" id="cartOverlay"></div>
            <div class="cart-drawer" id="cartDrawer">
                <div class="cart-header">
                    <h3>Your Quote List</h3>
                    <button class="close-cart" id="closeCart">✕</button>
                </div>
                <div class="cart-items" id="cartItems">
                    </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total Estimate:</span>
                        <span id="cartTotal">KSh 0</span>
                    </div>
                    <button class="btn-whatsapp" id="checkoutBtn">
                        WhatsApp Quote ➝
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    // Event Listeners
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);
    document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp);
    
    // Attach to existing header cart button
    const headerCartBtn = document.querySelector('.cart-btn');
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', toggleCart);
    }

    updateCartUI();
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('apexCart', JSON.stringify(cart));
    updateCartUI();
    toggleCart(true); // Open cart to show user
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('apexCart', JSON.stringify(cart));
    updateCartUI();
}

function toggleCart(forceOpen = null) {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    const isOpen = drawer.classList.contains('open');
    
    if (forceOpen === true || (forceOpen === null && !isOpen)) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function updateCartUI() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const countBadge = document.querySelector('.cart-count');
    
    // Update Badge
    if (countBadge) {
        countBadge.textContent = cart.length;
        countBadge.style.display = cart.length > 0 ? 'flex' : 'none';
    }

    // Calculate Total
    let total = 0;
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart-msg">Your list is empty.<br>Add items to request a quote.</div>`;
        totalEl.textContent = "KSh 0";
        return;
    }

    // Render Items
    container.innerHTML = cart.map((item, index) => {
        total += (item.price || 0);
        return `
            <div class="cart-item">
                <img src="${getImagePath(item.image)}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=='">
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">${item.price > 0 ? 'KSh ' + item.price.toLocaleString() : 'Price on request'}</span>
                    <button class="cart-remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    totalEl.textContent = total > 0 ? `KSh ${total.toLocaleString()}` : "Pending Quote";
}

function checkoutWhatsApp() {
    if (cart.length === 0) return;

    let message = "Hello APEX Supplies,\nI would like a quote for the following items:\n\n";
    let total = 0;

    cart.forEach((item, i) => {
        const priceStr = item.price > 0 ? `(KSh ${item.price.toLocaleString()})` : "(Quote needed)";
        message += `${i + 1}. ${item.name} ${priceStr}\n`;
        total += item.price || 0;
    });

    if (total > 0) {
        message += `\nEstimated Total: KSh ${total.toLocaleString()}`;
    }
    
    message += "\n\nPlease advise on availability and delivery.";

    const url = `https://wa.me/254757721045?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


// ──────────────────────────────────────────────
// 3. CORE DISPLAY FUNCTIONS
// ──────────────────────────────────────────────
function getImagePath(filename) {
    if (!filename) return null;
    return `${IMAGE_CONFIG.basePath}${filename}.${IMAGE_CONFIG.extension}`;
}

function formatCurrency(amount) {
    if (!amount || amount <= 0) return "Price on Request";
    return `<small>KSh</small> <strong>${Number(amount).toLocaleString()}</strong>`;
}

function renderProductCard(product) {
    const hasPrice = product.price > 0;
    const imgSrc = getImagePath(product.image);

    // Note: Replaced "Request quote" link logic with addToCart
    return `
        <article class="pcard">
            <div class="pimg">
                ${imgSrc ? `<img src="${imgSrc}" alt="" loading="lazy">` : ''}
                <div class="badge-row">
                    <span class="tag">${product.tag}</span>
                    <span class="tag off">${product.off}</span>
                </div>
            </div>
            <div class="pbody">
                <h3 class="ptitle">${product.name}</h3>
                <p class="pdesc">${product.desc}</p>
                <div class="price-row">
                    <div class="price">
                        ${formatCurrency(product.price)}
                        ${product.old ? `<span class="old">${formatCurrency(product.old)}</span>` : ''}
                    </div>
                    <span class="stock">${product.stock ? "In stock" : "Made to order"}</span>
                </div>
                <div class="pactions">
                    <button class="pbtn primary add-cart-trigger" 
                            data-name="${product.name}" 
                            data-price="${product.price}" 
                            data-image="${product.image}">
                        ${hasPrice ? "Add to Quote" : "Add to Quote"}
                    </button>
                    <button class="pbtn ghost quick-view-btn" title="Quick view">👁️</button>
                </div>
            </div>
        </article>
    `;
}

function renderCategoryCard(category) {
    return `
        <article class="ccard" tabindex="0">
            <div class="inner">
                <div class="cicon">${category.icon}</div>
                <h3>${category.title}</h3>
                <p>${category.desc}</p>
                <a class="clink" href="category.html?id=${category.id}">Explore →</a>
            </div>
        </article>
    `;
}


// ──────────────────────────────────────────────
// 4. PAGE LOGIC (Index vs Category)
// ──────────────────────────────────────────────

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initCartSystem(); // Load the cart on every page

    // Global listener for dynamic "Add to Quote" buttons
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-cart-trigger')) {
            const btn = e.target;
            addToCart({
                name: btn.dataset.name,
                price: Number(btn.dataset.price) || 0,
                image: btn.dataset.image
            });
        }
    });

    // ── INDEX PAGE LOGIC ──
    if (document.getElementById('categoryGrid')) {
        const categoryGrid = document.getElementById('categoryGrid');
        const pgrid = document.getElementById('pgrid');
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        // Render Categories
        const tabs = document.querySelectorAll('.tab');
        function renderCategories(group) {
            categoryGrid.innerHTML = categories[group]?.map(renderCategoryCard).join('') || '';
        }
        tabs.forEach(t => t.addEventListener('click', () => {
            tabs.forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            renderCategories(t.dataset.catTab);
        }));
        renderCategories('products'); // init

        // Render Featured
        const chips = document.querySelectorAll('.chip');
        function renderFeatured(filter, term = '') {
            const query = term.toLowerCase().trim();
            const filtered = products.filter(p => {
                if (!query && p.featured !== true) return false; // Show only featured unless searching
                if (filter !== 'all' && p.group !== filter) return false;
                if (query && !(p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))) return false;
                return true;
            });
            pgrid.innerHTML = filtered.map(renderProductCard).join('');
            attachQuickViewListeners();
        }

        chips.forEach(c => c.addEventListener('click', () => {
            chips.forEach(x => x.classList.remove('active'));
            c.classList.add('active');
            renderFeatured(c.dataset.filter, searchInput.value);
        }));

        // Search
        const doSearch = () => renderFeatured(document.querySelector('.chip.active')?.dataset.filter || 'all', searchInput.value);
        searchBtn?.addEventListener('click', doSearch);
        searchInput?.addEventListener('keyup', (e) => { if (e.key === 'Enter') doSearch(); });

        renderFeatured('all'); // init
    }

    // ── CATEGORY PAGE LOGIC ──
    if (document.getElementById('pgrid') && !document.getElementById('categoryGrid')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('id');
        
        // Find category info
        let catInfo = null;
        Object.values(categories).forEach(group => {
            const found = group.find(c => c.id === categoryId);
            if (found) catInfo = found;
        });

        if (catInfo) {
            document.getElementById('categoryTitle').textContent = catInfo.title;
            document.getElementById('categoryDesc').textContent = catInfo.desc;
            document.title = catInfo.title + " – APEX Supplies";
            
            const filtered = products.filter(p => p.categoryId === categoryId);
            document.getElementById('pgrid').innerHTML = filtered.length 
                ? filtered.map(renderProductCard).join('')
                : "<p style='grid-column:1/-1;text-align:center;padding:50px;'>No products found.</p>";
            
            attachQuickViewListeners();
        } else {
            document.getElementById('pgrid').innerHTML = "<p>Category not found.</p>";
        }
    }

    // ── FOOTER YEAR ──
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ──────────────────────────────────────────────
// 5. QUICK VIEW (Shared)
// ──────────────────────────────────────────────
function attachQuickViewListeners() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const img = btn.closest('.pcard')?.querySelector('img');
            const overlay = document.getElementById('quickviewOverlay');
            if (img && overlay) {
                document.getElementById('quickviewImage').src = img.src;
                overlay.classList.add('active');
            }
        });
    });
}

const qvOverlay = document.getElementById('quickviewOverlay');
if (qvOverlay) {
    qvOverlay.addEventListener('click', e => {
        if (e.target === qvOverlay || e.target.id === 'quickviewClose') qvOverlay.classList.remove('active');
    });
}
// 6. SEARCH PLACEHOLDER ANIMATION
function animateSearchPlaceholder() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const phrases = [
        "Search for 'Lecture Chairs'...",
        "Search for 'Sulfuric Acid'...",
        "Search for 'Lab Benches'...",
        "Search for 'Kindergarten'..."
    ];
    
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            input.placeholder = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 50;
        } else {
            input.placeholder = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Start the animation
animateSearchPlaceholder();

// 7. SITE VISIT BOOKING LOGIC
const visitForm = document.getElementById('siteVisitForm');
if (visitForm) {
    visitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('visitType').value;
        const loc = document.getElementById('visitLocation').value;
        const date = document.getElementById('visitDate').value;

        const message = `Hello APEX Supplies,\n\nI would like to request a *Site Visit* for:\n📍 Service: ${type}\n🏢 Location: ${loc}\n📅 Preferred Date: ${date}\n\nPlease confirm availability.`;
        
        window.open(`https://wa.me/254757721045?text=${encodeURIComponent(message)}`, '_blank');
    });
}

// 8. SCROLL REVEAL ANIMATION
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Run once on load
revealOnScroll();

document.addEventListener('DOMContentLoaded', () => {
    // Small timeout to ensure the browser is ready for the transition
    setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => el.classList.add('active'));
    }, 100);
});

// 9. LIVE ACTIVITY NOTIFICATIONS (Expanded Social Proof)
function initActivityNotifications() {
    const toast = document.createElement('div');
    toast.className = 'activity-toast';
    toast.innerHTML = `
        <div class="toast-icon" id="toastIcon">🛒</div>
        <div class="toast-content">
            <strong id="toastTitle">Recent Activity</strong>
            <span id="toastText">Someone just requested a quote.</span>
        </div>
    `;
    document.body.appendChild(toast);

    const activities = [
        // --- SCHOOL FURNITURE ---
        { icon: '🪑', title: 'New Order', text: '40 Single Student Desks dispatched to Thika.' },
        { icon: '🎓', title: 'Bulk Quote', text: 'Large scale Lecture Chair quote sent to a college in Meru.' },
        { icon: '📦', title: 'Delivery', text: 'Kindergarten furniture set delivered to Syokimau.' },
        { icon: '✅', title: 'Order Confirmed', text: '20 Library Tables being prepared for a school in Machakos.' },
        { icon: '🏫', title: 'Education Partner', text: 'Secondary school in Nyeri just upgraded their staffroom furniture.' },
        { icon: '🪑', title: 'Restock', text: 'New shipment of ergonomic Writing Arm chairs just arrived.' },
        { icon: '🚚', title: 'Shipping', text: 'Double desks being loaded for delivery to Embu.' },
        { icon: '🪑', title: 'Customer Setup', text: 'Dining hall tables installed at a boarding school in Nakuru.' },
        { icon: '🏫', title: 'Bulk Supply', text: '50 stackable training chairs sent to a NGO in Kajiado.' },
        { icon: '🪑', title: 'Quality Check', text: 'Hand-finished hardwood lab stools ready for dispatch.' },

        // --- LAB INSTALLATIONS ---
        { icon: '🧪', title: 'Site Visit', text: 'Our engineers are currently in Kisumu for a Lab layout survey.' },
        { icon: '🛠️', title: 'Installation', text: 'Chemical-resistant worktops being installed in a Kericho hospital.' },
        { icon: '🚰', title: 'Lab Upgrade', text: 'New gas taps and safety sinks installed at a university in Eldoret.' },
        { icon: '🛡️', title: 'Compliance', text: 'Safety fume hood system successfully tested in a Nairobi lab.' },
        { icon: '🧪', title: 'Planning', text: 'New 3D lab floor plan created for a client in Kakamega.' },
        { icon: '🏗️', title: 'Construction', text: 'Laboratory cabinetry being fitted for a research center in Ruiru.' },
        { icon: '📏', title: 'Measurement', text: 'Site measurement scheduled for a new school lab in Kitui.' },
        { icon: '🧪', title: 'Consultation', text: 'Chemistry lab renovation advice provided to a school in Voi.' },
        { icon: '🔥', title: 'Popular Service', text: 'Gas piping and burner installation requested by 3 schools today.' },
        { icon: '🏗️', title: 'New Lab', text: 'Foundation for a modern science block setup completed in Kiambu.' },

        // --- CHEMICALS & REAGENTS ---
        { icon: '⚗️', title: 'Chemical Supply', text: 'Standard reagent bundle dispatched to a lab in Garissa.' },
        { icon: '💧', title: 'Bulk Fluid', text: '50L of Distilled Water delivered to a clinic in Malindi.' },
        { icon: '🛡️', title: 'Safety Gear', text: 'Full set of Lab Aprons and Goggles sent to Narok.' },
        { icon: '⚗️', title: 'Acid Supply', text: 'Sulfuric Acid (98% High Grade) delivered safely to Naivasha.' },
        { icon: '📦', title: 'New Stock', text: 'Fresh batch of analytical grade Ethanol now available.' },
        { icon: '🔬', title: 'Glassware', text: 'Set of Beakers and Flasks delivered to a school in Lamu.' },
        { icon: '✅', title: 'Reagent Quote', text: 'Full chemistry lab list quoted for a school in Murang\'a.' },
        { icon: '🌡️', title: 'Equipment', text: 'Digital weighing scales dispatched to a pharmacy in Bomet.' },
        { icon: '🧪', title: 'Quick Quote', text: 'Hydrochloric acid pricing provided to a customer in Kisii.' },
        { icon: '⚗️', title: 'Lab Basics', text: 'Litmus papers and indicator solutions delivered to Athi River.' },

        // --- GENERAL TRUST & NATIONWIDE ---
        { icon: '🚛', title: 'Nationwide', text: 'APEX Supplies truck currently heading to Mombasa for a multi-school drop.' },
        { icon: '👥', title: 'Live Browsing', text: '8 users are currently looking at "Double Student Desks".' },
        { icon: '🌟', title: 'Review', text: 'A principal in Kitale gave us a 5-star rating for durability.' },
        { icon: '💬', title: 'WhatsApp Quote', text: 'New inquiry received for school dining hall renovation.' },
        { icon: '📅', title: 'Schedule', text: 'Our delivery team has 4 slots left for this week\'s route to Central Kenya.' },
        { icon: '🚚', title: 'Express', text: 'Urgent lab equipment order delivered to Karen within 6 hours.' },
        { icon: '📍', title: 'Nearby', text: 'A school in Westlands just requested a product catalog.' },
        { icon: '📦', title: 'Warehouse', text: '200+ units of Training Chairs restocked today.' },
        { icon: '🤝', title: 'Partnership', text: 'Now the official furniture supplier for a private school group.' },
        { icon: '🛡️', title: 'Safe Handling', text: 'Our drivers just completed specialized chemical transport training.' },

        // --- ADDITIONAL MIX ---
        { icon: '🪑', title: 'Library Sale', text: '15 Reading carrels delivered to a community library in Busia.' },
        { icon: '🧪', title: 'Biology Lab', text: 'Microscope slides and specimen sets sent to Marsabit.' },
        { icon: '🏫', title: 'Staffroom', text: 'Executive teacher desks installed for a school in Limuru.' },
        { icon: '📦', title: 'Packaging', text: 'Secure chemical-safe containers ready for Bungoma shipment.' },
        { icon: '📐', title: 'Customized', text: 'Bespoke lab benches designed for a unique space in Isiolo.' },
        { icon: '🚚', title: 'Late Delivery', text: 'Overnight shipment arriving in Homa Bay by 8:00 AM.' },
        { icon: '🌟', title: 'Top Rated', text: "Our Student Desks are the #1 choice in Meru County this month." },
        { icon: '🧪', title: 'Refill', text: 'Regular reagent refill completed for a hospital in Kilifi.' },
        { icon: '🛡️', title: 'Lab Safety', text: 'Safety signage and eye-wash stations installed in Taita Taveta.' },
        { icon: '🚛', title: 'Road Trip', text: 'APEX truck spotted delivering quality furniture in Migori!' }
    ];

    function showRandomActivity() {
        // Pick a truly random activity
        const activity = activities[Math.floor(Math.random() * activities.length)];
        
        document.getElementById('toastIcon').textContent = activity.icon;
        document.getElementById('toastTitle').textContent = activity.title;
        document.getElementById('toastText').textContent = activity.text;

        toast.classList.add('show');

        // Hide after 6 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // --- REFINED TIMING LOGIC ---
    // First one appears after 4 seconds
    setTimeout(() => {
        showRandomActivity();
        
        // Then repeat forever with a random delay between 15 and 25 seconds
        const triggerNext = () => {
            const randomDelay = Math.floor(Math.random() * (45000 - 25000 + 1) + 25000);
            setTimeout(() => {
                showRandomActivity();
                triggerNext(); // Loop it
            }, randomDelay);
        };
        triggerNext();

    }, 4000);
}

initActivityNotifications();


// --- 10. ACCESSIBILITY LOGIC ---
const accToggle = document.getElementById('accessibilityToggle');
const accMenu = document.getElementById('accessibilityMenu');

if(accToggle) {
    accToggle.addEventListener('click', () => accMenu.classList.toggle('open'));
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleDyslexicFont() {
    document.body.classList.toggle('dyslexic');
}

let currentFontSize = 100;
function changeTextSize(dir) {
    currentFontSize += (dir * 10);
    document.body.style.fontSize = currentFontSize + '%';
}

function resetAccessibility() {
    document.body.classList.remove('high-contrast', 'dyslexic');
    document.body.style.fontSize = '100%';
    currentFontSize = 100;
}

// --- 2. READING PROGRESS BAR ---
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = scrolled + "%";
};

// --- 3. BULK PRICE CALCULATOR (For Product Pages) ---
// Add this to your product detail logic
function initBulkCalculator(basePrice) {
    const qtyInput = document.getElementById('quantityInput'); // Ensure you have this in HTML
    const totalDisplay = document.getElementById('totalPriceDisplay');
    
    if(!qtyInput) return;

    qtyInput.addEventListener('input', () => {
        let qty = parseInt(qtyInput.value) || 1;
        let discount = 1;

        if (qty >= 50) discount = 0.90; // 10% off for 50+ items
        else if (qty >= 20) discount = 0.95; // 5% off for 20+ items

        let finalTotal = (basePrice * qty) * discount;
        totalDisplay.innerHTML = `Total: ${formatCurrency(finalTotal)} ${discount < 1 ? '<br><small>(Bulk Discount Applied!)</small>' : ''}`;
    });
}

// --- 4. COPY QUOTE TO CLIPBOARD ---
function copyQuoteToClipboard(productName, price) {
    const text = `APEX SUPPLIES QUOTE\nItem: ${productName}\nUnit Price: ${price}\nWebsite: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
        alert("Quote copied to clipboard! You can now paste it into your email or document.");
    });
}

// Quick View functionality
function openQuickView(imgSrc, altText) {
  const overlay = document.getElementById('quickviewOverlay');
  const img = document.getElementById('quickviewImage');
  if (overlay && img && imgSrc) {
    img.src = imgSrc;
    img.alt = altText || 'Product preview';
    overlay.classList.add('active'); // you'll need .active in CSS
  }
}

function closeQuickView() {
  const overlay = document.getElementById('quickviewOverlay');
  if (overlay) overlay.classList.remove('active');
}

// Attach listeners to all product cards (call this after rendering cards)
function attachCardListeners() {
  // Quick view buttons
  document.querySelectorAll('.quickview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const card = btn.closest('.pcard');
      if (!card) return;
      
      const img = card.querySelector('.pimg img');
      if (img && img.src) {
        openQuickView(img.src, img.alt);
      }
    });
  });

  // Close quick view
  const closeBtn = document.getElementById('quickviewClose');
  const overlay = document.getElementById('quickviewOverlay');
  
  if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeQuickView();
  });
}

function attachAddToCartListeners() {
  document.querySelectorAll('.pcard .pbtn.primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent any default if it's a link/button mix

      const action = btn.dataset.action;
      const name   = btn.dataset.productName;
      const price  = Number(btn.dataset.productPrice) || 0;

      if (action === 'add-to-cart') {
        addToCart({ name, price, image: '' }); // you can improve image later
        alert("Added to your quote list!");
        updateCartCount(); // if you have this function
      } else if (action === 'request-quote') {
        const msg = encodeURIComponent(
          `Hello APEKS, I would like a quote for:\n${name}\nPrice indication: ${price || 'Quote needed'}\nFrom category page`
        );
        window.open(`https://wa.me/254757721045?text=${msg}`, '_blank');
      }
    });
  });
}

// Make sure this runs after cards are rendered
document.addEventListener('DOMContentLoaded', () => {
  // ... your existing code ...
  
  // If you're on category.html and cards are rendered dynamically:
  // Call attachCardListeners() right after grid.innerHTML = ... in category script
});

