
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { EventsList } from '@/components/EventsList';
import { CreateEventModal } from '@/components/CreateEventModal';
import { UserRoleSelector } from '@/components/UserRoleSelector';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Users } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const Events = () => {
  const { user } = useAuth();
  const { userRole, loading: roleLoading } = useUserRole();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-passion-50 via-desire-50 to-warmth-50 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-passion-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Events</h1>
          <p className="text-gray-600 mb-4">Please sign in to view and participate in events</p>
        </div>
      </div>
    );
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-passion-50 via-desire-50 to-warmth-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-passion-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-passion-50 via-desire-50 to-warmth-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-dancing text-gradient mb-2">Events</h1>
            <p className="text-passion-700">Discover amazing events and connect with others</p>
          </div>
          
          <div className="flex items-center gap-4">
            {!userRole && (
              <Button
                onClick={() => setShowRoleSelector(true)}
                className="bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600"
              >
                <Users className="w-4 h-4 mr-2" />
                Choose Role
              </Button>
            )}
            
            {userRole === 'promoter' && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            )}
          </div>
        </div>

        {/* Role Badge */}
        {userRole && (
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              userRole === 'promoter' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {userRole === 'promoter' ? 'Event Promoter' : 'Event Attendee'}
            </span>
          </div>
        )}

        {/* Events List */}
        <EventsList userRole={userRole} />

        {/* Modals */}
        {showCreateModal && (
          <CreateEventModal 
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />
        )}

        {showRoleSelector && (
          <UserRoleSelector
            isOpen={showRoleSelector}
            onClose={() => setShowRoleSelector(false)}
            onRoleSelected={() => {
              setShowRoleSelector(false);
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Events;
