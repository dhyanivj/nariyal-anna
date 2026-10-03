import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, CheckCircle2, AlertTriangle, 
  Settings, Image as ImageIcon, ShoppingBag, 
  BarChart3, RefreshCw, Power, Save, Eye, EyeOff, Sparkles,
  Lock, ArrowLeft, Globe, Search, ExternalLink, X, Package, ShieldCheck,
  Camera, Upload, LayoutGrid
} from 'lucide-react';
import logoImg from '../assets/yadav-nariyal-pani-logo.png';
import { resetToDefaults } from '../services/storageService';

const adminDictionary = {
  en: {
    vendorAdmin: "Vendor Admin",
    storeOpen: "Store: OPEN",
    storeClosed: "Store: CLOSED",
    storefront: "Storefront",
    lock: "Lock",
    // Navigation Cards Hub
    navOverview: "Overview",
    navOverviewSub: "KPIs & Actions",
    navProducts: "Products",
    navProductsSub: "Stock & Catalog",
    navCategories: "Categories",
    navCategoriesSub: "Filters & Carousel",
    navSettings: "Store Settings",
    navSettingsSub: "Timings, WA & Address",
    activeLabel: "ACTIVE",
    itemsCount: "Items",
    // Stats
    totalProducts: "Total Products",
    inActiveCatalogue: "In active catalogue",
    inStock: "In Stock",
    availableForOrders: "Available for customer orders",
    outOfStock: "Out of Stock",
    needsReplenishment: "Needs replenishment",
    featuredPicks: "Featured Picks",
    promotedOnHome: "Promoted on homepage",
    // Quick actions
    quickActions: "Quick Store Actions",
    addNewProduct: "Add New Product",
    openWhatsApp: "Open WhatsApp",
    restoreDefaults: "Restore Poster Defaults",
    posterSpecialties: "🥥 Yadav Nariyal Pani Poster Specialties",
    manageInCatalogue: "Manage in Catalogue →",
    // Products
    searchPlaceholder: "Search inventory...",
    allCategories: "All Categories",
    noProductsMatched: "No products matched",
    clearFilterPrompt: "Try clearing your search filter.",
    inStockBtn: "IN STOCK",
    outOfStockBtn: "OUT OF STOCK",
    edit: "Edit",
    delete: "Delete",
    addProduct: "Add Product",
    // Categories
    categoriesTitle: "Store Categories",
    categoriesDesc: "Manage categories displayed in the horizontal carousel and catalog filters.",
    createCategoryBtn: "Create Category",
    activeBadge: "ACTIVE",
    hiddenBadge: "HIDDEN",
    assignedCount: "products assigned",
    // Banners
    navBanners: "Hero Banners",
    navBannersSub: "Text, Images & Offers",
    bannersTitle: "Homepage Hero Banners",
    bannersDesc: "Customize banner headline, subtitle, offer prices, call-to-action button, and photos.",
    addBannerBtn: "Add New Banner",
    modalAddBanner: "Create New Banner",
    modalEditBanner: "Edit Banner",
    bannerTitleEn: "Banner Headline (English) *",
    bannerTitleHi: "Banner Headline (Hindi)",
    bannerSubEn: "Banner Subtitle (English)",
    bannerSubHi: "Banner Subtitle (Hindi)",
    bannerBadgeEn: "Badge Text (English)",
    bannerBadgeHi: "Badge Text (Hindi)",
    bannerPrice: "Highlight Price (e.g. ₹199 or Starts ₹15)",
    bannerOriginalPrice: "Original Price (e.g. ₹249)",
    bannerCtaEn: "Button Text (English)",
    bannerCtaHi: "Button Text (Hindi)",
    bannerCategory: "Linked Category on Click",
    bannerGradient: "Theme Color Style",
    bannerImage: "Banner Photo / Image",
    bannerActiveCheckbox: "Active (Visible on homepage slider)",
    saveBannerBtn: "Save Banner",
    // Settings
    settingsTitle: "Store Identity & Operations Settings",
    shopIdentity: "Shop Identity",
    shopName: "Shop Name",
    posterSubtitle: "Poster Subtitle / Brand",
    shopAddress: "Shop Address",
    dailyHours: "Daily Opening Hours",
    orderOperations: "Order & Operations",
    whatsappNumber: "WhatsApp Orders Number (10 digits)",
    deliveryAreaText: "Delivery Area Text",
    minOrderAmount: "Minimum Order Amount (₹)",
    freeDeliveryAbove: "Free Delivery Above (₹)",
    standardDeliveryFee: "Standard Delivery Fee (₹)",
    securitySettings: "Security & Passcode",
    adminPasscode: "Admin Passcode (4-digits)",
    saveSettingsBtn: "Save Store Settings",
    // Product Modal
    modalAddProduct: "Add New Product",
    modalEditProduct: "Edit Product",
    clickPhoto: "Click Photo",
    fromGallery: "From Gallery",
    orPasteUrl: "Or paste image URL (https://...)",
    photoPrompt: "Take a photo or pick from gallery",
    removePhoto: "✕ Remove",
    productNameEn: "Product Name (English) *",
    productNameHi: "Product Name (Hindi)",
    priceEn: "Price (₹) *",
    mrpEn: "MRP (₹)",
    unitEn: "Unit *",
    categoryLabel: "Category",
    badgeLabel: "Badge (e.g. BESTSELLER, 100% NATURAL)",
    inStockCheckbox: "In Stock (Available)",
    featuredCheckbox: "Featured on Home",
    saveProductBtn: "Save Product",
    cancelBtn: "Cancel",
    // Category Modal
    modalAddCategory: "Create New Category",
    modalEditCategory: "Edit Category",
    catNameEn: "Category Name (English) *",
    catNameHi: "Category Name (Hindi)",
    catIconLabel: "Category Icon / Emoji",
    catSlugLabel: "Category ID / Slug",
    slugNote: "Category ID cannot be modified once created to preserve product associations.",
    catActiveCheckbox: "Active (Visible on Customer Storefront)",
    saveCategoryBtn: "Create Category",
    updateCategoryBtn: "Update Category",
    // Passcode Login
    vendorDashboard: "Vendor Dashboard",
    enterPasscode: "Enter your admin passcode to access live inventory and store operations.",
    passcodePlaceholder: "Passcode (e.g. 1234)",
    unlockBtn: "Unlock Admin Dashboard",
    invalidPasscodeMsg: "Incorrect passcode! (Default: 1234)",
    returnToStorefront: "Return to Customer Store"
  },
  hi: {
    vendorAdmin: "विक्रेता एडमिन",
    storeOpen: "दुकान: खुली है",
    storeClosed: "दुकान: बंद है",
    storefront: "दुकान देखें",
    lock: "लॉग आउट",
    // Navigation Cards Hub
    navOverview: "डैशबोर्ड सारांश",
    navOverviewSub: "स्थिति व त्वरित कार्य",
    navProducts: "सामान इन्वेंटरी",
    navProductsSub: "स्टॉक व कीमतें",
    navCategories: "श्रेणियां (कैटेगरी)",
    navCategoriesSub: "होमपेज फ़िल्टर सूची",
    navSettings: "दुकान सेटिंग्स",
    navSettingsSub: "समय, व्हाट्सएप व पता",
    activeLabel: "सक्रिय",
    itemsCount: "सामान",
    // Stats
    totalProducts: "कुल सामान",
    inActiveCatalogue: "सक्रिय सूची में",
    inStock: "स्टॉक में उपलब्ध",
    availableForOrders: "ग्राहक ऑर्डर कर सकते हैं",
    outOfStock: "स्टॉक खत्म",
    needsReplenishment: "स्टॉक भरने की आवश्यकता",
    featuredPicks: "खास प्रोडक्ट्स",
    promotedOnHome: "होमपेज पर प्रमुख",
    // Quick actions
    quickActions: "त्वरित दुकान कार्य",
    addNewProduct: "नया सामान जोड़ें",
    openWhatsApp: "व्हाट्सएप खोलें",
    restoreDefaults: "पोस्टर डिफ़ॉल्ट रीसेट करें",
    posterSpecialties: "🥥 यादव नारियल पानी पोस्टर विशेषताएं",
    manageInCatalogue: "इन्वेंटरी में प्रबंधित करें →",
    // Products
    searchPlaceholder: "सामान खोजें...",
    allCategories: "सभी श्रेणियां",
    noProductsMatched: "कोई सामान नहीं मिला",
    clearFilterPrompt: "कृपया खोज या श्रेणी फ़िल्टर साफ़ करें।",
    inStockBtn: "उपलब्ध",
    outOfStockBtn: "स्टॉक खत्म",
    edit: "बदलें",
    delete: "हटाएं",
    addProduct: "नया सामान",
    // Categories
    categoriesTitle: "दुकान की श्रेणियां",
    categoriesDesc: "होमपेज के स्क्रॉल और फ़िल्टर में दिखने वाली श्रेणियां प्रबंधित करें।",
    createCategoryBtn: "नई श्रेणी बनाएं",
    activeBadge: "सक्रिय",
    hiddenBadge: "छिपा हुआ",
    assignedCount: "सामान जुड़े हैं",
    // Banners
    navBanners: "होम बैनर्स",
    navBannersSub: "टेक्स्ट, फोटो व ऑफर्स",
    bannersTitle: "होमपेज हीरो बैनर्स",
    bannersDesc: "मुख्य बैनर, आकर्षक संदेश, फोटो और ऑफर्स प्रबंधित करें।",
    addBannerBtn: "नया बैनर जोड़ें",
    modalAddBanner: "नया बैनर बनाएं",
    modalEditBanner: "बैनर संपादित करें",
    bannerTitleEn: "बैनर शीर्षक (अंग्रेज़ी) *",
    bannerTitleHi: "बैनर शीर्षक (हिंदी)",
    bannerSubEn: "बैनर उपशीर्षक (अंग्रेज़ी)",
    bannerSubHi: "बैनर उपशीर्षक (हिंदी)",
    bannerBadgeEn: "बैज लेबल (अंग्रेज़ी)",
    bannerBadgeHi: "बैज लेबल (हिंदी)",
    bannerPrice: "प्रमुख कीमत (जैसे ₹199 या Starts ₹15)",
    bannerOriginalPrice: "मूल कीमत (जैसे ₹249)",
    bannerCtaEn: "बटन टेक्स्ट (अंग्रेज़ी)",
    bannerCtaHi: "बटन टेक्स्ट (हिंदी)",
    bannerCategory: "क्लिक पर खुलने वाली श्रेणी",
    bannerGradient: "बैकग्राउंड थीम रंग",
    bannerImage: "बैनर फोटो / इमेज",
    bannerActiveCheckbox: "सक्रिय (होमपेज स्लाइडर में दिखाएं)",
    saveBannerBtn: "बैनर सेव करें",
    // Settings
    settingsTitle: "दुकान पहचान एवं संचालन सेटिंग्स",
    shopIdentity: "दुकान का विवरण",
    shopName: "दुकान का नाम",
    posterSubtitle: "ब्रांड / उपनाम",
    shopAddress: "दुकान का पता",
    dailyHours: "खुलने व बंद होने का समय",
    orderOperations: "ऑर्डर एवं डिलीवरी संचालन",
    whatsappNumber: "व्हाट्सएप ऑर्डर नंबर (10 अंक)",
    deliveryAreaText: "डिलीवरी क्षेत्र विवरण",
    minOrderAmount: "न्यूनतम ऑर्डर राशि (₹)",
    freeDeliveryAbove: "मुफ्त डिलीवरी सीमा (₹)",
    standardDeliveryFee: "मानक डिलीवरी शुल्क (₹)",
    securitySettings: "सुरक्षा एवं पासकोड",
    adminPasscode: "एडमिन पासकोड (4 अंक)",
    saveSettingsBtn: "सेटिंग्स सुरक्षित करें",
    // Product Modal
    modalAddProduct: "नया सामान जोड़ें",
    modalEditProduct: "सामान संपादित करें",
    clickPhoto: "फोटो खींचें",
    fromGallery: "गैलरी से चुनें",
    orPasteUrl: "या फोटो का लिंक डालें (https://...)",
    photoPrompt: "फोटो खींचें या गैलरी से चुनें",
    removePhoto: "✕ हटाएं",
    productNameEn: "सामान का नाम (अंग्रेज़ी) *",
    productNameHi: "सामान का नाम (हिंदी)",
    priceEn: "बिक्री मूल्य (₹) *",
    mrpEn: "एमआरपी (₹)",
    unitEn: "इकाई (उदा. 1 नग, 800ml) *",
    categoryLabel: "श्रेणी (Category)",
    badgeLabel: "बैज (उदा. BESTSELLER, 100% NATURAL)",
    inStockCheckbox: "स्टॉक में उपलब्ध है",
    featuredCheckbox: "होमपेज पर खास दिखाएं",
    saveProductBtn: "सामान सुरक्षित करें",
    cancelBtn: "रद्द करें",
    // Category Modal
    modalAddCategory: "नई श्रेणी बनाएं",
    modalEditCategory: "श्रेणी संपादित करें",
    catNameEn: "श्रेणी नाम (अंग्रेज़ी) *",
    catNameHi: "श्रेणी नाम (हिंदी)",
    catIconLabel: "श्रेणी का चिह्न / इमोजी",
    catSlugLabel: "श्रेणी कोड (Slug)",
    slugNote: "सामान जुड़ाव सुरक्षित रखने के लिए आईडी नहीं बदली जा सकती।",
    catActiveCheckbox: "सक्रिय (ग्राहकों को दुकान पर दिखेगा)",
    saveCategoryBtn: "श्रेणी बनाएं",
    updateCategoryBtn: "श्रेणी अपडेट करें",
    // Passcode Login
    vendorDashboard: "विक्रेता डैशबोर्ड",
    enterPasscode: "इन्वेंटरी और दुकान संचालन देखने के लिए एडमिन पासकोड दर्ज करें।",
    passcodePlaceholder: "पासकोड (उदा. 1234)",
    unlockBtn: "एडमिन डैशबोर्ड खोलें",
    invalidPasscodeMsg: "गलत पासकोड! (डिफ़ॉल्ट: 1234)",
    returnToStorefront: "ग्राहक दुकान पर वापस जाएं"
  }
};

