// دوال مساعدة عامة

/**
 * تأخير تنفيذ دالة (debounce)
 * @param {Function} func - الدالة المراد تأخيرها
 * @param {Number} delay - التأخير بالميلي ثانية
 * @returns {Function}
 */
function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * تشفير نص للـ URL
 * @param {String} text - النص المراد تشفيره
 * @returns {String}
 */
function encodeMessage(text) {
  return encodeURIComponent(text);
}

/**
 * إنشاء رابط WhatsApp
 * @param {String} phone - رقم الهاتف
 * @param {String} message - الرسالة
 * @returns {String}
 */
function createWhatsAppLink(phone, message) {
  return `https://wa.me/${phone}?text=${encodeMessage(message)}`;
}

/**
 * فتح رابط في نافذة جديدة
 * @param {String} url - الرابط
 */
function openLink(url) {
  window.open(url, '_blank');
}

/**
 * حفظ بيانات في localStorage
 * @param {String} key - المفتاح
 * @param {*} value - القيمة
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

/**
 * استرجاع بيانات من localStorage
 * @param {String} key - المفتاح
 * @param {*} defaultValue - القيمة الافتراضية
 * @returns {*}
 */
function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Failed to get from localStorage:', e);
    return defaultValue;
  }
}

/**
 * دالة للبحث والتصفية
 * @param {Array} items - المصفوفة المراد البحث فيها
 * @param {String} query - نص البحث
 * @param {String} searchField - الحقل المراد البحث فيه
 * @returns {Array}
 */
function filterByQuery(items, query, searchField = 'name') {
  const lowerQuery = query.toLowerCase();
  return items.filter(item =>
    item[searchField]?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * دالة للتصفية حسب الفئة
 * @param {Array} items - المصفوفة
 * @param {String} category - الفئة
 * @param {String} categoryField - اسم حقل الفئة
 * @returns {Array}
 */
function filterByCategory(items, category, categoryField = 'category') {
  if (category === 'all') return items;
  return items.filter(item => item[categoryField] === category);
}
