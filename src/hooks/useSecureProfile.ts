
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput, validateEmail, validateAge, validateBio } from '@/utils/security';

export interface SecureProfile {
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
  is_pro?: boolean;
}

export function useSecureProfile() {
  const [profile, setProfile] = useState<SecureProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive"
        });
      } else {
        // Sanitize profile data
        if (data) {
          const sanitizedProfile = {
            ...data,
            full_name: data.full_name ? sanitizeInput(data.full_name) : undefined,
            bio: data.bio ? sanitizeInput(data.bio) : undefined,
            location: data.location ? sanitizeInput(data.location) : undefined,
          };
          setProfile(sanitizedProfile);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<SecureProfile>) => {
    if (!user) return { error: 'No user logged in' };

    // Validate and sanitize inputs
    const sanitizedUpdates = { ...updates };
    
    if (updates.full_name) {
      sanitizedUpdates.full_name = sanitizeInput(updates.full_name);
      if (sanitizedUpdates.full_name.length < 2 || sanitizedUpdates.full_name.length > 50) {
        return { error: 'Name must be between 2 and 50 characters' };
      }
    }

    if (updates.bio) {
      sanitizedUpdates.bio = sanitizeInput(updates.bio);
      if (!validateBio(sanitizedUpdates.bio)) {
        return { error: 'Bio must be 500 characters or less' };
      }
    }

    if (updates.age && !validateAge(updates.age)) {
      return { error: 'Age must be between 18 and 100' };
    }

    if (updates.email && !validateEmail(updates.email)) {
      return { error: 'Invalid email format' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...sanitizedUpdates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive"
        });
        return { error };
      }

      setProfile(data);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      return { data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
}
