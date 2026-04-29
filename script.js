// script.js ─ APEKS/APEX Shared Features + Smart Cart (CORRECTED VERSION)
// Includes: categories/products data, rendering, quantity selectors, grouped cart drawer,
// WhatsApp checkout, quick view, search placeholder typing, site visit form, scroll reveal,
// activity toast, accessibility toggles, progress bar, and Index/Category page logic.

// ──────────────────────────────────────────────
// 1) CONFIGURATION + DATA
// ──────────────────────────────────────────────
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
  { featured: true, group: "school", categoryId: "training-lecture-chairs", tag: "SCHOOL", off: "-10%", name: "Lecture Chair (Writing Arm)", desc: "Comfortable seating for lecture rooms.", price: 3000, old: 4500, stock: true, image: "lecture-chairs-kenya" },
  { featured: true, group: "school", categoryId: "training-lecture-chairs", tag: "SCHOOL", off: "HOT", name: "Training Chair (Stackable)", desc: "Compact, easy to store for training halls.", price: 2500, old: 0, stock: true, image: "train-chairs" },
  { featured: true, group: "school", categoryId: "single-desk-chair", tag: "SCHOOL", off: "-7%", name: "Single Student Desk & Chair", desc: "Strong steel frame, classroom-ready.", price: 4500, old: 6500, stock: true, image: "single-desk-and-chair" },
  { featured: true, group: "school", categoryId: "double-desk-chair", tag: "SCHOOL", off: "-5%", name: "Double Student Desk & Chair", desc: "Space-saving twin desk for schools.", price: 5000, old: 6300, stock: true, image: "double-desks" },
  { featured: true, group: "school", categoryId: "school-dining-tables", tag: "SCHOOL", off: "-8%", name: "School Dining Table (3×8)", desc: "Easy-clean top, built for daily use.", price: 26700, old: 17500, stock: true, image: "dining" },
  { featured: true, group: "school", categoryId: "kindergarten-furniture", tag: "KIDS", off: "-20%", name: "Kindergarten Chair (Ages 3–10)", desc: "Safe edges, bright-friendly finish.", price: 2000, old: 2500, stock: true, image: "kid-chair" },
  { featured: true, group: "school", categoryId: "kindergarten-furniture", tag: "KIDS", off: "NEW", name: "Kindergarten Table (Round)", desc: "Rounded corners for safer learning spaces.", price: 0, old: 0, stock: true, image: "kid-round" },
  { featured: true, group: "school", categoryId: "library-furniture", tag: "LIBRARY", off: "-1%", name: "Double decker bed", desc: "Strong metalic double decker bed", price: 12500, old: 13000, stock: true, image: "metal-bed" },

  // LAB ITEMS
  { featured: true, group: "lab", categoryId: "lab-furniture", tag: "LAB", off: "-14%", name: "Lab Stool (Hardwood Top)", desc: "Stable base and durable seat for labs.", price: 3000, old: 3500, stock: true, image: "lab-chairs" },
  { featured: true, group: "lab", categoryId: "lab-furniture", tag: "LAB", off: "QUOTE", name: "Laboratory Bench Unit", desc: "Worktop + storage options for modern labs.", price: 0, old: 0, stock: true, image: "lab-sink-desk" },
  { featured: true, group: "lab", categoryId: "lab-furniture", tag: "LAB", off: "-6%", name: "Chemical Storage Cabinet", desc: "Safer storage for lab reagents and materials.", price: 0, old: 0, stock: true, image: "chem-storage" },
  { featured: true, group: "lab", categoryId: "lab-equipment", tag: "LAB", off: "HOT", name: "Lab Equipment Starter Kit", desc: "Glassware essentials for school labs.", price: 0, old: 0, stock: true, image: "labkit-starter" },

  { group: "lab", categoryId: "lab-equipment", tag: "LAB", off: "QUOTE", name: "Laboratory Gas Tap - One Way", desc: "Single outlet gas tap, brass body, high-quality valve for lab benches.", price: 4500, old: 5200, stock: true, image: "Gas tap one way" },
  { group: "lab", categoryId: "lab-equipment", tag: "LAB", off: "-8%", name: "Laboratory Gas Tap - Four Way", desc: "Four-outlet gas tap for multi-position lab benches, durable and leak-proof.", price: 12500, old: 13600, stock: true, image: "gastap-four-way" },
  { group: "lab", categoryId: "lab-equipment", tag: "SAFETY", off: "QUOTE", name: "Fire Extinguisher - CO₂ 5kg", desc: "5kg carbon dioxide fire extinguisher suitable for labs (Class B & E fires), wall bracket included.", price: 9800, old: 11000, stock: true, image: "fire-extinguisher" },

  // CHEMICALS
  { featured: true, group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "NEW", name: "Sodium Carbonate Anhydrous", desc: "pure sodium carbonate anhydrous.", price: 0, old: 0, stock: true, image: "starter-lab" },
  { featured: true, group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "Sodium Carbonate decahydrate", desc: "pure sodium carbonate decahydrate.0", price: 0, old: 0, stock: true, image: "dionised-water" },

  { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "NEW", name: "Sodium Bi Carbonate", desc: "High grade Sodium Bi Carbonate.", price: 0, old: 0, stock: true, image: "sodium-bycarbonate" },
  { group: "chem", categoryId: "chemical-reagents", tag: "CHEM", off: "NEW", name: "sodium carbonate decahydrate", desc: "Pure sodium-carbonate-decahydrate.", price: 0, old: 0, stock: true, image: "sodium-carbonate-decahydrate" },
  { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "sodium hydroxyide", desc: "Industrial strength Sodium Hydroxide.", price: 0, old: 0, stock: true, image: "sodium-hydroxyide" },
  { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "pottasium-nitrate", desc: "Pure pottasium-nitrate.", price: 0, old: 0, stock: true, image: "pottasium-nitrate" },
  { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "copper sulphate pentahydrate", desc: "Pure copper sulphate pentahydrate.", price: 0, old: 0, stock: true, image: "copper-sulphate-pentahydrate" },
  { group: "chem", categoryId: "chemicals-reagents", tag: "CHEM", off: "QUOTE", name: "copper carbonate", desc: "Pure copper carbonate.", price: 0, old: 0, stock: true, image: "glyceryne" },

  // SERVICES
  { featured: true, group: "services", categoryId: "laboratory-installations", tag: "INSTALL", off: "QUOTE", name: "Lab Installation Package", desc: "Sinks, gas taps, piping & full setup.", price: 0, old: 0, stock: true, image: "lab-installations" },
  { featured: true, group: "services", categoryId: "safety-compliance", tag: "SERVICE", off: "QUOTE", name: "Safety & Compliance Audit", desc: "Ventilation, storage and signage guidance.", price: 0, old: 0, stock: true, image: "compliance" },
  { featured: true, group: "services", categoryId: "maintenance-repairs", tag: "SERVICE", off: "QUOTE", name: "Maintenance & Repairs", desc: "Fixes, replacements, upgrades (on-site).", price: 0, old: 0, stock: true, image: "maintenance" },
  { featured: true, group: "services", categoryId: "delivery-setup", tag: "SERVICE", off: "QUOTE", name: "Delivery & Setup", desc: "Nationwide delivery + on-site setup support.", price: 0, old: 0, stock: true, image: "delivery" }
];

