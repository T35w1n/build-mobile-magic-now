
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export function usePremiumFeatures() {
  const [superLikesRemaining, setSuperLikesRemaining] = useState(1);
  const [boostsRemaining, setBoostsRemaining] = useState(1);
  const [isIncognito, setIsIncognito] = useState(false);
  const [hasVideoCall, setHasVideoCall] = useState(false);
  const [hasReadReceipts, setHasReadReceipts] = useState(false);
  const [isProUser, setIsProUser] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkPremiumStatus();
      loadDailyLimits();
    }
  }, [user]);

  const checkPremiumStatus = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single();

      const isPro = profile?.is_pro || false;
      setIsProUser(isPro);
      
      // Pro users get premium features
      setHasVideoCall(isPro);
      setHasReadReceipts(isPro);
      
      // Pro users get more daily limits
      if (isPro) {
        setSuperLikesRemaining(10); // Pro users get 10 super likes
        setBoostsRemaining(5); // Pro users get 5 boosts
      }
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  const loadDailyLimits = () => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('koppel-last-reset');
    
    if (lastReset !== today) {
      // Reset daily limits
      localStorage.setItem('koppel-last-reset', today);
      localStorage.setItem('koppel-super-likes', '1');
      localStorage.setItem('koppel-boosts', '1');
      setSuperLikesRemaining(1);
      setBoostsRemaining(1);
    } else {
      // Load existing limits
      const superLikes = parseInt(localStorage.getItem('koppel-super-likes') || '1');
      const boosts = parseInt(localStorage.getItem('koppel-boosts') || '1');
      setSuperLikesRemaining(superLikes);
      setBoostsRemaining(boosts);
    }
  };

  const useSuperLike = async () => {
    if (superLikesRemaining > 0) {
      const newCount = superLikesRemaining - 1;
      setSuperLikesRemaining(newCount);
      localStorage.setItem('koppel-super-likes', newCount.toString());
      return true;
    }
    return false;
  };

  const useBoost = async (duration: number) => {
    if (boostsRemaining > 0 || isProUser) {
      if (!isProUser) {
        const newCount = boostsRemaining - 1;
        setBoostsRemaining(newCount);
        localStorage.setItem('koppel-boosts', newCount.toString());
      }
      
      // Set boost end time
      const boostEnd = new Date(Date.now() + duration * 60 * 1000);
      localStorage.setItem('koppel-boost-end', boostEnd.toISOString());
      
      return true;
    }
    return false;
  };

  const toggleIncognito = () => {
    if (isProUser) {
      setIsIncognito(!isIncognito);
      return true;
    }
    return false;
  };

  const canUseFeature = (feature: string) => {
    switch (feature) {
      case 'super_like':
        return superLikesRemaining > 0 || isProUser;
      case 'boost':
        return boostsRemaining > 0 || isProUser;
      case 'incognito':
        return isProUser;
      case 'video_call':
        return hasVideoCall;
      case 'read_receipts':
        return hasReadReceipts;
      default:
        return false;
    }
  };

  return {
    superLikesRemaining,
    boostsRemaining,
    isIncognito,
    hasVideoCall,
    hasReadReceipts,
    isProUser,
    useSuperLike,
    useBoost,
    toggleIncognito,
    canUseFeature,
    refreshStatus: checkPremiumStatus
  };
}
