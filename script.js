 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBc1DZlKPE7bc-hyaDy7NHMJxnCepKIzqI",
  authDomain: "suraka-cfb2d.firebaseapp.com",
  projectId: "suraka-cfb2d",
  storageBucket: "suraka-cfb2d.firebasestorage.app",
  messagingSenderId: "1082260408358",
  appId: "1:1082260408358:web:41aa9f7cb0bd778408bee7",
  measurementId: "G-PTVR815MCF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const perfumesCol = collection(db, "perfumes"); 
const ordersCol = collection(db, "orders");
/* =========================================================
   SURAQA — Vanilla JavaScript E-Commerce (AR/EN)
   ========================================================= */

const products = [
  {
    id: 1,
    name: "SURAQA Noir",
    nameAr: "سراقة نوار",
    category: "men",
    categoryLabel: "For Him",
    categoryLabelAr: "رجالي",
    price: 1290,
    rating: 4.9,
    reviews: 128,
    description: "A deep and sophisticated composition of amber, oud and warm woods.",
    descriptionAr: "تركيبة عميقة وأنيقة من العود والعنبر والأخشاب الدافئة.",
    notes: ["Oud", "Amber", "Cedarwood"],
    notesAr: ["عود", "عنبر", "خشب الأرز"],
    badge: "Bestseller",
    badgeAr: "الأكثر مبيعًا",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 2,
    name: "SURAQA Élan",
    nameAr: "سراقة إيلان",
    category: "unisex",
    categoryLabel: "Unisex",
    categoryLabelAr: "للجنسين",
    price: 1450,
    rating: 4.8,
    reviews: 96,
    description: "Fresh citrus meets elegant musk for a modern signature scent.",
    descriptionAr: "حمضيات منعشة تلتقي بالمسك الأنيق لعطر عصري مميز.",
    notes: ["Bergamot", "Musk", "Vetiver"],
    notesAr: ["برغموت", "مسك", "فيتيفر"],
    badge: "New",
    badgeAr: "جديد",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 3,
    name: "SURAQA Oud",
    nameAr: "سراقة عود",
    category: "men",
    categoryLabel: "For Him",
    categoryLabelAr: "رجالي",
    price: 1690,
    rating: 4.9,
    reviews: 174,
    description: "Rich oriental oud balanced with saffron, leather and smooth sandalwood.",
    descriptionAr: "عود شرقي غني متوازن مع الزعفران والجلد وخشب الصندل الناعم.",
    notes: ["Oud", "Saffron", "Leather"],
    notesAr: ["عود", "زعفران", "جلد"],
    badge: "Signature",
    badgeAr: "توقيعي",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 4,
    name: "SURAQA Velvet",
    nameAr: "سراقة فيلفيت",
    category: "women",
    categoryLabel: "For Her",
    categoryLabelAr: "نسائي",
    price: 1390,
    rating: 4.8,
    reviews: 113,
    description: "A soft floral veil wrapped in vanilla, rose and creamy sandalwood.",
    descriptionAr: "لمسة زهرية ناعمة ملفوفة بالفانيليا والورد وخشب الصندل الكريمي.",
    notes: ["Rose", "Vanilla", "Sandalwood"],
    notesAr: ["ورد", "فانيليا", "خشب الصندل"],
    badge: "Bestseller",
    badgeAr: "الأكثر مبيعًا",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: true
  },
  {
    id: 5,
    name: "SURAQA Aura",
    nameAr: "سراقة أورا",
    category: "unisex",
    categoryLabel: "Unisex",
    categoryLabelAr: "للجنسين",
    price: 1190,
    rating: 4.7,
    reviews: 81,
    description: "Clean white florals and musk create an effortlessly elegant aura.",
    descriptionAr: "زهور بيضاء نقية ومسك يخلقان هالة أنيقة بلا عناء.",
    notes: ["White Musk", "Iris", "Jasmine"],
    notesAr: ["مسك أبيض", "إيريس", "ياسمين"],
    badge: "",
    badgeAr: "",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85",
    featured: true,
    bestseller: false
  },
  {
    id: 6,
    name: "SURAQA Royal",
    nameAr: "سراقة رويال",
    category: "men",
    categoryLabel: "For Him",
    categoryLabelAr: "رجالي",
    price: 1850,
    rating: 4.9,
    reviews: 142,
    description: "An intense royal blend of spices, leather, amber and precious woods.",
    descriptionAr: "مزيج ملكي قوي من التوابل والجلد والعنبر والأخشاب النفيسة.",
    notes: ["Spices", "Leather", "Amber"],
    notesAr: ["توابل", "جلد", "عنبر"],
    badge: "Luxury",
    badgeAr: "فاخر",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: true
  },
  {
    id: 7,
    name: "SURAQA Bloom",
    nameAr: "سراقة بلوم",
    category: "women",
    categoryLabel: "For Her",
    categoryLabelAr: "نسائي",
    price: 1250,
    rating: 4.8,
    reviews: 104,
    description: "A radiant bouquet of blooming flowers with a delicate fruity finish.",
    descriptionAr: "باقة زاهية من الأزهار المتفتحة بلمسة فاكهية رقيقة.",
    notes: ["Peony", "Peach", "Musk"],
    notesAr: ["فاوانيا", "خوخ", "مسك"],
    badge: "New",
    badgeAr: "جديد",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: false
  },
   {
    id: 7,
    name: "SURAQA Bloom",
    nameAr: "سراقة بلوم",
    category: "women",
    categoryLabel: "For Her",
    categoryLabelAr: "نسائي",
    price: 1250,
    rating: 4.8,
    reviews: 104,
    description: "A radiant bouquet of blooming flowers with a delicate fruity finish.",
    descriptionAr: "باقة زاهية من الأزهار المتفتحة بلمسة فاكهية رقيقة.",
    notes: ["Peony", "Peach", "Musk"],
    notesAr: ["فاوانيا", "خوخ", "مسك"],
    badge: "New",
    badgeAr: "جديد",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: false
  },
   {
    id: 7,
    name: "SURAQA Bloom",
    nameAr: "سراقة بلوم",
    category: "women",
    categoryLabel: "For Her",
    categoryLabelAr: "نسائي",
    price: 1250,
    rating: 4.8,
    reviews: 104,
    description: "A radiant bouquet of blooming flowers with a delicate fruity finish.",
    descriptionAr: "باقة زاهية من الأزهار المتفتحة بلمسة فاكهية رقيقة.",
    notes: ["Peony", "Peach", "Musk"],
    notesAr: ["فاوانيا", "خوخ", "مسك"],
    badge: "New",
    badgeAr: "جديد",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: false
  },
  {
    id: 8,
    name: "SURAQA Intense",
    nameAr: "سراقة إنتنس",
    category: "unisex",
    categoryLabel: "Unisex",
    categoryLabelAr: "للجنسين",
    price: 1590,
    rating: 4.9,
    reviews: 137,
    description: "A magnetic evening fragrance built around incense, vanilla and dark woods.",
    descriptionAr: "عطر مسائي جذاب يقوم على البخور والفانيليا والأخشاب الداكنة.",
    notes: ["Incense", "Vanilla", "Dark Woods"],
    notesAr: ["بخور", "فانيليا", "أخشاب داكنة"],
    badge: "Bestseller",
    badgeAr: "الأكثر مبيعًا",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
    featured: false,
    bestseller: true
  }
];

