
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { RateLimiter } from '@/utils/security';
import { useToast } from '@/hooks/use-toast';

export interface SecureMatch {
  id: string;
  user_id: string;
  target_user_id: string;
  action: 'like' | 'pass' | 'super_like';
  is_mutual: boolean;
  created_at: string;
}

export function useSecureMatches() {
  const [matches, setMatches] = useState<SecureMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  const fetchMatches = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_mutual', true)
        .order('created_at', { ascending: false })
        .limit(100); // Limit results for performance

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

  const createSecureMatch = async (targetUserId: string, action: 'like' | 'pass' | 'super_like') => {
    if (!user) return { error: 'No user logged in' };

    // Rate limiting: max 50 swipes per minute
    if (!RateLimiter.isAllowed(`match_${user.id}`, 50, 60000)) {
      toast({
        title: "Too Fast!",
        description: "Please slow down your swiping.",
        variant: "destructive"
      });
      return { error: 'Rate limit exceeded' };
    }

    // Validate targetUserId format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(targetUserId)) {
      return { error: 'Invalid target user ID' };
    }

    // Prevent self-matching
    if (targetUserId === user.id) {
      return { error: 'Cannot match with yourself' };
    }

    try {
      // Check if match already exists
      const { data: existingMatch } = await supabase
        .from('matches')
        .select('id')
        .eq('user_id', user.id)
        .eq('target_user_id', targetUserId)
        .single();

      if (existingMatch) {
        return { error: 'Match already exists' };
      }

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
    createMatch: createSecureMatch,
    refetch: fetchMatches
  };
}
