
import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Lock, Eye } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-passion-50 via-desire-50 to-warmth-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Heart className="w-16 h-16 text-passion-500 mx-auto mb-4 animate-heartbeat" />
            <h1 className="text-6xl font-bold font-dancing text-gradient mb-4">Koppel</h1>
            <p className="text-2xl text-passion-700 mb-2 font-medium">kom ons kyk 'n lyn?</p>
            <p className="text-passion-600 text-lg">Safe, secure, and meaningful connections</p>
          </div>

          {/* Security Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-passion-200">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">
                Your data is protected with end-to-end encryption and advanced security measures.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-passion-200">
              <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Identity Verified</h3>
              <p className="text-gray-600 text-sm">
                Enhanced verification system ensures authentic profiles and safer connections.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-passion-200">
              <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Content Filtered</h3>
              <p className="text-gray-600 text-sm">
                Advanced AI filters inappropriate content to maintain a respectful environment.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-passion-200 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Connect?</h2>
            <p className="text-gray-600 mb-6">Join thousands finding meaningful relationships in a safe environment.</p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Your Journey
            </Button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              By using Koppel, you agree to our Terms of Service and Privacy Policy. 
              We are committed to protecting your privacy and ensuring a safe dating experience.
              All user interactions are monitored for safety and inappropriate content is automatically filtered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
