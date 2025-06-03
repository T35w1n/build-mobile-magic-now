
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  age?: number;
  bio?: string;
  location?: string;
  languages?: string[];
  race?: string;
  sexual_preference?: string;
  interested_in?: string;
  photos?: string[];
  verified?: boolean;
}

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
        .select('id, full_name, age, bio, location, languages, race, sexual_preference, interested_in, photos, verified')
        .not('id', 'in', `(${excludedIds.join(',')})`)
        .not('full_name', 'is', null)
        .gte('age', 18) // Age verification
        .lte('age', 100) // Reasonable age limit
        .limit(20); // Limit for performance

      if (error) {
        console.error('Error fetching profiles:', error);
      } else {
        // Filter out profiles with suspicious data
        const validProfiles = (data || []).filter(profile => {
          return (
            profile.full_name && 
            profile.full_name.length >= 2 && 
            profile.full_name.length <= 50 &&
            (!profile.bio || profile.bio.length <= 500)
          );
        });
        
        setProfiles(validProfiles);
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
