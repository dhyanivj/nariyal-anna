import React from 'react';

export default function CategoryCarousel({
  categories = [],
  activeCategory,
  onSelectCategory,
  lang,
  t
}) {
  return (
    <section className="category-section">
      <div className="section-header">
        <h3 className="section-title">{t.exploreCategories}</h3>
        <span className="section-badge-counter">
          {categories.filter(c => c.isActive).length} {lang === 'hi' ? "श्रेणियां" : "types"}
        </span>
      </div>

      <div className="category-scroll-row">
        {categories
          .filter((cat) => cat.isActive !== false)
          .map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`category-bubble-item ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <div className="category-avatar">
                  <span>{cat.icon || "🥥"}</span>
                </div>
                <span className="category-name">
                  {lang === 'hi' ? cat.nameHi : cat.nameEn}
                </span>
              </button>
            );
          })}
      </div>
    </section>
  );
}
