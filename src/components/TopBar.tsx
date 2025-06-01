
import React from 'react';
import { Heart, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-passion-100">
      <Button variant="ghost" size="icon" className="hover:bg-passion-50">
        <User className="w-6 h-6 text-passion-600" />
      </Button>
      
      <div className="flex items-center">
        <Heart className="w-8 h-8 text-passion-500 mr-3 animate-heartbeat" />
        <h1 className="text-3xl font-bold font-dancing text-gradient">
          Koppel
        </h1>
      </div>
      
      <Button variant="ghost" size="icon" className="hover:bg-passion-50">
        <MessageCircle className="w-6 h-6 text-passion-600" />
      </Button>
    </div>
  );
}
