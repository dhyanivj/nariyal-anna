import React from 'react';
import { Home, Search, LayoutGrid, ShoppingBag, MessageCircle } from 'lucide-react';

export default function BottomNavigation({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenWhatsAppHelp,
  settings,
  t
}) {
  const handleTabClick = (tabKey) => {
    if (tabKey === 'cart') {
      onOpenCart();
    } else if (tabKey === 'whatsapp') {
      if (onOpenWhatsAppHelp) {
        onOpenWhatsAppHelp();
      } else {
        const rawNumber = (settings.whatsappNumber || "9310551050").replace(/\D/g, '');
        const fullNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;
        window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent("Hello Yadav Nariyal Pani, I want to inquire about coconut water & fresh produce delivery!")}`, '_blank');
      }
    } else {
      onSelectTab(tabKey);
    }
  };

  return (
    <nav className="bottom-nav" aria-label="Bottom Navigation">
      <button
        className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleTabClick('home')}
      >
        <Home size={20} className="nav-tab-icon" />
        <span>{t.navHome}</span>
      </button>

      <button
        className={`nav-tab-btn ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => handleTabClick('search')}
      >
        <Search size={20} className="nav-tab-icon" />
        <span>{t.navSearch}</span>
      </button>

      <button
        className={`nav-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
        onClick={() => handleTabClick('categories')}
      >
        <LayoutGrid size={20} className="nav-tab-icon" />
        <span>{t.navCategories}</span>
      </button>

      <button
        className="nav-tab-btn"
        onClick={() => handleTabClick('cart')}
        style={{ position: 'relative' }}
      >
        <ShoppingBag size={20} className="nav-tab-icon" />
        {cartCount > 0 && (
          <span className="nav-tab-badge">{cartCount}</span>
        )}
        <span>{t.navCart}</span>
      </button>

      <button
        className="nav-tab-btn"
        onClick={() => handleTabClick('whatsapp')}
      >
        <MessageCircle size={20} className="nav-tab-icon" style={{ color: '#25D366' }} />
        <span>{t.navContact}</span>
      </button>
    </nav>
  );
}
