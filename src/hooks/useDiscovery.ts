
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

  console.log('useDiscovery: Hook initialized', { user: !!user, loading });

  useEffect(() => {
    console.log('useDiscovery: useEffect triggered', { user: !!user });
    if (user) {
      fetchProfiles();
    } else {
      console.log('useDiscovery: No user, setting loading to false');
      setLoading(false);
    }
  }, [user]);

  const fetchProfiles = async () => {
    if (!user) {
      console.log('useDiscovery: fetchProfiles called but no user');
      return;
    }

    console.log('useDiscovery: Starting to fetch profiles');
    setLoading(true);

    try {
      // Get profiles excluding current user and users already matched
      const { data: matchedUserIds, error: matchError } = await supabase
        .from('matches')
        .select('target_user_id')
        .eq('user_id', user.id);

      if (matchError) {
        console.error('useDiscovery: Error fetching matched users:', matchError);
      }

      const excludedIds = [user.id, ...(matchedUserIds?.map(m => m.target_user_id) || [])];
      console.log('useDiscovery: Excluded IDs:', excludedIds);

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, age, bio, location, languages, race, sexual_preference, interested_in, photos, verified')
        .not('id', 'in', `(${excludedIds.join(',')})`)
        .not('full_name', 'is', null)
        .gte('age', 18) // Age verification
        .lte('age', 100) // Reasonable age limit
        .limit(20); // Limit for performance

      if (error) {
        console.error('useDiscovery: Error fetching profiles:', error);
      } else {
        console.log('useDiscovery: Raw profiles data:', data);
        
        // Filter out profiles with suspicious data
        const validProfiles = (data || []).filter(profile => {
          const isValid = (
            profile.full_name && 
            profile.full_name.length >= 2 && 
            profile.full_name.length <= 50 &&
            (!profile.bio || profile.bio.length <= 500)
          );
          console.log('useDiscovery: Profile validation', { id: profile.id, valid: isValid });
          return isValid;
        });
        
        console.log('useDiscovery: Valid profiles:', validProfiles.length);
        setProfiles(validProfiles);
      }
    } catch (error) {
      console.error('useDiscovery: Exception in fetchProfiles:', error);
    } finally {
      console.log('useDiscovery: Setting loading to false');
      setLoading(false);
    }
  };

  return {
    profiles,
    loading,
    refetch: fetchProfiles
  };
}
