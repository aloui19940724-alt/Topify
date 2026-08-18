// طبقة البيانات والـ API

let productsData = [];

/**
 * جلب المنتجات من JSON
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    productsData = await response.json();
    return productsData;
  } catch (error) {
    console.error('Error fetching products:', error);
    // إرجاع بيانات افتراضية في حالة الفشل
    return [
      {
        name: 'YouTube Premium',
        price: '12 DT',
        image: 'images/youtube.jpg',
        category: 'subscriptions'
      },
      {
        name: 'ChatGPT Go',
        price: '15 DT',
        image: 'images/chatgpt.jpg',
        category: 'subscriptions'
      }
    ];
  }
}

/**
 * الحصول على جميع المنتجات
 * @returns {Array}
 */
function getAllProducts() {
  return productsData;
}

/**
 * الحصول على المنتج بالاسم
 * @param {String} name - اسم المنتج
 * @returns {Object|null}
 */
function getProductByName(name) {
  return productsData.find(p => p.name === name) || null;
}

/**
 * الحصول على الفئات المتاحة
 * @returns {Array}
 */
function getCategories() {
  const categories = new Set(productsData.map(p => p.category));
  return Array.from(categories);
}
