
import React from 'react';
import { Heart, MessageCircle, User, Calendar, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonVariant = (path: string) => {
    return location.pathname === path ? 'default' : 'ghost';
  };

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
      
      <div className="flex items-center gap-2">
        <Button 
          variant={getButtonVariant('/')}
          size="icon" 
          className="hover:bg-passion-50"
          onClick={() => navigate('/')}
        >
          <Heart className="w-6 h-6 text-passion-600" />
        </Button>
        <Button 
          variant={getButtonVariant('/events')}
          size="icon" 
          className="hover:bg-passion-50"
          onClick={() => navigate('/events')}
        >
          <Calendar className="w-6 h-6 text-passion-600" />
        </Button>
        <Button 
          variant={getButtonVariant('/jobs')}
          size="icon" 
          className="hover:bg-passion-50"
          onClick={() => navigate('/jobs')}
        >
          <Briefcase className="w-6 h-6 text-passion-600" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-passion-50">
          <MessageCircle className="w-6 h-6 text-passion-600" />
        </Button>
      </div>
    </div>
  );
}
