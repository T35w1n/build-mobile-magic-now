
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

export function useUserRole() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setLoading(false);
      setUserRole(null);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user role:', error);
      }

      setUserRole(profile?.user_role || null);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_role: role })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user role:', error);
        return false;
      }

      setUserRole(role);
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  };

  return {
    userRole,
    loading,
    updateUserRole,
    refetch: fetchUserRole
  };
}
