 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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
const offersCol = collection(db, "offers");
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
  const isFavorite = wishlist.some(favId => String(favId) === String(product.id));
  const badge = productBadge(product);

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-image-wrap">
        ${badge ? `<span class="product-badge">${escapeHtml(badge)}</span>` : ""}

        <!-- 1. زر المفضلة -->
        <button
          type="button"
          class="wishlist-btn ${isFavorite ? "active" : ""}"
          data-action="wishlist"
          data-id="${product.id}"
          aria-label="${isFavorite ? escapeHtml(t("removeFromWishlist")) : escapeHtml(t("addToWishlist"))}"
          aria-pressed="${isFavorite}"
        >${isFavorite ? "♥" : "♡"}</button>

        <!-- 2. زر العين تحت المفضلة مباشرة -->
        <button
          type="button"
          class="card-eye-btn"
          data-action="open-full-page"
          data-id="${product.id}"
          title="عرض كامل التفاصيل"
          aria-label="عرض كامل التفاصيل"
        >
          <svg viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>

        <img
          class="product-image"
          src="${product.image}"
          alt="${escapeHtml(productName(product))}"
          loading="lazy"
          data-action="open-full-page"
          data-id="${product.id}"
        >
      </div>

      <div class="product-info" data-action="open-full-page" data-id="${product.id}">
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

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  if (productsGrid) {
    productsGrid.innerHTML = paginated.map(productCard).join("");
  }

  if (filtered.length === 0) {
    noProducts?.classList.add("visible");
    if (paginationEl) paginationEl.innerHTML = "";
  } else {
    noProducts?.classList.remove("visible");
    renderPagination(totalPages);
  }
}

function renderPagination(totalPages) {
  if (!paginationEl) return;
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
  if (!bestProductsGrid) return;
  const best = products.filter(product => product.bestseller).slice(0, 4);
  bestProductsGrid.innerHTML = best.map(productCard).join("");
}

/* =========================================================
   CART (يدعم العطور العادية والعروض الترويجية)
   ========================================================= */

function getCartItemDetails(item) {
  if (item.isOffer || String(item.id).startsWith("offer_")) {
    return {
      id: item.id,
      name: item.name || "عرض خاص",
      price: Number(item.price || 0),
      image: item.image || "image/S1.png",
      size: item.size || "باقة حصرية",
      categoryLabel: "عرض ترويجي 🔥"
    };
  }

  const prod = getProduct(item.id);
  if (!prod) return null;

  const size = Number(item.size || 50);
  const price = getPriceForSize(prod.price, size);
  return {
    id: prod.id,
    name: productName(prod),
    price: price,
    image: prod.image,
    size: `${size} مل`,
    categoryLabel: productCategoryLabel(prod)
  };
}

function getCartCount() {
  return cart.reduce((total, item) => {
    return getCartItemDetails(item) ? total + Number(item.quantity || 1) : total;
  }, 0);
}

function getCartTotal() {
  return cart.reduce((total, item) => {
    const details = getCartItemDetails(item);
    return details ? total + (details.price * item.quantity) : total;
  }, 0);
}

function addToCart(id, quantity = 1, size = 50) {
  const product = getProduct(id);
  if (!product) return;

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
  showToast("تمت الإضافة للسلة 🛍️", `${productName(product)} (${size} مل)`);
}

function removeFromCart(id, size) {
  cart = cart.filter(item => !(String(item.id) === String(id) && String(item.size || '') === String(size || '')));
  saveCart();
  updateCartUI();
}

