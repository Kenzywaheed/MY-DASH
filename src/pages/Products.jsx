import React, { useState, useCallback } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { ProductSkeleton } from '../components/Loader';

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Default');

  const { data, isLoading, isError, isFetching, refetch } = useProducts({
    page,
    limit,
    search,
    category,
    sort,
  });

  const handleSearch = useCallback((term) => {
    setSearch((prev) => {
      if (prev !== term) {
        setPage(1); // Reset to first page only if search term actually changed
      }
      return term;
    });
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearch(''); // Clear search when category changes (based on DummyJSON limitations)
    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.total && page * limit < data.total) {
      setPage((prev) => prev + 1);
    }
  };

  // The user requested to "make 2 pages", so we cap the max pages to 2 for demonstration
  const totalPages = data?.total ? Math.min(Math.ceil(data.total / limit), 2) : 1;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Products</h1>
        <div className="dashboard-controls">
          <SearchBar onSearch={handleSearch} isLoading={isFetching} />
          <FilterBar
            category={category}
            onCategoryChange={handleCategoryChange}
            sort={sort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <div className="dashboard-content">
        {isError && (
          <ErrorMessage
            message="Failed to load products."
            onRetry={refetch}
          />
        )}

        {!isError && isLoading && (
          <div className="product-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {!isError && !isLoading && data?.products?.length === 0 && (
          <EmptyState />
        )}

        {!isError && !isLoading && data?.products?.length > 0 && (
          <>
            <div className="product-grid">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="pagination">
              <button
                className="btn btn-outline"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-outline"
                onClick={handleNextPage}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