// ──────────────────────────────────────────────
// 2) CART STATE
// ──────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('apexCart')) || [];

// ──────────────────────────────────────────────
// 3) UTILITIES
// ──────────────────────────────────────────────
function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getImagePath(filename) {
  if (!filename) return null;
  return `${IMAGE_CONFIG.basePath}${filename}.${IMAGE_CONFIG.extension}`;
}

function formatCurrency(amount) {
  if (!amount || amount <= 0) return "Price on Request";
  return `<small>KSh</small> <strong>${Number(amount).toLocaleString()}</strong>`;
}

function normalizeCart() {
  if (!Array.isArray(cart)) cart = [];
  cart = cart.map(item => ({
    name: item?.name || 'Item',
    price: Number(item?.price) || 0,
    image: item?.image || '',
    singlePrice: Number(item?.singlePrice) || (Number(item?.price) || 0),
  }));
  localStorage.setItem('apexCart', JSON.stringify(cart));
}

// ──────────────────────────────────────────────
// 4) CART UI + LOGIC
// ──────────────────────────────────────────────
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
        <div class="cart-items" id="cartItems"></div>
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
  document.getElementById('closeCart')?.addEventListener('click', () => toggleCart());
  document.getElementById('cartOverlay')?.addEventListener('click', () => toggleCart());
  document.getElementById('checkoutBtn')?.addEventListener('click', checkoutWhatsApp);

  const headerCartBtn = document.querySelector('.cart-btn');
  if (headerCartBtn) {
    headerCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCart();
    });
  }

  normalizeCart();
  updateCartUI();
}

function toggleCart(forceOpen = null) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer || !overlay) return;

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

