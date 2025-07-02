
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { JobCard } from '@/components/JobCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Users, MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface JobListing {
  id: string;
  title: string;
  description: string;
  company_name: string;
  location: string;
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  category: string;
  job_type: string;
  requirements: string[];
  benefits: string[];
  application_deadline: string;
  is_remote: boolean;
  experience_level: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  created_at: string;
  employer_id: string;
}

interface JobsListProps {
  userRole: string | null;
}

export function JobsList({ userRole }: JobsListProps) {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [myJobs, setMyJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
    if (userRole === 'promoter') {
      fetchMyJobs();
    }
  }, [userRole]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('employer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching my jobs:', error);
      } else {
        setMyJobs(data || []);
      }
    } catch (error) {
      console.error('Error fetching my jobs:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {userRole === 'promoter' ? (
        <Tabs defaultValue="all-jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              All Jobs
            </TabsTrigger>
            <TabsTrigger value="my-jobs" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Jobs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-jobs" className="space-y-8">
            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} userRole={userRole} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Jobs Available</h3>
                <p className="text-gray-500">Check back soon for new opportunities!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my-jobs" className="space-y-8">
            {myJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myJobs.map((job) => (
                  <JobCard key={job.id} job={job} userRole={userRole} isOwnJob />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Jobs Posted</h3>
                <p className="text-gray-500">Post your first job to get started!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} userRole={userRole} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Jobs Available</h3>
              <p className="text-gray-500">Check back soon for new opportunities!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
