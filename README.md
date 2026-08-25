# React API-Driven Mini Dashboard

## Project Overview
This is a small but professional React project demonstrating a strong understanding of API integration and frontend application states. The application features a fully responsive Mini Products Dashboard with authentication, protected routes, and professional handling of loading, error, empty, and network states.

## Technologies Used
- **React 18**
- **Vite**
- **React Router Dom** (Routing and Protected Routes)
- **Axios** (API layer and interceptors)
- **TanStack Query / React Query** (Server state management, caching, data fetching)
- **Context API** (Authentication state management)
- **Lucide React** (Icons)
- **Vanilla CSS** (Custom responsive styling, variables, modern UI)

## API Endpoints
This project uses the [DummyJSON API](https://dummyjson.com) as the backend.

- `POST /auth/login`: Authenticates the user and returns a JWT token.
- `GET /products`: Fetches a paginated list of products.
- `GET /products/search?q={query}`: Searches products by keyword.
- `GET /products/category/{category}`: Fetches products by category.

*Note: The `POST /forgot-password` endpoint is mocked locally via an Axios interceptor as DummyJSON does not natively support it.*

## Authentication Flow
1. **Login:** User enters credentials (e.g., username: `emilys`, password: `emilyspass`). The `login` mutation is triggered.
2. **Token Storage:** On success, the API returns a user object and JWT token. The `AuthContext` saves the token securely in `localStorage` and updates the state.
3. **Protected Routes:** The `<ProtectedRoute />` component checks `isAuthenticated`. Unauthenticated users attempting to visit `/products` are redirected to `/login`.
4. **Axios Interceptor:** An Axios request interceptor automatically attaches the `Bearer {token}` to all subsequent outgoing API requests.
5. **Logout:** Clears the token from storage and state, redirecting to `/login`.

## How Search/Filtering Works
The frontend is completely API-driven.
- **Search:** Typing in the search bar triggers a 500ms debounce. After the debounce, the `useProducts` hook automatically refetches data from `/products/search?q=...`.
- **Filtering:** Selecting a category overrides the search and triggers a refetch from `/products/category/...`.
- **Sorting:** Sort options append `?sortBy=price&order=asc|desc` to the API requests.
- **Pagination:** The dashboard manages a `page` and `limit` state. Changes to these states update the query keys, prompting TanStack Query to fetch the new `skip` values from the API.

## How to Run the Project

1. Clone or navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (already included in setup) with:
   ```
   VITE_API_URL=https://dummyjson.com
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the provided localhost URL.
