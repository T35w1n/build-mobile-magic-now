
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface SecurityContextType {
  isSecure: boolean;
  violations: string[];
  reportUser: (userId: string, reason: string) => Promise<void>;
  blockUser: (userId: string) => Promise<void>;
  clearViolations: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isSecure, setIsSecure] = useState(true);
  const [violations, setViolations] = useState<string[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    // Load blocked users from localStorage
    if (user) {
      const stored = localStorage.getItem(`blocked_users_${user.id}`);
      if (stored) {
        setBlockedUsers(new Set(JSON.parse(stored)));
      }
    }
  }, [user]);

  const reportUser = async (userId: string, reason: string) => {
    // In a real app, this would send to moderation system
    console.log('User reported:', { userId, reason, timestamp: Date.now() });
    
    // Add to violations for demo
    setViolations(prev => [...prev, `Reported user ${userId} for ${reason}`]);
  };

  const blockUser = async (userId: string) => {
    if (!user) return;
    
    const newBlockedUsers = new Set(blockedUsers);
    newBlockedUsers.add(userId);
    setBlockedUsers(newBlockedUsers);
    
    // Save to localStorage
    localStorage.setItem(`blocked_users_${user.id}`, JSON.stringify([...newBlockedUsers]));
    
    console.log('User blocked:', userId);
  };

  const clearViolations = () => {
    setViolations([]);
  };

  return (
    <SecurityContext.Provider value={{
      isSecure,
      violations,
      reportUser,
      blockUser,
      clearViolations
    }}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}
