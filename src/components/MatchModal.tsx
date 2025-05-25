
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  images: string[];
  distance: number;
}

interface MatchModalProps {
  profile: Profile;
  onClose: () => void;
}

export function MatchModal({ profile, onClose }: MatchModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white text-center p-8 animate-scale-in">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-red-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">It's a Match!</h2>
          <p className="text-gray-600">
            You and {profile.name} liked each other
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profile.images[0]}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-red-200"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={onClose}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Send Message
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Keep Swiping
          </Button>
        </div>
      </Card>
    </div>
  );
}
