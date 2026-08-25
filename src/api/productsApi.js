import apiClient from './axios';

export const getProducts = async ({ page = 1, limit = 10, search = '', category = 'All', sort = 'Default' }) => {
  const skip = (page - 1) * limit;
  let url = '/products';
  
  const params = new URLSearchParams({ limit, skip });

  // Handle Sort
  if (sort === 'price_asc') {
    params.append('sortBy', 'price');
    params.append('order', 'asc');
  } else if (sort === 'price_desc') {
    params.append('sortBy', 'price');
    params.append('order', 'desc');
  }

  // Handle Search vs Category
  // DummyJSON does not natively support searching *within* a category via a single endpoint.
  // We prioritize search if it exists, otherwise use category if it's not 'All'.
  if (search) {
    url = '/products/search';
    params.append('q', search);
  } else if (category && category !== 'All') {
    url = `/products/category/${category.toLowerCase()}`;
  }

  const response = await apiClient.get(`${url}?${params.toString()}`);
  
  if (response.data && response.data.products) {
    // Filter out groceries as requested by the user
    response.data.products = response.data.products.filter(
      (product) => product.category !== 'groceries'
    );
  }
  
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get('/products/categories');
  return response.data;
};