// Add this function to get the quantity for a product
function getProductQuantity(productId) {
  const input = document.getElementById(`qty-${productId}`);
  return input ? parseInt(input.value, 10) || 1 : 1;
}

// Add items with quantity (adds multiple entries)
function addToCart(product) {
  const pid = slugify(product.name);
  const quantity = getProductQuantity(pid);

  for (let i = 0; i < quantity; i++) {
    cart.push({
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image || '',
      singlePrice: Number(product.price) || 0
    });
  }

  localStorage.setItem('apexCart', JSON.stringify(cart));
  updateCartUI();
  toggleCart(true);
  
}

// Remove ONE unit by name
function removeCartItem(name) {
  const idx = cart.findIndex(item => item.name === name);
  if (idx !== -1) {
    cart.splice(idx, 1);
    localStorage.setItem('apexCart', JSON.stringify(cart));
    updateCartUI();
  }
}

function updateCartUI() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const countBadge = document.querySelector('.cart-count');
  if (!container || !totalEl) return;

  // Update Badge
  if (countBadge) {
    countBadge.textContent = cart.length;
    countBadge.style.display = cart.length > 0 ? 'flex' : 'none';
  }

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart-msg">Your list is empty.<br>Add items to request a quote.</div>`;
    totalEl.textContent = "KSh 0";
    return;
  }

  // Group items by name
  const groupedCart = {};
  cart.forEach(item => {
    if (groupedCart[item.name]) groupedCart[item.name].count++;
    else groupedCart[item.name] = { ...item, count: 1 };
  });

  let total = 0;

  container.innerHTML = Object.entries(groupedCart).map(([name, item]) => {
    const unit = Number(item.singlePrice) || 0;
    const itemTotal = unit * item.count;
    total += itemTotal;

    const safeName = String(name).replace(/'/g, "\\'");

    return `
      <div class="cart-item">
        <img src="${getImagePath(item.image)}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=='" alt="">
        <div class="cart-item-details">
          <span class="cart-item-title">${name} <small>(Qty: ${item.count})</small></span>
          <span class="cart-item-price">${unit > 0 ? 'KSh ' + itemTotal.toLocaleString() : 'Price on request'}</span>
          <button class="cart-remove" onclick="removeCartItem('${safeName}')">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  totalEl.textContent = total > 0 ? `KSh ${total.toLocaleString()}` : "Pending Quote";
}

function checkoutWhatsApp() {
  if (cart.length === 0) return;

  const grouped = {};
  cart.forEach(item => {
    if (!grouped[item.name]) grouped[item.name] = { ...item, count: 1 };
    else grouped[item.name].count++;
  });

  let message = "Hello APEX Supplies,\nI would like a quote for the following items:\n\n";
  let total = 0;

  Object.entries(grouped).forEach(([name, item], i) => {
    const unit = Number(item.singlePrice) || 0;
    const lineTotal = unit * item.count;
    const priceStr = unit > 0
      ? `(Qty: ${item.count} × KSh ${unit.toLocaleString()} = KSh ${lineTotal.toLocaleString()})`
      : `(Qty: ${item.count} • Quote needed)`;

    message += `${i + 1}. ${name} ${priceStr}\n`;
    total += lineTotal;
  });

  if (total > 0) message += `\nEstimated Total: KSh ${total.toLocaleString()}`;
  message += "\n\nPlease advise on availability and delivery.";

  const url = `https://wa.me/254757721045?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ──────────────────────────────────────────────
// 5) RENDERING
// ──────────────────────────────────────────────
function renderProductCard(product) {
  const imgSrc = product.image ? getImagePath(product.image) : '';
  const hasPrice = product.price > 0;
  const pid = slugify(product.name);

  return `
    <article class="pcard" data-group="${product.group}" data-category-id="${product.categoryId}">
      <div class="pimg">
        ${imgSrc ? `<img src="${imgSrc}" alt="${product.name}" loading="lazy">` : '<div class="no-image">No image</div>'}
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
          <div class="quantity-selector">
            <button class="quantity-btn minus" data-product-id="${pid}" type="button">-</button>
            <input type="number" class="quantity-input" id="qty-${pid}" value="1" min="1" max="999">
            <button class="quantity-btn plus" data-product-id="${pid}" type="button">+</button>
          </div>
          
          <button class="pbtn primary add-cart-trigger"
            data-name="${product.name}"
            data-price="${product.price || 0}"
            data-image="${product.image || ''}"
            data-product-id="${pid}">
            ${hasPrice ? "Add to Quote" : "Add to Quote"}
          </button>

          <button class="pbtn ghost quick-view-btn" title="Quick view" aria-label="Quick view ${product.name}" type="button">👁️</button>
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
// 6) QUICK VIEW
// ──────────────────────────────────────────────
function attachQuickViewListeners() {
  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const img = btn.closest('.pcard')?.querySelector('img');
      const overlay = document.getElementById('quickviewOverlay');
      const qvImg = document.getElementById('quickviewImage');
      if (img && overlay && qvImg) {
        qvImg.src = img.src;
        qvImg.alt = img.alt || 'Product preview';
        overlay.classList.add('active');
      }
    });
  });
}

function initQuickViewClose() {
  const overlay = document.getElementById('quickviewOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.id === 'quickviewClose') {
      overlay.classList.remove('active');
    }
  });
}

// ──────────────────────────────────────────────
// 7) QUANTITY SELECTORS
// ──────────────────────────────────────────────
function attachQuantityListeners() {
  // Remove existing listeners to avoid duplicates
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    const productId = btn.dataset.productId;
    const input = document.getElementById(`qty-${productId}`);
    if (!input) return;

    // Set up click listeners for plus/minus buttons
    btn.removeEventListener('click', handleQuantityChange);
    btn.addEventListener('click', handleQuantityChange);
  });

  // Handle input changes
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.removeEventListener('change', handleInputChange);
    input.addEventListener('change', handleInputChange);
  });
}

// Separate functions to handle events
function handleQuantityChange(e) {
  const btn = e.currentTarget;
  const productId = btn.dataset.productId;
  const input = document.getElementById(`qty-${productId}`);
  if (!input) return;

  let value = parseInt(input.value, 10) || 1;

  if (btn.classList.contains('plus')) value = Math.min(value + 1, 999);
  if (btn.classList.contains('minus')) value = Math.max(value - 1, 1);

  input.value = value;
}

function handleInputChange(e) {
  const input = e.currentTarget;
  let value = parseInt(input.value, 10) || 1;
  value = Math.max(1, Math.min(value, 999));
  input.value = value;
}

// ──────────────────────────────────────────────
// 8) SEARCH PLACEHOLDER ANIMATION
// ──────────────────────────────────────────────
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
      typeSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// ──────────────────────────────────────────────
// 9) SITE VISIT BOOKING LOGIC
// ──────────────────────────────────────────────
function initSiteVisitForm() {
  const visitForm = document.getElementById('siteVisitForm');
  if (!visitForm) return;

  visitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('visitType')?.value || '';
    const loc = document.getElementById('visitLocation')?.value || '';
    const date = document.getElementById('visitDate')?.value || '';

    const message = `Hello APEX Supplies,\n\nI would like to request a *Site Visit* for:\n📍 Service: ${type}\n🏢 Location: ${loc}\n📅 Preferred Date: ${date}\n\nPlease confirm availability.`;

    window.open(`https://wa.me/254757721045?text=${encodeURIComponent(message)}`, '_blank');
  });
}

// ──────────────────────────────────────────────
// 10) SCROLL REVEAL
// ──────────────────────────────────────────────
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) el.classList.add('active');
  });
}

