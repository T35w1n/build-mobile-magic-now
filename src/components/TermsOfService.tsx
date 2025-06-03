
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
  onAccept: () => void;
  onDecline: () => void;
  showCloseButton?: boolean;
}

export function TermsOfService({ onAccept, onDecline, showCloseButton = false }: TermsOfServiceProps) {
  const [hasRead, setHasRead] = React.useState(false);
  const [hasAgreed, setHasAgreed] = React.useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isScrolledToBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
    if (isScrolledToBottom) {
      setHasRead(true);
    }
  };

  const handleAccept = () => {
    if (hasRead && hasAgreed) {
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Terms of Service & Disclaimer</CardTitle>
            {showCloseButton && (
              <Button variant="ghost" size="sm" onClick={onDecline}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-96 pr-4" onScrollCapture={handleScroll}>
            <div className="space-y-4 text-sm">
              <section>
                <h3 className="font-semibold text-base mb-2">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using Koppel (the "App"), you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">2. Use at Your Own Risk</h3>
                <p className="font-medium text-red-600 mb-2">
                  IMPORTANT DISCLAIMER: YOU USE THIS APP ENTIRELY AT YOUR OWN RISK AND VOLITION.
                </p>
                <p>
                  You acknowledge and agree that your use of Koppel is voluntary and that you assume all risks 
                  associated with using the app, including but not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Meeting individuals through the platform</li>
                  <li>Sharing personal information</li>
                  <li>Engaging in conversations or relationships</li>
                  <li>Any physical meetings or interactions with other users</li>
                  <li>Financial transactions or exchanges</li>
                  <li>Emotional or psychological effects</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">3. Limitation of Liability</h3>
                <p className="font-medium mb-2">
                  THE APP OWNER, DEVELOPERS, AND AFFILIATES ARE NOT RESPONSIBLE FOR ANY CONSEQUENCES, 
                  DAMAGES, OR HARM THAT MAY RESULT FROM YOUR USE OF THIS APP.
                </p>
                <p>
                  This includes, but is not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Personal injury or harm</li>
                  <li>Property damage</li>
                  <li>Financial loss</li>
                  <li>Identity theft or fraud</li>
                  <li>Harassment or abuse</li>
                  <li>Privacy breaches</li>
                  <li>Emotional distress</li>
                  <li>Any illegal activities by other users</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">4. User Responsibility</h3>
                <p>
                  You are solely responsible for:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Your own safety and security</li>
                  <li>Verifying the identity and intentions of other users</li>
                  <li>Making informed decisions about interactions</li>
                  <li>Following local laws and regulations</li>
                  <li>Protecting your personal information</li>
                  <li>Reporting suspicious or harmful behavior</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">5. No Warranties</h3>
                <p>
                  The app is provided "as is" without any warranties, express or implied. We do not guarantee 
                  the accuracy, reliability, or safety of user profiles, information, or interactions.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">6. Safety Recommendations</h3>
                <p>
                  While we are not responsible for your safety, we strongly recommend:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Meeting in public places for initial meetings</li>
                  <li>Informing friends or family about your plans</li>
                  <li>Trusting your instincts</li>
                  <li>Never sharing financial information</li>
                  <li>Reporting suspicious behavior</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">7. Indemnification</h3>
                <p>
                  You agree to indemnify and hold harmless the app owner, developers, and affiliates from 
                  any claims, damages, or expenses arising from your use of the app or violation of these terms.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">8. Changes to Terms</h3>
                <p>
                  These terms may be updated at any time. Continued use of the app constitutes acceptance 
                  of any changes.
                </p>
              </section>

              <section className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-base mb-2 text-red-800">Final Warning</h3>
                <p className="text-red-700 font-medium">
                  By proceeding, you acknowledge that you understand and accept all risks associated with 
                  using this dating app. You agree that the app owner bears no responsibility for any 
                  negative outcomes, and you use the service entirely at your own discretion and risk.
                </p>
              </section>
            </div>
          </ScrollArea>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms-read" 
                checked={hasRead}
                disabled={!hasRead}
                onCheckedChange={(checked) => setHasRead(checked as boolean)}
              />
              <label htmlFor="terms-read" className="text-sm">
                I have read and scrolled through the entire Terms of Service
                {!hasRead && <span className="text-red-500 ml-1">(Please scroll to the bottom to enable)</span>}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms-agree" 
                checked={hasAgreed}
                disabled={!hasRead}
                onCheckedChange={(checked) => setHasAgreed(checked as boolean)}
              />
              <label htmlFor="terms-agree" className="text-sm font-medium">
                I agree to use this app at my own risk and acknowledge that the app owner is not responsible for any consequences
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleAccept}
                disabled={!hasRead || !hasAgreed}
                className="flex-1"
              >
                I Accept These Terms
              </Button>
              <Button 
                variant="outline" 
                onClick={onDecline}
                className="flex-1"
              >
                I Decline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
