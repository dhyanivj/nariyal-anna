import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import BrandStrip from './components/BrandStrip';
import SearchBar from './components/SearchBar';
import HeroBanner from './components/HeroBanner';
import TrustStrip from './components/TrustStrip';
import CategoryCarousel from './components/CategoryCarousel';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import StickyCartBar from './components/StickyCartBar';
import CartModal from './components/CartModal';
import BottomNavigation from './components/BottomNavigation';
import StoreInfoModal from './components/StoreInfoModal';
import AdminPanel from './components/AdminPanel';
import Toast from './components/Toast';
import OrderSuccessModal from './components/OrderSuccessModal';
import WhatsAppHelpModal from './components/WhatsAppHelpModal';

import { TRANSLATIONS } from './translations/translations';
import { 
  getStoredProducts, saveStoredProducts,
  getStoredCategories, saveStoredCategories,
  getStoredBanners, saveStoredBanners,
  getStoredSettings, saveStoredSettings,
  getStoredCart, saveStoredCart,
  getStoredLang, saveStoredLang
} from './services/storageService';

import {
  subscribeProducts,
  subscribeCategories,
  subscribeBanners,
  subscribeSettings,
  subscribeAdminPasscode,
  saveProductToFirestore,
  deleteProductFromFirestore,
  saveCategoryToFirestore,
  deleteCategoryFromFirestore,
  saveBannerToFirestore,
  deleteBannerFromFirestore,
  saveSettingsToFirestore,
  saveAdminPasscodeToFirestore,
  uploadImageToStorage,
  initializeFirestoreIfEmpty
} from './services/firebase';

