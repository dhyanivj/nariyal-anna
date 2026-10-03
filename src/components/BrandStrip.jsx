import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

export default function BrandStrip({ settings, lang }) {
  return (
    <aside className="brand-strip" aria-label="Store announcement">
      <div className="brand-strip-left">
        <span className="brand-strip-badge">
          {lang === 'hi' ? "100% असली" : "100% PURE"}
        </span>
        <span>
          {settings.subName || "Yadav Nariyal Pani"} • {lang === 'hi' ? "ताज़ा व ठंडा" : "Chilled & Fresh"}
        </span>
      </div>
      <a 
        href={`tel:${settings.whatsappNumber}`} 
        className="brand-strip-phone"
        title="Call vendor"
      >
        <Phone size={11} />
        <span>{settings.whatsappNumber}</span>
      </a>
    </aside>
  );
}
