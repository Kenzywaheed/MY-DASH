import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import { Package } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState(''); // Note: DummyJSON uses emilja for username, e.g. emilys / emilyspass
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data, data.token); // Assume data contains user info and token
      navigate('/products', { replace: true });
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginMutation.mutate({ email, password });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Package size={40} className="auth-icon" />
          <h2>Welcome Back</h2>
          <p>Login to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Username / Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., emilys"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g., emilyspass"
              required
            />
          </div>

          {loginMutation.isError && (
            <div className="auth-error">
              Invalid email or password.
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/forgot-password">Forgot Password?</Link>
          <span>Don't have an account? <Link to="/register">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