export default function App() {
  // Global App States (live from Firebase Firestore with offline cache fallback)
  const [lang, setLang] = useState(getStoredLang);
  const location = "Gurgaon"; // Simple static delivery area as requested
  const [products, setProducts] = useState(getStoredProducts);
  const [categories, setCategories] = useState(getStoredCategories);
  const [banners, setBanners] = useState(getStoredBanners);
  const [settings, setSettings] = useState(getStoredSettings);
  const [cart, setCart] = useState(getStoredCart);
  const [adminPasscode, setAdminPasscode] = useState('1234');

  // Real-time Firebase Firestore synchronization
  useEffect(() => {
    initializeFirestoreIfEmpty();

    const unsubProducts = subscribeProducts((live) => {
      if (live && live.length > 0) {
        setProducts(live);
        saveStoredProducts(live);
      }
    });

    const unsubCategories = subscribeCategories((live) => {
      if (live && live.length > 0) {
        setCategories(live);
        saveStoredCategories(live);
      }
    });

    const unsubBanners = subscribeBanners((live) => {
      if (live && live.length > 0) {
        setBanners(live);
        saveStoredBanners(live);
      }
    });

    const unsubSettings = subscribeSettings((live) => {
      if (live) {
        setSettings(live);
        saveStoredSettings(live);
      }
    });

    const unsubPasscode = subscribeAdminPasscode((livePasscode) => {
      if (livePasscode) {
        setAdminPasscode(livePasscode);
      }
    });

    return () => {
      unsubProducts();
      unsubCategories();
      unsubBanners();
      unsubSettings();
      unsubPasscode();
    };
  }, []);

  // Active filters, search input ref and views
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const searchInputRef = useRef(null);
  const [isWhatsAppHelpOpen, setIsWhatsAppHelpOpen] = useState(false);

  // Helper to detect if URL matches /admin or #/admin
  const checkIsAdminPath = () => {
    if (typeof window === 'undefined') return false;
    const path = (window.location.pathname || '').replace(/\/+$/, '').toLowerCase();
    const hash = (window.location.hash || '').replace(/\/+$/, '').toLowerCase();
    return path === '/admin' || path.endsWith('/admin') || hash === '#/admin' || hash === '#admin';
  };

  // Admin route & modal state (/admin)
  const [isAdminOpen, setIsAdminOpen] = useState(checkIsAdminPath);

  // Listen to URL routing for /admin
  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminOpen(checkIsAdminPath());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    try {
      window.history.pushState({}, '', '/admin');
    } catch {
      window.location.hash = '#/admin';
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    try {
      window.history.pushState({}, '', '/');
    } catch {
      window.location.hash = '';
    }
  };

  // Modals
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Translation helper
  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.en, [lang]);

  // Sync state changes to storage
  useEffect(() => {
    saveStoredLang(lang);
  }, [lang]);

  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleToggleLang = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    showToast(next === 'hi' ? "🇮🇳 भाषा हिंदी में बदली गई" : "🇬🇧 Switched to English");
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    showToast(`✓ ${product.nameEn} ${t.addedToCartToast}`);
  };

  const handleUpdateQty = (productId, newQty) => {
    setCart((prev) => {
      if (newQty <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Cart count & total
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartQtyMap = useMemo(() => {
    const map = {};
    cart.forEach(item => {
      map[item.product.id] = item.quantity;
    });
    return map;
  }, [cart]);

  // In-stock products visible on user storefront (out-of-stock items completely hidden)
  const isProductInStock = (p) => {
    return p.available !== false && (p.stock === undefined || p.stock > 0);
  };

  const inStockProducts = useMemo(() => {
    return products.filter(isProductInStock);
  }, [products]);

  // Filtering products for storefront search & category selection
  const filteredProducts = useMemo(() => {
    let list = inStockProducts;

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.nameEn.toLowerCase().includes(q) ||
        (p.nameHi && p.nameHi.includes(q)) ||
        (p.descriptionEn && p.descriptionEn.toLowerCase().includes(q)) ||
        (p.descriptionHi && p.descriptionHi.includes(q)) ||
        (p.badge && p.badge.toLowerCase().includes(q)) ||
        (p.categoryId && p.categoryId.toLowerCase().includes(q))
      );
    } 
    // Filter by category
    else if (activeCategory !== 'all') {
      list = list.filter(p => p.categoryId === activeCategory);
    }

    return list;
  }, [inStockProducts, searchQuery, activeCategory]);

  // Specific groups for home screen (in-stock items only)
  const coconutSpecials = useMemo(() => {
    return inStockProducts.filter(p => p.categoryId === 'coconut-specials' || p.categoryId === 'flavoured-coconut');
  }, [inStockProducts]);

  const freshVeggies = useMemo(() => {
    return inStockProducts.filter(p => p.categoryId === 'fresh-vegetables');
  }, [inStockProducts]);

  const freshFruitsAndCombos = useMemo(() => {
    return inStockProducts.filter(p => p.categoryId === 'fruits' || p.categoryId === 'combos');
  }, [inStockProducts]);

  // Admin updates syncing to Firebase Firestore and local cache
  const handleUpdateProducts = async (newProducts, updatedProd = null, deletedId = null) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
    try {
      if (deletedId) {
        await deleteProductFromFirestore(deletedId);
      } else if (updatedProd) {
        await saveProductToFirestore(updatedProd);
      } else {
        for (const p of newProducts) {
          await saveProductToFirestore(p);
        }
      }
    } catch (e) {
      console.error("Firebase product update error:", e);
    }
  };

  const handleUpdateCategories = async (newCategories, updatedCat = null, deletedId = null) => {
    setCategories(newCategories);
    saveStoredCategories(newCategories);
    try {
      if (deletedId) {
        await deleteCategoryFromFirestore(deletedId);
      } else if (updatedCat) {
        await saveCategoryToFirestore(updatedCat);
      } else {
        for (const c of newCategories) {
          await saveCategoryToFirestore(c);
        }
      }
    } catch (e) {
      console.error("Firebase category update error:", e);
    }
  };

  const handleUpdateBanners = async (newBanners, updatedBanner = null, deletedId = null) => {
    setBanners(newBanners);
    saveStoredBanners(newBanners);
    try {
      if (deletedId) {
        await deleteBannerFromFirestore(deletedId);
      } else if (updatedBanner) {
        await saveBannerToFirestore(updatedBanner);
      } else {
        for (const b of newBanners) {
          await saveBannerToFirestore(b);
        }
      }
    } catch (e) {
      console.error("Firebase banner update error:", e);
    }
  };

  const handleUpdateSettings = async (newSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    try {
      await saveSettingsToFirestore(newSettings);
    } catch (e) {
      console.error("Firebase settings update error:", e);
    }
  };

  const handleUpdateAdminPasscode = async (newPasscode) => {
    setAdminPasscode(newPasscode);
    try {
      await saveAdminPasscodeToFirestore(newPasscode);
    } catch (e) {
      console.error("Firebase passcode update error:", e);
    }
  };

  // Order completion from WhatsApp
  const handleOrderCompleted = (details) => {
    setIsCartModalOpen(false);
    setOrderSuccessData(details);
    setCart([]);
  };

  // When accessing /admin, render the full clean Admin Dashboard
  if (isAdminOpen) {
    return (
      <AdminPanel
        onClose={handleCloseAdmin}
        products={products}
        categories={categories}
        banners={banners}
        settings={settings}
        onUpdateProducts={handleUpdateProducts}
        onUpdateCategories={handleUpdateCategories}
        onUpdateBanners={handleUpdateBanners}
        onUpdateSettings={handleUpdateSettings}
        adminPasscode={adminPasscode}
        onUpdateAdminPasscode={handleUpdateAdminPasscode}
        uploadImageToStorage={uploadImageToStorage}
        saveProductToFirestore={saveProductToFirestore}
        deleteProductFromFirestore={deleteProductFromFirestore}
        saveCategoryToFirestore={saveCategoryToFirestore}
        deleteCategoryFromFirestore={deleteCategoryFromFirestore}
        saveBannerToFirestore={saveBannerToFirestore}
        deleteBannerFromFirestore={deleteBannerFromFirestore}
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
      />
    );
  }

  return (
    <div className="app-wrapper">
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Top Header with Logo, Delivering to Gurgaon, and Cart Icon */}
      <Header
        settings={settings}
        cartCount={cartCount}
        onOpenCart={() => setIsCartModalOpen(true)}
      />

      {/* Brand Strip Announcement (From poster) */}
      <BrandStrip settings={settings} lang={lang} />

      {/* Clean Search Bar without bottom tags */}
      <SearchBar
        searchQuery={searchQuery}
        inputRef={searchInputRef}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && activeTab !== 'home' && activeTab !== 'search') {
            setActiveTab('home');
          }
        }}
        t={t}
      />

      {/* CATEGORIES ONLY VIEW (When user clicks Categories in bottom nav) */}
      {activeTab === 'categories' ? (
        <div className="categories-page-view">
          <div className="categories-page-header">
            <h2 className="categories-page-title">
              {lang === 'hi' ? "सभी श्रेणियाँ (Categories)" : "All Categories"}
            </h2>
            <p className="categories-page-subtitle">
              {lang === 'hi'
                ? "ताज़ा नारियल पानी, ताज़ी सब्जियां एवं फल चुनें"
                : "Explore Bangalore coconut specials & farm fresh produce"}
            </p>
          </div>

          <div className="categories-grid-container">
            {/* All Products Card */}
            <div
              className="category-full-card"
              onClick={() => {
                setActiveCategory('all');
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="category-full-avatar">
                🛒
              </div>
              <div className="category-full-title">
                {lang === 'hi' ? "सभी उत्पाद" : "All Products"}
              </div>
              <div className="category-full-count">
                {inStockProducts.length} {t.items}
              </div>
            </div>

            {/* Individual Categories */}
            {categories.map((cat) => {
              const count = inStockProducts.filter(p => p.categoryId === cat.id).length;
              return (
                <div
                  key={cat.id}
                  className="category-full-card"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="category-full-avatar">
                    {cat.icon || '🥥'}
                  </div>
                  <div className="category-full-title">
                    {lang === 'hi' ? (cat.nameHi || cat.nameEn) : cat.nameEn}
                  </div>
                  <div className="category-full-count">
                    {count} {t.items}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (!searchQuery.trim() && activeCategory === 'all' && (activeTab === 'home' || activeTab === 'search')) ? (
        <>
          {/* Hero Banner Carousel */}
          <HeroBanner
            banners={banners}
            lang={lang}
            onBannerAction={(catId) => {
              setActiveCategory(catId);
            }}
          />

          {/* Health Trust Badges (From poster) */}
          <TrustStrip lang={lang} />

          {/* Horizontally Scrollable Categories */}
          <CategoryCarousel
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(id) => setActiveCategory(id)}
            lang={lang}
            t={t}
          />

          {/* Section 1: Coconut Specials (Poster Highlight: 800ml Bottle, Malai, Lemon, Masala) */}
          <section className="products-section">
            <div className="section-header">
              <h3 className="section-title">
                🥥 {t.todaysSpecials}
              </h3>
              <span className="section-badge-counter">
                {coconutSpecials.length} {t.items}
              </span>
            </div>

            <div className="products-grid">
              {coconutSpecials.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cartQtyMap[product.id] || 0}
                  onAddToCart={handleAddToCart}
                  onUpdateQty={handleUpdateQty}
                  onOpenQuickView={(p) => setSelectedProduct(p)}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          </section>

          {/* Section 2: Farm Fresh Vegetables */}
          <section className="products-section">
            <div className="section-header">
              <h3 className="section-title">
                🥬 {t.freshVeggies}
              </h3>
              <button 
                onClick={() => setActiveCategory('fresh-vegetables')}
                style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)' }}
              >
                {t.viewAll} →
              </button>
            </div>

            <div className="products-grid">
              {freshVeggies.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cartQtyMap[product.id] || 0}
                  onAddToCart={handleAddToCart}
                  onUpdateQty={handleUpdateQty}
                  onOpenQuickView={(p) => setSelectedProduct(p)}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          </section>

          {/* Section 3: Seasonal Fruits & Combos */}
          <section className="products-section">
            <div className="section-header">
              <h3 className="section-title">
                🍎 {t.freshFruits} & {t.superCombos}
              </h3>
              <span className="section-badge-counter">
                {freshFruitsAndCombos.length} {t.items}
              </span>
            </div>

            <div className="products-grid">
              {freshFruitsAndCombos.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cartQtyMap[product.id] || 0}
                  onAddToCart={handleAddToCart}
                  onUpdateQty={handleUpdateQty}
                  onOpenQuickView={(p) => setSelectedProduct(p)}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          </section>

          {/* Store Info Card (From poster) */}
          <div className="store-info-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div className="store-badge-live">
                <span className="live-dot" />
                <span>{settings.isOpen ? (lang === 'hi' ? "दुकान खुली है" : "STORE OPEN") : "CLOSED"}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                ⏰ {settings.openingHours}
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
              {settings.shopName}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--primary)', fontWeight: 700, marginBottom: '6px' }}>
              📍 {settings.subName || "Yadav Nariyal Pani"} • {settings.addressEn}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-body)', lineHeight: 1.4, marginBottom: '12px' }}>
              {lang === 'hi'
                ? "100% असली व ताज़ा नारियल पानी। बैंगलोर A1 क्वालिटी। बिना किसी मिलावट के घर तक त्वरित डिलीवरी।"
                : "100% Pure Natural Coconut Water. Bangalore A1 Quality. No added sugar or chemicals. Express doorstep delivery in Gurgaon."}
            </p>

            <button
              onClick={() => setIsStoreInfoOpen(true)}
              style={{
                width: '100%',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12.5px',
                fontWeight: 700,
                color: 'var(--primary)'
              }}
            >
              {lang === 'hi' ? "दुकान की पूरी जानकारी व सोशल मीडिया →" : "View Store Details & Social Links →"}
            </button>
          </div>
        </>
      ) : (
        /* Filtered Category or Search Results View */
        <div style={{ padding: '0 0 20px 0' }}>
          <CategoryCarousel
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(id) => {
              setActiveCategory(id);
              setSearchQuery('');
            }}
            lang={lang}
            t={t}
          />

          <section className="products-section">
            <div className="section-header">
              <div>
                <h3 className="section-title">
                  {searchQuery ? `"${searchQuery}"` : (categories.find(c => c.id === activeCategory)?.nameEn || t.all)}
                </h3>
                {searchQuery && (
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {filteredProducts.length} {t.items} found
                  </p>
                )}
              </div>

              {(activeCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}
                >
                  {t.viewAll}
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  {lang === 'hi' ? "कोई उत्पाद नहीं मिला" : "No products found"}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {lang === 'hi' 
                    ? "कृपया अन्य नाम खोजें या सभी उत्पाद देखें।" 
                    : "Try searching with a different keyword or explore all items."}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="btn-quick-add"
                  style={{ margin: '0 auto', padding: '8px 18px' }}
                >
                  {t.viewAll}
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cartQtyMap[product.id] || 0}
                    onAddToCart={handleAddToCart}
                    onUpdateQty={handleUpdateQty}
                    onOpenQuickView={(p) => setSelectedProduct(p)}
                    lang={lang}
                    t={t}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Clean Subtle Footer */}
          <footer style={{
            textAlign: 'center',
            padding: '24px 16px 88px',
            color: 'var(--text-muted)',
            fontSize: '12px'
          }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--text-main)' }}>
              {settings.shopName || "Yadav Nariyal Pani"} • {settings.subName || "ताज़ा नारियल पानी"}
            </p>
            <p style={{ margin: '0 0 6px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              {settings.address || "Sector 43, Near Vyapar Kendra, Gurgaon"}
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', opacity: 0.8 }}>
              {lang === 'hi' ? "ताज़ा नारियल पानी और शुद्ध उत्पाद" : "100% Fresh Tender Coconut Water & Daily Produce"}
            </p>
          </footer>
        </div>
      )}

      {/* Sticky Cart Bar (Quick Commerce Style) */}
      <StickyCartBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartModalOpen(true)}
        t={t}
      />

      {/* Fixed Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'home') {
            setActiveTab('home');
            setActiveCategory('all');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (tab === 'search') {
            setActiveTab('search');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              if (searchInputRef.current) {
                searchInputRef.current.focus();
                searchInputRef.current.select?.();
              }
            }, 120);
          } else if (tab === 'categories') {
            setActiveTab('categories');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        cartCount={cartCount}
        onOpenCart={() => setIsCartModalOpen(true)}
        onOpenWhatsAppHelp={() => setIsWhatsAppHelpOpen(true)}
        settings={settings}
        t={t}
      />

      {/* MODALS */}
      {/* 1. Product Detail Quick View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        quantity={selectedProduct ? (cartQtyMap[selectedProduct.id] || 0) : 0}
        onAddToCart={handleAddToCart}
        onUpdateQty={handleUpdateQty}
        lang={lang}
        t={t}
      />

      {/* 2. Cart & WhatsApp Checkout Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
        settings={settings}
        location={location}
        lang={lang}
        t={t}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* 3. Store Information Modal */}
      <StoreInfoModal
        isOpen={isStoreInfoOpen}
        onClose={() => setIsStoreInfoOpen(false)}
        settings={settings}
        lang={lang}
        t={t}
      />

      {/* 4. Order Success Confirmation Modal */}
      <OrderSuccessModal
        isOpen={!!orderSuccessData}
        onClose={() => setOrderSuccessData(null)}
        orderDetails={orderSuccessData}
        settings={settings}
        lang={lang}
        t={t}
      />

      {/* 5. WhatsApp Support & Direct Actions Modal */}
      <WhatsAppHelpModal
        isOpen={isWhatsAppHelpOpen}
        onClose={() => setIsWhatsAppHelpOpen(false)}
        settings={settings}
        cartCount={cartCount}
        onOpenCart={() => setIsCartModalOpen(true)}
        lang={lang}
        t={t}
      />
    </div>
  );
}
