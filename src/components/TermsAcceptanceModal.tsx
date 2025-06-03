
import React, { useState, useEffect } from 'react';
import { TermsOfService } from './TermsOfService';
import { useToast } from '@/hooks/use-toast';

interface TermsAcceptanceModalProps {
  onAccept: () => void;
}

export function TermsAcceptanceModal({ onAccept }: TermsAcceptanceModalProps) {
  const [showTerms, setShowTerms] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already accepted terms
    const termsAccepted = localStorage.getItem('koppel-terms-accepted');
    if (!termsAccepted) {
      setShowTerms(true);
    } else {
      onAccept();
    }
  }, [onAccept]);

  const handleAcceptTerms = () => {
    localStorage.setItem('koppel-terms-accepted', 'true');
    localStorage.setItem('koppel-terms-accepted-date', new Date().toISOString());
    setShowTerms(false);
    onAccept();
    toast({
      title: "Terms Accepted",
      description: "Welcome to Koppel! Remember to stay safe while using the app.",
    });
  };

  const handleDeclineTerms = () => {
    toast({
      title: "Terms Declined",
      description: "You must accept the terms to use Koppel. Please refresh the page to try again.",
      variant: "destructive"
    });
    // Optionally redirect to a different page or show an exit screen
  };

  if (!showTerms) {
    return null;
  }

  return (
    <TermsOfService 
      onAccept={handleAcceptTerms}
      onDecline={handleDeclineTerms}
    />
  );
}
