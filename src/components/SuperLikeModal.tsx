
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Crown, Heart } from 'lucide-react';

interface SuperLikeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuperLike: () => void;
  profile: any;
  remainingSuperLikes: number;
}

export function SuperLikeModal({ isOpen, onClose, onSuperLike, profile, remainingSuperLikes }: SuperLikeModalProps) {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Star className="w-16 h-16 text-blue-500 fill-current" />
              <div className="absolute inset-0 animate-ping">
                <Star className="w-16 h-16 text-blue-300 fill-current" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-blue-600">Super Like</CardTitle>
          <p className="text-gray-600">Stand out from the crowd!</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <img
              src={profile.photos?.[0] || profile.images?.[0]}
              alt={profile.full_name || profile.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-blue-200"
            />
            <h3 className="font-semibold text-lg">{profile.full_name || profile.name}</h3>
            <p className="text-gray-500">Age {profile.age}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Super Like Benefits:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 3x more likely to get matched</li>
              <li>• You'll appear at the top of their stack</li>
              <li>• Shows you're really interested</li>
              <li>• Blue star notification</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Super Likes remaining today: <span className="font-semibold text-blue-600">{remainingSuperLikes}</span>
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onSuperLike}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200"
            >
              <Star className="w-5 h-5 mr-2 fill-current" />
              Send Super Like
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition-all duration-200"
            >
              Cancel
            </Button>
          </div>

          {remainingSuperLikes === 0 && (
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <Crown className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-sm text-yellow-700">
                Upgrade to Pro for unlimited Super Likes!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