export default function AdminPanel({
  onClose,
  products,
  categories,
  banners,
  settings,
  onUpdateProducts,
  onUpdateCategories,
  onUpdateBanners,
  onUpdateSettings,
  adminPasscode = '1234',
  onUpdateAdminPasscode,
  uploadImageToStorage,
  saveProductToFirestore,
  deleteProductFromFirestore,
  saveCategoryToFirestore,
  deleteCategoryFromFirestore,
  saveBannerToFirestore,
  deleteBannerFromFirestore
}) {
  // Local independent language state for Admin portal ONLY
  const [adminLang, setAdminLang] = useState(() => {
    return localStorage.getItem('nariyal_admin_lang') || 'en';
  });

  const toggleAdminLang = () => {
    const nextLang = adminLang === 'en' ? 'hi' : 'en';
    setAdminLang(nextLang);
    localStorage.setItem('nariyal_admin_lang', nextLang);
  };

  const at = adminDictionary[adminLang] || adminDictionary.en;

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('nariyal_admin_auth') === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showPasscodeText, setShowPasscodeText] = useState(false);

  // Tabs: 'overview', 'products', 'categories', 'banners', 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Search & filter within products
  const [productSearch, setProductSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // Add / Edit Product modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Uploading state indicators for Firebase Storage
  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);
  const [isUploadingBannerImg, setIsUploadingBannerImg] = useState(false);

  // Temporary state for settings
  const [tempSettings, setTempSettings] = useState({ 
    ...settings,
    adminPasscode: adminPasscode || settings.adminPasscode || '1234'
  });

  // Keep tempSettings in sync with live adminPasscode if not dirty
  useEffect(() => {
    if (adminPasscode) {
      setTempSettings(prev => ({ ...prev, adminPasscode }));
    }
  }, [adminPasscode]);

  // State for new/editing product form
  const emptyProduct = {
    id: `prod-${Date.now()}`,
    nameEn: '',
    nameHi: '',
    descriptionEn: '',
    descriptionHi: '',
    price: 60,
    salePrice: 60,
    mrp: 75,
    unit: '1 piece',
    unitHi: '1 नग',
    categoryId: 'coconut-specials',
    image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=600&q=80',
    available: true,
    featured: false,
    badge: '',
    stock: 50
  };

  const [productForm, setProductForm] = useState(emptyProduct);

  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Compress & upload image file directly to Firebase Cloud Storage
  const handleImageFile = (file) => {
    if (!file) return;
    setIsUploadingProductImg(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800; // Optimal 800px max dimension
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);

        try {
          if (uploadImageToStorage) {
            const firebaseUrl = await uploadImageToStorage(dataUrl, 'products');
            setProductForm(prev => ({ ...prev, image: firebaseUrl || dataUrl }));
          } else {
            setProductForm(prev => ({ ...prev, image: dataUrl }));
          }
        } catch (err) {
          console.error("Storage upload error:", err);
          setProductForm(prev => ({ ...prev, image: dataUrl }));
        } finally {
          setIsUploadingProductImg(false);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Add / Edit Category modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const emptyCategory = {
    id: '',
    nameEn: '',
    nameHi: '',
    icon: '🥥',
    order: (categories.length || 0) + 1,
    isActive: true
  };
  const [categoryForm, setCategoryForm] = useState(emptyCategory);

  const handleAddCategoryClick = () => {
    setCategoryForm({
      ...emptyCategory,
      id: `cat-${Date.now()}`,
      order: categories.length + 1
    });
    setEditingCategoryId(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategoryClick = (cat) => {
    setCategoryForm({ ...cat });
    setEditingCategoryId(cat.id);
    setIsCategoryModalOpen(true);
  };

  const handleToggleCategoryActive = (catId) => {
    let updatedCat = null;
    const updated = categories.map(c => {
      if (c.id === catId) {
        updatedCat = { ...c, isActive: !c.isActive };
        return updatedCat;
      }
      return c;
    });
    onUpdateCategories(updated, updatedCat);
  };

  const handleDeleteCategory = (catId) => {
    if (catId === 'all') {
      alert("Cannot delete the All Items category.");
      return;
    }
    const attachedCount = products.filter(p => p.categoryId === catId).length;
    const msg = attachedCount > 0
      ? `This category has ${attachedCount} products assigned to it. Are you sure you want to delete it?`
      : `Are you sure you want to delete this category?`;

    if (window.confirm(msg)) {
      const updated = categories.filter(c => c.id !== catId);
      onUpdateCategories(updated, null, catId);
    }
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.nameEn.trim()) {
      alert("Please enter English category name");
      return;
    }

    if (editingCategoryId) {
      const updated = categories.map(c => c.id === editingCategoryId ? categoryForm : c);
      onUpdateCategories(updated, categoryForm);
    } else {
      const slug = categoryForm.id || categoryForm.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newCat = { ...categoryForm, id: slug };
      onUpdateCategories([...categories, newCat], newCat);
    }

    setIsCategoryModalOpen(false);
    setEditingCategoryId(null);
  };

  // Add / Edit Banner modal state & actions
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const emptyBanner = {
    id: '',
    badgeEn: 'SPECIAL OFFER',
    badgeHi: 'विशेष ऑफर',
    titleEn: '',
    titleHi: '',
    subtitleEn: '',
    subtitleHi: '',
    price: '',
    originalPrice: '',
    ctaEn: 'Order Now',
    ctaHi: 'अभी मंगाएं',
    categoryId: 'coconut-specials',
    bgGradient: 'linear-gradient(135deg, #09472A 0%, #15803D 100%)',
    image: '',
    isActive: true
  };
  const [bannerForm, setBannerForm] = useState(emptyBanner);
  const bannerGalleryInputRef = useRef(null);
  const bannerCameraInputRef = useRef(null);

  const BANNER_GRADIENT_PRESETS = [
    { label: 'Forest Green', value: 'linear-gradient(135deg, #09472A 0%, #15803D 100%)', color: '#09472A' },
    { label: 'Sun Amber', value: 'linear-gradient(135deg, #B45309 0%, #D97706 100%)', color: '#B45309' },
    { label: 'Emerald Palm', value: 'linear-gradient(135deg, #166534 0%, #22C55E 100%)', color: '#166534' },
    { label: 'Royal Midnight', value: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', color: '#1E3A8A' },
    { label: 'Ruby Crimson', value: 'linear-gradient(135deg, #991B1B 0%, #EF4444 100%)', color: '#991B1B' },
    { label: 'Deep Charcoal', value: 'linear-gradient(135deg, #18181B 0%, #3F3F46 100%)', color: '#18181B' }
  ];

  const handleBannerImageFile = (file) => {
    if (!file) return;
    setIsUploadingBannerImg(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const maxDim = 900;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        try {
          if (uploadImageToStorage) {
            const firebaseUrl = await uploadImageToStorage(dataUrl, 'banners');
            setBannerForm(prev => ({ ...prev, image: firebaseUrl || dataUrl }));
          } else {
            setBannerForm(prev => ({ ...prev, image: dataUrl }));
          }
        } catch (err) {
          console.error("Banner storage upload error:", err);
          setBannerForm(prev => ({ ...prev, image: dataUrl }));
        } finally {
          setIsUploadingBannerImg(false);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddBannerClick = () => {
    setBannerForm({
      ...emptyBanner,
      id: `banner-${Date.now()}`
    });
    setEditingBannerId(null);
    setIsBannerModalOpen(true);
  };

  const handleEditBannerClick = (banner) => {
    setBannerForm({ ...banner });
    setEditingBannerId(banner.id);
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e) => {
    e.preventDefault();
    if (!bannerForm.titleEn.trim()) {
      alert("Please enter English banner headline / title");
      return;
    }

    if (editingBannerId) {
      const updated = banners.map(b => b.id === editingBannerId ? bannerForm : b);
      onUpdateBanners(updated, bannerForm);
    } else {
      const newBanner = {
        ...bannerForm,
        id: bannerForm.id || `banner-${Date.now()}`
      };
      onUpdateBanners([...banners, newBanner], newBanner);
    }

    setIsBannerModalOpen(false);
    setEditingBannerId(null);
  };

  const handleDeleteBanner = (bannerId) => {
    if (banners.length <= 1) {
      alert("Storefront needs at least one banner in the slider.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this banner?")) {
      const updated = banners.filter(b => b.id !== bannerId);
      onUpdateBanners(updated, null, bannerId);
    }
  };

  const handleToggleBannerActive = (bannerId) => {
    let updatedBanner = null;
    const updated = banners.map(b => {
      if (b.id === bannerId) {
        updatedBanner = { ...b, isActive: b.isActive === false ? true : false };
        return updatedBanner;
      }
      return b;
    });
    onUpdateBanners(updated, updatedBanner);
  };

  // Stats calculation
  const totalCount = products.length;
  const inStockCount = products.filter(p => p.available !== false && (p.stock === undefined || p.stock > 0)).length;
  const outOfStockCount = totalCount - inStockCount;
  const featuredCount = products.filter(p => p.featured).length;

  const correctPasscode = (adminPasscode && adminPasscode.trim()) || settings.adminPasscode || '1234';

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcodeInput.trim() === correctPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('nariyal_admin_auth', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nariyal_admin_auth');
  };

  // Toggle in-stock fast
  const handleToggleStock = (productId) => {
    let updatedProduct = null;
    const updated = products.map(p => {
      if (p.id === productId) {
        updatedProduct = { ...p, available: !p.available };
        return updatedProduct;
      }
      return p;
    });
    onUpdateProducts(updated, updatedProduct);
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      const updated = products.filter(p => p.id !== productId);
      onUpdateProducts(updated, null, productId);
    }
  };

  // Open edit modal
  const handleEditClick = (prod) => {
    setProductForm({ ...prod });
    setEditingProductId(prod.id);
    setIsProductModalOpen(true);
  };

  // Open add modal
  const handleAddClick = () => {
    setProductForm({ ...emptyProduct, id: `prod-${Date.now()}` });
    setEditingProductId(null);
    setIsProductModalOpen(true);
  };

  // Save product (add or edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.nameEn.trim()) {
      alert("Please enter English name");
      return;
    }

    if (editingProductId) {
      const updated = products.map(p => p.id === editingProductId ? productForm : p);
      onUpdateProducts(updated, productForm);
    } else {
      onUpdateProducts([productForm, ...products], productForm);
    }

    setIsProductModalOpen(false);
    setEditingProductId(null);
  };

  // Save store settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
    if (tempSettings.adminPasscode && onUpdateAdminPasscode) {
      onUpdateAdminPasscode(tempSettings.adminPasscode);
    }
    alert("Settings saved successfully!");
  };

  // Reset to original poster defaults
  const handleResetData = () => {
    if (window.confirm("Reset all data to default Yadav Nariyal Pani poster catalogue?")) {
      const defaults = resetToDefaults();
      onUpdateProducts(defaults.products);
      onUpdateCategories(defaults.categories);
      onUpdateBanners(defaults.banners);
      onUpdateSettings(defaults.settings);
      setTempSettings(defaults.settings);
      alert("Reset complete!");
    }
  };

  // Filtered products in admin
  const adminFilteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = !productSearch.trim() || 
        p.nameEn.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.nameHi && p.nameHi.includes(productSearch));
      const matchesCategory = selectedCatFilter === 'all' || p.categoryId === selectedCatFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, productSearch, selectedCatFilter]);

  /* =========================================================================
     1. PASSCODE LOGIN SCREEN (Clean Card, Not a Sheet)
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          {/* Top Language Toggle on Passcode Screen */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <button
              type="button"
              onClick={toggleAdminLang}
              className="admin-btn-outline"
              style={{ fontSize: '11px', padding: '4px 8px' }}
            >
              <Globe size={13} color="var(--primary)" />
              <span>{adminLang === 'en' ? "🇬🇧 English" : "🇮🇳 हिंदी"}</span>
            </button>
          </div>

          <img 
            src={logoImg} 
            alt="Yadav Nariyal Pani" 
            className="admin-login-logo" 
          />
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            {at.vendorDashboard}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '22px' }}>
            {at.enterPasscode}
          </p>

          <form onSubmit={handlePasscodeSubmit}>
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type={showPasscodeText ? "text" : "password"}
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder={at.passcodePlaceholder}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 16px',
                  fontSize: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1.5px solid ${passcodeError ? '#EF4444' : 'var(--border-light)'}`,
                  textAlign: 'center',
                  letterSpacing: '3px',
                  fontWeight: 800,
                  outline: 'none',
                  background: '#F9FAF8'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPasscodeText(!showPasscodeText)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              >
                {showPasscodeText ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {passcodeError && (
              <p style={{ fontSize: '12px', color: '#DC2626', marginBottom: '12px', fontWeight: 700 }}>
                {at.invalidPasscodeMsg}
              </p>
            )}

            <button
              type="submit"
              className="admin-btn-primary"
              style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '14px' }}
            >
              <Lock size={16} />
              <span>{at.unlockBtn}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                marginTop: '16px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowLeft size={14} />
              <span>{at.returnToStorefront}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. AUTHENTICATED CLEAN DASHBOARD PAGE
     ========================================================================= */
  return (
    <div className="admin-dashboard-layout">
      {/* Top Navbar */}
      <header className="admin-top-navbar">
        <div className="admin-top-nav-inner">
          <div className="admin-top-main-row">
            {/* Logo & Portal Badge */}
            <div className="admin-logo-group">
              <img 
                src={logoImg} 
                alt="Yadav Nariyal Pani" 
                className="admin-logo-img" 
              />
              <span className="admin-portal-badge">
                {at.vendorAdmin}
              </span>
            </div>

            {/* Live Store Toggle */}
            <button
              onClick={() => {
                const updated = { ...settings, isOpen: !settings.isOpen };
                onUpdateSettings(updated);
                setTempSettings(updated);
              }}
              className={`store-status-pill ${settings.isOpen ? 'open' : 'closed'}`}
              title="Click to toggle store open/close"
            >
              <Power size={13} />
              <span>{settings.isOpen ? at.storeOpen : at.storeClosed}</span>
            </button>
          </div>

          {/* Quick Controls Row */}
          <div className="admin-top-actions">
            {/* Language Switcher - affects ONLY this admin page */}
            <button 
              onClick={toggleAdminLang}
              className="admin-btn-outline"
              title="Switch Admin Language"
            >
              <Globe size={14} color="var(--primary)" />
              <span>{adminLang === 'en' ? "🇬🇧 English" : "🇮🇳 हिंदी"}</span>
            </button>

            {/* Back to Storefront */}
            <button 
              onClick={onClose}
              className="admin-btn-outline"
              title="View Customer Store"
            >
              <ArrowLeft size={14} />
              <span>{at.storefront}</span>
            </button>

            {/* Lock/Sign out */}
            <button 
              onClick={handleLogout}
              className="admin-btn-outline"
              style={{ color: '#DC2626', borderColor: '#FECACA' }}
              title="Lock Admin Session"
            >
              <Lock size={14} />
              <span>{at.lock}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Cards Hub (Replaces scrollable tabs with beautiful interactive cards) */}
      <section className="admin-nav-cards-container">
        <div className="admin-nav-cards-grid">
          {/* Card 1: Overview */}
          <button
            type="button"
            className={`admin-nav-card ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <div className="admin-nav-card-top">
              <div className="admin-nav-card-icon" style={{ background: '#DCFCE7', color: '#15803D' }}>
                <BarChart3 size={18} />
              </div>
              <span className="admin-nav-card-pill">
                {activeTab === 'overview' ? at.activeLabel : "KPIs"}
              </span>
            </div>
            <div className="admin-nav-card-body">
              <span className="admin-nav-card-title">{at.navOverview}</span>
              <span className="admin-nav-card-sub">{at.navOverviewSub}</span>
            </div>
          </button>

          {/* Card 2: Products */}
          <button
            type="button"
            className={`admin-nav-card ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <div className="admin-nav-card-top">
              <div className="admin-nav-card-icon" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
                <Package size={18} />
              </div>
              <span className="admin-nav-card-pill">
                {totalCount} {at.itemsCount}
              </span>
            </div>
            <div className="admin-nav-card-body">
              <span className="admin-nav-card-title">{at.navProducts}</span>
              <span className="admin-nav-card-sub">{inStockCount} {at.inStock}</span>
            </div>
          </button>

          {/* Card 3: Categories */}
          <button
            type="button"
            className={`admin-nav-card ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <div className="admin-nav-card-top">
              <div className="admin-nav-card-icon" style={{ background: '#FEF3C7', color: '#B45309' }}>
                <LayoutGrid size={18} />
              </div>
              <span className="admin-nav-card-pill">
                {categories.filter(c => c.id !== 'all').length}
              </span>
            </div>
            <div className="admin-nav-card-body">
              <span className="admin-nav-card-title">{at.navCategories}</span>
              <span className="admin-nav-card-sub">{at.navCategoriesSub}</span>
            </div>
          </button>

          {/* Card 4: Banners */}
          <button
            type="button"
            className={`admin-nav-card ${activeTab === 'banners' ? 'active' : ''}`}
            onClick={() => setActiveTab('banners')}
          >
            <div className="admin-nav-card-top">
              <div className="admin-nav-card-icon" style={{ background: '#FDF2F8', color: '#BE185D' }}>
                <ImageIcon size={18} />
              </div>
              <span className="admin-nav-card-pill">
                {banners.length} {at.itemsCount}
              </span>
            </div>
            <div className="admin-nav-card-body">
              <span className="admin-nav-card-title">{at.navBanners}</span>
              <span className="admin-nav-card-sub">{at.navBannersSub}</span>
            </div>
          </button>

          {/* Card 5: Settings */}
          <button
            type="button"
            className={`admin-nav-card ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <div className="admin-nav-card-top">
              <div className="admin-nav-card-icon" style={{ background: '#F1F5F9', color: '#334155' }}>
                <Settings size={18} />
              </div>
              <span className="admin-nav-card-pill" style={{ color: settings.isOpen ? '#15803D' : '#DC2626' }}>
                {settings.isOpen ? "OPEN" : "CLOSED"}
              </span>
            </div>
            <div className="admin-nav-card-body">
              <span className="admin-nav-card-title">{at.navSettings}</span>
              <span className="admin-nav-card-sub">{at.navSettingsSub}</span>
            </div>
          </button>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <main className="admin-main-content">
        {/* ===================================================================
            TAB 1: DASHBOARD OVERVIEW
            =================================================================== */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards Grid */}
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">{at.totalProducts}</span>
                  <div className="admin-kpi-icon"><Package size={18} /></div>
                </div>
                <div className="admin-kpi-val">{totalCount}</div>
                <div className="admin-kpi-sub">{at.inActiveCatalogue}</div>
              </div>

              <div className="admin-kpi-card green">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">{at.inStock}</span>
                  <div className="admin-kpi-icon" style={{ color: '#16A34A', background: '#DCFCE7' }}>
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                <div className="admin-kpi-val" style={{ color: '#16A34A' }}>{inStockCount}</div>
                <div className="admin-kpi-sub">{at.availableForOrders}</div>
              </div>

              <div className="admin-kpi-card red">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">{at.outOfStock}</span>
                  <div className="admin-kpi-icon" style={{ color: '#DC2626', background: '#FEE2E2' }}>
                    <AlertTriangle size={18} />
                  </div>
                </div>
                <div className="admin-kpi-val" style={{ color: '#DC2626' }}>{outOfStockCount}</div>
                <div className="admin-kpi-sub">{at.needsReplenishment}</div>
              </div>

              <div className="admin-kpi-card amber">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">{at.featuredPicks}</span>
                  <div className="admin-kpi-icon" style={{ color: '#D97706', background: '#FEF3C7' }}>
                    <Sparkles size={18} />
                  </div>
                </div>
                <div className="admin-kpi-val" style={{ color: '#D97706' }}>{featuredCount}</div>
                <div className="admin-kpi-sub">{at.promotedOnHome}</div>
              </div>
            </div>

            {/* Quick Actions & Store Operations Card */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">
                  <Sparkles size={18} color="var(--primary)" />
                  <span>{at.quickActions}</span>
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleAddClick}
                  className="admin-btn-primary"
                >
                  <Plus size={16} />
                  <span>{at.addNewProduct}</span>
                </button>

                <button
                  onClick={() => {
                    const raw = (settings.whatsappNumber || "9310551050").replace(/\D/g, '');
                    const num = raw.length === 10 ? `91${raw}` : raw;
                    window.open(`https://wa.me/${num}`, '_blank');
                  }}
                  className="admin-btn-outline"
                >
                  <ExternalLink size={14} />
                  <span>{at.openWhatsApp} ({settings.whatsappNumber})</span>
                </button>

                <button
                  onClick={handleResetData}
                  className="admin-btn-outline"
                >
                  <RefreshCw size={14} />
                  <span>{at.restoreDefaults}</span>
                </button>
              </div>
            </div>

            {/* Poster Specialties Verification Card */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">
                  <span>{at.posterSpecialties}</span>
                </h3>
                <button 
                  onClick={() => setActiveTab('products')}
                  style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)' }}
                >
                  {at.manageInCatalogue}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#166534' }}>🥥 Fresh Coconut Water 800ml</div>
                  <div style={{ fontSize: '12px', color: '#15803D' }}>{adminLang === 'hi' ? "₹199 बोतल • बैंगलोर A1 क्वालिटी" : "₹199 Bottle • Bangalore A1 Quality"}</div>
                </div>

                <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#92400E' }}>🥥 Malai Wala Tender Coconut</div>
                  <div style={{ fontSize: '12px', color: '#B45309' }}>{adminLang === 'hi' ? "₹75 • मीठी मलाईदार नारियल पानी" : "₹75 • Sweet water with tender malai"}</div>
                </div>

                <div style={{ background: '#FEF9C3', border: '1px solid #FEF08A', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#854D0E' }}>🍋 Lemon Coconut Water</div>
                  <div style={{ fontSize: '12px', color: '#A16207' }}>{adminLang === 'hi' ? "₹75 • विटामिन C युक्त" : "₹75 • Vitamin C infused"}</div>
                </div>

                <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#991B1B' }}>🌶️ Chatpata Masala / Jeera Lemon</div>
                  <div style={{ fontSize: '12px', color: '#B91C1C' }}>{adminLang === 'hi' ? "₹80 • भुने मसाले और पाचक जड़ी-बूटियां" : "₹80 • Roasted spices & digestive herbs"}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: PRODUCTS INVENTORY
            =================================================================== */}
        {activeTab === 'products' && (
          <div>
            {/* Toolbar: Search, Category Filter, and Add Button */}
            <div className="admin-card" style={{ padding: '14px 18px', marginBottom: '16px' }}>
              <div className="admin-products-toolbar">
                <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                  {/* Search Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#F1F5F2',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    flex: 1,
                    minWidth: '200px'
                  }}>
                    <Search size={16} color="var(--text-muted)" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder={at.searchPlaceholder}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }}
                    />
                    {productSearch && (
                      <button onClick={() => setProductSearch('')} style={{ color: 'var(--text-muted)' }}>
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCatFilter}
                    onChange={(e) => setSelectedCatFilter(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      background: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    <option value="all">{at.allCategories}</option>
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {adminLang === 'hi' && c.nameHi ? c.nameHi : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add Product Button */}
                <button
                  onClick={handleAddClick}
                  className="admin-btn-primary"
                >
                  <Plus size={16} />
                  <span>{at.addProduct}</span>
                </button>
              </div>
            </div>

            {/* Products List */}
            <div>
              {adminFilteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', background: '#FFF', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <Package size={40} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 800 }}>{at.noProductsMatched}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{at.clearFilterPrompt}</p>
                </div>
              ) : (
                adminFilteredProducts.map((p) => {
                  const isAvailable = p.available !== false && (p.stock === undefined || p.stock > 0);
                  const catObj = categories.find(c => c.id === p.categoryId);

                  return (
                    <div key={p.id} className="admin-product-row-card">
                      {/* Left: Thumbnail & Details */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                        <img 
                          src={p.image} 
                          alt={p.nameEn} 
                          className="admin-prod-thumb" 
                        />
                        <div className="admin-prod-meta">
                          <h4 className="admin-prod-title">
                            {adminLang === 'hi' && p.nameHi ? p.nameHi : p.nameEn}
                          </h4>
                          <div className="admin-prod-tags">
                            <span className="admin-tag-cat">
                              {catObj ? (adminLang === 'hi' && catObj.nameHi ? catObj.nameHi : catObj.nameEn) : p.categoryId}
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                              ₹{p.price}
                            </span>
                            {p.mrp && p.mrp > p.price && (
                              <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                                ₹{p.mrp}
                              </span>
                            )}
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              • {p.unit}
                            </span>
                            {p.badge && (
                              <span style={{ fontSize: '10px', fontWeight: 800, background: '#FEF3C7', color: '#92400E', padding: '1px 6px', borderRadius: '4px' }}>
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="admin-prod-actions">
                        {/* Instant Stock Toggle */}
                        <button
                          onClick={() => handleToggleStock(p.id)}
                          className={`admin-stock-toggle-btn ${isAvailable ? 'in' : 'out'}`}
                          title="Click to toggle In-Stock / Out-of-Stock"
                        >
                          {isAvailable ? at.inStockBtn : at.outOfStockBtn}
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditClick(p)}
                          className="admin-icon-btn"
                          title={at.edit}
                        >
                          <Edit2 size={14} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="admin-icon-btn delete"
                          title={at.delete}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: CATEGORIES MANAGEMENT
            =================================================================== */}
        {activeTab === 'categories' && (
          <div>
            <div className="admin-card" style={{ padding: '16px 20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {at.categoriesTitle} ({categories.filter(c => c.id !== 'all').length})
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    {at.categoriesDesc}
                  </p>
                </div>

                <button
                  onClick={handleAddCategoryClick}
                  className="admin-btn-primary"
                >
                  <Plus size={16} />
                  <span>{at.createCategoryBtn}</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
              {categories.filter(c => c.id !== 'all').map((cat) => {
                const count = products.filter(p => p.categoryId === cat.id).length;
                const isActive = cat.isActive !== false;

                return (
                  <div key={cat.id} className="admin-card" style={{ padding: '16px', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'var(--primary-light)',
                        border: '1.5px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        flexShrink: 0
                      }}>
                        {cat.icon || "🥥"}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-main)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {adminLang === 'hi' && cat.nameHi ? cat.nameHi : cat.nameEn}
                        </h4>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {cat.nameHi || cat.nameEn}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>
                          {count} {at.assignedCount}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                      <button
                        onClick={() => handleToggleCategoryActive(cat.id)}
                        className={`admin-stock-toggle-btn ${isActive ? 'in' : 'out'}`}
                        style={{ fontSize: '10.5px' }}
                      >
                        {isActive ? at.activeBadge : at.hiddenBadge}
                      </button>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleEditCategoryClick(cat)}
                          className="admin-icon-btn"
                          title={at.edit}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="admin-icon-btn delete"
                          title={at.delete}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: HERO BANNERS
            =================================================================== */}
        {activeTab === 'banners' && (
          <div className="admin-card">
            <div className="admin-card-header" style={{ flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 className="admin-card-title">
                  <ImageIcon size={18} color="var(--primary)" />
                  <span>{at.bannersTitle}</span>
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                  {at.bannersDesc}
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddBannerClick}
                className="admin-btn-primary"
                style={{ padding: '8px 14px', fontSize: '13px' }}
              >
                <Plus size={16} />
                <span>{at.addBannerBtn}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginTop: '16px' }}>
              {banners.map((banner, index) => {
                const targetCat = categories.find(c => c.id === banner.categoryId);
                return (
                  <div
                    key={banner.id || index}
                    style={{
                      border: '1.5px solid var(--border-light)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                    }}
                  >
                    {/* Live Slide Miniature Preview */}
                    <div
                      style={{
                        position: 'relative',
                        minHeight: '130px',
                        padding: '14px',
                        background: banner.bgGradient || 'linear-gradient(135deg, #09472A 0%, #15803D 100%)',
                        backgroundImage: banner.image ? `url(${banner.image})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Dark overlay if image exists so text is always crisp */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: banner.image 
                            ? 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)' 
                            : 'transparent',
                          pointerEvents: 'none'
                        }}
                      />

                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <span
                          style={{
                            display: 'inline-block',
                            background: 'rgba(255,255,255,0.22)',
                            backdropFilter: 'blur(4px)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '9.5px',
                            fontWeight: 800,
                            letterSpacing: '0.4px',
                            marginBottom: '6px'
                          }}
                        >
                          {adminLang === 'hi' ? (banner.badgeHi || banner.badgeEn) : banner.badgeEn}
                        </span>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, lineHeight: 1.25, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                          {adminLang === 'hi' ? (banner.titleHi || banner.titleEn) : banner.titleEn}
                        </h4>
                        <p style={{ fontSize: '11px', opacity: 0.9, margin: '4px 0 0 0', lineHeight: 1.2, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                          {adminLang === 'hi' ? (banner.subtitleHi || banner.subtitleEn) : banner.subtitleEn}
                        </p>
                      </div>

                      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FEF08A' }}>
                            {banner.price}
                          </span>
                          {banner.originalPrice && (
                            <span style={{ fontSize: '10px', textDecoration: 'line-through', opacity: 0.75 }}>
                              {banner.originalPrice}
                            </span>
                          )}
                        </div>

                        <span
                          style={{
                            background: '#FFFFFF',
                            color: '#0A5432',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '99px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {adminLang === 'hi' ? (banner.ctaHi || banner.ctaEn) : banner.ctaEn} →
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Actions Footer */}
                    <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAF9', borderTop: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          📁 {targetCat?.nameEn || banner.categoryId}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '99px',
                            background: banner.isActive !== false ? '#DCFCE7' : '#FEE2E2',
                            color: banner.isActive !== false ? '#15803D' : '#DC2626'
                          }}
                        >
                          {banner.isActive !== false ? at.activeBadge : at.hiddenBadge}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleBannerActive(banner.id)}
                          className="admin-icon-btn"
                          title={banner.isActive !== false ? "Hide Banner" : "Show Banner"}
                        >
                          {banner.isActive !== false ? <Eye size={14} color="#15803D" /> : <EyeOff size={14} color="#6B7280" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEditBannerClick(banner)}
                          className="admin-icon-btn"
                          title={at.edit}
                        >
                          <Edit2 size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="admin-icon-btn delete"
                          title={at.delete}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: STORE SETTINGS
            =================================================================== */}
        {activeTab === 'settings' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">
                <Settings size={18} color="var(--primary)" />
                <span>{at.settingsTitle}</span>
              </h3>
            </div>

            <form onSubmit={handleSaveSettings}>
              <div className="admin-settings-grid">
                {/* 1. Store Identity */}
                <div style={{ background: '#F9FAF8', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {at.shopIdentity}
                  </h4>

                  <div className="form-group">
                    <label className="form-label">{at.shopName}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.shopName}
                      onChange={(e) => setTempSettings({ ...tempSettings, shopName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{at.posterSubtitle}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.subName || ''}
                      onChange={(e) => setTempSettings({ ...tempSettings, subName: e.target.value })}
                      placeholder="Yadav Nariyal Pani"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{at.shopAddress}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.addressEn}
                      onChange={(e) => setTempSettings({ ...tempSettings, addressEn: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{at.dailyHours}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.openingHours}
                      onChange={(e) => setTempSettings({ ...tempSettings, openingHours: e.target.value })}
                      placeholder="6:00 AM – 9:30 PM (Daily)"
                    />
                  </div>
                </div>

                {/* 2. WhatsApp & Phone */}
                <div style={{ background: '#F9FAF8', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {at.orderOperations}
                  </h4>

                  <div className="form-group">
                    <label className="form-label">{at.whatsappNumber}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.whatsappNumber}
                      onChange={(e) => setTempSettings({ ...tempSettings, whatsappNumber: e.target.value })}
                      required
                    />
                    <small style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      All customer cart orders will be sent directly to this WhatsApp number.
                    </small>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Secondary Phone</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.secondaryPhone}
                      onChange={(e) => setTempSettings({ ...tempSettings, secondaryPhone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Instagram Handle</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.instagramHandle}
                      onChange={(e) => setTempSettings({ ...tempSettings, instagramHandle: e.target.value })}
                      placeholder="@cocobhaiofficial"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{at.adminPasscode}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={tempSettings.adminPasscode || '1234'}
                      onChange={(e) => setTempSettings({ ...tempSettings, adminPasscode: e.target.value })}
                      placeholder="1234"
                    />
                  </div>
                </div>

                {/* 3. Delivery Rates */}
                <div style={{ background: '#F9FAF8', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', textTransform: 'uppercase' }}>
                    Delivery Settings (Gurgaon)
                  </h4>

                  <div className="form-group">
                    <label className="form-label">{at.standardDeliveryFee}</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={tempSettings.deliveryCharge}
                      onChange={(e) => setTempSettings({ ...tempSettings, deliveryCharge: Number(e.target.value) })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{at.freeDeliveryAbove}</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={tempSettings.freeDeliveryThreshold}
                      onChange={(e) => setTempSettings({ ...tempSettings, freeDeliveryThreshold: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '14px', justifyContent: 'center' }}
                >
                  <Save size={16} />
                  <span>{at.saveSettingsBtn}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* =====================================================================
          ADD / EDIT PRODUCT MODAL (Clean Centered Dialog)
          ===================================================================== */}
      {isProductModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsProductModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {editingProductId ? at.modalEditProduct : at.modalAddProduct}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="admin-modal-body">
              {/* Product Photo: Camera, Gallery & Live Preview */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Product Photo *</label>
                  {productForm.image && (
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: '' }))}
                      style={{ fontSize: '11.5px', color: '#DC2626', fontWeight: 700 }}
                    >
                      {at.removePhoto}
                    </button>
                  )}
                </div>

                {/* Live Preview Box */}
                {productForm.image ? (
                  <div style={{
                    width: '100%',
                    height: '140px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    background: '#F1F5F2',
                    border: '1.5px solid var(--border-light)',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={productForm.image} 
                      alt="Product Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div style={{
                    width: '100%',
                    height: '84px',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px dashed var(--border-light)',
                    background: '#F9FAF8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '10px',
                    color: 'var(--text-muted)'
                  }}>
                    <ImageIcon size={22} color="var(--primary)" />
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{at.photoPrompt}</span>
                  </div>
                )}

                {/* Action Buttons: Camera & Gallery */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                  <button
                    type="button"
                    disabled={isUploadingProductImg}
                    onClick={() => cameraInputRef.current?.click()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: isUploadingProductImg ? '#F3F4F6' : '#F0FDF4',
                      border: isUploadingProductImg ? '1.5px solid #D1D5DB' : '1.5px solid #86EFAC',
                      color: isUploadingProductImg ? '#6B7280' : '#15803D',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: isUploadingProductImg ? 'not-allowed' : 'pointer',
                      opacity: isUploadingProductImg ? 0.7 : 1
                    }}
                  >
                    <Camera size={16} />
                    <span>{isUploadingProductImg ? "Uploading..." : at.clickPhoto}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isUploadingProductImg}
                    onClick={() => galleryInputRef.current?.click()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: isUploadingProductImg ? '#F3F4F6' : '#EFF6FF',
                      border: isUploadingProductImg ? '1.5px solid #D1D5DB' : '1.5px solid #93C5FD',
                      color: isUploadingProductImg ? '#6B7280' : '#1D4ED8',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: isUploadingProductImg ? 'not-allowed' : 'pointer',
                      opacity: isUploadingProductImg ? 0.7 : 1
                    }}
                  >
                    <Upload size={16} />
                    <span>{isUploadingProductImg ? "Uploading..." : at.fromGallery}</span>
                  </button>
                </div>

                {/* Hidden File Inputs */}
                <input
                  type="file"
                  ref={cameraInputRef}
                  accept="image/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageFile(e.target.files[0]);
                    }
                  }}
                />
                <input
                  type="file"
                  ref={galleryInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageFile(e.target.files[0]);
                    }
                  }}
                />

                {/* Web Link Image URL */}
                <input 
                  type="text" 
                  className="form-input" 
                  value={productForm.image.startsWith('data:') ? '' : productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder={at.orPasteUrl}
                  style={{ fontSize: '12px', padding: '7px 10px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.productNameEn}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={productForm.nameEn}
                  onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                  placeholder="e.g. Fresh Coconut Water 800ml"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.productNameHi}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={productForm.nameHi}
                  onChange={(e) => setProductForm({ ...productForm, nameHi: e.target.value })}
                  placeholder="उदा. ताज़ा नारियल पानी 800ml"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{at.priceEn}</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{at.mrpEn}</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{at.unitEn}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    placeholder="e.g. 1 piece / 800ml Bottle"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{at.categoryLabel}</label>
                  <select 
                    className="form-input"
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                  >
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {adminLang === 'hi' && c.nameHi ? c.nameHi : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.badgeLabel}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={productForm.badge}
                  onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                  placeholder="Optional badge"
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', margin: '16px 0', padding: '10px 12px', background: '#F9FAF8', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={productForm.available}
                    onChange={(e) => setProductForm({ ...productForm, available: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                  />
                  <span style={{ fontWeight: 700 }}>{at.inStockCheckbox}</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                  />
                  <span style={{ fontWeight: 700 }}>{at.featuredCheckbox}</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '14px' }}
                >
                  {at.saveProductBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="admin-btn-outline"
                  style={{ padding: '12px 20px', fontSize: '13px' }}
                >
                  {at.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Add/Edit Modal */}
      {isCategoryModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '480px' }}>
            <div className="admin-modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', fontWeight: 800 }}>
                <LayoutGrid size={20} color="var(--primary)" />
                <span>{editingCategoryId ? at.modalEditCategory : at.modalAddCategory}</span>
              </h3>
              <button 
                onClick={() => setIsCategoryModalOpen(false)}
                className="admin-icon-btn"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="admin-modal-body">
              {/* Category Name (English) */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.catNameEn}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={categoryForm.nameEn}
                  onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                  placeholder="e.g. Exotic Fruits or Fresh Salads"
                  required
                />
              </div>

              {/* Category Name (Hindi) */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.catNameHi}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={categoryForm.nameHi}
                  onChange={(e) => setCategoryForm({ ...categoryForm, nameHi: e.target.value })}
                  placeholder="उदा. विदेशी फल या ताज़ा सलाद"
                />
              </div>

              {/* Icon / Emoji Selection */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.catIconLabel}</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    background: 'var(--primary-light)',
                    border: '1.5px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0
                  }}>
                    {categoryForm.icon || '🥥'}
                  </div>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    placeholder="Enter emoji or icon e.g. 🥥"
                    style={{ flex: 1 }}
                  />
                </div>

                {/* Quick Emoji Picker */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['🥥', '🍋', '🥬', '🍎', '🛒', '⭐', '🥑', '🥭', '🍌', '🍉', '🥦', '🥕', '🌿', '🍯', '🍇', '🍍'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setCategoryForm({ ...categoryForm, icon: emoji })}
                      style={{
                        padding: '6px 10px',
                        background: categoryForm.icon === emoji ? 'var(--primary-light)' : '#F9FAF8',
                        border: categoryForm.icon === emoji ? '1.5px solid var(--primary)' : '1px solid var(--border-light)',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category ID / Slug */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.catSlugLabel}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={categoryForm.id}
                  onChange={(e) => setCategoryForm({ ...categoryForm, id: e.target.value })}
                  placeholder="e.g. exotic-fruits (auto-generated if empty)"
                  disabled={Boolean(editingCategoryId)}
                  style={{ background: editingCategoryId ? '#F3F4F6' : '#FFFFFF', cursor: editingCategoryId ? 'not-allowed' : 'text' }}
                />
                {editingCategoryId && (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px', display: 'block' }}>
                    {at.slugNote}
                  </span>
                )}
              </div>

              {/* Active Toggle */}
              <div style={{ margin: '16px 0', padding: '10px 12px', background: '#F9FAF8', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={categoryForm.isActive !== false}
                    onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                  />
                  <span style={{ fontWeight: 700 }}>{at.catActiveCheckbox}</span>
                </label>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '14px' }}
                >
                  {editingCategoryId ? at.updateCategoryBtn : at.saveCategoryBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="admin-btn-outline"
                  style={{ padding: '12px 20px', fontSize: '13px' }}
                >
                  {at.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Add/Edit Modal */}
      {isBannerModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '580px' }}>
            <div className="admin-modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', fontWeight: 800 }}>
                <ImageIcon size={20} color="var(--primary)" />
                <span>{editingBannerId ? at.modalEditBanner : at.modalAddBanner}</span>
              </h3>
              <button 
                onClick={() => setIsBannerModalOpen(false)}
                className="admin-icon-btn"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="admin-modal-body">
              {/* Photo / Image Section */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">{at.bannerImage}</label>

                {bannerForm.image ? (
                  <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid var(--border-light)', marginBottom: '8px' }}>
                    <img 
                      src={bannerForm.image} 
                      alt="Banner Preview" 
                      style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} 
                    />
                    <button
                      type="button"
                      onClick={() => setBannerForm({ ...bannerForm, image: '' })}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(220, 38, 38, 0.9)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {at.removePhoto}
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <button
                      type="button"
                      disabled={isUploadingBannerImg}
                      onClick={() => bannerCameraInputRef.current?.click()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: isUploadingBannerImg ? '#F3F4F6' : '#F0FDF4',
                        border: isUploadingBannerImg ? '1.5px solid #D1D5DB' : '1.5px solid #86EFAC',
                        color: isUploadingBannerImg ? '#6B7280' : '#15803D',
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: isUploadingBannerImg ? 'not-allowed' : 'pointer',
                        opacity: isUploadingBannerImg ? 0.7 : 1
                      }}
                    >
                      <Camera size={16} />
                      <span>{isUploadingBannerImg ? "Uploading..." : at.clickPhoto}</span>
                    </button>

                    <button
                      type="button"
                      disabled={isUploadingBannerImg}
                      onClick={() => bannerGalleryInputRef.current?.click()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: isUploadingBannerImg ? '#F3F4F6' : '#EFF6FF',
                        border: isUploadingBannerImg ? '1.5px solid #D1D5DB' : '1.5px solid #93C5FD',
                        color: isUploadingBannerImg ? '#6B7280' : '#1D4ED8',
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: isUploadingBannerImg ? 'not-allowed' : 'pointer',
                        opacity: isUploadingBannerImg ? 0.7 : 1
                      }}
                    >
                      <Upload size={16} />
                      <span>{isUploadingBannerImg ? "Uploading..." : at.fromGallery}</span>
                    </button>
                  </div>
                )}

                {/* Hidden File Inputs for Banner */}
                <input
                  type="file"
                  ref={bannerCameraInputRef}
                  accept="image/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleBannerImageFile(e.target.files[0]);
                    }
                  }}
                />
                <input
                  type="file"
                  ref={bannerGalleryInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleBannerImageFile(e.target.files[0]);
                    }
                  }}
                />

                {/* Web Link Image URL */}
                <input 
                  type="text" 
                  className="form-input" 
                  value={bannerForm.image} 
                  onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                  placeholder={at.orPasteUrl}
                  style={{ fontSize: '12px' }}
                />
              </div>

              {/* Title En & Hi */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">{at.bannerTitleEn}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.titleEn}
                    onChange={(e) => setBannerForm({ ...bannerForm, titleEn: e.target.value })}
                    placeholder="e.g. Fresh Coconut Water 800ml"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{at.bannerTitleHi}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.titleHi}
                    onChange={(e) => setBannerForm({ ...bannerForm, titleHi: e.target.value })}
                    placeholder="उदा. ताज़ा नारियल पानी 800ml"
                  />
                </div>
              </div>

              {/* Subtitle En & Hi */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">{at.bannerSubEn}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.subtitleEn}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitleEn: e.target.value })}
                    placeholder="e.g. 100% Pure Bangalore A1 Quality"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{at.bannerSubHi}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.subtitleHi}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitleHi: e.target.value })}
                    placeholder="उदा. 100% असली बैंगलोर A1 क्वालिटी"
                  />
                </div>
              </div>

              {/* Badge En & Hi */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">{at.bannerBadgeEn}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.badgeEn}
                    onChange={(e) => setBannerForm({ ...bannerForm, badgeEn: e.target.value })}
                    placeholder="e.g. BESTSELLER • 15 MINS"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{at.bannerBadgeHi}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.badgeHi}
                    onChange={(e) => setBannerForm({ ...bannerForm, badgeHi: e.target.value })}
                    placeholder="उदा. सर्वाधिक लोकप्रिय"
                  />
                </div>
              </div>

              {/* Pricing & CTA */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">{at.bannerPrice}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.price}
                    onChange={(e) => setBannerForm({ ...bannerForm, price: e.target.value })}
                    placeholder="e.g. ₹199 or Starts ₹20"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{at.bannerOriginalPrice}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.originalPrice}
                    onChange={(e) => setBannerForm({ ...bannerForm, originalPrice: e.target.value })}
                    placeholder="e.g. ₹249"
                  />
                </div>
              </div>

              {/* Button text En & Hi */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">{at.bannerCtaEn}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.ctaEn}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaEn: e.target.value })}
                    placeholder="e.g. Order Now"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{at.bannerCtaHi}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={bannerForm.ctaHi}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaHi: e.target.value })}
                    placeholder="उदा. अभी मंगाएं"
                  />
                </div>
              </div>

              {/* Target Category */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.bannerCategory}</label>
                <select 
                  className="form-input"
                  value={bannerForm.categoryId}
                  onChange={(e) => setBannerForm({ ...bannerForm, categoryId: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon || '📁'} {c.nameEn} {c.nameHi ? `(${c.nameHi})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background Theme Presets */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">{at.bannerGradient}</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {BANNER_GRADIENT_PRESETS.map((preset) => {
                    const isSelected = bannerForm.bgGradient === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setBannerForm({ ...bannerForm, bgGradient: preset.value })}
                        style={{
                          background: preset.value,
                          color: '#FFFFFF',
                          padding: '10px 8px',
                          borderRadius: '8px',
                          border: isSelected ? '2.5px solid #FACC15' : '1px solid rgba(255,255,255,0.2)',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 0 0 2px var(--primary)' : 'none',
                          textAlign: 'center'
                        }}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Toggle */}
              <div style={{ margin: '16px 0', padding: '10px 12px', background: '#F9FAF8', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={bannerForm.isActive !== false}
                    onChange={(e) => setBannerForm({ ...bannerForm, isActive: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                  />
                  <span style={{ fontWeight: 700 }}>{at.bannerActiveCheckbox}</span>
                </label>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '14px' }}
                >
                  {at.saveBannerBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="admin-btn-outline"
                  style={{ padding: '12px 20px', fontSize: '13px' }}
                >
                  {at.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
