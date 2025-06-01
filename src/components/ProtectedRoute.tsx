
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-passion-50 via-desire-50 to-warmth-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-passion-500 mx-auto"></div>
          <p className="mt-4 text-passion-700 font-medium">Loading your romantic journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-passion">
        <div className="text-center max-w-md mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-passion-200">
          <Heart className="w-16 h-16 text-passion-500 mx-auto mb-4 animate-heartbeat" />
          <h1 className="text-5xl font-bold font-dancing text-gradient mb-2">Koppel</h1>
          <p className="text-passion-700 mb-2 font-medium">Where Hearts Connect</p>
          <p className="text-passion-600 mb-8 text-sm">Find your perfect match through deep personality connections</p>
          <Button 
            onClick={() => setShowAuthModal(true)}
            className="w-full gradient-desire hover:shadow-lg hover:shadow-passion-300/50 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
          >
            Start Your Love Story
          </Button>
        </div>
        
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    );
  }

  return <>{children}</>;
}
