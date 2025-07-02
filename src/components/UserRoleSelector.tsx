
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Star, Calendar } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { useToast } from '@/hooks/use-toast';

interface UserRoleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelected: () => void;
}

export function UserRoleSelector({ isOpen, onClose, onRoleSelected }: UserRoleSelectorProps) {
  const [loading, setLoading] = useState(false);
  const { updateUserRole } = useUserRole();
  const { toast } = useToast();

  const handleRoleSelect = async (role: string) => {
    setLoading(true);
    try {
      const success = await updateUserRole(role);
      if (success) {
        toast({
          title: "Role Updated",
          description: `You are now registered as ${role === 'promoter' ? 'an Event Promoter' : 'an Event Attendee'}`,
        });
        onRoleSelected();
      } else {
        toast({
          title: "Error",
          description: "Failed to update your role. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error selecting role:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800 mb-4">
            Choose Your Role
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-center text-gray-600 mb-6">
            Select how you'd like to participate in events
          </p>

          <div className="grid gap-4">
            <button
              onClick={() => handleRoleSelect('attendee')}
              disabled={loading}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-passion-500 hover:bg-passion-50 transition-all duration-200 text-left group disabled:opacity-50"
            >
              <div className="flex items-start space-x-4">
                <Calendar className="w-8 h-8 text-passion-500 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Event Attendee</h3>
                  <p className="text-sm text-gray-600">
                    Discover and attend amazing events. Purchase tickets, chat with other attendees, and enjoy experiences.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('promoter')}
              disabled={loading}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left group disabled:opacity-50"
            >
              <div className="flex items-start space-x-4">
                <Star className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Event Promoter</h3>
                  <p className="text-sm text-gray-600">
                    Create and manage events. Set up ticketing, manage attendees, and build your community.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