/* =========================================================
   TRANSLATIONS (dynamic strings)
   ========================================================= */

const i18n = {
  ar: {
    reviews: "تقييم",
    quickView: "عرض سريع",
    addToCart: "أضف إلى السلة",
    unavailable: "غير متاح",
    unavailableText: "هذا المنتج غير متاح حاليًا.",
    addedTitle: "تمت الإضافة إلى السلة",
    addedText: (name) => `تمت إضافة ${name} إلى مختاراتك.`,
    removedTitle: "تم الحذف",
    removedText: "تمت إزالة المنتج من سلتك.",
    wishlistAddedTitle: "أُضيف إلى المفضلة",
    wishlistAddedText: "يمكنك العثور على هذا العطر هنا في أي وقت.",
    wishlistRemovedTitle: "تحديث المفضلة",
    wishlistRemovedText: "تمت الإزالة من المفضلة.",
    emptyCartTitle: "سلتك فارغة",
    emptyCartText: "اكتشف عطرًا يصنع لحظتك القادمة التي لا تُنسى.",
    exploreFragrances: "تسوّق العطور",
    emptyCartToastTitle: "سلتك فارغة",
    emptyCartToastText: "أضف عطرًا قبل إتمام الشراء.",
    checkoutReadyTitle: "الدفع جاهز",
    checkoutReadyText: "هذا العرض التجريبي جاهز للربط بنظام الدفع الخاص بك.",
    subscribedTitle: "تم التسجيل",
    subscribedText: "شكرًا لانضمامك إلى عالم سراقة.",
    enterEmail: "من فضلك أدخل بريدك الإلكتروني.",
    invalidEmail: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.",
    welcomeMessage: "مرحبًا بك في عالم سراقة.",
    addToWishlist: "أضف إلى المفضلة",
    removeFromWishlist: "أزل من المفضلة"
  },
  en: {
    reviews: "reviews",
    quickView: "Quick View",
    addToCart: "Add to Cart",
    unavailable: "Unavailable",
    unavailableText: "This product is currently unavailable.",
    addedTitle: "Added to cart",
    addedText: (name) => `${name} is now in your selection.`,
    removedTitle: "Removed",
    removedText: "The item was removed from your cart.",
    wishlistAddedTitle: "Saved to favorites",
    wishlistAddedText: "You can find this fragrance here anytime.",
    wishlistRemovedTitle: "Wishlist updated",
    wishlistRemovedText: "Removed from your favorites.",
    emptyCartTitle: "Your cart is empty",
    emptyCartText: "Discover a fragrance made for your next unforgettable moment.",
    exploreFragrances: "Explore Fragrances",
    emptyCartToastTitle: "Your cart is empty",
    emptyCartToastText: "Add a fragrance before checkout.",
    checkoutReadyTitle: "Checkout ready",
    checkoutReadyText: "This demo is ready to connect to your payment system.",
    subscribedTitle: "You're on the list",
    subscribedText: "Thank you for joining the SURAQA world.",
    enterEmail: "Please enter your email address.",
    invalidEmail: "Please enter a valid email address.",
    welcomeMessage: "Welcome to the SURAQA world.",
    addToWishlist: "Add to wishlist",
    removeFromWishlist: "Remove from wishlist"
  }
};

/* =========================================================
   STATE
   ========================================================= */

let cart = loadCart();
let wishlist = loadWishlist();
let currentCategory = "all";
let currentSearch = "";
let currentSort = "featured";
let selectedProduct = null;
let currentPage = 1;
const PRODUCTS_PER_PAGE = 8;
let selectedSize = 50; // الحجم الافتراضي 50 مل

