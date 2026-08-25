import React from 'react';

const FilterBar = ({ category, onCategoryChange, sort, onSortChange }) => {
  const categories = ['All', 'Electronics', 'Clothing', 'Beauty', 'Smartphones', 'Laptops', 'Furniture'];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="Default">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
