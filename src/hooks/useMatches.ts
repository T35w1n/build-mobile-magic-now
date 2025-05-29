
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Profile } from '@/hooks/useProfile';

export interface Match {
  id: string;
  user_id: string;
  target_user_id: string;
  action: 'like' | 'pass' | 'super_like';
  is_mutual: boolean;
  created_at: string;
  target_profile?: Profile;
}

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMatches();
      subscribeToMatches();
    }
  }, [user]);

  const fetchMatches = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          target_profile:profiles!target_user_id(*)
        `)
        .eq('user_id', user.id)
        .eq('is_mutual', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching matches:', error);
      } else {
        setMatches(data || []);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMatches = () => {
    if (!user) return;

    const channel = supabase
      .channel('matches_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'matches',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchMatches()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const createMatch = async (targetUserId: string, action: 'like' | 'pass' | 'super_like') => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { data, error } = await supabase
        .from('matches')
        .insert({
          user_id: user.id,
          target_user_id: targetUserId,
          action
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating match:', error);
        return { error };
      }

      return { data };
    } catch (error) {
      console.error('Error creating match:', error);
      return { error };
    }
  };

  return {
    matches,
    loading,
    createMatch,
    refetch: fetchMatches
  };
}
