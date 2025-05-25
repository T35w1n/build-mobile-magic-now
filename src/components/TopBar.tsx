
import React from 'react';
import { Flame, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Button variant="ghost" size="icon">
        <User className="w-6 h-6 text-gray-600" />
      </Button>
      
      <div className="flex items-center">
        <Flame className="w-8 h-8 text-red-500 mr-2" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          LovableDate
        </h1>
      </div>
      
      <Button variant="ghost" size="icon">
        <MessageCircle className="w-6 h-6 text-gray-600" />
      </Button>
    </div>
  );
}