function changeQuantity(id, change, size) {
  const item = cart.find(item => String(item.id) === String(id) && String(item.size || '') === String(size || ''));
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
  // تنظيف السلة مع الاحتفاظ بالعطور والعروض معاً
  cart = cart.filter(item => getCartItemDetails(item) && item.quantity > 0);
  saveCart();

  if (cartCount) cartCount.textContent = getCartCount();
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">⌁</div>
        <h3>${escapeHtml(t("emptyCartTitle"))}</h3>
        <p>${escapeHtml(t("emptyCartText"))}</p>
        <button class="btn btn-dark" id="continueShopping">${escapeHtml(t("exploreFragrances"))}</button>
      </div>
    `;
    if (cartFooter) cartFooter.style.display = "none";
    return;
  }

  if (cartFooter) cartFooter.style.display = "block";

  cartItems.innerHTML = cart.map(item => {
    const details = getCartItemDetails(item);
    if (!details) return "";

    return `
      <div class="cart-item">
        <img class="cart-item-image" src="${details.image}" alt="${escapeHtml(details.name)}" loading="lazy">
        <div class="cart-item-info">
          <span class="cart-item-category">${escapeHtml(details.categoryLabel)} · <strong style="color:var(--gold);">${details.size}</strong></span>
          <h3 class="cart-item-name">${escapeHtml(details.name)}</h3>
          <span class="cart-item-price">${formatPrice(details.price)}</span>
          <div class="cart-item-controls">
            <button class="cart-qty-btn" data-cart-action="decrease" data-id="${details.id}" data-size="${item.size || ''}">−</button>
            <span class="cart-qty">${item.quantity}</span>
            <button class="cart-qty-btn" data-cart-action="increase" data-id="${details.id}" data-size="${item.size || ''}">+</button>
          </div>
        </div>
        <button class="remove-item" data-cart-action="remove" data-id="${details.id}" data-size="${item.size || ''}">&times;</button>
      </div>
    `;
  }).join("");

  if (cartTotal) cartTotal.textContent = formatPrice(getCartTotal());
}

function openCart() {
  cartDrawer?.classList.add("active", "open");
  overlay?.classList.add("active", "open");
  document.body.classList.add("no-scroll");
  updateCartUI();
}

function closeCart() {
  cartDrawer?.classList.remove("active", "open");
  overlay?.classList.remove("active", "open");
  document.body.classList.remove("no-scroll");
}

/* =========================================================
   FULL PRODUCT PAGE LOGIC (صفحة العطر الشاملة)
   ========================================================= */
const productFullPage = document.getElementById("productFullPage");
const closeProductPageBtn = document.getElementById("closeProductPage");
const pfpImage = document.getElementById("pfpImage");
const pfpCategory = document.getElementById("pfpCategory");
const pfpName = document.getElementById("pfpName");
const pfpRating = document.getElementById("pfpRating");
const pfpReviews = document.getElementById("pfpReviews");
const pfpDesc = document.getElementById("pfpDesc");
const pfpNotes = document.getElementById("pfpNotes");
const pfpPrice = document.getElementById("pfpPrice");
const pfpQtyVal = document.getElementById("pfpQtyVal");
const pfpAddBtn = document.getElementById("pfpAddBtn");
const pfpRelatedGrid = document.getElementById("pfpRelatedGrid");

let currentPfpProduct = null;
let currentPfpSize = 50;
let currentPfpQty = 1;
function updatePfpPriceDisplay() {
  if (!currentPfpProduct || !pfpPrice) return;
  const unitPrice = (currentPfpProduct.sizes && currentPfpProduct.sizes[currentPfpSize]) 
    ? Number(currentPfpProduct.sizes[currentPfpSize]) 
    : getPriceForSize(currentPfpProduct.price, currentPfpSize);
  
  pfpPrice.textContent = formatPrice(unitPrice * currentPfpQty);

  // التحقق من مخزون الحجم المختار تحديداً
  const stocks = currentPfpProduct.stocks || {};
  const sizeStock = stocks[currentPfpSize] !== undefined ? Number(stocks[currentPfpSize]) : 20;

  if (pfpAddBtn) {
    if (sizeStock <= 0) {
      pfpAddBtn.disabled = true;
      pfpAddBtn.style.opacity = "0.5";
      pfpAddBtn.style.cursor = "not-allowed";
      pfpAddBtn.innerHTML = `<span>❌</span><span>نفدت كمية (${currentPfpSize} مل)</span>`;
    } else {
      pfpAddBtn.disabled = false;
      pfpAddBtn.style.opacity = "1";
      pfpAddBtn.style.cursor = "pointer";
      pfpAddBtn.innerHTML = `<span>🛒</span><span>أضف إلى السلة (متبقي ${sizeStock} فقط)</span>`;
    }
  }
}

function openProductFullPage(id) {
  const prod = getProduct(id);
  if (!prod) return;

  const pageEl = document.getElementById("productFullPage");
  if (!pageEl) return;

  currentPfpProduct = prod;
  currentPfpSize = 50;
  currentPfpQty = 1;

  if (pfpImage) { pfpImage.src = prod.image || "image/S1.png"; pfpImage.alt = productName(prod); }
  if (pfpCategory) pfpCategory.textContent = productCategoryLabel(prod);
  if (pfpName) pfpName.textContent = productName(prod);
  if (pfpRating) pfpRating.textContent = `★ ${Number(prod.rating || 5).toFixed(1)}`;
  if (pfpReviews) pfpReviews.textContent = `(${prod.reviews || 1} ${t("reviews")})`;
  if (pfpDesc) pfpDesc.textContent = productDescription(prod) || "";
  if (pfpQtyVal) pfpQtyVal.textContent = "1";

  document.querySelectorAll("#pfpSizes .pfp-size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.size === "50");
  });

  if (pfpNotes) {
    const notesList = (currentLang === "ar" ? prod.notesAr : prod.notes) || ["سراقة"];
    pfpNotes.innerHTML = notesList.map(n => `<span>${escapeHtml(n)}</span>`).join("");
  }

  updatePfpPriceDisplay();
  renderRelatedPerfumes(prod);

  pageEl.style.setProperty("display", "block", "important");
  document.body.classList.add("no-scroll");
  pageEl.scrollTop = 0;
}

function closeProductFullPage() {
  if (!productFullPage) return;
  productFullPage.style.display = "none";
  document.body.classList.remove("no-scroll");
  currentPfpProduct = null;
}

closeProductPageBtn?.addEventListener("click", closeProductFullPage);

document.getElementById("pfpSizes")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".pfp-size-btn");
  if (!btn || !currentPfpProduct) return;

  document.querySelectorAll("#pfpSizes .pfp-size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  currentPfpSize = Number(btn.dataset.size);
  updatePfpPriceDisplay();
});

document.getElementById("pfpQtyMinus")?.addEventListener("click", () => {
  if (currentPfpQty > 1) {
    currentPfpQty--;
    if (pfpQtyVal) pfpQtyVal.textContent = currentPfpQty;
    updatePfpPriceDisplay();
  }
});

document.getElementById("pfpQtyPlus")?.addEventListener("click", () => {
  if (currentPfpQty < 20) {
    currentPfpQty++;
    if (pfpQtyVal) pfpQtyVal.textContent = currentPfpQty;
    updatePfpPriceDisplay();
  }
});

pfpAddBtn?.addEventListener("click", () => {
  if (!currentPfpProduct) return;

  addToCart(currentPfpProduct.id, currentPfpQty, currentPfpSize);

  pfpAddBtn.style.background = "#2ecc71";
  const label = pfpAddBtn.querySelector("span:last-child");
  if (label) label.textContent = "✓ تمت الإضافة بنجاح!";

  setTimeout(() => {
    pfpAddBtn.style.background = "var(--gold)";
    if (label) label.textContent = "أضف إلى السلة";
  }, 1800);
});

function renderRelatedPerfumes(mainProduct) {
  if (!pfpRelatedGrid) return;

  const related = products
    .filter(p => p.category === mainProduct.category && String(p.id) !== String(mainProduct.id))
    .slice(0, 4);

  const fallback = related.length > 0 
    ? related 
    : products.filter(p => String(p.id) !== String(mainProduct.id)).slice(0, 4);

  pfpRelatedGrid.innerHTML = fallback.map(productCard).join("");
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
  if (!toast) return;

  if (toastTitle) toastTitle.textContent = title;
  if (toastText) toastText.textContent = text;

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
  const openPageTrigger = event.target.closest('[data-action="open-full-page"]');
  if (openPageTrigger && !event.target.closest('.wishlist-btn')) {
    const id = openPageTrigger.dataset.id;
    openProductFullPage(id);
    return;
  }

  const actionElement = event.target.closest("[data-action]");
  if (actionElement) {
    const action = actionElement.dataset.action;
    const id = actionElement.dataset.id;

    if (action === "wishlist") {
      toggleWishlist(id);
      return;
    }
  }

  const cartAction = event.target.closest("[data-cart-action]");
  if (cartAction) {
    const action = cartAction.dataset.cartAction;
    const id = cartAction.dataset.id;
    const size = Number(cartAction.dataset.size || 50);

    if (action === "increase") changeQuantity(id, 1, size);
    if (action === "decrease") changeQuantity(id, -1, size);
    if (action === "remove") {
      removeFromCart(id, size);
      showToast(t("removedTitle"), t("removedText"));
    }
    return;
  }

  if (event.target.id === "continueShopping") {
    closeCart();
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }
});

/* =========================================================
   CATEGORY FILTERING
   ========================================================= */

document.getElementById("categoryTabs")?.addEventListener("click", event => {
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
   SORT & SEARCH
   ========================================================= */

document.getElementById("sortSelect")?.addEventListener("change", event => {
  currentSort = event.target.value;
  currentPage = 1;
  renderProducts();
});

const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

document.getElementById("searchBtn")?.addEventListener("click", () => {
  searchPanel?.classList.toggle("open");
  if (searchPanel?.classList.contains("open")) {
    setTimeout(() => searchInput?.focus(), 250);
  }
});

searchInput?.addEventListener("input", event => {
  currentSearch = event.target.value;
  currentPage = 1;
  renderProducts();
});

document.getElementById("clearSearch")?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  currentSearch = "";
  currentPage = 1;
  renderProducts();
  searchInput?.focus();
});

/* =========================================================
   CART CONTROLS
   ========================================================= */

document.getElementById("cartBtn")?.addEventListener("click", openCart);
document.getElementById("closeCart")?.addEventListener("click", closeCart);
overlay?.addEventListener("click", closeCart);

/* =========================================================
   MOBILE NAV & NAVBAR
   ========================================================= */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

mobileMenuBtn?.addEventListener("click", () => {
  const isOpen = mobileNav?.classList.toggle("open");
  mobileMenuBtn.classList.toggle("active", isOpen);
  mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    mobileMenuBtn?.classList.remove("active");
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
  });
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* =========================================================
   THEME (Light / Dark) & LANGUAGE
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

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "arig-theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

document.getElementById("langBtn")?.addEventListener("click", toggleLanguage);

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", () => {
    const collection = card.dataset.collection;
    currentCategory = collection;
    currentPage = 1;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === collection);
    });
    renderProducts();
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("viewBestSellers")?.addEventListener("click", () => {
  currentCategory = "bestseller";
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === "bestseller");
  });
  renderProducts();
  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
});

/* =========================================================
   CHECKOUT & SHIPPING SYSTEM
   ========================================================= */

const GOVERNORATES = [
  { name: "القاهرة", fee: 45 }, { name: "الجيزة", fee: 45 }, { name: "الإسكندرية", fee: 55 },
  { name: "القليوبية", fee: 50 }, { name: "الغربية", fee: 55 }, { name: "المنوفية", fee: 55 },
  { name: "الشرقية", fee: 55 }, { name: "الدقهلية", fee: 55 }, { name: "البحيرة", fee: 60 },
  { name: "كفر الشيخ", fee: 60 }, { name: "دمياط", fee: 60 }, { name: "بورسعيد", fee: 60 },
  { name: "الإسماعيلية", fee: 60 }, { name: "السويس", fee: 60 }, { name: "الفيوم", fee: 65 },
  { name: "بني سويف", fee: 70 }, { name: "المنيا", fee: 75 }, { name: "أسيوط", fee: 80 },
  { name: "سوهاج", fee: 85 }, { name: "قنا", fee: 90 }, { name: "الأقصر", fee: 95 },
  { name: "أسوان", fee: 95 }, { name: "البحر الأحمر", fee: 100 }, { name: "مطروح", fee: 90 },
  { name: "الوادي الجديد", fee: 100 }, { name: "شمال سيناء", fee: 110 }, { name: "جنوب سيناء", fee: 110 }
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
const checkoutForm = document.getElementById("checkoutForm");

if (custGovSelect) {
  GOVERNORATES.forEach(gov => {
    const opt = document.createElement("option");
    opt.value = gov.name;
    opt.textContent = `${gov.name} (${gov.fee} جنيه)`;
    custGovSelect.appendChild(opt);
  });
}

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

function getShippingFee() {
  const subtotal = getCartTotal();
  if (subtotal >= 1500) return 0;
  const selectedGov = GOVERNORATES.find(g => g.name === custGovSelect?.value);
  return selectedGov ? selectedGov.fee : 0;
}

function updateCheckoutSummary() {
  const subtotal = getCartTotal();
  const shipping = getShippingFee();
  const total = subtotal + shipping;

  if (summarySubtotal) summarySubtotal.textContent = `${subtotal.toLocaleString("ar-EG")} جنيه`;
  if (summaryShipping) {
    if (subtotal >= 1500 && custGovSelect?.value) {
      summaryShipping.textContent = "مجاني (عرض الطلبات فوق 1,500)";
    } else {
      summaryShipping.textContent = custGovSelect?.value ? `${shipping.toLocaleString("ar-EG")} جنيه` : "اختر المحافظة";
    }
  }
  if (summaryTotal) summaryTotal.textContent = `${total.toLocaleString("ar-EG")} جنيه`;
}

custGovSelect?.addEventListener("change", updateCheckoutSummary);

let selectedPaymentMethod = "cod";
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    selectedPaymentMethod = e.target.value;
    if (transferDetails) {
      transferDetails.style.display = (selectedPaymentMethod === "instapay" || selectedPaymentMethod === "vodafone_cash") ? "flex" : "none";
    }
  });
});

document.getElementById("copyNumberBtn")?.addEventListener("click", () => {
  navigator.clipboard.writeText("01016118242").then(() => {
    showToast("تم النسخ", "تم نسخ الرقم إلى الحافظة.");
  });
});

btnLocation?.addEventListener("click", () => {
  if (!navigator.geolocation) {
    if (locationStatus) locationStatus.textContent = "المتصفح لا يدعم تحديد الموقع.";
    return;
  }
  if (locationStatus) locationStatus.textContent = "جاري تحديد موقعك بدقة...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const mapLink = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
      if (custLocationMap) custLocationMap.value = mapLink;
      if (locationStatus) {
        locationStatus.textContent = "✓ تم التقاط موقعك بنجاح وسيرفق مع الطلب.";
        locationStatus.style.color = "#557c5c";
      }
    },
    () => {
      if (locationStatus) {
        locationStatus.textContent = "تعذر تحديد الموقع. يرجى كتابة العنوان يدوياً.";
        locationStatus.style.color = "#a34e4e";
      }
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

function isValidEgyptianPhone(phone) {
  return /^01[0125][0-9]{8}$/.test(phone.trim());
}

checkoutForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const phone2 = document.getElementById("custPhone2").value.trim();
  const gov = custGovSelect.value;
  const address = document.getElementById("custAddress").value.trim();
  const locationMap = custLocationMap.value;
  const paymentMethod = selectedPaymentMethod;

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

  const submitBtn = document.getElementById("submitOrderBtn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "جاري تأكيد الطلب...";
  }

const orderItems = cart.map(item => {
    const details = getCartItemDetails(item);
    return {
      id: item.id,
      name: details ? `${details.name} (${details.size})` : "منتج",
      price: details ? details.price : 0,
      size: details ? details.size : 50,
      quantity: item.quantity
    };
  });

  const subtotal = getCartTotal();
  const shippingFee = getShippingFee();
  const total = subtotal + shippingFee;

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
    pricing: { subtotal, shippingFee, total },
    paymentMethod,
    paymentProof: paymentMethod === "cod" ? "دفع عند الاستلام" : "سيرسل في شات الواتساب",
    status: "new",
    createdAt: new Date()
  };

  try {
    await addDoc(ordersCol, orderData);

for (const item of cart) {
      try {
        if (!String(item.id).startsWith("offer_")) {
          const perfumeDocRef = doc(db, "perfumes", String(item.id));
          const sizeNum = Number(item.size || 50);
          await updateDoc(perfumeDocRef, {
            [`stocks.${sizeNum}`]: increment(-Number(item.quantity || 1)),
            stock: increment(-Number(item.quantity || 1))
          });
        }
      } catch (stockErr) {
        console.warn("Stock update skipped for item:", item.id);
      }
    }

    const paymentMethodsNames = {
      cod: "الدفع عند الاستلام (COD)",
      instapay: "انستا باي (InstaPay)",
      vodafone_cash: "فودافون كاش (Vodafone Cash)"
    };

    let receiptMessageText = "غير مطلوب (الدفع عند الاستلام)";
    if (paymentMethod !== "cod") {
      receiptMessageText = "📸 سأقوم بإرفاق صورة إيصال التحويل (Screenshot) هنا في الشات الآن لتأكيد الشحن.";
    }

    const itemsSummary = orderItems
      .map(item => `• ${item.name} × ${item.quantity} (${(item.price * item.quantity).toLocaleString("ar-EG")} ج)`)
      .join("\n");

    const waMessage = `*طلب جديد من متجر سراقة — SURAQA* 💎
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
🧾 *إيصال التحويل:* 
${receiptMessageText}
--------------------------------
✨ تم تسجيل الطلب بنجاح عبر الموقع`;

    cart = [];
    saveCart();
    updateCartUI();
    closeCheckout();
    checkoutForm.reset();
    if (locationStatus) locationStatus.textContent = "";

    showToast("تم تأكيد الطلب بنجاح! 🎉", "جاري توجيهك إلى واتساب...");

    const waUrl = `https://wa.me/201016118242?text=${encodeURIComponent(waMessage)}`;
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 1000);

  } catch (err) {
    console.error("Firebase Error: ", err);
    alert("حدث خطأ أثناء إرسال الطلب، تأكد من اتصال الإنترنت وحاول مجدداً.");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "تأكيد الطلب الآن";
    }
  }
});

