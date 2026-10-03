import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ProductCard({
  product,
  quantity = 0,
  onAddToCart,
  onUpdateQty,
  onOpenQuickView,
  lang,
  t
}) {
  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const isOutOfStock = product.available === false || (product.stock !== undefined && product.stock <= 0);

  return (
    <div className="product-card">
      {/* Product Image & Badges */}
      <div 
        className="product-image-wrap"
        onClick={() => onOpenQuickView(product)}
      >
        <img 
          src={product.image} 
          alt={product.nameEn}
          className="product-img"
          loading="lazy"
        />

        {/* Feature/Bestseller badge */}
        {product.badge && (
          <span className="card-badge-pill">
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="card-discount-badge">
            {discountPercent}% {t.off || "OFF"}
          </span>
        )}
      </div>

      {/* Product Content Body */}
      <div className="product-body">
        <div>
          {/* Veg indicator & Title (English Only on Product Card) */}
          <div className="product-title-row">
            <span className="veg-indicator" title="100% Pure Vegetarian">
              <span className="veg-dot" />
            </span>
            <div 
              style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
              onClick={() => onOpenQuickView(product)}
            >
              <h4 className="product-title-en">
                {product.nameEn}
              </h4>
            </div>
          </div>

          {/* Unit */}
          <p className="product-unit">
            {product.unit}
          </p>
        </div>

        {/* Price & Add Action Row */}
        <div className="product-action-row">
          <div className="price-box">
            <span className="current-price">₹{product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="strike-mrp">₹{product.mrp}</span>
            )}
          </div>

          {/* Quick-commerce button or +/- selector */}
          {isOutOfStock ? (
            <span className="out-of-stock-pill">{t.outOfStock}</span>
          ) : quantity > 0 ? (
            <div className="qty-control-box">
              <button 
                className="qty-btn"
                onClick={() => onUpdateQty(product.id, quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => onUpdateQty(product.id, quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button 
              className="btn-quick-add"
              onClick={() => onAddToCart(product)}
            >
              <Plus size={13} />
              <span>{t.add}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
