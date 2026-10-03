# 🥥 Yadav Nariyal Pani (यादव नारियल पानी)

> **Modern, mobile-first Quick Commerce web application for fresh tender coconut water and farm-fresh produce in Gurgaon, powered by React, Vite, and Google Firebase.**

[![Firebase Hosting](https://img.shields.io/badge/Hosted%20on-Firebase%20Hosting-FFA611?style=for-the-badge&logo=firebase&logoColor=white)](https://yadav-nariyal-pani.web.app)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Cloud Firestore](https://img.shields.io/badge/Database-Cloud%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/docs/firestore)

---

## 🌐 Live Production URLs

* **🛍️ Customer Storefront:** [https://yadav-nariyal-pani.web.app](https://yadav-nariyal-pani.web.app)
* **🔐 Vendor Admin Portal:** [https://yadav-nariyal-pani.web.app/admin](https://yadav-nariyal-pani.web.app/admin)
* *(Alternate Domain):* [https://yadav-nariyal-pani.firebaseapp.com](https://yadav-nariyal-pani.firebaseapp.com)

---

## ✨ Features

### 🛒 Customer Storefront
* **Mobile-First UX:** Designed for quick-commerce shopping (similar to Blinkit & Zepto) with touch-friendly controls, swipeable banners, and smooth animations.
* **1-Click WhatsApp Checkout:** Automatically calculates item totals, delivery charges, and free delivery thresholds, generating a clean, emoji-formatted WhatsApp order receipt sent directly to the vendor's WhatsApp.
* **Smart Search & Filter:** Instant search across English and Hindi titles, descriptions, and tags with real-time feedback.
* **Live Out-of-Stock Protection:** Items marked as out of stock by the vendor are automatically hidden from customers to prevent invalid orders.
* **Interactive Cart & Quick View:** Slide-up sheet cart, item quantity counter, and full product detail modal.
* **Bilingual Support:** Complete English and Hindi (हिंदी) toggle for every screen and dialog.
* **Promotional Banner Slider:** Eye-catching hero slider with gradient presets and instant category navigation.

### 🔐 Vendor Admin Portal (`/admin`)
* **Secure Passcode Authentication:** Admin access is gated with a 4-digit passcode verified live against the Firebase Firestore `security/admin` document (Default: `1234`).
* **Live Inventory Control:** One-tap stock toggle (`IN STOCK` / `OUT OF STOCK`), real-time price updates, and product management.
* **Camera & Gallery Photo Uploads:** Take photos directly from the mobile camera or upload from the device gallery, automatically uploaded to Firebase Cloud Storage with local canvas compression.
* **Category Management:** Add, edit, or toggle categories dynamically; changes reflect immediately on the storefront carousel.
* **Hero Banner Editor:** Modify promotional banners, headlines, offer prices, call-to-action buttons, and gradient backgrounds.
* **Store Settings Management:** Edit shop address, daily opening hours, WhatsApp order number, delivery fees, minimum order amount, and update the admin passcode on the fly.
* **Independent Language Toggle:** Admin dashboard has its own language switch (English / Hindi) that does not interfere with the customer's preferred language.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Bundler & Dev Server** | [Vite 8](https://vitejs.dev/) |
| **Styling** | Custom Vanilla CSS with CSS Variables & HSL Colors |
| **Database** | [Google Cloud Firestore](https://firebase.google.com/docs/firestore) (Real-time synchronization) |
| **Media Storage** | [Firebase Cloud Storage](https://firebase.google.com/docs/storage) |
| **Hosting & CDN** | [Firebase Hosting](https://firebase.google.com/docs/hosting) (Global SSD CDN with SSL) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |

---

## 📂 Project Structure

```text
nariyal-anna/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Brand logos & imagery
│   ├── components/         # React Components
│   │   ├── AdminPanel.jsx        # Vendor admin dashboard & modals
│   │   ├── BottomNavigation.jsx  # Mobile navigation bar
│   │   ├── BrandStrip.jsx        # Top announcement bar
│   │   ├── CartModal.jsx         # WhatsApp checkout & bill breakdown
│   │   ├── CategoryCarousel.jsx  # Horizontal category filter list
│   │   ├── Header.jsx            # Brand header & delivery location
│   │   ├── HeroBanner.jsx        # Promotional slider
│   │   ├── OrderSuccessModal.jsx # Order confirmation popup
│   │   ├── ProductCard.jsx       # Product grid card with quantity stepper
│   │   ├── ProductDetailModal.jsx# Quick product view popup
│   │   ├── SearchBar.jsx         # Live search input
│   │   ├── StickyCartBar.jsx     # Bottom quick-commerce cart bar
│   │   ├── StoreInfoModal.jsx    # Shop details, map, hours & socials
│   │   ├── Toast.jsx             # Feedback notifications
│   │   ├── TrustStrip.jsx        # Hygiene & quality badges
│   │   └── WhatsAppHelpModal.jsx # Direct customer support actions
│   ├── data/
│   │   └── initialData.js  # Poster catalogue defaults & schema
│   ├── services/
│   │   ├── firebase.js     # Firebase SDK, Firestore listeners, CRUD & Storage
│   │   └── storageService.js # Offline localStorage cache fallback
│   ├── translations/
│   │   └── translations.js # English & Hindi localization dictionaries
│   ├── App.jsx             # Main application orchestrator & routes
│   ├── index.css           # Design tokens, typography & mobile styling
│   └── main.jsx            # React root entry point
├── scripts/
│   └── seed.js             # One-time Firestore database seeder script
├── .firebaserc             # Firebase active project configuration
├── firebase.json           # Firebase Hosting, Firestore & Storage rules
├── firestore.rules         # Security rules for Cloud Firestore
├── storage.rules           # Security rules for Cloud Storage
├── package.json            # Scripts & dependencies
└── README.md               # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)
* `npm` or `yarn`

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/yadav-nariyal-pani.git
   cd yadav-nariyal-pani
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.  
   To test the admin panel locally, navigate to [http://localhost:5173/admin](http://localhost:5173/admin).

---

## 📦 Available Scripts

* `npm run dev` — Launches the Vite development server with Hot Module Replacement (HMR).
* `npm run build` — Compiles and minifies assets into the `dist/` directory.
* `npm run preview` — Locally previews the production build.
* `npm run deploy` — **1-Step build and deployment** directly to Firebase Hosting:
  ```bash
  npm run deploy
  ```

---

## 🔐 Admin Dashboard Access

1. Open `/admin` on the live site:  
   👉 **[https://yadav-nariyal-pani.web.app/admin](https://yadav-nariyal-pani.web.app/admin)**
2. Enter the admin passcode:
   ```text
   1234
   ```
3. The passcode can be modified at any time inside the **Store Settings** tab of the dashboard, which writes directly to the Firestore `security/admin` document.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
