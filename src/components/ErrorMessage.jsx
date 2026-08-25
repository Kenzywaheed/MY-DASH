import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong. Please try again.', onRetry }) => {
  return (
    <div className="state-container error-state">
      <AlertTriangle className="state-icon error-icon" size={48} />
      <p className="state-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-outline btn-retry">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
