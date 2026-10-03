import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BANNERS, INITIAL_SETTINGS } from '../src/data/initialData.js';

const firebaseConfig = {
  apiKey: "AIzaSyBhY1YF2LTZl7aVmfnUbN_B8g5RiXfo_cc",
  authDomain: "nariyal-anna-store.firebaseapp.com",
  projectId: "nariyal-anna-store",
  storageBucket: "nariyal-anna-store.firebasestorage.app",
  messagingSenderId: "543606568502",
  appId: "1:543606568502:web:4fa0fae2b7e8ff82858a97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runSeed() {
  console.log("Starting Firebase Firestore Seeding for nariyal-anna-store...");

  // 1. Seed Products
  console.log(`Seeding ${INITIAL_PRODUCTS.length} products...`);
  for (const prod of INITIAL_PRODUCTS) {
    await setDoc(doc(db, 'products', prod.id), prod);
  }
  console.log("✓ Products seeded successfully!");

  // 2. Seed Categories
  console.log(`Seeding ${INITIAL_CATEGORIES.length} categories...`);
  for (const cat of INITIAL_CATEGORIES) {
    await setDoc(doc(db, 'categories', cat.id), cat);
  }
  console.log("✓ Categories seeded successfully!");

  // 3. Seed Banners
  console.log(`Seeding ${INITIAL_BANNERS.length} banners...`);
  for (const b of INITIAL_BANNERS) {
    await setDoc(doc(db, 'banners', b.id), b);
  }
  console.log("✓ Banners seeded successfully!");

  // 4. Seed Settings
  console.log("Seeding store settings...");
  await setDoc(doc(db, 'settings', 'store_settings'), INITIAL_SETTINGS);
  console.log("✓ Store settings seeded successfully!");

  // 5. Seed Passcode
  console.log("Seeding admin passcode to Firestore database...");
  await setDoc(doc(db, 'security', 'admin'), {
    passcode: "1234",
    updatedAt: new Date().toISOString()
  });
  console.log("✓ Admin passcode ('1234') seeded into Firestore database security/admin!");

  console.log("All data successfully stored in Firebase Firestore!");
  process.exit(0);
}

runSeed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
