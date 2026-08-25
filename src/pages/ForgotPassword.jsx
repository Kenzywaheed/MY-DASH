import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../api/authApi';
import { KeyRound, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const resetMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setSuccessMsg(data.message || 'Password reset link sent.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSuccessMsg(''); // clear previous
      resetMutation.mutate(email);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <KeyRound size={40} className="auth-icon" />
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a reset link</p>
        </div>

        {successMsg ? (
          <div className="auth-success">
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            {resetMutation.isError && (
              <div className="auth-error">
                Failed to send reset link. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={resetMutation.isPending}
            >
              {resetMutation.isPending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="auth-footer" style={{ marginTop: '1.5rem' }}>
          <Link to="/login" className="back-link">
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
