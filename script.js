

/* =========================================================
   ARIG — Vanilla JavaScript E-Commerce
   ========================================================= */

const products = [
  {
    id: 1,
    name: "ARIG Noir",
    category: "men",
    categoryLabel: "For Him",
    price: 1290,
    rating: 4.9,
    reviews: 128,
    description: "A deep and sophisticated composition of amber, oud and warm woods.",
    notes: ["Oud", "Amber", "Cedarwood"],
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 2,
    name: "ARIG Élan",
    category: "unisex",
    categoryLabel: "Unisex",
    price: 1450,
    rating: 4.8,
    reviews: 96,
    description: "Fresh citrus meets elegant musk for a modern signature scent.",
    notes: ["Bergamot", "Musk", "Vetiver"],
    badge: "New",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 3,
    name: "ARIG Oud",
    category: "men",
    categoryLabel: "For Him",
    price: 1690,
    rating: 4.9,
    reviews: 174,
    description: "Rich oriental oud balanced with saffron, leather and smooth sandalwood.",
    notes: ["Oud", "Saffron", "Leather"],
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 4,
    name: "ARIG Velvet",
    category: "women",
    categoryLabel: "For Her",
    price: 1390,
    rating: 4.8,
    reviews: 113,
    description: "A soft floral veil wrapped in vanilla, rose and creamy sandalwood.",
    notes: ["Rose", "Vanilla", "Sandalwood"],
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 5,
    name: "ARIG Aura",
    category: "unisex",
    categoryLabel: "Unisex",
    price: 1190,
    rating: 4.7,
    reviews: 81,
    description: "Clean white florals and musk create an effortlessly elegant aura.",
    notes: ["White Musk", "Iris", "Jasmine"],
    badge: "",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: false
  },
  {
    id: 6,
    name: "ARIG Royal",
    category: "men",
    categoryLabel: "For Him",
    price: 1850,
    rating: 4.9,
    reviews: 142,
    description: "An intense royal blend of spices, leather, amber and precious woods.",
    notes: ["Spices", "Leather", "Amber"],
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: true
  },
  {
    id: 7,
    name: "ARIG Bloom",
    category: "women",
    categoryLabel: "For Her",
    price: 1250,
    rating: 4.8,
    reviews: 104,
    description: "A radiant bouquet of blooming flowers with a delicate fruity finish.",
    notes: ["Peony", "Peach", "Musk"],
    badge: "New",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: false
  },
  {
    id: 8,
    name: "ARIG Intense",
    category: "unisex",
    categoryLabel: "Unisex",
    price: 1590,
    rating: 4.9,
    reviews: 137,
    description: "A magnetic evening fragrance built around incense, vanilla and dark woods.",
    notes: ["Incense", "Vanilla", "Dark Woods"],
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: true
  }
];

/* =========================================================
   STATE
   ========================================================= */

let cart = loadCart();
let wishlist = loadWishlist();
let currentCategory = "all";
let currentSearch = "";
let currentSort = "featured";
let selectedProduct = null;
let modalQuantity = 1;
let toastTimeout;

/* =========================================================
   DOM
   ========================================================= */

const productsGrid = document.getElementById("productsGrid");
const bestProductsGrid = document.getElementById("bestProductsGrid");
const noProducts = document.getElementById("noProducts");

const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const overlay = document.getElementById("overlay");

const modalBackdrop = document.getElementById("modalBackdrop");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalRating = document.getElementById("modalRating");
const modalDescription = document.getElementById("modalDescription");
const modalNotes = document.getElementById("modalNotes");
const modalPrice = document.getElementById("modalPrice");
const modalQuantity = document.getElementById("modalQuantity");

