// الملف الرئيسي لمنطق التطبيق

let allProducts = [];
let searchTimeout;

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('closeMenu');
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categoriesContainer = document.querySelector('.categories');

// ===== SIDEBAR & NAVIGATION =====

function initSidebar() {
  if (!menuBtn || !sidebar || !overlay || !closeMenu) return;

  menuBtn.addEventListener('click', openSidebar);
  closeMenu.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
}

function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

// ===== PRODUCTS RENDERING =====

/**
 * عرض المنتجات
 * @param {Array} items - المنتجات المراد عرضها
 */
function renderProducts(items) {
  if (!productsContainer) return;

  productsContainer.innerHTML = '';

  // إذا لم توجد منتجات
  if (items.length === 0) {
    productsContainer.innerHTML = `
      <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <p style="font-size: 18px; color: #999;">لم نجد منتجات تطابق بحثك</p>
      </div>
    `;
    return;
  }

  // بناء HTML لجميع المنتجات
  const html = items
    .map(
      (product) => `
      <div class="product" data-product-name="${product.name}">
        <img 
          src="${product.image}" 
          alt="${product.name}"
          onerror="this.src='images/placeholder.jpg';"
        >
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button class="buy-btn" data-product-name="${product.name}">
          Buy Now
        </button>
      </div>
    `
    )
    .join('');

  productsContainer.innerHTML = html;

  // إضافة event listeners للزر باستخدام Event Delegation
  attachProductEventListeners();
}

/**
 * إضافة event listeners للمنتجات باستخدام Delegation
 */
function attachProductEventListeners() {
  if (!productsContainer) return;

  productsContainer.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('.buy-btn');
    if (buyBtn) {
      const productName = buyBtn.dataset.productName;
      buyProduct(productName);
    }
  });
}

/**
 * شراء منتج (فتح WhatsApp)
 * @param {String} productName - اسم المنتج
 */
function buyProduct(productName) {
  const message = `Hello, I want to order ${productName}`;
  const whatsappLink = createWhatsAppLink(CONFIG.WHATSAPP_PHONE, message);
  openLink(whatsappLink);
}

// ===== SEARCH FUNCTIONALITY =====

function initSearch() {
  if (!searchInput) return;

  // استخدام debounce لتقليل عدد عمليات البحث
  const debouncedSearch = debounce(() => {
    performSearch();
  }, CONFIG.SEARCH_DEBOUNCE);

  searchInput.addEventListener('input', debouncedSearch);
}

function performSearch() {
  const query = searchInput.value.toLowerCase();
  const filtered = filterByQuery(allProducts, query, 'name');
  renderProducts(filtered);
}

// ===== CATEGORIES FILTERING =====

function initCategories() {
  if (!categoriesContainer) return;

  const categories = getCategories();

  // إنشاء الأزرار
  const allButton = document.createElement('button');
  allButton.textContent = '🔄 All';
  allButton.dataset.category = 'all';
  allButton.classList.add('active');
  categoriesContainer.appendChild(allButton);

  categories.forEach((category) => {
    const button = document.createElement('button');
    button.textContent = getCategoryIcon(category) + ' ' + formatCategoryName(category);
    button.dataset.category = category;
    categoriesContainer.appendChild(button);
  });

  // إضافة Event Listener
  categoriesContainer.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
      handleCategoryFilter(e.target);
    }
  });
}

function handleCategoryFilter(button) {
  // إزالة active من الأزرار السابقة
  document.querySelectorAll('.categories button').forEach((btn) => {
    btn.classList.remove('active');
  });

  // إضافة active للزر الحالي
  button.classList.add('active');

  const category = button.dataset.category;
  const filtered = filterByCategory(allProducts, category);
  renderProducts(filtered);
}

function getCategoryIcon(category) {
  const icons = {
    games: '🎮',
    subscriptions: '📺',
    'ai-tools': '🤖',
    'gift-cards': '🎁'
  };
  return icons[category] || '📦';
}

function formatCategoryName(category) {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ===== FAVORITES (localStorage) =====

let favorites = getFromStorage('favorites', []);

function toggleFavorite(productName) {
  if (favorites.includes(productName)) {
    favorites = favorites.filter((p) => p !== productName);
  } else {
    favorites.push(productName);
  }
  saveToStorage('favorites', favorites);
}

function isFavorite(productName) {
  return favorites.includes(productName);
}

// ===== INITIALIZATION =====

async function initApp() {
  console.log('🚀 Initializing Topify App...');

  try {
    // جلب المنتجات
    allProducts = await fetchProducts();
    console.log(`✅ Loaded ${allProducts.length} products`);

    // تهيئة المكونات
    initSidebar();
    initSearch();
    initCategories();

    // عرض المنتجات الأولية
    renderProducts(allProducts);

    console.log('✅ App initialized successfully!');
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
  }
}

// بدء التطبيق عند تحميل الصفحة
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
