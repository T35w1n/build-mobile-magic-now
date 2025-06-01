
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Heart, Zap, Eye, X } from 'lucide-react';

interface ProUpgradeModalProps {
  onClose: () => void;
  onUpgrade: () => void;
  remainingSwipes: number;
}

export function ProUpgradeModal({ onClose, onUpgrade, remainingSwipes }: ProUpgradeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white text-center p-8 rounded-2xl shadow-2xl border-2 border-passion-200">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X className="w-5 h-5" />
        </Button>
        
        <div className="mb-6">
          <Crown className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-dancing text-gradient mb-3">Upgrade to Pro</h2>
          <p className="text-passion-700">
            You've used {15 - remainingSwipes} of 15 free daily swipes
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center text-left">
            <Heart className="w-5 h-5 text-passion-500 mr-3" />
            <span className="text-gray-700">Unlimited swipes</span>
          </div>
          <div className="flex items-center text-left">
            <Eye className="w-5 h-5 text-passion-500 mr-3" />
            <span className="text-gray-700">See who liked you</span>
          </div>
          <div className="flex items-center text-left">
            <Zap className="w-5 h-5 text-passion-500 mr-3" />
            <span className="text-gray-700">Priority matching</span>
          </div>
          <div className="flex items-center text-left">
            <Crown className="w-5 h-5 text-passion-500 mr-3" />
            <span className="text-gray-700">Ad-free experience</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={onUpgrade}
            className="w-full gradient-desire hover:shadow-lg hover:shadow-passion-300/50 text-white font-semibold py-4 rounded-xl transform hover:scale-105 transition-all duration-200"
          >
            <Crown className="w-5 h-5 mr-2" />
            Upgrade for R9.99
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-2 border-passion-300 text-passion-700 hover:bg-passion-50 font-medium py-3 rounded-xl transition-all duration-200"
            onClick={onClose}
          >
            Maybe Later
          </Button>
        </div>
      </Card>
    </div>
  );
}
