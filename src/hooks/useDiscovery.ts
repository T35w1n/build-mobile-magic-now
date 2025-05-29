
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Profile } from '@/hooks/useProfile';

export function useDiscovery() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user]);

  const fetchProfiles = async () => {
    if (!user) return;

    try {
      // Get profiles excluding current user and users already matched
      const { data: matchedUserIds } = await supabase
        .from('matches')
        .select('target_user_id')
        .eq('user_id', user.id);

      const excludedIds = [user.id, ...(matchedUserIds?.map(m => m.target_user_id) || [])];

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('id', 'in', `(${excludedIds.join(',')})`)
        .not('full_name', 'is', null)
        .limit(10);

      if (error) {
        console.error('Error fetching profiles:', error);
      } else {
        setProfiles(data || []);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profiles,
    loading,
    refetch: fetchProfiles
  };
}
