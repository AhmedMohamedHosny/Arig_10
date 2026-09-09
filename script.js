import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// العطور المبدئية لحفظها في Firebase تلقائياً لو كانت السحابة فارغة
const initialProducts = [
  { name: "سراقة نوار", price: 1290, category: "men", desc: "تركيبة عميقة وأنيقة من العود والعنبر والأخشاب الدافئة.", notes: "عود، عنبر، خشب الأرز", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85" },
  { name: "سراقة إيلان", price: 1450, category: "unisex", desc: "حمضيات منعشة تلتقي بالمسك الأنيق لعطر عصري مميز.", notes: "برغموت، مسك، فيتيفر", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85" },
  { name: "سراقة عود", price: 1690, category: "men", desc: "عود شرقي غني متوازن مع الزعفران والجلد وخشب الصندل الناعم.", notes: "عود، زعفران، جلد", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85" },
  { name: "سراقة فيلفيت", price: 1390, category: "women", desc: "لمسة زهرية ناعمة ملفوفة بالفانيليا والورد وخشب الصندل الكريمي.", notes: "ورد، فانيليا، خشب الصندل", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85" }
];

let products = [];
let cart = JSON.parse(localStorage.getItem("arig-cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("arig-wishlist")) || [];
let currentCategory = "all";
let selectedProduct = null;

// التحقق ونقل العطور المبدئية لـ Firebase عند أول تشغيل
async function syncInitialData() {
  const snapshot = await getDocs(perfumesCol);
  if (snapshot.empty) {
    for (const p of initialProducts) {
      await addDoc(perfumesCol, { ...p, createdAt: new Date() });
    }
  }
}
syncInitialData();

// جلب البيانات لحظياً من Firebase
onSnapshot(perfumesCol, (snapshot) => {
  products = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    products.push({
      id: docSnap.id,
      name: data.name,
      price: Number(data.price),
      category: data.category || "unisex",
      description: data.desc || "عطر فاخر صُمم لترك انطباع مميز.",
      notes: data.notes ? data.notes.split("،") : ["عنبر", "مسك"],
      image: data.image || "image/S1.jpg",
      rating: 4.9,
      reviews: 12
    });
  });
  renderProducts();
});

// بناء كروت العطور (الاسم والسعر بالخارج فقط)
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  let filtered = products;
  if (currentCategory !== "all") {
    filtered = products.filter(p => p.category === currentCategory);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--gold); padding: 40px;">لا توجد عطور معروضة في هذا القسم.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isFav = wishlist.includes(p.id);
    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <button class="wishlist-btn ${isFav ? 'active' : ''}" onclick="toggleWishlist('${p.id}')">${isFav ? '♥' : '♡'}</button>
          <img class="product-image" src="${p.image}" alt="${p.name}">
          <div class="product-actions">
            <button class="quick-btn" onclick="openQuickView('${p.id}')">عرض سريع</button>
            <button class="add-btn" onclick="addToCart('${p.id}')">أضف إلى السلة</button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-meta">
            <span class="product-category">${p.category === 'men' ? 'رجالي' : p.category === 'women' ? 'نسائي' : 'للجنسين'}</span>
          </div>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-bottom">
            <span class="product-price">${p.price} EGP</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// النافذة المنبثقة التفصيلية (Quick View)
window.openQuickView = function(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  selectedProduct = p;
  document.getElementById("modalImage").src = p.image;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalCategory").textContent = p.category === 'men' ? 'رجالي' : p.category === 'women' ? 'نسائي' : 'للجنسين';
  document.getElementById("modalDescription").textContent = p.description;
  document.getElementById("modalPrice").textContent = `${p.price} EGP`;

  const notesWrap = document.getElementById("modalNotes");
  if (notesWrap) {
    notesWrap.innerHTML = p.notes.map(n => `<span class="note">${n}</span>`).join('');
  }

  document.getElementById("modalBackdrop").classList.add("active");
  document.body.classList.add("no-scroll");
};

// السلة والمفضلة
window.addToCart = function(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  const exist = cart.find(item => item.id === id);
  if (exist) {
    exist.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 });
  }
  localStorage.setItem("arig-cart", JSON.stringify(cart));
  updateCartUI();
  alert(`تمت إضافة ${p.name} إلى السلة!`);
};

window.toggleWishlist = function(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(itemId => itemId !== id);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem("arig-wishlist", JSON.stringify(wishlist));
  renderProducts();
};

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  }
}

