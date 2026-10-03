import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroBanner({
  banners = [],
  lang,
  onBannerAction
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;
  const currentBanner = banners[currentIndex] || banners[0];

  return (
    <div className="hero-banner-section">
      <div 
        className="hero-banner-slider"
        style={{
          background: currentBanner.bgGradient || 'linear-gradient(135deg, #09472A 0%, #15803D 100%)'
        }}
      >
        <div 
          className="hero-slide"
          style={{
            backgroundImage: currentBanner.image ? `url(${currentBanner.image})` : undefined
          }}
        >
          <div className="hero-slide-overlay" />

          {/* Left Content */}
          <div className="hero-content">
            <span className="hero-badge">
              {lang === 'hi' ? currentBanner.badgeHi : currentBanner.badgeEn}
            </span>
            <h2 className="hero-title">
              {lang === 'hi' ? currentBanner.titleHi : currentBanner.titleEn}
            </h2>
            <p className="hero-subtitle">
              {lang === 'hi' ? currentBanner.subtitleHi : currentBanner.subtitleEn}
            </p>

            <div className="hero-footer-row">
              {currentBanner.price && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span className="hero-price-tag">{currentBanner.price}</span>
                  {currentBanner.originalPrice && (
                    <span className="hero-original-price">{currentBanner.originalPrice}</span>
                  )}
                </div>
              )}

              <button
                className="hero-cta-btn"
                onClick={() => onBannerAction(currentBanner.categoryId)}
              >
                <span>{lang === 'hi' ? currentBanner.ctaHi : currentBanner.ctaEn}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Coconut Stamp Badge */}
          <div className="hero-graphic-badge">
            <span className="hero-graphic-icon">🥥</span>
            <span className="hero-graphic-text">
              {lang === 'hi' ? "100% असली" : "100% PURE"}
            </span>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <div className="hero-dots-row">
          {banners.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