function initReveal() {
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }, 100);
}

// ──────────────────────────────────────────────
// 11) ACTIVITY TOAST
// ──────────────────────────────────────────────
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
    { icon: '🪑', title: 'New Order', text: '40 Single Student Desks dispatched to Thika.' },
    { icon: '🎓', title: 'Bulk Quote', text: 'Large scale Lecture Chair quote sent to a college in Meru.' },
    { icon: '📦', title: 'Delivery', text: 'Kindergarten furniture set delivered to Syokimau.' },
    { icon: '✅', title: 'Order Confirmed', text: '20 Library Tables being prepared for a school in Machakos.' },
    { icon: '🧪', title: 'Site Visit', text: 'Our engineers are currently in Kisumu for a Lab layout survey.' },
    { icon: '🚛', title: 'Nationwide', text: 'APEX Supplies truck currently heading to Mombasa for a multi-school drop.' }
  ];

  function showRandomActivity() {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    document.getElementById('toastIcon').textContent = activity.icon;
    document.getElementById('toastTitle').textContent = activity.title;
    document.getElementById('toastText').textContent = activity.text;

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  setTimeout(() => {
    showRandomActivity();
    const triggerNext = () => {
      const randomDelay = Math.floor(Math.random() * (45000 - 25000 + 1) + 25000);
      setTimeout(() => {
        showRandomActivity();
        triggerNext();
      }, randomDelay);
    };
    triggerNext();
  }, 4000);
}

