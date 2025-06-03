
import React from 'react';
import { TermsOfService } from '@/components/TermsOfService';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAccept = () => {
    localStorage.setItem('koppel-terms-accepted', 'true');
    localStorage.setItem('koppel-terms-accepted-date', new Date().toISOString());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        
        <TermsOfService 
          onAccept={handleAccept}
          onDecline={handleBack}
          showCloseButton={true}
        />
      </div>
    </div>
  );
}