/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeProductFullPage();
    mobileNav?.classList.remove("open");
    mobileMenuBtn?.classList.remove("active");
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
  }
});

/* =========================================================
   INITIALIZE & FIRESTORE REALTIME LISTENER
   ========================================================= */

applySavedTheme();

onSnapshot(perfumesCol, (snapshot) => {
  const firebaseProducts = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    firebaseProducts.push({
      id: docSnap.id,
      name: data.name,
      nameAr: data.name,
      category: data.category || "unisex",
      categoryLabel: data.category === 'men' ? 'For Him' : data.category === 'women' ? 'For Her' : 'Unisex',
      categoryLabelAr: data.category === 'men' ? 'رجالي' : data.category === 'women' ? 'نسائي' : 'للجنسين',
      price: Number(data.price),
     sizes: data.sizes || null, // قراءة أسعار الأحجام المحددة من المشرف
      rating: 5.0,
      reviews: 1,
      description: data.desc || "",
      descriptionAr: data.desc || "",
      notes: ["سراقة"],
      notesAr: ["سراقة"],
      badge: "جديد",
      badgeAr: "جديد",
      image: data.image || "image/S1.png",
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

// الدخول للوحة التحكم
const ADMIN_PASS = "01016118242";
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

// فتح لوحة التحكم عند الضغط 5 مرات على لوجو المتجر أو لوجو شاشة الإغلاق
function handleSecretLogoClicks(e) {
  logoClicks++;
  clearTimeout(clickTimer);
  if (logoClicks === 5) {
    e.preventDefault();
    logoClicks = 0;
    checkAdminAuth();
  } else {
    clickTimer = setTimeout(() => { logoClicks = 0; }, 2000);
  }
}

// 1. لوجو الهيدر في الموقع العادي
document.querySelector(".logo")?.addEventListener("click", handleSecretLogoClicks);

// 2. لوجو شاشة الصلاة على النبي أثناء إغلاق المتجر
document.querySelector(".closed-logo")?.addEventListener("click", handleSecretLogoClicks);
document.querySelector(".logo-aura-wrap")?.addEventListener("click", handleSecretLogoClicks);

document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.ctrlKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    checkAdminAuth();
  }
});

/* =========================================================
   إخفاء أزرار التواصل والشريط خارج الرئيسية
   ========================================================= */
const homeSec = document.getElementById("home");
const tickerWrap = document.querySelector(".ticker-wrap");
const navbarEl = document.getElementById("navbar");
const waBtn = document.querySelector(".whatsapp-btn");
const sfBtn = document.getElementById("scentFinderBtn");

if (homeSec) {
  const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const isHome = entry.isIntersecting;
      tickerWrap?.classList.toggle("hidden", !isHome);
      navbarEl?.classList.toggle("top-zero", !isHome);
      waBtn?.classList.toggle("hidden", !isHome);
      sfBtn?.classList.toggle("hidden", !isHome);
    });
  }, { threshold: 0.15 });

  homeObserver.observe(homeSec);
}

