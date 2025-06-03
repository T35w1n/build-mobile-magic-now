
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput } from '@/utils/security';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedUserId: string;
  reportedUserName: string;
}

export function ReportModal({ isOpen, onClose, reportedUserId, reportedUserName }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const reportReasons = [
    'Inappropriate content',
    'Harassment or bullying',
    'Fake profile',
    'Spam or scam',
    'Violence or threats',
    'Underage user',
    'Other'
  ];

  const handleSubmit = async () => {
    if (!reason) {
      toast({
        title: "Error",
        description: "Please select a reason for reporting",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      // In a real app, this would send to a moderation system
      console.log('Report submitted:', {
        reportedUserId,
        reason,
        details: sanitizeInput(details),
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep our community safe. We'll review this report.",
      });

      onClose();
      setReason('');
      setDetails('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Report {reportedUserName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Reason for reporting:</Label>
            <RadioGroup value={reason} onValueChange={setReason} className="mt-2">
              {reportReasons.map((reportReason) => (
                <div key={reportReason} className="flex items-center space-x-2">
                  <RadioGroupItem value={reportReason} id={reportReason} />
                  <Label htmlFor={reportReason} className="text-sm">{reportReason}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="details" className="text-sm font-medium">
              Additional details (optional):
            </Label>
            <Textarea
              id="details"
              placeholder="Provide more information about this report..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              maxLength={500}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">{details.length}/500 characters</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