// فتح لوحة التحكم
const ADMIN_PASS = "1234";
let logoClicks = 0, clickTimer;

document.querySelector(".logo")?.addEventListener("click", (e) => {
  logoClicks++;
  clearTimeout(clickTimer);
  if (logoClicks === 5) {
    e.preventDefault();
    logoClicks = 0;
    const pass = prompt("أدخل كلمة سر لوحة التحكم:");
    if (pass === ADMIN_PASS) window.location.href = "admin.html";
  } else {
    clickTimer = setTimeout(() => { logoClicks = 0; }, 2000);
  }
});

updateCartUI();

/* =========================================================
   SURAKA — Vanilla JavaScript E-Commerce (AR/EN)
   ========================================================= */

const products = [
  {
    id: 1,
    name: "SURAKA Noir",
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
    name: "SURAKA Élan",
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
    name: "SURAKA Oud",
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
    name: "SURAKA Velvet",
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
    name: "SURAKA Aura",
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
    name: "SURAKA Royal",
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
    name: "SURAKA Bloom",
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
    name: "SURAKA Intense",
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
    subscribedText: "Thank you for joining the SURAKA world.",
    enterEmail: "Please enter your email address.",
    invalidEmail: "Please enter a valid email address.",
    welcomeMessage: "Welcome to the SURAKA world.",
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
let modalQty = 1;
let toastTimeout;
let currentLang = loadLang();

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
    showToast(t("unavailable"), t("unavailableText"));
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
  showToast(t("addedTitle"), t("addedText")(productName(product)));
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

    return `
      <div class="cart-item">
        <img
          class="cart-item-image"
          src="${product.image}"
          alt="${escapeHtml(productName(product))}"
          loading="lazy"
        >

        <div class="cart-item-info">
          <span class="cart-item-category">${escapeHtml(productCategoryLabel(product))}</span>
          <h3 class="cart-item-name">${escapeHtml(productName(product))}</h3>
          <span class="cart-item-price">${formatPrice(product.price)}</span>

          <div class="cart-item-controls">
            <button class="cart-qty-btn" data-cart-action="decrease" data-id="${product.id}">−</button>
            <span class="cart-qty">${item.quantity}</span>
            <button class="cart-qty-btn" data-cart-action="increase" data-id="${product.id}">+</button>
          </div>
        </div>

        <button
          class="remove-item"
          data-cart-action="remove"
          data-id="${product.id}"
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
  modalQty = 1;

  modalImage.src = product.image;
  modalImage.alt = productName(product);
  modalCategory.textContent = productCategoryLabel(product);
  modalName.textContent = productName(product);
  modalRating.textContent = `${stars(product.rating)} · ${product.reviews} ${t("reviews")}`;
  modalDescription.textContent = productDescription(product);
  modalPrice.textContent = formatPrice(product.price);
  modalQuantityEl.textContent = modalQty;

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

function toggleWishlist(id) {
  id = Number(id);

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    showToast(t("wishlistRemovedTitle"), t("wishlistRemovedText"));
  } else {
    wishlist.push(id);
    showToast(t("wishlistAddedTitle"), t("wishlistAddedText"));
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
  if (modalQty > 1) {
    modalQty--;
    modalQuantityEl.textContent = modalQty;
  }
});

document.getElementById("modalPlus").addEventListener("click", () => {
  if (modalQty < 20) {
    modalQty++;
    modalQuantityEl.textContent = modalQty;
  }
});

document.getElementById("modalAdd").addEventListener("click", () => {
  if (!selectedProduct) return;

  addToCart(selectedProduct.id, modalQty);
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
    newsletterMessage.textContent = t("enterEmail");
    newsletterMessage.classList.add("error");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    newsletterMessage.textContent = t("invalidEmail");
    newsletterMessage.classList.add("error");
    return;
  }

  newsletterMessage.textContent = t("welcomeMessage");
  newsletterMessage.classList.add("success");

  newsletterEmail.value = "";

  showToast(t("subscribedTitle"), t("subscribedText"));
});

/* =========================================================
   CHECKOUT
   ========================================================= */

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast(t("emptyCartToastTitle"), t("emptyCartToastText"));
    return;
  }

  showToast(t("checkoutReadyTitle"), t("checkoutReadyText"));
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
