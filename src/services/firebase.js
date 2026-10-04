import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  getStorage, 
  ref as storageRef, 
  uploadString, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_BANNERS, 
  INITIAL_SETTINGS 
} from '../data/initialData';

// Firebase configuration for nariyal-anna-store
export const firebaseConfig = {
  apiKey: "AIzaSyBhY1YF2LTZl7aVmfnUbN_B8g5RiXfo_cc",
  authDomain: "nariyal-anna-store.firebaseapp.com",
  projectId: "nariyal-anna-store",
  storageBucket: "nariyal-anna-store.firebasestorage.app",
  messagingSenderId: "543606568502",
  appId: "1:543606568502:web:4fa0fae2b7e8ff82858a97"
};

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure storage retry limits so network operations fail fast (under 3.5s) instead of hanging 10 minutes
try {
  storage.maxUploadRetryTime = 3000;
  storage.maxOperationRetryTime = 3000;
} catch (e) {
  // Ignore in case property is read-only in certain SDK builds
}

// Firestore Collection References
export const PRODUCTS_COLLECTION = 'products';
export const CATEGORIES_COLLECTION = 'categories';
export const BANNERS_COLLECTION = 'banners';
export const SETTINGS_COLLECTION = 'settings';
export const SECURITY_COLLECTION = 'security';

/**
 * Upload an image file or DataURL directly to Firebase Cloud Storage with fast fallback
 * @param {File|Blob|string} imageFileOrDataUrl 
 * @param {string} folder 
 * @returns {Promise<string>} Download URL from Firebase Storage or optimized DataURL
 */
