
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { RateLimiter } from '@/utils/security';

export function useSwipeTracking() {
  const [dailySwipes, setDailySwipes] = useState(0);
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const FREE_SWIPE_LIMIT = 15;

  useEffect(() => {
    if (user) {
      loadSwipeData();
    } else {
      // If no user, set loading to false immediately
      setLoading(false);
      setDailySwipes(0);
      setIsProUser(false);
    }
  }, [user]);

  const loadSwipeData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Check if user is Pro with proper error handling
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }

      setIsProUser(profile?.is_pro || false);

      // Get today's swipes count with proper timezone handling
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data: swipes, error: swipesError } = await supabase
        .from('matches')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString())
        .lt('created_at', tomorrow.toISOString());

      if (swipesError) {
        console.error('Error fetching swipes:', swipesError);
        // Set to 0 on error to prevent unlimited swiping
        setDailySwipes(0);
      } else {
        setDailySwipes(swipes?.length || 0);
      }
    } catch (error) {
      console.error('Error loading swipe data:', error);
      // Reset to safe defaults on error
      setDailySwipes(0);
      setIsProUser(false);
    } finally {
      setLoading(false);
    }
  };

  const canSwipe = () => {
    if (!user) return false;
    
    // Enhanced rate limiting with multiple checks
    const userId = user.id;
    if (!RateLimiter.isAllowed(`swipe_${userId}`, 50, 60000)) {
      console.warn('Rate limit exceeded for user:', userId);
      return false;
    }
    
    // Additional rate limiting for suspicious activity
    if (!RateLimiter.isAllowed(`swipe_burst_${userId}`, 10, 10000)) {
      console.warn('Burst rate limit exceeded for user:', userId);
      return false;
    }
    
    return isProUser || dailySwipes < FREE_SWIPE_LIMIT;
  };

  const recordSwipe = async () => {
    if (!canSwipe() || !user) return false;
    
    // Validate current swipe count before incrementing
    if (!isProUser && dailySwipes >= FREE_SWIPE_LIMIT) {
      console.warn('Attempted to exceed daily swipe limit');
      return false;
    }
    
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
