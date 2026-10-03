import React from 'react';
import { CheckCircle2, MessageCircle, Phone, X, ExternalLink } from 'lucide-react';

export default function OrderSuccessModal({
  isOpen,
  onClose,
  orderDetails,
  settings,
  lang,
  t
}) {
  if (!isOpen || !orderDetails) return null;

  const rawNumber = (settings.whatsappNumber || "9310551050").replace(/\D/g, '');
  const fullNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />

        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🎉</span>
            <h3 className="sheet-title">
              {lang === 'hi' ? "ऑर्डर सफलतापूर्वक भेजा गया!" : "Order Sent to WhatsApp!"}
            </h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="sheet-body" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#DCFCE7',
            color: '#15803D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
            {lang === 'hi' ? "ऑर्डर संदेश तैयार है" : "WhatsApp Chat Opened"}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4 }}>
            {lang === 'hi'
              ? `आपका ऑर्डर विवरण यादव नारियल पानी (${settings.whatsappNumber}) के WhatsApp पर भेज दिया गया है।`
              : `Your formatted order has been sent to ${settings.shopName} on WhatsApp (${settings.whatsappNumber}).`}
          </p>

          {/* Quick summary box */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            textAlign: 'left',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t.deliveringTo}:</span>
              <span style={{ fontWeight: 700 }}>{orderDetails.location}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t.items}:</span>
              <span style={{ fontWeight: 700 }}>{orderDetails.cart.reduce((a, b) => a + b.quantity, 0)} {t.items}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 800, color: 'var(--primary-dark)', borderTop: '1px dashed var(--border-light)', paddingTop: '6px', marginTop: '6px' }}>
              <span>{t.totalAmount}:</span>
              <span>₹{orderDetails.grandTotal}</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href={`https://wa.me/${fullNumber}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#FFF',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 800,
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={18} />
              <span>{lang === 'hi' ? "WhatsApp चैट फिर से खोलें" : "Re-open WhatsApp Chat"}</span>
            </a>

            <a
              href={`tel:${settings.whatsappNumber}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-main)',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Phone size={16} />
              <span>{lang === 'hi' ? `दुकानदार को कॉल करें (${settings.whatsappNumber})` : `Call Vendor (${settings.whatsappNumber})`}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
