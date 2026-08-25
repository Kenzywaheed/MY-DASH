import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProducts, getCategories } from '../api/productsApi';

/**
 * Custom hook for fetching products using TanStack Query.
 * @param {Object} filters - Search, category, sorting, and pagination parameters.
 */
export const useProducts = (filters) => {
  return useQuery({
    // The queryKey uniquely identifies this data cache. 
    // Whenever 'filters' changes (e.g. changing the page), TanStack Query will automatically re-run the fetch!
    queryKey: ['products', filters],
    
    // The actual asynchronous function to execute
    queryFn: () => getProducts(filters),
    
    // placeholderData: keepPreviousData ensures that when we change pages, the old data stays on screen 
    // until the new data finishes loading. This prevents the screen from flashing empty!
    placeholderData: keepPreviousData,
  });
};

/**
 * Custom hook for fetching product categories.
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    // staleTime: Infinity means that once categories are fetched, they are NEVER considered "stale",
    // preventing unnecessary background re-fetching since categories almost never change.
    staleTime: Infinity,
  });
};
