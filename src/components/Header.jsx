import React from 'react';
import { MapPin, ShoppingBag } from 'lucide-react';
import logoImg from '../assets/yadav-nariyal-pani-logo.png';

export default function Header({
  settings,
  cartCount,
  onOpenCart
}) {
  return (
    <header className="top-header">
      <div className="top-header-row">
        {/* Left: Brand Logo */}
        <div className="brand-logo-wrap">
          <img 
            src={logoImg} 
            alt="Yadav Nariyal Pani" 
            className="brand-logo-img" 
          />
        </div>

        {/* Center: Delivering to Gurgaon */}
        <div className="delivering-to-center">
          <MapPin size={13} className="delivering-pin" />
          <span>Delivering to Gurgaon</span>
        </div>

        {/* Right action: Cart Icon */}
        <div className="header-actions">
          <button 
            className="cart-header-btn"
            onClick={onOpenCart}
            title="Cart"
            aria-label="View Cart"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="cart-header-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
