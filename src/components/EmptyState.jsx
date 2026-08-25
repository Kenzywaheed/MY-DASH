import React from 'react';
import { PackageOpen } from 'lucide-react';

const EmptyState = ({ message = 'No products found.', suggestion = 'Try changing your search or filters.' }) => {
  return (
    <div className="state-container empty-state">
      <PackageOpen className="state-icon empty-icon" size={48} />
      <p className="state-message">{message}</p>
      {suggestion && <p className="state-suggestion">{suggestion}</p>}
    </div>
  );
};

export default EmptyState;
