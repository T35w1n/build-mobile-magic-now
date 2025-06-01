
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export function useSwipeTracking() {
  const [dailySwipes, setDailySwipes] = useState(0);
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const FREE_SWIPE_LIMIT = 15;

  useEffect(() => {
    if (user) {
      loadSwipeData();
    }
  }, [user]);

  const loadSwipeData = async () => {
    if (!user) return;

    try {
      // Check if user is Pro
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single();

      setIsProUser(profile?.is_pro || false);

      // Get today's swipes count
      const today = new Date().toISOString().split('T')[0];
      const { data: swipes } = await supabase
        .from('matches')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lt('created_at', `${today}T23:59:59.999Z`);

      setDailySwipes(swipes?.length || 0);
    } catch (error) {
      console.error('Error loading swipe data:', error);
    } finally {
      setLoading(false);
    }
  };

  const canSwipe = () => {
    return isProUser || dailySwipes < FREE_SWIPE_LIMIT;
  };

  const recordSwipe = async () => {
    if (!canSwipe()) return false;
    
    setDailySwipes(prev => prev + 1);
    return true;
  };

  const getRemainingSwipes = () => {
    if (isProUser) return Infinity;
    return Math.max(0, FREE_SWIPE_LIMIT - dailySwipes);
  };

  return {
    dailySwipes,
    isProUser,
    loading,
    canSwipe: canSwipe(),
    recordSwipe,
    remainingSwipes: getRemainingSwipes(),
    FREE_SWIPE_LIMIT
  };
}
