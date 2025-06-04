
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCheck, Crown, MessageCircle, Eye } from 'lucide-react';

interface ReadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function ReadReceiptModal({ isOpen, onClose, onUpgrade }: ReadReceiptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <CheckCheck className="w-16 h-16 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-600">Read Receipts</CardTitle>
          <p className="text-gray-600">Know when your messages are read</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">Premium Messaging Features:</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCheck className="w-4 h-4" />
                See when messages are read
              </li>
              <li className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Know when someone is typing
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Priority message delivery
              </li>
              <li className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Message without matching (Super Messages)
              </li>
            </ul>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Your message</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCheck className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-blue-600">Read 2:34 PM</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Stop wondering if they've seen your message!
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onUpgrade}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to Pro - R9.99
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition-all duration-200"
            >
              Maybe Later
            </Button>
          </div>

          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-sm text-green-700">
              💡 Pro members get 5x more responses to their messages!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
