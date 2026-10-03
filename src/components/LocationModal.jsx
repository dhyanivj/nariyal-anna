import React, { useState } from 'react';
import { X, MapPin, Check, Search, Compass } from 'lucide-react';

export default function LocationModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
  settings,
  lang,
  t
}) {
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const popularAreas = settings.deliveryAreas || [
    "Sector 15 Part 2",
    "Sector 15 Part 1",
    "Sector 14",
    "Sector 17",
    "Sector 31",
    "Sector 32",
    "Sector 40",
    "Sector 56",
    "Civil Lines Gurgaon",
    "DLF Phase 1-4",
    "Cyber City"
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelectLocation(`${customInput.trim()}, Gurgaon`);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />

        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--primary)" />
            <h3 className="sheet-title">{t.selectLocation}</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="sheet-body">
          {/* Custom Search/Input */}
          <form onSubmit={handleCustomSubmit} style={{ marginBottom: '16px' }}>
            <div className="search-input-box" style={{ background: '#FFFFFF', border: '1.5px solid var(--border-light)' }}>
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={lang === 'hi' ? "सोसाइटी या सेक्टर का नाम लिखें..." : "Enter your sector, apartment or landmark..."}
                className="search-input"
              />
              {customInput && (
                <button 
                  type="submit"
                  style={{
                    background: 'var(--primary)',
                    color: '#FFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  {lang === 'hi' ? "चुनें" : "Set"}
                </button>
              )}
            </div>
          </form>

          {/* Quick Popular Sectors List */}
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            {lang === 'hi' ? "प्रमुख डिलीवरी क्षेत्र (गुड़गांव)" : "Popular Delivery Areas (Gurgaon)"}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {popularAreas.map((area, idx) => {
              const fullAreaName = area.includes("Gurgaon") ? area : `${area}, Gurgaon`;
              const isSelected = currentLocation.includes(area);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectLocation(fullAreaName);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-light)'}`,
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={16} color={isSelected ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '13px', fontWeight: isSelected ? 800 : 600, color: isSelected ? 'var(--primary-dark)' : 'var(--text-main)' }}>
                      {area}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      background: '#DCFCE7',
                      color: '#15803D',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      ⚡ 15-25m
                    </span>
                    {isSelected && <Check size={16} color="var(--primary)" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
