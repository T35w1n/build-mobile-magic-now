
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

  console.log('AppInitializer state:', { 
    showSplash, 
    showTerms, 
    showGuide, 
    hasSeenGuide, 
    termsAccepted, 
    user: !!user, 
    loading 
  });

  useEffect(() => {
    console.log('AppInitializer useEffect running');
    // Check if user has seen the guide before
    const guideShown = localStorage.getItem('koppel-guide-shown');
    setHasSeenGuide(!!guideShown);
    console.log('Guide shown before:', !!guideShown);

    // Check if user has accepted terms
    const termsAcceptedStorage = localStorage.getItem('koppel-terms-accepted');
    setTermsAccepted(!!termsAcceptedStorage);
    console.log('Terms accepted before:', !!termsAcceptedStorage);
  }, []);

  const handleSplashComplete = () => {
    console.log('Splash complete, moving to next step');
    setShowSplash(false);
    
    // Show terms first if not accepted
    if (!termsAccepted) {
      console.log('Showing terms modal');
      setShowTerms(true);
    } else if (!user && !hasSeenGuide) {
      // Show guide for new users or if they haven't seen it (only after terms are accepted)
      console.log('Showing guide modal');
      setShowGuide(true);
    } else {
      console.log('All initialization complete, showing main app');
    }
  };

  const handleTermsAccepted = () => {
    console.log('Terms accepted');
    setShowTerms(false);
    setTermsAccepted(true);
    
    // Show guide for new users after terms are accepted
    if (!user && !hasSeenGuide) {
      console.log('Showing guide after terms acceptance');
      setShowGuide(true);
    }
  };

  const handleGuideClose = () => {
    console.log('Guide closed');
    setShowGuide(false);
    localStorage.setItem('koppel-guide-shown', 'true');
    setHasSeenGuide(true);
  };

  if (loading) {
    console.log('Auth still loading...');
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showSplash) {
    console.log('Showing splash screen');
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  console.log('Rendering main app with modals');
  return (
    <>
      {children}
      {showTerms && <TermsAcceptanceModal onAccept={handleTermsAccepted} />}
      {showGuide && <UserGuideModal onClose={handleGuideClose} />}
    </>
  );
}
