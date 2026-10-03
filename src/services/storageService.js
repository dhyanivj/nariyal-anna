import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BANNERS, INITIAL_SETTINGS } from '../data/initialData';

const KEYS = {
  PRODUCTS: 'nariyal_anna_products_v1',
  CATEGORIES: 'nariyal_anna_categories_v1',
  BANNERS: 'nariyal_anna_banners_v1',
  SETTINGS: 'nariyal_anna_settings_v1',
  CART: 'nariyal_anna_cart_v1',
  LANG: 'nariyal_anna_lang_v1',
  LOCATION: 'nariyal_anna_location_v1',
  FIREBASE_CONFIG: 'nariyal_anna_firebase_config_v1'
};

export const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem(KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Storage error:", e);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error("Storage save error:", e);
  }
};

export const getStoredCategories = () => {
  try {
    const raw = localStorage.getItem(KEYS.CATEGORIES);
    if (!raw) {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_CATEGORIES;
  }
};

export const saveStoredCategories = (categories) => {
  try {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredBanners = () => {
  try {
    const raw = localStorage.getItem(KEYS.BANNERS);
    if (!raw) {
      localStorage.setItem(KEYS.BANNERS, JSON.stringify(INITIAL_BANNERS));
      return INITIAL_BANNERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_BANNERS;
  }
};

export const saveStoredBanners = (banners) => {
  try {
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredSettings = () => {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return { ...INITIAL_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return INITIAL_SETTINGS;
  }
};

export const saveStoredSettings = (settings) => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredCart = () => {
  try {
    const raw = localStorage.getItem(KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveStoredCart = (cart) => {
  try {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredLang = () => {
  try {
    return localStorage.getItem(KEYS.LANG) || 'en';
  } catch (e) {
    return 'en';
  }
};

export const saveStoredLang = (lang) => {
  try {
    localStorage.setItem(KEYS.LANG, lang);
  } catch (e) {
    console.error(e);
  }
};

export const getStoredLocation = () => {
  try {
    return localStorage.getItem(KEYS.LOCATION) || "Sector 15 Part 2, Gurgaon";
  } catch (e) {
    return "Sector 15 Part 2, Gurgaon";
  }
};

export const saveStoredLocation = (location) => {
  try {
    localStorage.setItem(KEYS.LOCATION, location);
  } catch (e) {
    console.error(e);
  }
};

export const resetToDefaults = () => {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem(KEYS.BANNERS, JSON.stringify(INITIAL_BANNERS));
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  return {
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    banners: INITIAL_BANNERS,
    settings: INITIAL_SETTINGS
  };
};