// نسب تسعير الأحجام بناءً على السعر الأساسي للـ 50 مل
const SIZE_MULTIPLIERS = {
  10: 0.30,  // عينة تجربة 10 مل
  30: 0.65,  // 30 مل
  50: 1.00,  // 50 مل (السعر الأصلي)
  100: 1.70  // 100 مل توفير
};

function getPriceForSize(basePrice, size = 50) {
  return Math.round((basePrice * (SIZE_MULTIPLIERS[size] || 1)) / 10) * 10;
}
let modalQty = 1;
let toastTimeout;
let currentLang = loadLang();

/* =========================================================
   DOM
   ========================================================= */

const productsGrid = document.getElementById("productsGrid");
const bestProductsGrid = document.getElementById("bestProductsGrid");
const noProducts = document.getElementById("noProducts");
const paginationEl = document.getElementById("pagination");
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
const modalQuantityEl = document.getElementById("modalQuantity");

/* =========================================================
   HELPERS
   ========================================================= */

function t(key) {
  return i18n[currentLang][key];
}

function formatPrice(price) {
  const num = price.toLocaleString(currentLang === "ar" ? "ar-EG" : "en-EG");
  return currentLang === "ar" ? `${num} جنيه` : `${num} EGP`;
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

function loadLang() {
  const saved = localStorage.getItem("arig-lang");
  return saved === "en" ? "en" : "ar";
}

function saveLang() {
  localStorage.setItem("arig-lang", currentLang);
}

function getProduct(id) {
  return products.find(product => String(product.id) === String(id));
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
    if (!product) return total;
    const itemPrice = getPriceForSize(product.price, item.size || 50);
    return total + itemPrice * item.quantity;
  }, 0);
}

function stars(rating) {
  return `★ ${rating.toFixed(1)}`;
}

function productName(product) {
  return currentLang === "ar" ? product.nameAr : product.name;
}

function productCategoryLabel(product) {
  return currentLang === "ar" ? product.categoryLabelAr : product.categoryLabel;
}

function productDescription(product) {
  return currentLang === "ar" ? product.descriptionAr : product.description;
}

function productNotes(product) {
  return currentLang === "ar" ? product.notesAr : product.notes;
}

function productBadge(product) {
  return currentLang === "ar" ? product.badgeAr : product.badge;
}

/* =========================================================
   LANGUAGE
   ========================================================= */

function applyLanguage() {
  document.documentElement.setAttribute("lang", currentLang);
  document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");

  document.querySelectorAll("[data-ar-html], [data-en-html]").forEach(el => {
    const html = currentLang === "ar" ? el.dataset.arHtml : el.dataset.enHtml;
    if (html !== undefined) el.innerHTML = html;
  });

  document.querySelectorAll("[data-ar], [data-en]").forEach(el => {
    const text = currentLang === "ar" ? el.dataset.ar : el.dataset.en;
    if (text !== undefined) el.textContent = text;
  });

  document.querySelectorAll("[data-ar-ph], [data-en-ph]").forEach(el => {
    const ph = currentLang === "ar" ? el.dataset.arPh : el.dataset.enPh;
    if (ph !== undefined) el.setAttribute("placeholder", ph);
  });

  document.querySelectorAll("[data-ar-aria], [data-en-aria]").forEach(el => {
    const aria = currentLang === "ar" ? el.dataset.arAria : el.dataset.enAria;
    if (aria !== undefined) el.setAttribute("aria-label", aria);
  });

  const langBtnText = document.getElementById("langBtnText");
  if (langBtnText) langBtnText.textContent = currentLang === "ar" ? "EN" : "AR";

  renderProducts();
  renderBestSellers();
  updateCartUI();
 updateWishlistCountUI();

  if (selectedProduct) {
    openQuickView(selectedProduct.id);
  }
}

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  saveLang();
  applyLanguage();
}

/* =========================================================
   PRODUCT RENDERING
   ========================================================= */

function productCard(product) {
  const isFavorite = wishlist.includes(product.id);
  const badge = productBadge(product);

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-image-wrap">
        ${badge ? `<span class="product-badge">${escapeHtml(badge)}</span>` : ""}

        <button
          class="wishlist-btn ${isFavorite ? "active" : ""}"
          data-action="wishlist"
          data-id="${product.id}"
          aria-label="${isFavorite ? escapeHtml(t("removeFromWishlist")) : escapeHtml(t("addToWishlist"))}"
          aria-pressed="${isFavorite}"
        >${isFavorite ? "♥" : "♡"}</button>

        <img
          class="product-image"
          src="${product.image}"
          alt="${escapeHtml(productName(product))}"
          loading="lazy"
        >

        <div class="product-actions">
          <button class="quick-btn" data-action="quick" data-id="${product.id}">
            ${escapeHtml(t("quickView"))}
          </button>
          <button class="add-btn" data-action="add" data-id="${product.id}">
            ${escapeHtml(t("addToCart"))}
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-meta">
          <span class="product-category">${escapeHtml(productCategoryLabel(product))}</span>
          <span class="rating">${stars(product.rating)}</span>
        </div>

        <h3 class="product-name">${escapeHtml(productName(product))}</h3>

        <p class="product-description">
          ${escapeHtml(productDescription(product))}
        </p>

        <div class="product-bottom">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span class="product-category">${product.reviews} ${escapeHtml(t("reviews"))}</span>
        </div>

        <button class="mobile-add" data-action="add" data-id="${product.id}">
          ${escapeHtml(t("addToCart"))}
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
    } else if (currentCategory === "wishlist") {
      filtered = filtered.filter(product => wishlist.map(String).includes(String(product.id)));
    } else {
      filtered = filtered.filter(product => product.category === currentCategory);
    }
  }

  if (currentSearch.trim()) {
    const query = currentSearch.toLowerCase().trim();

    filtered = filtered.filter(product =>
      productName(product).toLowerCase().includes(query) ||
      productCategoryLabel(product).toLowerCase().includes(query) ||
      productDescription(product).toLowerCase().includes(query) ||
      productNotes(product).some(note => note.toLowerCase().includes(query))
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
      filtered.sort((a, b) => productName(a).localeCompare(productName(b)));
      break;

    default:
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return filtered;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = 1;
  }

  // تقسيم المنتجات بحد أقصى 8 لكل صفحة
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  productsGrid.innerHTML = paginated.map(productCard).join("");

  if (filtered.length === 0) {
    noProducts.classList.add("visible");
    if (paginationEl) paginationEl.innerHTML = "";
  } else {
    noProducts.classList.remove("visible");
    renderPagination(totalPages);
  }
}

