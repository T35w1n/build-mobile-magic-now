
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Clock, DollarSign, Users, Calendar } from 'lucide-react';
import { JobApplicationModal } from '@/components/JobApplicationModal';
import { format } from 'date-fns';

interface Job {
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

interface JobCardProps {
  job: Job;
  userRole: string | null;
  isOwnJob?: boolean;
}

export function JobCard({ job, userRole, isOwnJob = false }: JobCardProps) {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const formatSalary = (min: number, max: number, currency: string) => {
    if (min && max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    } else if (min) {
      return `${currency} ${min.toLocaleString()}+`;
    } else if (max) {
      return `Up to ${currency} ${max.toLocaleString()}`;
    }
    return 'Salary not specified';
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'bg-green-100 text-green-800';
      case 'part_time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      case 'freelance':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-pink-100 text-pink-800';
      case 'temporary':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{job.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Building className="w-4 h-4 mr-1" />
                <span className="text-sm">{job.company_name}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {job.location}
              {job.is_remote && <Badge variant="secondary" className="ml-2 text-xs">Remote</Badge>}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-2" />
              {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <Badge className={getJobTypeColor(job.job_type)}>
                {job.job_type.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            {job.application_deadline && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Apply by {format(new Date(job.application_deadline), 'MMM d, yyyy')}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
            {job.description}
          </p>

          <div className="mb-4">
            <Badge variant="outline" className="text-xs">
              {job.category.replace('_', ' ').toUpperCase()}
            </Badge>
            {job.experience_level && (
              <Badge variant="outline" className="ml-2 text-xs">
                {job.experience_level}
              </Badge>
            )}
          </div>

          {!isOwnJob && userRole === 'attendee' && (
            <Button
              onClick={() => setShowApplicationModal(true)}
              className="w-full bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600"
            >
              Apply Now
            </Button>
          )}

          {isOwnJob && (
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              Posted {format(new Date(job.created_at), 'MMM d, yyyy')}
            </div>
          )}
        </CardContent>
      </Card>

      {showApplicationModal && (
        <JobApplicationModal
          job={job}
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </>
  );
}