/* =========================================================
   مراقبة إغلاق المتجر وتغيير الألوان الـ 22 تلقائياً للعملاء
   ========================================================= */
const THEME_PRESETS = {
  "emerald": { dark: "#071914", main: "#0a221c", card: "#0f3027", gold: "#d4af37", bg: "radial-gradient(circle at 85% 0%, rgba(212,175,55,0.06), transparent 26%), #071914" },
  "obsidian": { dark: "#0a0a0a", main: "#121212", card: "#1a1a1a", gold: "#dfb743", bg: "radial-gradient(circle at 50% 0%, #1f1a10, #0a0a0a)" },
  "royal-navy": { dark: "#060d1a", main: "#0b172e", card: "#102244", gold: "#e5c158", bg: "radial-gradient(circle at 80% 10%, #10254c, #060d1a)" },
  "velvet-burgundy": { dark: "#18060b", main: "#270c14", card: "#3a131e", gold: "#e6be65", bg: "radial-gradient(circle at 75% 15%, #42101f, #18060b)" },
  "imperial-purple": { dark: "#12081c", main: "#1c0f2b", card: "#29173e", gold: "#f3cc68", bg: "radial-gradient(circle at 85% 10%, #3a1c59, #12081c)" },
  "sapphire-mist": { dark: "#07121b", main: "#0c1d2a", card: "#132b3d", gold: "#64b5f6", bg: "linear-gradient(145deg, #07121b, #0e2435)" },
  "forest-bronze": { dark: "#11160d", main: "#1c2417", card: "#283321", gold: "#cd7f32", bg: "radial-gradient(circle at 70% 0%, #293621, #11160d)" },
  "charcoal-copper": { dark: "#131315", main: "#1c1c20", card: "#27272c", gold: "#d97443", bg: "radial-gradient(circle at 50% 10%, #2f2723, #131315)" },
  "deep-maroon": { dark: "#1f0a0d", main: "#2c0e13", card: "#3f151c", gold: "#ffd700", bg: "radial-gradient(circle at 80% 0%, #4a151e, #1f0a0d)" },
  "ocean-teal": { dark: "#051617", main: "#092426", card: "#0e3437", gold: "#38ef7d", bg: "radial-gradient(circle at 75% 20%, #104144, #051617)" },
  "royal-twilight": { dark: "#0d091a", main: "#16102b", card: "#221940", gold: "#ffb347", bg: "linear-gradient(135deg, #180e30 0%, #081224 100%)" },
  "black-marble": { dark: "#050505", main: "#0d0d0d", card: "#171717", gold: "#ffdf00", bg: "radial-gradient(circle at 50% 50%, #1a1a1a, #050505)" },
  "chocolate-amber": { dark: "#160e09", main: "#241710", card: "#332117", gold: "#ffbf00", bg: "radial-gradient(circle at 70% 10%, #3b2416, #160e09)" },
  "midnight-silver": { dark: "#080c14", main: "#0f1624", card: "#172237", gold: "#e0e6ed", bg: "radial-gradient(circle at 80% 10%, #1e2c47, #080c14)" },
  "dark-mint": { dark: "#081714", main: "#0d2621", card: "#13372f", gold: "#70e0a5", bg: "radial-gradient(circle at 80% 20%, #15453a, #081714)" },
  "crimson-sunset": { dark: "#180606", main: "#260a0a", card: "#381010", gold: "#ff6b6b", bg: "linear-gradient(145deg, #2b0808, #0d0404)" },
  "royal-cyan": { dark: "#061517", main: "#0b2226", card: "#113339", gold: "#e4b952", bg: "radial-gradient(circle at 70% 10%, #13424a, #061517)" },
  "platinum-slate": { dark: "#14171a", main: "#1e2227", card: "#2b3037", gold: "#e5c575", bg: "radial-gradient(circle at 60% 0%, #2b313a, #14171a)" },
  "smoky-oud": { dark: "#140f0c", main: "#201814", card: "#2f231d", gold: "#d49b6a", bg: "radial-gradient(circle at 70% 15%, #382820, #140f0c)" },
  "plum-velvet": { dark: "#150814", main: "#230e22", card: "#341632", gold: "#f7b731", bg: "linear-gradient(135deg, #2a0b28, #0c040b)" },
  "pure-gold-black": { dark: "#080703", main: "#141208", card: "#221e0f", gold: "#f5b041", bg: "radial-gradient(circle at 80% 0%, #2f280a, #080703)" },
  "cosmic-aurora": { dark: "#070b14", main: "#0e1526", card: "#17223b", gold: "#5eead4", bg: "linear-gradient(135deg, #091a24 0%, #1b0c26 100%)" }
};