function renderPagination(totalPages) {
  if (!paginationEl) return;
  
  // إخفاء الترقيم إذا كانت الصفحات 1 فقط
  if (totalPages <= 1) {
    paginationEl.innerHTML = "";
    return;
  }

  let buttonsHtml = "";
  for (let i = 1; i <= totalPages; i++) {
    buttonsHtml += `
      <button class="page-num ${i === currentPage ? "active" : ""}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  paginationEl.innerHTML = buttonsHtml;

  paginationEl.querySelectorAll(".page-num").forEach(btn => {
    btn.addEventListener("click", () => {
      currentPage = Number(btn.dataset.page);
      renderProducts();
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    });
  });
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

function addToCart(id, quantity = 1, size = 50) {
  const product = getProduct(id);

  if (!product) {
    showToast(t("unavailable"), t("unavailableText"));
    return;
  }

  // تمييز المنتج في السلة بحسب الحجم المختار
  const existing = cart.find(item => String(item.id) === String(product.id) && Number(item.size || 50) === Number(size));

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      quantity,
      size: Number(size)
    });
  }

  saveCart();
  updateCartUI();
  showToast(t("addedTitle"), `${productName(product)} (${size} مل)`);
}

function removeFromCart(id, size = 50) {
  cart = cart.filter(item => !(String(item.id) === String(id) && Number(item.size || 50) === Number(size)));
  saveCart();
  updateCartUI();
}

function changeQuantity(id, change, size = 50) {
  const item = cart.find(item => String(item.id) === String(id) && Number(item.size || 50) === Number(size));
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(id, size);
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
        <h3>${escapeHtml(t("emptyCartTitle"))}</h3>
        <p>${escapeHtml(t("emptyCartText"))}</p>
        <button class="btn btn-dark" id="continueShopping">${escapeHtml(t("exploreFragrances"))}</button>
      </div>
    `;

    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";

  cartItems.innerHTML = cart.map(item => {
    const product = getProduct(item.id);

    if (!product) return "";

const itemSize = item.size || 50;
    const itemPrice = getPriceForSize(product.price, itemSize);

    return `
      <div class="cart-item">
        <img
          class="cart-item-image"
          src="${product.image}"
          alt="${escapeHtml(productName(product))}"
          loading="lazy"
        >

        <div class="cart-item-info">
          <span class="cart-item-category">${escapeHtml(productCategoryLabel(product))} · <strong style="color:var(--gold);">${itemSize} مل</strong></span>
          <h3 class="cart-item-name">${escapeHtml(productName(product))}</h3>
          <span class="cart-item-price">${formatPrice(itemPrice)}</span>

          <div class="cart-item-controls">
            <button class="cart-qty-btn" data-cart-action="decrease" data-id="${product.id}" data-size="${itemSize}">−</button>
            <span class="cart-qty">${item.quantity}</span>
            <button class="cart-qty-btn" data-cart-action="increase" data-id="${product.id}" data-size="${itemSize}">+</button>
          </div>
        </div>

        <button
          class="remove-item"
          data-cart-action="remove"
          data-id="${product.id}"
          data-size="${itemSize}"
        >&times;</button>
      </div>
    `;
  }).join("");

  cartTotal.textContent = formatPrice(getCartTotal());
}

function openCart() {
  cartDrawer.classList.add("active", "open");
  overlay.classList.add("active", "open");
  document.body.classList.add("no-scroll");
  updateCartUI();
}

function closeCart() {
  cartDrawer.classList.remove("active", "open");
  overlay.classList.remove("active", "open");
  document.body.classList.remove("no-scroll");
}

/* =========================================================
   QUICK VIEW
   ========================================================= */

function openQuickView(id) {
  const product = getProduct(id);
  if (!product) return;

  selectedProduct = product;
  modalQty = 1;
  selectedSize = 50; // ضبط الحجم الافتراضي على 50 مل

  modalImage.src = product.image;
  modalImage.alt = productName(product);
  modalCategory.textContent = productCategoryLabel(product);
  modalName.textContent = productName(product);
  modalRating.textContent = `${stars(product.rating)} · ${product.reviews} ${t("reviews")}`;
  modalDescription.textContent = productDescription(product);
  modalQuantityEl.textContent = modalQty;

  // إعادة ضبط أزرار الأحجام وتعيين 50 مل كافتراضي
  document.querySelectorAll("#modalSizes .size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.size === "50");
  });

  // تحديث السعر بناءً على حجم 50 مل
  modalPrice.textContent = formatPrice(getPriceForSize(product.price, selectedSize));

  modalNotes.innerHTML = productNotes(product)
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

function updateWishlistCountUI() {
  const badge = document.getElementById("wishlistCount");
  if (badge) badge.textContent = wishlist.length;
}

function toggleWishlist(id) {
  const strId = String(id);
  const exists = wishlist.some(item => String(item) === strId);

  if (exists) {
    wishlist = wishlist.filter(item => String(item) !== strId);
    showToast(t("wishlistRemovedTitle"), t("wishlistRemovedText"));
  } else {
    wishlist.push(id);
    showToast(t("wishlistAddedTitle"), t("wishlistAddedText"));
  }

  saveWishlist();
  updateWishlistCountUI();
  renderProducts();
  renderBestSellers();
}

// زر فتح المفضلة من الهيدر
document.getElementById("wishlistNavBtn")?.addEventListener("click", () => {
  currentCategory = "wishlist";
  currentPage = 1;

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === "wishlist");
  });

  renderProducts();
  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
});

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
const id = actionElement.dataset.id;
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
    const id = cartAction.dataset.id;
    const size = Number(cartAction.dataset.size || 50);

    if (action === "increase") {
      changeQuantity(id, 1, size);
    }

    if (action === "decrease") {
      changeQuantity(id, -1, size);
    }

    if (action === "remove") {
      removeFromCart(id, size);
      showToast(t("removedTitle"), t("removedText"));
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
  currentPage = 1;
  renderProducts();
});

