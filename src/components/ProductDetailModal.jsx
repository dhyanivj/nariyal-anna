import React from 'react';
import { X, CheckCircle2, Plus, Minus, ShieldCheck, Heart } from 'lucide-react';

export default function ProductDetailModal({
  product,
  onClose,
  quantity = 0,
  onAddToCart,
  onUpdateQty,
  lang,
  t
}) {
  if (!product) return null;

  const defaultBenefitsEn = [
    "Hydrates Your Body with Natural Electrolytes",
    "Boosts Immunity & Digestive Wellness",
    "100% Pure & Freshly Handled",
    "No Added Sugar or Preservatives"
  ];

  const defaultBenefitsHi = [
    "प्राकृतिक इलेक्ट्रोलाइट्स से भरपूर हाइड्रेशन",
    "रोग प्रतिरोधक क्षमता और पाचन में सहायक",
    "100% असली व ताज़ा निकाला हुआ",
    "बिना चीनी, बिना किसी रसायन के"
  ];

  const benefitsList = (lang === 'hi' && product.benefitsHi) 
    ? product.benefitsHi 
    : (product.benefits || defaultBenefitsEn);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        
        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="veg-indicator">
              <span className="veg-dot" />
            </span>
            <span className="sheet-title">
              {lang === 'hi' ? product.nameHi : product.nameEn}
            </span>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="sheet-body">
          {/* Big Image Showcase */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            aspectRatio: '16/10',
            marginBottom: '14px',
            backgroundColor: '#F3F4F6'
          }}>
            <img 
              src={product.image} 
              alt={product.nameEn}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.badge && (
              <span className="card-badge-pill" style={{ top: 12, left: 12 }}>
                {lang === 'hi' && product.badgeHi ? product.badgeHi : product.badge}
              </span>
            )}
          </div>

          {/* Titles & Units */}
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2px' }}>
            {product.nameEn}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>
            {product.nameHi}
          </p>

          <div style={{
            display: 'inline-block',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-body)',
            marginBottom: '12px'
          }}>
            {lang === 'hi' && product.unitHi ? product.unitHi : product.unit}
          </div>

          {/* Description */}
          <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '16px' }}>
            {lang === 'hi' && product.descriptionHi ? product.descriptionHi : product.descriptionEn}
          </p>

          {/* Health Benefits (from poster) */}
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#166534' }}>
              <Heart size={16} />
              <span style={{ fontSize: '12.5px', fontWeight: 800 }}>
                {t.healthBenefits} • {lang === 'hi' ? "विशेष गुण" : "Key Benefits"}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {benefitsList.map((benefit, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#15803D' }}>
                  <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '14px'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.totalAmount}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                  ₹{product.price}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span style={{ fontSize: '13px', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                    ₹{product.mrp}
                  </span>
                )}
              </div>
            </div>

            {quantity > 0 ? (
              <div className="qty-control-box" style={{ minWidth: '100px', height: '38px' }}>
                <button 
                  className="qty-btn"
                  onClick={() => onUpdateQty(product.id, quantity - 1)}
                  style={{ width: '32px', height: '32px' }}
                >
                  <Minus size={16} />
                </button>
                <span className="qty-value" style={{ fontSize: '15px' }}>{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => onUpdateQty(product.id, quantity + 1)}
                  style={{ width: '32px', height: '32px' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button 
                className="btn-quick-add"
                onClick={() => onAddToCart(product)}
                style={{ padding: '8px 20px', height: '38px', fontSize: '13px' }}
              >
                <Plus size={15} />
                <span>{t.add}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