onSnapshot(doc(db, "settings", "storeConfig"), (docSnap) => {
  if (!docSnap.exists()) return;
  const cfg = docSnap.data();

  // 1. تفعيل / إلغاء شاشة الإغلاق
  const closedScreen = document.getElementById("storeClosedScreen");
  if (closedScreen) {
    if (cfg.isClosed === true) {
      closedScreen.style.setProperty("display", "flex", "important");
      document.body.classList.add("no-scroll");
    } else {
      closedScreen.style.setProperty("display", "none", "important");
      document.body.classList.remove("no-scroll");
    }
  }

  // 2. تطبيق الثيم المختار
  if (cfg.theme && THEME_PRESETS[cfg.theme]) {
    const t = THEME_PRESETS[cfg.theme];
    const root = document.documentElement;
    root.style.setProperty("--black", t.dark);
    root.style.setProperty("--black-2", t.main);
    root.style.setProperty("--cream", t.card);
    root.style.setProperty("--gold", t.gold);
    document.body.style.background = t.bg;
  }

  // 3. تحديث شريط العروض
  if (cfg.offerActive && cfg.activeOffer) {
    const ticker = document.querySelector(".ticker-inner");
    if (ticker) {
      ticker.innerHTML = `<span>🔥 ${cfg.activeOffer}</span><span>💎 سراقة — فخامة العطور</span>`;
    }
  }
});
/* =========================================================
   عروض سراقة الـ 3D التفاعلية مع عداد تنازلي حي للوقت
   ========================================================= */
