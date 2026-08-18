// ملف الإعدادات والثوابت
const CONFIG = {
  WHATSAPP_PHONE: '21655234874',
  API_BASE_URL: '/api',
  SEARCH_DEBOUNCE: 300,
  STORE_NAME: 'Topify',
  STORE_SLOGAN: 'Premium Subscriptions, Game Top-Ups & AI Tools'
};

// تصدير للاستخدام في البيئات المختلفة
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}