/* =========================================================
   SORT
   ========================================================= */

document.getElementById("sortSelect").addEventListener("change", event => {
currentSort = event.target.value;
  currentPage = 1;
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
  currentPage = 1;
  renderProducts();
});

document.getElementById("clearSearch").addEventListener("click", () => {
  searchInput.value = "";
currentSearch = "";
  currentPage = 1;
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

function updateModalPrice() {
  if (!selectedProduct) return;
  const unitPrice = getPriceForSize(selectedProduct.price, selectedSize);
  modalPrice.textContent = formatPrice(unitPrice * modalQty);
}

document.getElementById("modalMinus").addEventListener("click", () => {
  if (modalQty > 1) {
    modalQty--;
    modalQuantityEl.textContent = modalQty;
    updateModalPrice();
  }
});

document.getElementById("modalPlus").addEventListener("click", () => {
  if (modalQty < 20) {
    modalQty++;
    modalQuantityEl.textContent = modalQty;
    updateModalPrice();
  }
});

document.getElementById("modalSizes")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".size-btn");
  if (!btn || !selectedProduct) return;

  document.querySelectorAll("#modalSizes .size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  selectedSize = Number(btn.dataset.size);
  updateModalPrice();
});

document.getElementById("modalAdd").addEventListener("click", () => {
  if (!selectedProduct) return;

  addToCart(selectedProduct.id, modalQty, selectedSize);
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
   THEME (light / dark)
   ========================================================= */

const themeBtn = document.getElementById("themeBtn");

function applySavedTheme() {
  const savedTheme = localStorage.getItem("arig-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
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
   LANGUAGE TOGGLE
   ========================================================= */

document.getElementById("langBtn").addEventListener("click", toggleLanguage);

/* =========================================================
   COLLECTION CARDS
   ========================================================= */

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", () => {
    const collection = card.dataset.collection;

currentCategory = collection;
    currentPage = 1;
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

document.getElementById("viewBestSellers")?.addEventListener("click", () => {
  currentCategory = "bestseller";

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.category === "bestseller"
    );
  });

  renderProducts();

  document.getElementById("shop")?.scrollIntoView({
    behavior: "smooth"
  });
});



/* =========================================================
   CHECKOUT & SHIPPING SYSTEM
   ========================================================= */

// قائمة المحافظات المصرية وأسعار الشحن
const GOVERNORATES = [
  { name: "القاهرة", fee: 45 },
  { name: "الجيزة", fee: 45 },
  { name: "الإسكندرية", fee: 55 },
  { name: "القليوبية", fee: 50 },
  { name: "الغربية", fee: 55 },
  { name: "المنوفية", fee: 55 },
  { name: "الشرقية", fee: 55 },
  { name: "الدقهلية", fee: 55 },
  { name: "البحيرة", fee: 60 },
  { name: "كفر الشيخ", fee: 60 },
  { name: "دمياط", fee: 60 },
  { name: "بورسعيد", fee: 60 },
  { name: "الإسماعيلية", fee: 60 },
  { name: "السويس", fee: 60 },
  { name: "الفيوم", fee: 65 },
  { name: "بني سويف", fee: 70 },
  { name: "المنيا", fee: 75 },
  { name: "أسيوط", fee: 80 },
  { name: "سوهاج", fee: 85 },
  { name: "قنا", fee: 90 },
  { name: "الأقصر", fee: 95 },
  { name: "أسوان", fee: 95 },
  { name: "البحر الأحمر", fee: 100 },
  { name: "مطروح", fee: 90 },
  { name: "الوادي الجديد", fee: 100 },
  { name: "شمال سيناء", fee: 110 },
  { name: "جنوب سيناء", fee: 110 }
];

const checkoutModal = document.getElementById("checkoutModalBackdrop");
const checkoutClose = document.getElementById("checkoutClose");
const custGovSelect = document.getElementById("custGov");
const summarySubtotal = document.getElementById("summarySubtotal");
const summaryShipping = document.getElementById("summaryShipping");
const summaryTotal = document.getElementById("summaryTotal");
const btnLocation = document.getElementById("btnLocation");
const locationStatus = document.getElementById("locationStatus");
const custLocationMap = document.getElementById("custLocationMap");
const transferDetails = document.getElementById("transferDetails");
const transferText = document.getElementById("transferText");
const checkoutForm = document.getElementById("checkoutForm");

// ملء قائمة المحافظات بأمان
if (custGovSelect) {
  GOVERNORATES.forEach(gov => {
    const opt = document.createElement("option");
    opt.value = gov.name;
    opt.textContent = `${gov.name} (${gov.fee} جنيه)`;
    custGovSelect.appendChild(opt);
  });
}

// فتح وإغلاق نافذة الشراء
function openCheckout() {
  if (cart.length === 0) {
    showToast("سلتك فارغة", "أضف عطوراً أولاً لإتمام الشراء.");
    return;
  }
  closeCart();
  updateCheckoutSummary();
  checkoutModal?.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeCheckout() {
  checkoutModal?.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

document.getElementById("checkoutBtn")?.addEventListener("click", openCheckout);
checkoutClose?.addEventListener("click", closeCheckout);
checkoutModal?.addEventListener("click", (e) => {
  if (e.target === checkoutModal) closeCheckout();
});

// حساب تكلفة الشحن والإجمالي (شحن مجاني فوق 1500 ج)
function getShippingFee() {
  const subtotal = getCartTotal();
  if (subtotal >= 1500) return 0;

  const selectedGov = GOVERNORATES.find(g => g.name === custGovSelect.value);
  return selectedGov ? selectedGov.fee : 0;
}

function updateCheckoutSummary() {
  const subtotal = getCartTotal();
  const shipping = getShippingFee();
  const total = subtotal + shipping;

  summarySubtotal.textContent = `${subtotal.toLocaleString("ar-EG")} جنيه`;
  
  if (subtotal >= 1500 && custGovSelect.value) {
    summaryShipping.textContent = "مجاني (عرض الطلبات فوق 1,500)";
  } else {
    summaryShipping.textContent = custGovSelect.value ? `${shipping.toLocaleString("ar-EG")} جنيه` : "اختر المحافظة";
  }

  summaryTotal.textContent = `${total.toLocaleString("ar-EG")} جنيه`;
 syncTransferAmount();
}

custGovSelect?.addEventListener("change", updateCheckoutSummary);
// تفاصيل الدفع الإلكتروني، نسخ الرقم، ورفع صورة الإيصال
const copyNumberBtn = document.getElementById("copyNumberBtn");
const transferHeading = document.getElementById("transferHeading");
const transferAmountVal = document.getElementById("transferAmountVal");
const uploadDropzone = document.getElementById("uploadDropzone");
const receiptFileInput = document.getElementById("receiptFile");
const uploadPrompt = document.getElementById("uploadPrompt");
const uploadPreview = document.getElementById("uploadPreview");
const previewImg = document.getElementById("previewImg");
const previewName = document.getElementById("previewName");
const removeReceiptBtn = document.getElementById("removeReceiptBtn");

let receiptSelectedFile = null;
let receiptBase64 = "";
let selectedPaymentMethod = "cod"; // متغير مباشر لمنع قراءة طريقة الدفع بالخطأ

function syncTransferAmount() {
  if (transferAmountVal) {
    const total = getCartTotal() + getShippingFee();
    transferAmountVal.textContent = `${total.toLocaleString("ar-EG")} جنيه`;
  }
}

// متابعة اختيار طريقة الدفع وحفظها لحظياً
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    selectedPaymentMethod = e.target.value;
    syncTransferAmount();
    if (selectedPaymentMethod === "instapay") {
      transferDetails.style.display = "flex";
      transferHeading.textContent = "تحويل الإجمالي عبر InstaPay";
    } else if (selectedPaymentMethod === "vodafone_cash") {
      transferDetails.style.display = "flex";
      transferHeading.textContent = "تحويل الإجمالي عبر Vodafone Cash";
    } else {
      transferDetails.style.display = "none";
    }
  });
});

