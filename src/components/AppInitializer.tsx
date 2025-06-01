
import React, { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';
import { UserGuideModal } from './UserGuideModal';
import { useAuth } from '@/hooks/useAuth';

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if user has seen the guide before
    const guideShown = localStorage.getItem('koppel-guide-shown');
    setHasSeenGuide(!!guideShown);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    
    // Show guide for new users or if they haven't seen it
    if (!user && !hasSeenGuide) {
      setShowGuide(true);
    }
  };

  const handleGuideClose = () => {
    setShowGuide(false);
    localStorage.setItem('koppel-guide-shown', 'true');
    setHasSeenGuide(true);
  };

  if (loading || showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      {children}
      {showGuide && <UserGuideModal onClose={handleGuideClose} />}
    </>
  );
}
