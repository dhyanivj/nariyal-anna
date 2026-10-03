import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function StickyCartBar({
  cartCount,
  cartTotal,
  onOpenCart,
  t
}) {
  if (!cartCount || cartCount <= 0) return null;

  return (
    <div className="sticky-cart-bar">
      <div 
        className="sticky-cart-inner"
        onClick={onOpenCart}
        role="button"
        tabIndex={0}
      >
        <div className="sticky-cart-left">
          <div className="cart-icon-bubble">
            <ShoppingBag size={18} color="#FFFFFF" />
            <span className="cart-bubble-badge">{cartCount}</span>
          </div>
          <div className="sticky-cart-meta">
            <span className="sticky-cart-items-count">
              {cartCount} {cartCount === 1 ? t.item : t.items}
            </span>
            <span className="sticky-cart-total">
              ₹{cartTotal}
            </span>
          </div>
        </div>

        <div className="sticky-cart-cta">
          <span>{t.viewCart}</span>
          <ArrowRight size={15} />
        </div>
      </div>
    </div>
  );
}
