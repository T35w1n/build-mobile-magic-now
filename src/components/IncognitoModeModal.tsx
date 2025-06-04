
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeOff, Crown, Shield, UserX } from 'lucide-react';

interface IncognitoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: () => void;
  isIncognito: boolean;
}

export function IncognitoModeModal({ isOpen, onClose, onActivate, isIncognito }: IncognitoModeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <EyeOff className="w-16 h-16 text-gray-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Incognito Mode</CardTitle>
          <p className="text-gray-600">Browse profiles privately</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">🕵️ Incognito Benefits:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                Browse without being seen
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Your profile won't appear in their stack
              </li>
              <li className="flex items-center gap-2">
                <UserX className="w-4 h-4" />
                No trace in their "Who viewed you" list
              </li>
              <li className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Ultimate privacy and control
              </li>
            </ul>
          </div>

          <div className="text-center">
            <div className={`p-4 rounded-lg mb-4 ${isIncognito ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${isIncognito ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-semibold ${isIncognito ? 'text-green-700' : 'text-red-700'}`}>
                  {isIncognito ? 'Incognito Mode Active' : 'Incognito Mode Inactive'}
                </span>
              </div>
              <p className={`text-sm ${isIncognito ? 'text-green-600' : 'text-red-600'}`}>
                {isIncognito 
                  ? 'You are browsing invisibly' 
                  : 'Your activity is visible to others'
                }
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onActivate}
              className={`w-full py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 ${
                isIncognito 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              <EyeOff className="w-5 h-5 mr-2" />
              {isIncognito ? 'Deactivate Incognito' : 'Activate Incognito'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition-all duration-200"
            >
              Close
            </Button>
          </div>

          {!isIncognito && (
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <Crown className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-blue-700">
                Pro feature - Browse without leaving a trace!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