export async function uploadImageToStorage(imageFileOrDataUrl, folder = 'images') {
  if (!imageFileOrDataUrl) return '';
  
  // If it's already an http/https URL and not a data URL, return it
  if (typeof imageFileOrDataUrl === 'string' && imageFileOrDataUrl.startsWith('http')) {
    return imageFileOrDataUrl;
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.jpg`;
  const fileRef = storageRef(storage, `${folder}/${fileName}`);

  try {
    const uploadTask = (async () => {
      if (typeof imageFileOrDataUrl === 'string' && imageFileOrDataUrl.startsWith('data:')) {
        // Base64 Data URL upload
        await uploadString(fileRef, imageFileOrDataUrl, 'data_url');
      } else {
        // File or Blob upload
        await uploadBytes(fileRef, imageFileOrDataUrl);
      }
      return await getDownloadURL(fileRef);
    })();

    // 3.5s timeout prevents hanging if storage bucket is not activated in Firebase console
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Storage upload timed out")), 3500);
    });

    const downloadUrl = await Promise.race([uploadTask, timeoutPromise]);
    return downloadUrl;
  } catch (error) {
    console.warn("Firebase Storage unavailable or timed out; falling back to optimized image data:", error?.message || error);
    // Fallback to original string if upload fails or is not enabled
    return typeof imageFileOrDataUrl === 'string' ? imageFileOrDataUrl : '';
  }
}

/**
 * Initialize / Seed database if empty
 */
export async function initializeFirestoreIfEmpty() {
  try {
    const productsSnap = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (productsSnap.empty) {
      console.log("Seeding initial products to Firestore...");
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, PRODUCTS_COLLECTION, prod.id), prod);
      }
    }

    const categoriesSnap = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (categoriesSnap.empty) {
      console.log("Seeding initial categories to Firestore...");
      for (const cat of INITIAL_CATEGORIES) {
        await setDoc(doc(db, CATEGORIES_COLLECTION, cat.id), cat);
      }
    }

    const bannersSnap = await getDocs(collection(db, BANNERS_COLLECTION));
    if (bannersSnap.empty) {
      console.log("Seeding initial banners to Firestore...");
      for (const banner of INITIAL_BANNERS) {
        await setDoc(doc(db, BANNERS_COLLECTION, banner.id), banner);
      }
    }

    const settingsRef = doc(db, SETTINGS_COLLECTION, 'store_settings');
    const settingsSnap = await getDoc(settingsRef);
    if (!settingsSnap.exists()) {
      console.log("Seeding initial settings to Firestore...");
      await setDoc(settingsRef, INITIAL_SETTINGS);
    }

    const securityRef = doc(db, SECURITY_COLLECTION, 'admin');
    const securitySnap = await getDoc(securityRef);
    if (!securitySnap.exists()) {
      console.log("Seeding initial admin passcode to Firestore...");
      await setDoc(securityRef, {
        passcode: "1234",
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.warn("Firestore auto-seed check warning:", error);
  }
}

// ==========================================
// REAL-TIME FIRESTORE SUBSCRIPTIONS
// ==========================================

export function subscribeProducts(callback) {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  return onSnapshot(colRef, (snapshot) => {
    const items = [];
    snapshot.forEach(docSnap => {
      items.push({ ...docSnap.data(), id: docSnap.id });
    });
    callback(items);
  }, (error) => {
    console.error("Firestore Products sync error:", error);
  });
}

export function subscribeCategories(callback) {
  const colRef = collection(db, CATEGORIES_COLLECTION);
  return onSnapshot(colRef, (snapshot) => {
    const items = [];
    snapshot.forEach(docSnap => {
      items.push({ ...docSnap.data(), id: docSnap.id });
    });
    // Sort by order if available
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    callback(items);
  }, (error) => {
    console.error("Firestore Categories sync error:", error);
  });
}

export function subscribeBanners(callback) {
  const colRef = collection(db, BANNERS_COLLECTION);
  return onSnapshot(colRef, (snapshot) => {
    const items = [];
    snapshot.forEach(docSnap => {
      items.push({ ...docSnap.data(), id: docSnap.id });
    });
    callback(items);
  }, (error) => {
    console.error("Firestore Banners sync error:", error);
  });
}

export function subscribeSettings(callback) {
  const docRef = doc(db, SETTINGS_COLLECTION, 'store_settings');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  }, (error) => {
    console.error("Firestore Settings sync error:", error);
  });
}

export function subscribeAdminPasscode(callback) {
  const docRef = doc(db, SECURITY_COLLECTION, 'admin');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().passcode || '1234');
    } else {
      callback('1234');
    }
  }, (error) => {
    console.error("Firestore Security sync error:", error);
    callback('1234');
  });
}

// ==========================================
// FIRESTORE CRUD ACTIONS
// ==========================================

export async function saveProductToFirestore(product) {
  const id = product.id || `prod-${Date.now()}`;
  const prodRef = doc(db, PRODUCTS_COLLECTION, id);
  await setDoc(prodRef, { ...product, id }, { merge: true });
  return id;
}

export async function deleteProductFromFirestore(productId) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
}

export async function saveCategoryToFirestore(category) {
  const id = category.id || `cat-${Date.now()}`;
  const catRef = doc(db, CATEGORIES_COLLECTION, id);
  await setDoc(catRef, { ...category, id }, { merge: true });
  return id;
}

export async function deleteCategoryFromFirestore(categoryId) {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, categoryId));
}

export async function saveBannerToFirestore(banner) {
  const id = banner.id || `banner-${Date.now()}`;
  const bannerRef = doc(db, BANNERS_COLLECTION, id);
  await setDoc(bannerRef, { ...banner, id }, { merge: true });
  return id;
}

export async function deleteBannerFromFirestore(bannerId) {
  await deleteDoc(doc(db, BANNERS_COLLECTION, bannerId));
}

export async function saveSettingsToFirestore(settings) {
  const settingsRef = doc(db, SETTINGS_COLLECTION, 'store_settings');
  await setDoc(settingsRef, settings, { merge: true });
}

export async function saveAdminPasscodeToFirestore(newPasscode) {
  const securityRef = doc(db, SECURITY_COLLECTION, 'admin');
  await setDoc(securityRef, {
    passcode: String(newPasscode).trim(),
    updatedAt: new Date().toISOString()
  }, { merge: true });
}