const offersSection = document.getElementById("offersShowcaseSection");
const offersTrack = document.getElementById("offersTrack");
const offersDots = document.getElementById("offersDots");
const offerPrevBtn = document.getElementById("offerPrevBtn");
const offerNextBtn = document.getElementById("offerNextBtn");
const offersWrapper = document.getElementById("offersCarouselWrapper");

let currentOfferIdx = 0;
let offersList = [];
let offerAutoSlideTimer = null;
let countdownInterval = null;

onSnapshot(offersCol, (snapshot) => {
  const firebaseOffers = [];
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.active !== false) {
      firebaseOffers.push({ id: docSnap.id, ...data });
    }
  });

  offersList = firebaseOffers;

  if (offersList.length === 0) {
    if (offersSection) offersSection.style.display = "none";
    clearInterval(offerAutoSlideTimer);
    clearInterval(countdownInterval);
    return;
  }

  if (offersSection) {
    offersSection.style.setProperty("display", "block", "important");
  }

  renderOffersCarousel();
  startOfferAutoSlide();
  startLiveCountdowns();
});

function renderOffersCarousel() {
  if (!offersTrack) return;

  offersTrack.innerHTML = offersList.map(o => {
    const isExpired = o.expiryDate && new Date(o.expiryDate) <= new Date();

    return `
      <div class="offer-3d-card">
        <div class="offer-image-side">
          <span class="offer-ribbon-tag">${escapeHtml(o.tag || "عرض خاص 🔥")}</span>
          <img src="${o.image || 'image/S1.png'}" alt="${escapeHtml(o.title)}">
        </div>
        <div class="offer-info-side">
          <h3 class="offer-title-text">${escapeHtml(o.title)}</h3>
          <p class="offer-desc-text">${escapeHtml(o.desc || "باقة ملكية بتوليفة استثنائية وثبات يدوم طويلاً.")}</p>
          
          <!-- عداد الوقت التنازلي -->
          ${o.expiryDate ? `
            <div class="offer-timer-box" id="timerBox_${o.id}">
              <span class="offer-timer-label">⏳ ينتهي العرض خلال:</span>
              <div class="offer-timer-digits" id="timerDigits_${o.id}">
                <span class="timer-segment" id="days_${o.id}">00ي</span>
                <span class="timer-colon">:</span>
                <span class="timer-segment" id="hours_${o.id}">00س</span>
                <span class="timer-colon">:</span>
                <span class="timer-segment" id="mins_${o.id}">00د</span>
                <span class="timer-colon">:</span>
                <span class="timer-segment" id="secs_${o.id}">00ث</span>
              </div>
            </div>
          ` : ''}

          <div class="offer-pricing-bar">
            <span class="offer-new-price">${Number(o.price || 0).toLocaleString("ar-EG")} جنيه</span>
            ${o.oldPrice ? `<span class="offer-old-price">${Number(o.oldPrice).toLocaleString("ar-EG")} ج</span>` : ''}
          </div>

          ${isExpired ? `
            <div class="offer-expired-badge">⚠️ عذراً، انتهت صلاحية هذا العرض</div>
          ` : `
            <button type="button" class="offer-claim-btn" onclick="claimSpecialOffer('${o.id}')">
              <span>اطلب العرض الآن</span>
              <span>⚡</span>
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");

  if (offersDots) {
    offersDots.innerHTML = offersList.map((_, i) => `
      <span class="offer-dot ${i === 0 ? 'active' : ''}" onclick="goToOffer(${i})"></span>
    `).join("");
  }

  goToOffer(0);
}

// تحديث العدادات التنازلية كل ثانية
function startLiveCountdowns() {
  clearInterval(countdownInterval);
  
  function updateTimers() {
    const now = new Date().getTime();

    offersList.forEach(o => {
      if (!o.expiryDate) return;

      const target = new Date(o.expiryDate).getTime();
      const diff = target - now;

      const dEl = document.getElementById(`days_${o.id}`);
      const hEl = document.getElementById(`hours_${o.id}`);
      const mEl = document.getElementById(`mins_${o.id}`);
      const sEl = document.getElementById(`secs_${o.id}`);

      if (diff <= 0) {
        const box = document.getElementById(`timerBox_${o.id}`);
        if (box) box.innerHTML = `<span class="offer-expired-badge">انتهى وقت العرض</span>`;
      } else if (dEl && hEl && mEl && sEl) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        dEl.textContent = `${days}ي`;
        hEl.textContent = `${String(hours).padStart(2, '0')}س`;
        mEl.textContent = `${String(mins).padStart(2, '0')}د`;
        sEl.textContent = `${String(secs).padStart(2, '0')}ث`;
      }
    });
  }

  updateTimers();
  countdownInterval = setInterval(updateTimers, 1000);
}

window.goToOffer = function(index) {
  if (offersList.length === 0) return;
  currentOfferIdx = (index + offersList.length) % offersList.length;
  
  if (offersTrack) {
    offersTrack.style.transform = `translateX(${currentOfferIdx * 100}%)`;
  }

  document.querySelectorAll(".offer-dot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentOfferIdx);
  });
};