/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(price) {
  return `${price.toLocaleString("en-EG")} EGP`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function loadCart() {
  try {
    const saved = localStorage.getItem("arig-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("arig-cart", JSON.stringify(cart));
}

function loadWishlist() {
  try {
    const saved = localStorage.getItem("arig-wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveWishlist() {
  localStorage.setItem("arig-wishlist", JSON.stringify(wishlist));
}

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function getCartQuantity(id) {
  const item = cart.find(item => item.id === Number(id));
  return item ? item.quantity : 0;
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function stars(rating) {
  return `★ ${rating.toFixed(1)}`;
}

/* =========================================================
   PRODUCT RENDERING
   ========================================================= */

function productCard(product) {
  const isFavorite = wishlist.includes(product.id);

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-image-wrap">
        ${product.badge ? `<span class="product-badge">${escapeHtml(product.badge)}</span>` : ""}
        
        <button
          class="wishlist-btn ${isFavorite ? "active" : ""}"
          data-action="wishlist"
          data-id="${product.id}"
          aria-label="${isFavorite ? "Remove from wishlist" : "Add to wishlist"}"
          aria-pressed="${isFavorite}"
        >${isFavorite ? "♥" : "♡"}</button>

        <img
          class="product-image"
          src="${product.image}"
          alt="${escapeHtml(product.name)} perfume bottle"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=80'"
        >

        <div class="product-actions">
          <button class="quick-btn" data-action="quick" data-id="${product.id}">
            Quick View
          </button>
          <button class="add-btn" data-action="add" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-meta">
          <span class="product-category">${escapeHtml(product.categoryLabel)}</span>
          <span class="rating">${stars(product.rating)}</span>
        </div>

        <h3 class="product-name">${escapeHtml(product.name)}</h3>

        <p class="product-description">
          ${escapeHtml(product.description)}
        </p>

        <div class="product-bottom">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span class="product-category">${product.reviews} reviews</span>
        </div>

        <button class="mobile-add" data-action="add" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </article>
  `;
}

function getFilteredProducts() {
  let filtered = [...products];

  if (currentCategory !== "all") {
    if (currentCategory === "bestseller") {
      filtered = filtered.filter(product => product.bestseller);
    } else {
      filtered = filtered.filter(product => product.category === currentCategory);
    }
  }

  if (currentSearch.trim()) {
    const query = currentSearch.toLowerCase().trim();

    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.notes.some(note => note.toLowerCase().includes(query))
    );
  }

  switch (currentSort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;

    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return filtered;
}

function renderProducts() {
  const filtered = getFilteredProducts();

  productsGrid.innerHTML = filtered.map(productCard).join("");

  if (filtered.length === 0) {
    noProducts.classList.add("visible");
  } else {
    noProducts.classList.remove("visible");
  }
}

function renderBestSellers() {
  const best = products
    .filter(product => product.bestseller)
    .slice(0, 4);

  bestProductsGrid.innerHTML = best.map(productCard).join("");
}

/* =========================================================
   CART
   ========================================================= */

function addToCart(id, quantity = 1) {
  const product = getProduct(id);

  if (!product) {
    showToast("Unavailable", "This product is currently unavailable.");
    return;
  }

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast("Added to cart", `${product.name} is now in your selection.`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  updateCartUI();
}

function changeQuantity(id, change) {
  const item = cart.find(item => item.id === Number(id));

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = getCartCount();

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">⌁</div>
        <h3>Your cart is empty</h3>
        <p>Discover a fragrance made for your next unforgettable moment.</p>
        <button class="btn btn-dark" id="continueShopping">Explore Fragrances</button>
      </div>
    `;

    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";

  cartItems.innerHTML = cart.map(item => {
    const product = getProduct(item.id);

    if (!product) return "";

    return `
      <div class="cart-item">
        <img
          class="cart-item-image"
          src="${product.image}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
        >

        <div class="cart-item-info">
          <span class="cart-item-category">${escapeHtml(product.categoryLabel)}</span>
          <h3 class="cart-item-name">${escapeHtml(product.name)}</h3>
          <span class="cart-item-price">${formatPrice(product.price)}</span>

          <div class="cart-item-controls">
            <button class="cart-qty-btn" data-cart-action="decrease" data-id="${product.id}" aria-label="Decrease quantity">−</button>
            <span class="cart-qty">${item.quantity}</span>
            <button class="cart-qty-btn" data-cart-action="increase" data-id="${product.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <button
          class="remove-item"
          data-cart-action="remove"
          data-id="${product.id}"
          aria-label="Remove ${escapeHtml(product.name)}"
        >&times;</button>
      </div>
    `;
  }).join("");

  cartTotal.textContent = formatPrice(getCartTotal());
}

function openCart() {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
  updateCartUI();
}

function closeCart() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

/* =========================================================
   QUICK VIEW
   ========================================================= */

function openQuickView(id) {
  const product = getProduct(id);

  if (!product) return;

  selectedProduct = product;
  modalQuantity = 1;

  modalImage.src = product.image;
  modalImage.alt = `${product.name} perfume bottle`;
  modalCategory.textContent = product.categoryLabel;
  modalName.textContent = product.name;
  modalRating.textContent = `${stars(product.rating)} · ${product.reviews} reviews`;
  modalDescription.textContent = product.description;
  modalPrice.textContent = formatPrice(product.price);
  modalQuantity.textContent = modalQuantity;

  modalNotes.innerHTML = product.notes
    .map(note => `<span class="note">${escapeHtml(note)}</span>`)
    .join("");

  modalBackdrop.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeQuickView() {
  modalBackdrop.classList.remove("active");
  document.body.classList.remove("no-scroll");
  selectedProduct = null;
}

/* =========================================================
   WISHLIST
   ========================================================= */

function toggleWishlist(id) {
  id = Number(id);

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    showToast("Wishlist updated", "Removed from your favorites.");
  } else {
    wishlist.push(id);
    showToast("Saved to favorites", "You can find this fragrance here anytime.");
  }

  saveWishlist();
  renderProducts();
  renderBestSellers();
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(title, text) {
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastText = document.getElementById("toastText");

  toastTitle.textContent = title;
  toastText.textContent = text;

  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* =========================================================
   EVENT DELEGATION
   ========================================================= */

document.addEventListener("click", event => {
  const actionElement = event.target.closest("[data-action]");

  if (actionElement) {
    const action = actionElement.dataset.action;
    const id = Number(actionElement.dataset.id);

    if (action === "add") {
      addToCart(id);
    }

    if (action === "quick") {
      openQuickView(id);
    }

    if (action === "wishlist") {
      toggleWishlist(id);
    }
  }

  const cartAction = event.target.closest("[data-cart-action]");

  if (cartAction) {
    const action = cartAction.dataset.cartAction;
    const id = Number(cartAction.dataset.id);

    if (action === "increase") {
      changeQuantity(id, 1);
    }

    if (action === "decrease") {
      changeQuantity(id, -1);
    }

    if (action === "remove") {
      removeFromCart(id);
      showToast("Removed", "The item was removed from your cart.");
    }
  }

  if (event.target.id === "continueShopping") {
    closeCart();
    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });
  }
});

/* =========================================================
   CATEGORY FILTERING
   ========================================================= */

document.getElementById("categoryTabs").addEventListener("click", event => {
  const button = event.target.closest(".filter-btn");

  if (!button) return;

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
  currentCategory = button.dataset.category;

  renderProducts();
});

/* =========================================================
   SORT
   ========================================================= */

document.getElementById("sortSelect").addEventListener("change", event => {
  currentSort = event.target.value;
  renderProducts();
});

/* =========================================================
   SEARCH
   ========================================================= */

const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

document.getElementById("searchBtn").addEventListener("click", () => {
  searchPanel.classList.toggle("open");

  if (searchPanel.classList.contains("open")) {
    setTimeout(() => searchInput.focus(), 250);
  }
});

searchInput.addEventListener("input", event => {
  currentSearch = event.target.value;
  renderProducts();
});

document.getElementById("clearSearch").addEventListener("click", () => {
  searchInput.value = "";
  currentSearch = "";
  renderProducts();
  searchInput.focus();
});

/* =========================================================
   CART CONTROLS
   ========================================================= */

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

/* =========================================================
   MODAL CONTROLS
   ========================================================= */

document.getElementById("modalClose").addEventListener("click", closeQuickView);

modalBackdrop.addEventListener("click", event => {
  if (event.target === modalBackdrop) {
    closeQuickView();
  }
});

document.getElementById("modalMinus").addEventListener("click", () => {
  if (modalQuantity > 1) {
    modalQuantity--;
    modalQuantity.textContent = modalQuantity;
  }
});

document.getElementById("modalPlus").addEventListener("click", () => {
  if (modalQuantity < 20) {
    modalQuantity++;
    modalQuantity.textContent = modalQuantity;
  }
});

document.getElementById("modalAdd").addEventListener("click", () => {
  if (!selectedProduct) return;

  addToCart(selectedProduct.id, modalQuantity);
  closeQuickView();
  openCart();
});

/* =========================================================
   MOBILE NAV
   ========================================================= */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");

  mobileMenuBtn.classList.toggle("active", isOpen);
  mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   NAVBAR SCROLL
   ========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* =========================================================
   THEME
   ========================================================= */

const themeBtn = document.getElementById("themeBtn");

function applySavedTheme() {
  const savedTheme = localStorage.getItem("arig-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "arig-theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

/* =========================================================
   COLLECTION CARDS
   ========================================================= */

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", () => {
    const collection = card.dataset.collection;

    currentCategory = collection;

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle(
        "active",
        btn.dataset.category === collection
      );
    });

    renderProducts();

    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* =========================================================
   BEST SELLERS BUTTON
   ========================================================= */

document.getElementById("viewBestSellers").addEventListener("click", () => {
  currentCategory = "bestseller";

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.category === "bestseller"
    );
  });

  renderProducts();

  document.getElementById("shop").scrollIntoView({
    behavior: "smooth"
  });
});

/* =========================================================
   NEWSLETTER
   ========================================================= */

const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = newsletterEmail.value.trim();

  newsletterMessage.className = "";

  if (!email) {
    newsletterMessage.textContent = "Please enter your email address.";
    newsletterMessage.classList.add("error");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    newsletterMessage.textContent = "Please enter a valid email address.";
    newsletterMessage.classList.add("error");
    return;
  }

  newsletterMessage.textContent = "Welcome to the ARIG world.";
  newsletterMessage.classList.add("success");

  newsletterEmail.value = "";

  showToast(
    "You're on the list",
    "Thank you for joining the ARIG world."
  );
});

/* =========================================================
   CHECKOUT
   ========================================================= */

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty", "Add a fragrance before checkout.");
    return;
  }

  showToast(
    "Checkout ready",
    "This demo is ready to connect to your payment system."
  );
});

/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeQuickView();

    mobileNav.classList.remove("open");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
});

/* =========================================================
   ANNOUNCEMENT
   ========================================================= */

document.querySelector(".announcement-close").addEventListener("click", () => {
  document.querySelector(".announcement").style.display = "none";
});

/* =========================================================
   IMAGE ERROR FALLBACK
   ========================================================= */

document.addEventListener("error", event => {
  if (
    event.target.tagName === "IMG" &&
    event.target.dataset.fallbackApplied !== "true"
  ) {
    event.target.dataset.fallbackApplied = "true";
    event.target.src =
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=80";
  }
}, true);

/* =========================================================
   INITIALIZE
   ========================================================= */

applySavedTheme();
renderProducts();
renderBestSellers();
updateCartUI();
