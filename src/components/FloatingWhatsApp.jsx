import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp({ settings, lang }) {
  const handleClick = () => {
    const rawNumber = (settings.whatsappNumber || "9310551050").replace(/\D/g, '');
    const fullNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;
    const defaultMsg = lang === 'hi'
      ? "नमस्ते यादव नारियल पानी! मुझे ताज़ा नारियल पानी और सामान के बारे में जानकारी चाहिए।"
      : "Hi Yadav Nariyal Pani, I want to inquire about coconut water and fresh produce delivery!";
    
    window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  return (
    <button 
      className="floating-whatsapp-btn whatsapp-pulse"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={18} fill="#FFFFFF" color="#25D366" />
      <span>{lang === 'hi' ? "ऑर्डर / चैट" : "Chat / Order"}</span>
    </button>
  );
}