function startOfferAutoSlide() {
  clearInterval(offerAutoSlideTimer);
  if (offersList.length <= 1) return;

  offerAutoSlideTimer = setInterval(() => {
    goToOffer(currentOfferIdx + 1);
  }, 3000);
}

offersWrapper?.addEventListener("mouseenter", () => clearInterval(offerAutoSlideTimer));
offersWrapper?.addEventListener("mouseleave", () => startOfferAutoSlide());

offerPrevBtn?.addEventListener("click", () => {
  goToOffer(currentOfferIdx - 1);
  startOfferAutoSlide();
});

offerNextBtn?.addEventListener("click", () => {
  goToOffer(currentOfferIdx + 1);
  startOfferAutoSlide();
});

// حجز العرض وإضافته للسلة فوراً
window.claimSpecialOffer = function(offerId) {
  const offer = offersList.find(o => String(o.id) === String(offerId));
  if (!offer) return;

  if (offer.expiryDate && new Date(offer.expiryDate) < new Date()) {
    alert("عذراً، هذا العرض انتهى وقته المحدد!");
    return;
  }

  const cartItemId = `offer_${offer.id}`;
  const existing = cart.find(i => String(i.id) === cartItemId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: cartItemId,
      isOffer: true,
      name: `🔥 ${offer.title}`,
      price: Number(offer.price),
      image: offer.image || "image/S1.png",
      quantity: 1,
      size: "باقة خاصة"
    });
  }

  saveCart();
  updateCartUI();
  showToast("تم حجز العرض! 🔥", `${offer.title} أُضيف إلى سلتك.`);
  openCart();
};
