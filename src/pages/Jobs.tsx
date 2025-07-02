
import React, { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { JobsList } from '@/components/JobsList';
import { CreateJobModal } from '@/components/CreateJobModal';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Plus, Briefcase } from 'lucide-react';

export default function Jobs() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { userRole, loading } = useUserRole();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-passion-50 to-desire-50">
        <TopBar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-passion-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-passion-50 to-desire-50">
      <TopBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-passion-600" />
            <h1 className="text-4xl font-bold text-gray-800">Job Listings</h1>
          </div>
          
          {userRole === 'promoter' && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post Job
            </Button>
          )}
        </div>

        <JobsList userRole={userRole} />
      </div>

      {showCreateModal && (
        <CreateJobModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
