import React from 'react';
import { Droplet, ShieldCheck, Snowflake, Truck } from 'lucide-react';

export default function TrustStrip({ lang }) {
  const items = [
    {
      icon: <Droplet size={17} color="#0A5432" />,
      titleEn: "100% Pure",
      titleHi: "100% असली",
      descEn: "No Added Sugar",
      descHi: "बिना मिलावट"
    },
    {
      icon: <ShieldCheck size={17} color="#15803D" />,
      titleEn: "Bangalore A1",
      titleHi: "बैंगलोर A1",
      descEn: "Premium Quality",
      descHi: "उच्च गुणवत्ता"
    },
    {
      icon: <Snowflake size={17} color="#0284C7" />,
      titleEn: "Chilled & Fresh",
      titleHi: "ठंडा व ताज़ा",
      descEn: "Cut on Order",
      descHi: "तुरंत कटिंग"
    },
    {
      icon: <Truck size={17} color="#D97706" />,
      titleEn: "Quick",
      titleHi: "Quick",
      descEn: "Home Delivery",
      descHi: "Home Delivery"
    }
  ];

  return (
    <div className="trust-strip">
      {items.map((item, idx) => (
        <div key={idx} className="trust-item">
          <div className="trust-icon">{item.icon}</div>
          <span className="trust-title">{lang === 'hi' ? item.titleHi : item.titleEn}</span>
          <span className="trust-desc">{lang === 'hi' ? item.descHi : item.descEn}</span>
        </div>
      ))}
    </div>
  );
}
