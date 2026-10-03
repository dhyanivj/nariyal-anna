import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  inputRef,
  t
}) {
  return (
    <div className="search-container">
      <div className="search-input-box">
        <Search size={18} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder || "Search coconut water, vegetables, fruits..."}
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
