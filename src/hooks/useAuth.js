import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to consume the AuthContext safely.
 * This provides access to the current authenticated user, token, and functions like login/logout.
 */
export const useAuth = () => {
  // Grab the context value which contains our auth state and methods
  const context = useContext(AuthContext);
  
  // If context is undefined, it means this hook was called from a component
  // that is not wrapped in the <AuthProvider> tree.
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Return the auth context (user, token, login, logout, isAuthenticated)
  return context;
};