// نسخ الرقم
copyNumberBtn?.addEventListener("click", () => {
  navigator.clipboard.writeText("01016118242").then(() => {
    copyNumberBtn.textContent = "تم النسخ ✓";
    showToast("تم النسخ", "تم نسخ الرقم إلى الحافظة.");
    setTimeout(() => { copyNumberBtn.textContent = "نسخ"; }, 2000);
  });
});

// إدارة رفع صورة الإيصال
uploadDropzone?.addEventListener("click", (e) => {
  if (e.target !== removeReceiptBtn) {
    receiptFileInput.click();
  }
});

receiptFileInput?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("حجم الصورة كبير جداً! الحد الأقصى 5 ميجابايت.");
    return;
  }

  receiptSelectedFile = file;
  previewName.textContent = file.name;

  const reader = new FileReader();
  reader.onload = (ev) => {
    receiptBase64 = ev.target.result;
    previewImg.src = ev.target.result;
    uploadPrompt.style.display = "none";
    uploadPreview.style.display = "flex";
  };
  reader.readAsDataURL(file);
});

removeReceiptBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  receiptSelectedFile = null;
  receiptBase64 = "";
  receiptFileInput.value = "";
  uploadPrompt.style.display = "block";
  uploadPreview.style.display = "none";
  previewImg.src = "";
});

