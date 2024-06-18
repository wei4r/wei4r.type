import { useState, useEffect } from 'react';

export const isMobile = () => {
  // Ensure only run on client side using navigator
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const userAgent = navigator.userAgent;
    const mobileUserAgents = [
      'Android',
      'iPhone',
      'iPad',
      'iPod',
      'BlackBerry',
      'Windows Phone',
    ];

    for (let i = 0; i < mobileUserAgents.length; i++) {
      if (userAgent.indexOf(mobileUserAgents[i]) !== -1) {
        return true;
      }
    }
  }
  return false;
};

export const useDetectDevice = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  return isMobileDevice;
};