// ──────────────────────────────────────────────
// 12) ACCESSIBILITY + PROGRESS BAR
// ──────────────────────────────────────────────
function initAccessibility() {
  const accToggle = document.getElementById('accessibilityToggle');
  const accMenu = document.getElementById('accessibilityMenu');
  if (accToggle && accMenu) accToggle.addEventListener('click', () => accMenu.classList.toggle('open'));
}

function toggleContrast() { document.body.classList.toggle('high-contrast'); }
function toggleDyslexicFont() { document.body.classList.toggle('dyslexic'); }

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

function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + "%";
  });
}

// ──────────────────────────────────────────────
// 13) DOM READY ─ MAIN APPLICATION LOGIC
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCartSystem(); // Load the cart on every page
  initQuickViewClose();

  // Global listener for dynamic "Add to Quote" buttons
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-cart-trigger')) {
      e.preventDefault();
      const btn = e.target;

      // Get product details from data attributes
      const product = {
        name: btn.dataset.name,
        price: Number(btn.dataset.price) || 0,
        image: btn.dataset.image || ''
      };

      addToCart(product);
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
        if (!query && p.featured !== true) return false;
        if (filter !== 'all' && p.group !== filter) return false;
        if (query && !(p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))) return false;
        return true;
      });

      pgrid.innerHTML = filtered.map(renderProductCard).join('');
      attachQuickViewListeners();
      attachQuantityListeners(); // quantity listeners after rendering
    }

    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      renderFeatured(c.dataset.filter, searchInput?.value || '');
    }));

    // Search
    const doSearch = () => renderFeatured(document.querySelector('.chip.active')?.dataset.filter || 'all', searchInput?.value || '');
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
      document.title = catInfo.title + " – APEKS Supplies";

      const filtered = products.filter(p => p.categoryId === categoryId);

      document.getElementById('pgrid').innerHTML = filtered.length
        ? filtered.map(p => {
          const imgSrc = p.image ? getImagePath(p.image) : '';
          const hasPrice = p.price > 0;

          let detailUrl = `product.html?name=${encodeURIComponent(p.name)}&desc=${encodeURIComponent(p.desc)}&price=${p.price || 0}`;
          if (p.image) detailUrl += `&img=${encodeURIComponent(imgSrc)}`;
          detailUrl += `&cat=${encodeURIComponent(categoryId)}`;

          // Use slug IDs for quantity input so getProductQuantity works reliably.
          const pid = slugify(p.name);

          return `
            <article class="pcard" data-group="${p.group}" data-category-id="${p.categoryId}">
              <a href="${detailUrl}" class="pcard-link">
                <div class="pimg">
                  ${imgSrc ? `<img src="${imgSrc}" alt="${p.name}" loading="lazy">` : '<div class="no-image">No image</div>'}
                </div>
              </a>
              <div class="pbody">
                <h3 class="ptitle">${p.name}</h3>
                <p class="pdesc">${p.desc}</p>
                <div class="price-row">
                  <div class="price">
                    ${formatCurrency(p.price)}
                    ${p.old ? `<span class="old">${formatCurrency(p.old)}</span>` : ''}
                  </div>
                  <span class="stock">${p.stock ? "In stock" : "Made to order"}</span>
                </div>
                <div class="pactions">
                  <div class="quantity-selector">
                    <button class="quantity-btn minus" data-product-id="${pid}" type="button">-</button>
                    <input type="number" class="quantity-input" id="qty-${pid}" value="1" min="1" max="999">
                    <button class="quantity-btn plus" data-product-id="${pid}" type="button">+</button>
                  </div>

                  <button class="pbtn primary add-cart-trigger"
                          data-name="${p.name}"
                          data-price="${p.price || 0}"
                          data-image="${p.image || ''}"
                          data-product-id="${pid}">
                    ${hasPrice ? "Add to Quote" : "Add to Quote"}
                  </button>

                  <button class="pbtn ghost quick-view-btn" title="Quick view" aria-label="Quick view ${p.name}" type="button">👁️</button>
                </div>
              </div>
            </article>
          `;
        }).join('')
        : "<p style='grid-column:1/-1;text-align:center;padding:50px;'>No products found.</p>";

      attachQuickViewListeners();
      attachQuantityListeners();
    } else {
      document.getElementById('pgrid').innerHTML = "<p>Category not found.</p>";
    }
  }

  // ── FOOTER YEAR ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialize quantity selectors
  attachQuantityListeners();

  // Optional extras if your HTML includes them
  animateSearchPlaceholder();
  initReveal();
  initActivityNotifications();
  initAccessibility();
  initScrollProgress();
  initSiteVisitForm();
});