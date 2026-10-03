import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Send, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartModal({
  isOpen,
  onClose,
  cart = [],
  onUpdateQty,
  onClearCart,
  settings,
  location,
  lang,
  t,
  onOrderCompleted
}) {
  const [addressDetails, setAddressDetails] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const itemTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = itemTotal >= (settings.freeDeliveryThreshold || 199);
  const deliveryFee = itemTotal === 0 ? 0 : (isFreeDelivery ? 0 : (settings.deliveryCharge || 25));
  const grandTotal = itemTotal + deliveryFee;
  const awayFromFree = (settings.freeDeliveryThreshold || 199) - itemTotal;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    if (itemTotal < (settings.minimumOrder || 50)) {
      alert(`${t.minOrderAlert} ₹${settings.minimumOrder || 50}`);
      return;
    }

    // Build formatted WhatsApp message with emojis and clear hierarchy
    let message = `🌴 *Order from ${settings.shopName || "Yadav Nariyal Pani"}*\n`;
    message += `(${settings.subName || "ताज़ा नारियल पानी"})\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📍 *Delivery Area:* ${location}\n`;
    if (addressDetails.trim()) {
      message += `🏠 *Address / Landmark:* ${addressDetails.trim()}\n`;
    }
    if (orderNotes.trim()) {
      message += `📝 *Note:* ${orderNotes.trim()}\n`;
    }
    message += `\n🛒 *Items Ordered:*\n`;

    cart.forEach((item) => {
      const pName = lang === 'hi' ? item.product.nameHi : item.product.nameEn;
      const unit = lang === 'hi' && item.product.unitHi ? item.product.unitHi : item.product.unit;
      message += `• ${pName} (${unit}) × ${item.quantity} = ₹${item.product.price * item.quantity}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *Item Total:* ₹${itemTotal}\n`;
    message += `🛵 *Delivery:* ${deliveryFee === 0 ? "FREE (मुफ्त)" : `₹${deliveryFee}`}\n`;
    message += `💰 *Grand Total:* ₹${grandTotal}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🙏 *Please confirm my order and share estimated arrival time!*`;

    // Confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    // Direct WhatsApp Web / Mobile redirect
    const rawNumber = (settings.whatsappNumber || "9310551050").replace(/\D/g, '');
    const fullNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;
    const whatsappUrl = `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    if (onOrderCompleted) {
      onOrderCompleted({
        cart,
        itemTotal,
        deliveryFee,
        grandTotal,
        location,
        addressDetails
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />

        {/* Sheet Header */}
        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h3 className="sheet-title">{t.cart} ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="sheet-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 14px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🥥</div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                {t.cartEmpty}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {t.cartEmptySub}
              </p>
              <button 
                className="btn-whatsapp-order" 
                onClick={onClose}
                style={{ background: 'var(--primary)', maxWidth: '200px', margin: '0 auto', padding: '10px 16px' }}
              >
                {t.startShopping}
              </button>
            </div>
          ) : (
            <>
              {/* Delivery threshold bar */}
              <div style={{
                background: isFreeDelivery ? '#DCFCE7' : '#FEF3C7',
                border: `1px solid ${isFreeDelivery ? '#86EFAC' : '#FDE68A'}`,
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                marginBottom: '14px',
                fontSize: '12px',
                fontWeight: 600,
                color: isFreeDelivery ? '#15803D' : '#92400E',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} />
                <span>
                  {isFreeDelivery 
                    ? (lang === 'hi' ? "🎉 बधाई हो! इस ऑर्डर पर मुफ्त डिलीवरी लागू है।" : "🎉 You have unlocked FREE Delivery!")
                    : (lang === 'hi' 
                        ? `₹${awayFromFree} का सामान और जोड़ें और पाएं मुफ़्त डिलीवरी!` 
                        : `Add ₹${awayFromFree} more to unlock FREE Delivery!`)}
                </span>
              </div>

              {/* Items List */}
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.product.id} className="cart-item-row">
                    <div className="cart-item-left">
                      <img 
                        src={item.product.image} 
                        alt={item.product.nameEn} 
                        className="cart-thumb" 
                      />
                      <div className="cart-item-info">
                        <span className="cart-item-title">
                          {lang === 'hi' ? item.product.nameHi : item.product.nameEn}
                        </span>
                        <span className="cart-item-price">
                          ₹{item.product.price} • {lang === 'hi' && item.product.unitHi ? item.product.unitHi : item.product.unit}
                        </span>
                      </div>
                    </div>

                    <div className="qty-control-box">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Inputs */}
              <div className="delivery-input-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <MapPin size={14} color="var(--primary)" />
                  <label className="delivery-input-label" style={{ margin: 0 }}>
                    {t.deliveryAddressNote}
                  </label>
                </div>
                <textarea 
                  className="delivery-textarea"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder={t.deliveryAddressPlaceholder}
                  rows={2}
                />
              </div>

              <div className="delivery-input-group">
                <label className="delivery-input-label">
                  {t.orderNotes}
                </label>
                <textarea 
                  className="delivery-textarea"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={t.orderNotesPlaceholder}
                  rows={1}
                />
              </div>

              {/* Bill Details Breakdown */}
              <div className="bill-breakdown-card">
                <div className="bill-row">
                  <span>{t.itemTotal}</span>
                  <span style={{ fontWeight: 700 }}>₹{itemTotal}</span>
                </div>
                <div className="bill-row">
                  <span>{t.deliveryFee}</span>
                  {deliveryFee === 0 ? (
                    <span className="free-tag">{t.freeDelivery}</span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>
                <div className="bill-row total">
                  <span>{t.totalAmount}</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Main Conversion CTA: Order on WhatsApp */}
              <button 
                className="btn-whatsapp-order"
                onClick={handleWhatsAppOrder}
              >
                <span style={{ fontSize: '20px' }}>💬</span>
                <span>{t.orderOnWhatsApp} • ₹{grandTotal}</span>
              </button>

              <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                ✓ {t.directOrderHint} ({settings.whatsappNumber})
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
