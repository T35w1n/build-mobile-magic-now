
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white text-center p-8 animate-scale-in rounded-2xl shadow-2xl border-2 border-passion-200">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <Heart className="w-20 h-20 text-passion-500 animate-heartbeat drop-shadow-lg" />
          </div>
          <h2 className="text-4xl font-bold font-dancing text-gradient mb-3">It's a Match!</h2>
          <p className="text-passion-700 font-medium">
            You and <span className="font-semibold text-passion-800">{profile.name}</span> liked each other
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profile.images[0]}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-passion-300 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-passion-500 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full gradient-desire hover:shadow-lg hover:shadow-passion-300/50 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-200"
            onClick={onClose}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Send Message
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-2 border-passion-300 text-passion-700 hover:bg-passion-50 font-medium py-3 rounded-xl transition-all duration-200"
            onClick={onClose}
          >
            Keep Exploring
          </Button>
        </div>
      </Card>
    </div>
  );
}
