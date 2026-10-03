import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

export default function StoreInfoModal({
  isOpen,
  onClose,
  settings,
  lang,
  t
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />

        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🥥</span>
            <h3 className="sheet-title">{t.storeInfo}</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="sheet-body">
          {/* Brand header */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className="store-badge-live">
              <span className="live-dot" />
              <span>{settings.isOpen ? (lang === 'hi' ? "दुकान खुली है" : "STORE OPEN NOW") : (lang === 'hi' ? "दुकान बंद है" : "CLOSED")}</span>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2px' }}>
              {settings.shopName}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700 }}>
              {settings.subName || "Yadav Nariyal Pani"}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {lang === 'hi' ? settings.taglineHi : settings.taglineEn}
            </p>
          </div>

          {/* Details list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Address */}
            <div style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              display: 'flex',
              gap: '12px'
            }}>
              <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {lang === 'hi' ? "दुकान का पता" : "Shop Location"}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {lang === 'hi' ? settings.addressHi : settings.addressEn}
                </div>
                <a
                  href={settings.mapsUrl || "https://maps.google.com/?q=Sector+15+Part+2+Gurgaon"}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11.5px',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    marginTop: '6px',
                    textDecoration: 'none'
                  }}
                >
                  <span>{t.scanForLocation}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Timings */}
            <div style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Clock size={20} color="#D97706" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {lang === 'hi' ? "दुकान का समय" : "Daily Hours"}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {settings.openingHours || "6:00 AM – 9:30 PM (Daily)"}
                </div>
              </div>
            </div>

            {/* Quick Contact buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <a
                href={`tel:${settings.whatsappNumber}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--primary-light)',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 800,
                  textDecoration: 'none'
                }}
              >
                <Phone size={16} />
                <span>Call {settings.whatsappNumber}</span>
              </a>

              <a
                href={`tel:${settings.secondaryPhone}`}
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
                <span>Call {settings.secondaryPhone}</span>
              </a>
            </div>

            {/* Social channels (from poster: @cocobhaiofficial) */}
            <div style={{
              textAlign: 'center',
              marginTop: '6px',
              padding: '12px',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
                {t.followUsOn} {settings.instagramHandle || "@cocobhaiofficial"}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
                <a 
                  href={`https://instagram.com/${(settings.instagramHandle || "@cocobhaiofficial").replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#E1306C', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#FF0000', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube</span>
                </a>
                <a 
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#1877F2', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
