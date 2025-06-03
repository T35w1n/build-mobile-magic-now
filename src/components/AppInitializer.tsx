
import React, { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';
import { UserGuideModal } from './UserGuideModal';
import { TermsAcceptanceModal } from './TermsAcceptanceModal';
import { useAuth } from '@/hooks/useAuth';

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if user has seen the guide before
    const guideShown = localStorage.getItem('koppel-guide-shown');
    setHasSeenGuide(!!guideShown);

    // Check if user has accepted terms
    const termsAcceptedStorage = localStorage.getItem('koppel-terms-accepted');
    setTermsAccepted(!!termsAcceptedStorage);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    
    // Show terms first if not accepted
    if (!termsAccepted) {
      setShowTerms(true);
    } else if (!user && !hasSeenGuide) {
      // Show guide for new users or if they haven't seen it (only after terms are accepted)
      setShowGuide(true);
    }
  };

  const handleTermsAccepted = () => {
    setShowTerms(false);
    setTermsAccepted(true);
    
    // Show guide for new users after terms are accepted
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
      {showTerms && <TermsAcceptanceModal onAccept={handleTermsAccepted} />}
      {showGuide && <UserGuideModal onClose={handleGuideClose} />}
    </>
  );
}
