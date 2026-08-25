import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBackOnline(true);
      setTimeout(() => setShowBackOnline(false), 3000); // Hide after 3 seconds
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowBackOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="network-banner offline">
        <WifiOff size={18} />
        <span>📡 You're offline. Please check your internet connection.</span>
      </div>
    );
  }

  if (showBackOnline) {
    return (
      <div className="network-banner online">
        <Wifi size={18} />
        <span>✓ You're back online</span>
      </div>
    );
  }

  return null;
};

export default NetworkStatus;