// تحديد الموقع الجغرافي بالـ GPS
btnLocation?.addEventListener("click", () => {
  if (!navigator.geolocation) {
    locationStatus.textContent = "المتصفح لا يدعم تحديد الموقع.";
    return;
  }
  locationStatus.textContent = "جاري تحديد موقعك بدقة...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const mapLink = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
      custLocationMap.value = mapLink;
      locationStatus.textContent = "✓ تم التقاط موقعك بنجاح وسيرفق مع الطلب.";
      locationStatus.style.color = "#557c5c";
    },
    (err) => {
      locationStatus.textContent = "تعذر تحديد الموقع. يرجى كتابة العنوان يدوياً.";
      locationStatus.style.color = "#a34e4e";
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

// التحقق من صحة رقم الهاتف المصري
function isValidEgyptianPhone(phone) {
  const regex = /^01[0125][0-9]{8}$/;
  return regex.test(phone.trim());
}

// تأكيد وإرسال الطلب
checkoutForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const phone2 = document.getElementById("custPhone2").value.trim();
  const gov = custGovSelect.value;
  const address = document.getElementById("custAddress").value.trim();
  const locationMap = custLocationMap.value;
  const paymentMethod = selectedPaymentMethod; // استخدام المتغير المباشر بدقة

  if (!isValidEgyptianPhone(phone)) {
    alert("رقم الهاتف الأساسي غير صحيح! يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015).");
    return;
  }

  if (phone2 && !isValidEgyptianPhone(phone2)) {
    alert("رقم الهاتف البديل غير صحيح! يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015).");
    return;
  }

  if (!gov) {
    alert("يرجى اختيار المحافظة لحساب تكلفة الشحن.");
    return;
  }

  if ((paymentMethod === "instapay" || paymentMethod === "vodafone_cash") && !receiptSelectedFile) {
    alert("يرجى رفع صورة إيصال التحويل (Screenshot) أولاً لتأكيد الطلب!");
    return;
  }

  const submitBtn = document.getElementById("submitOrderBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "جاري تأكيد الطلب...";

  const orderItems = cart.map(item => {
    const prod = getProduct(item.id);
    const itemSize = item.size || 50;
    const itemPrice = prod ? getPriceForSize(prod.price, itemSize) : 0;
    return {
      id: item.id,
      name: prod ? `${prod.nameAr || prod.name} (${itemSize} مل)` : "منتج",
      price: itemPrice,
      size: itemSize,
      quantity: item.quantity
    };
  });

  const subtotal = getCartTotal();
  const shippingFee = getShippingFee();
  const total = subtotal + shippingFee;

// 1. رفع الصورة عبر خادم سحابي مباشر متوافق مع المتصفحات
  let receiptLink = "";
  if (receiptSelectedFile) {
    try {
      submitBtn.textContent = "جاري رفع صورة الإيصال...";
      const uploadForm = new FormData();
      uploadForm.append("image", receiptSelectedFile);
      
      const res = await fetch("https://api.imgbb.com/1/upload?key=6d207e02198a847aa5ad0a071ce35e3a", {
        method: "POST",
        body: uploadForm
      });
      const resData = await res.json();
      if (resData?.data?.display_url) {
        receiptLink = resData.data.display_url;
      }
    } catch (err) {
      console.warn("Upload service error:", err);
    }

    // 2. نسخ الصورة تلقائياً لحافظة الجهاز حتى يتمكن العميل من لصقها فوراً
    if (navigator.clipboard && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [receiptSelectedFile.type]: receiptSelectedFile })
        ]);
      } catch (clipErr) {
        console.log("Clipboard write skipped:", clipErr);
      }
    }
  }

  const orderData = {
    customer: {
      name,
      phone,
      secondaryPhone: phone2 || "غير محدد",
      governorate: gov,
      address,
      googleMapsUrl: locationMap || "لم يحدد موقع GPS"
    },
    items: orderItems,
    pricing: {
      subtotal,
      shippingFee,
      total
    },
    paymentMethod,
    receiptImage: receiptBase64, // حفظ الصورة كـ Base64 داخل فايربيز كنسخة أساسية دائمة
    receiptUrl: receiptLink || "تم إرسالها يدوياً",
    status: "new",
    createdAt: new Date()
  };

  try {
    await addDoc(ordersCol, orderData);

    const paymentMethodsNames = {
      cod: "الدفع عند الاستلام (COD)",
      instapay: "انستا باي (InstaPay)",
      vodafone_cash: "فودافون كاش (Vodafone Cash)"
    };

    let receiptMessageText = "غير مطلوب (الدفع عند الاستلام)";
    if (paymentMethod !== "cod") {
      receiptMessageText = receiptLink
        ? `\n🔗 رابط الصورة: ${receiptLink}\n*(تم نسخ الصورة لحافظتك، اضغط لصق/Paste في الشات لإرسالها أيضاً)*`
        : `\n*(تم نسخ صورة الإيصال لحافظتك، اضغط لصق/Paste في هذه المحادثة الآن)*`;
    }

    const itemsSummary = orderItems
      .map(item => `• ${item.name} × ${item.quantity} (${(item.price * item.quantity).toLocaleString("ar-EG")} ج)`)
      .join("\n");

    const waMessage = `*طلب جديد من متجر سراقة — SURAKA* 💎
--------------------------------
👤 *اسم العميل:* ${name}
📱 *الهاتف الأساسي:* ${phone}
📞 *الهاتف البديل:* ${phone2 || "لا يوجد"}
📍 *المحافظة:* ${gov}
🏠 *العنوان بالتفصيل:* ${address}
🗺️ *موقع GPS:* ${locationMap ? locationMap : "لم يُحدد"}
--------------------------------
🛍️ *تفاصيل المنتجات:*
${itemsSummary}
--------------------------------
💰 *قيمة المنتجات:* ${subtotal.toLocaleString("ar-EG")} جنيه
🚚 *مصاريف الشحن:* ${shippingFee === 0 ? "مجاني" : `${shippingFee} جنيه`}
💵 *الإجمالي النهائي:* ${total.toLocaleString("ar-EG")} جنيه
💳 *طريقة الدفع:* ${paymentMethodsNames[paymentMethod]}
🧾 *إيصال التحويل:* ${receiptMessageText}
--------------------------------
✨ تم تسجيل الطلب بنجاح عبر الموقع`;

    cart = [];
    saveCart();
    updateCartUI();
    closeCheckout();
    checkoutForm.reset();
    locationStatus.textContent = "";
    receiptSelectedFile = null;
    receiptBase64 = "";

    showToast("تم تأكيد الطلب! 🎉", "تم نسخ صورة الإيصال.. الصقها في محادثة الواتساب.");

    const waUrl = `https://wa.me/201101579399?text=${encodeURIComponent(waMessage)}`;
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 1200);

  } catch (err) {
    console.error("Firebase Error: ", err);
    alert("حدث خطأ أثناء إرسال الطلب، تأكد من اتصال الإنترنت وحاول مجدداً.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "تأكيد الطلب الآن";
  }
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

// الاستماع للـ Firebase وجلب العطور المضافة لحظياً
onSnapshot(perfumesCol, (snapshot) => {
  const firebaseProducts = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    firebaseProducts.push({
      id: doc.id,
      name: data.name,
      nameAr: data.name,
      category: data.category || "unisex",
      categoryLabel: data.category === 'men' ? 'For Him' : data.category === 'women' ? 'For Her' : 'Unisex',
      categoryLabelAr: data.category === 'men' ? 'رجالي' : data.category === 'women' ? 'نسائي' : 'للجنسين',
      price: Number(data.price),
      rating: 5.0,
      reviews: 1,
      description: data.desc || "",
      descriptionAr: data.desc || "",
      notes: ["سراقة"],
      notesAr: ["سراقة"],
      badge: "جديد",
      badgeAr: "جديد",
      image: data.image || "image/S1.jpg",
      featured: true,
      bestseller: false
    });
  });

  if (firebaseProducts.length > 0) {
    products.length = 0;
    products.push(...firebaseProducts);
  }

  applyLanguage();
});


