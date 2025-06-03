
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Phone, MapPin, Users } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyModal({ isOpen, onClose }: SafetyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            Safety Guidelines
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Important Safety Reminders</h3>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Never share personal information (address, financial details)</li>
              <li>• Trust your instincts - if something feels wrong, it probably is</li>
              <li>• Report suspicious or inappropriate behavior immediately</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium">First Meeting Safety</h4>
                <p className="text-sm text-gray-600">Always meet in public places for your first few dates. Avoid isolated locations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-medium">Tell Someone</h4>
                <p className="text-sm text-gray-600">Inform a friend or family member about your plans, including where and when you're meeting.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium">Stay Connected</h4>
                <p className="text-sm text-gray-600">Keep your phone charged and accessible. Have emergency contacts readily available.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Red Flags to Watch For:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Asks for money or financial information</li>
              <li>• Refuses to meet in person or video call</li>
              <li>• Pushes for private/isolated meeting locations</li>
              <li>• Shows aggressive or controlling behavior</li>
              <li>• Profile seems too good to be true</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Your safety is our priority. If you feel unsafe or encounter any issues, contact support immediately.
            </p>
            <Button onClick={onClose} className="w-full">
              I Understand
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
