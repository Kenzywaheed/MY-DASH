import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ initialValue, onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="search-bar">
      <Search className="search-icon" size={18} />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {isLoading && <span className="search-loading-spinner" />}
    </div>
  );
};

export default SearchBar;