// --- ADMIN ACCESS (5 CLICKS & SHORTCUT) ---
const ADMIN_PASS = "1234"; // كلمة السر المبدئية
let logoClicks = 0;
let clickTimer;

function checkAdminAuth() {
  const pass = prompt("أدخل كلمة سر لوحة التحكم:");
  if (pass === ADMIN_PASS) {
    window.location.href = "admin.html";
  } else if (pass !== null) {
    alert("كلمة السر غير صحيحة!");
  }
}

// 1. الدخول بـ 5 كليكات على اللوجو
document.querySelector(".logo")?.addEventListener("click", (e) => {
  logoClicks++;
  clearTimeout(clickTimer);
  if (logoClicks === 5) {
    e.preventDefault();
    logoClicks = 0;
    checkAdminAuth();
  } else {
    clickTimer = setTimeout(() => { logoClicks = 0; }, 2000);
  }
});

// 2. الدخول باختصار Shift + Ctrl + A
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.ctrlKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    checkAdminAuth();
  }
});

/* =========================================================
   SCENT FINDER (Floating Guide Button)
   ========================================================= */

(function () {
  const sfBtn = document.getElementById('scentFinderBtn');
  const sfOverlay = document.getElementById('scentFinderOverlay');
  const sfPanel = document.getElementById('scentFinderPanel');
  const sfClose = document.getElementById('sfClose');
  const sfStep1 = document.getElementById('sfStep1');
  const sfStep2 = document.getElementById('sfStep2');
  const sfGoShop = document.getElementById('sfGoShop');

  let selectedCategory = 'all';

  function openPanel() {
    sfOverlay.classList.add('active');
    sfPanel.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closePanel() {
    sfOverlay.classList.remove('active');
    sfPanel.classList.remove('active');
    document.body.classList.remove('no-scroll');
    sfStep1.classList.add('active');
    sfStep2.classList.remove('active');
  }

  sfBtn?.addEventListener('click', openPanel);
  sfClose?.addEventListener('click', closePanel);
  sfOverlay?.addEventListener('click', closePanel);

  document.querySelectorAll('.sf-option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      sfStep1.classList.remove('active');
      sfStep2.classList.add('active');
    });
  });

  sfGoShop?.addEventListener('click', () => {
    closePanel();
    const targetBtn = document.querySelector(`.filter-btn[data-category="${selectedCategory}"]`);
    if (targetBtn) targetBtn.click();
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  });
})();

