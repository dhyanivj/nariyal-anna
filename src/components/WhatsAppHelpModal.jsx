import React from 'react';
import { MessageCircle, Truck, ShoppingBag, HelpCircle, Phone, Clock, MapPin, X, ShieldCheck, ChevronRight } from 'lucide-react';
import logoImg from '../assets/yadav-nariyal-pani-logo.png';

export default function WhatsAppHelpModal({
  isOpen,
  onClose,
  settings,
  cartCount = 0,
  onOpenCart,
  lang,
  t
}) {
  if (!isOpen) return null;

  const rawNumber = (settings.whatsappNumber || "9310551050").replace(/\D/g, '');
  const waNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;

  const openWhatsAppWith = (message) => {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePlaceOrderClick = () => {
    if (cartCount > 0 && onOpenCart) {
      onClose();
      onOpenCart();
    } else {
      openWhatsAppWith(
        lang === 'hi'
          ? "नमस्ते यादव नारियल पानी! मुझे ताज़ा नारियल पानी और सामान का नया ऑर्डर देना है।"
          : "Hello Yadav Nariyal Pani! I would like to place a new order for fresh coconut water and daily produce."
      );
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sheet-container whatsapp-help-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />

        <div className="sheet-header" style={{ paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#DCFCE7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#15803D'
            }}>
              <MessageCircle size={18} color="#25D366" />
            </div>
            <div>
              <h3 className="sheet-title" style={{ fontSize: '16px', lineHeight: 1.2 }}>
                {lang === 'hi' ? "व्हाट्सएप सहायता एवं ऑर्डर" : "WhatsApp Help & Orders"}
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {lang === 'hi' ? "सीधे विक्रेता से जुड़ें" : "Direct vendor support & instant chat"}
              </span>
            </div>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="sheet-body" style={{ paddingBottom: '24px' }}>
          {/* 1. STORE INFO FIRST (As requested: "there in that page show info first") */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
            border: '1.5px solid #BBF7D0',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(10, 84, 50, 0.05)'
          }}>
            {/* Store Status Pill & Opening Hours */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div className="store-badge-live" style={{ margin: 0 }}>
                <span className="live-dot" />
                <span style={{ fontSize: '11px', fontWeight: 800 }}>
                  {settings.isOpen ? (lang === 'hi' ? "दुकान खुली है" : "STORE OPEN NOW") : (lang === 'hi' ? "दुकान बंद है" : "STORE CLOSED")}
                </span>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#B45309', fontWeight: 700, background: '#FEF3C7', padding: '3px 8px', borderRadius: '99px' }}>
                <Clock size={12} />
                <span>{settings.openingHours || "6:00 AM – 9:30 PM"}</span>
              </span>
            </div>

            {/* Shop Brand & Address */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <img 
                src={logoImg} 
                alt="Yadav Nariyal Pani" 
                style={{ height: '36px', maxWidth: '120px', objectFit: 'contain' }} 
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  {settings.subName || "Yadav Nariyal Pani"}
                </h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '1px 0 0 0' }}>
                  {settings.shopName}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11.5px', color: 'var(--text-body)', marginTop: '6px' }}>
              <MapPin size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{settings.addressEn || "Near Yoga Ashram, Sector 15 Part 2, Gurgaon, Haryana 122001"}</span>
            </div>

            {/* Trust Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1px dashed #BBF7D0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '10px', color: 'var(--primary-dark)', fontWeight: 700 }}>
                🥥 {lang === 'hi' ? "बैंगलोर A1 क्वालिटी" : "Bangalore A1"}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--primary-dark)', fontWeight: 700 }}>
                🛵 {lang === 'hi' ? "घर पर डिलीवरी" : "Home Delivery"}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--primary-dark)', fontWeight: 700 }}>
                ⚡ {lang === 'hi' ? "तुरंत ताज़ा कटिंग" : "Cut on Order"}
              </div>
            </div>
          </div>

          {/* 2. ACTION BUTTONS SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Button 1: Chat on WhatsApp */}
            <button
              onClick={() => openWhatsAppWith(
                lang === 'hi'
                  ? "नमस्ते यादव नारियल पानी! मुझे आपके ताज़ा नारियल पानी और फलों के बारे में जानकारी चाहिए।"
                  : "Hello Yadav Nariyal Pani, I would like to chat with you regarding fresh coconut water & produce!"
              )}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#25D366',
                color: '#FFFFFF',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(37, 211, 102, 0.25)',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '13.5px' }}>
                    {lang === 'hi' ? "व्हाट्सएप पर चैट करें" : "Chat on WhatsApp"}
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.9 }}>
                    {lang === 'hi' ? "सीधे दुकान मालिक से बात करें" : "Direct live chat with vendor"}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} />
            </button>

            {/* Button 2: Track Order */}
            <button
              onClick={() => openWhatsAppWith(
                lang === 'hi'
                  ? "नमस्ते यादव नारियल पानी! मुझे अपने ऑर्डर का स्टेटस जानना है (Track My Order)। मेरा नाम / पता: "
                  : "Hello Yadav Nariyal Pani! I would like to track my order. My name / delivery address is: "
              )}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#F0FDF4',
                color: '#15803D',
                border: '1.5px solid #86EFAC',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={20} color="#15803D" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '13.5px' }}>
                    {lang === 'hi' ? "ऑर्डर ट्रैक करें (Track Order)" : "Track My Order"}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {lang === 'hi' ? "लाइव डिलीवरी स्टेटस व्हाट्सएप पर पाएं" : "Get real-time delivery status on WhatsApp"}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="#15803D" />
            </button>

            {/* Button 3: Place Order via WhatsApp */}
            <button
              onClick={handlePlaceOrderClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#FEF3C7',
                color: '#92400E',
                border: '1.5px solid #FDE68A',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={20} color="#B45309" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '13.5px' }}>
                    {cartCount > 0 
                      ? (lang === 'hi' ? `कार्ट का ऑर्डर दें (${cartCount} सामान)` : `Place Cart Order (${cartCount} items)`)
                      : (lang === 'hi' ? "व्हाट्सएप पर ऑर्डर दें" : "Place Order on WhatsApp")}
                  </div>
                  <div style={{ fontSize: '11px', color: '#B45309' }}>
                    {cartCount > 0 
                      ? (lang === 'hi' ? "कार्ट का सामान तुरंत ऑर्डर करें" : "Quick checkout your cart items")
                      : (lang === 'hi' ? "अपनी ज़रूरत का सामान सीधे लिख कर भेजें" : "Send your order list directly")}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="#B45309" />
            </button>

            {/* Button 4: Help and Questions */}
            <button
              onClick={() => openWhatsAppWith(
                lang === 'hi'
                  ? "नमस्ते यादव नारियल पानी! मुझे सहायता चाहिए / एक सवाल पूछना है (Help & Questions): "
                  : "Hello Yadav Nariyal Pani! I need help and have a question regarding: "
              )}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#EFF6FF',
                color: '#1D4ED8',
                border: '1.5px solid #93C5FD',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HelpCircle size={20} color="#1D4ED8" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '13.5px' }}>
                    {lang === 'hi' ? "सहायता एवं प्रश्न (Help & Questions)" : "Help & Questions"}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {lang === 'hi' ? "क्वालिटी, डिलीवरी क्षेत्र या विशेष मांग" : "Bulk orders, timings, or item queries"}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="#1D4ED8" />
            </button>

            {/* Direct Calling strip */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '4px'
            }}>
              <a
                href={`tel:${settings.whatsappNumber || "9310551050"}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-main)',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Phone size={15} color="var(--primary)" />
                <span>Call {settings.whatsappNumber || "9310551050"}</span>
              </a>

              {settings.secondaryPhone && (
                <a
                  href={`tel:${settings.secondaryPhone}`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={15} color="var(--primary)" />
                  <span>Call {settings.secondaryPhone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
