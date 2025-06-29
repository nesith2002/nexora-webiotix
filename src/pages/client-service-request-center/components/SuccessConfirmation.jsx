import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessConfirmation = ({ requestData, onNewRequest, onViewDashboard }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 300);
    const timer2 = setTimeout(() => setAnimationStep(2), 800);
    const timer3 = setTimeout(() => setAnimationStep(3), 1300);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const generateRequestId = () => {
    return `REQ-${Date.now().toString().slice(-6)}`;
  };

  const getProjectManager = () => {
    const managers = [
      { name: 'Sarah Johnson', email: 'sarah.johnson@nexorawebiotix.com', phone: '+1 (555) 123-4567' },
      { name: 'Michael Chen', email: 'michael.chen@nexorawebiotix.com', phone: '+1 (555) 234-5678' },
      { name: 'Emily Rodriguez', email: 'emily.rodriguez@nexorawebiotix.com', phone: '+1 (555) 345-6789' },
      { name: 'David Thompson', email: 'david.thompson@nexorawebiotix.com', phone: '+1 (555) 456-7890' }
    ];
    return managers[Math.floor(Math.random() * managers.length)];
  };

  const requestId = generateRequestId();
  const projectManager = getProjectManager();
  const estimatedResponseTime = '2-3 business days';

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 to-primary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-success mb-6 transition-all duration-500 ${
            animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            <Icon name="CheckCircle" size={48} color="white" />
          </div>
          
          <div className={`transition-all duration-500 delay-300 ${
            animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Request Submitted Successfully!
            </h1>
            <p className="text-lg text-text-secondary">
              Thank you for choosing Nexora Webiotix. We've received your service request.
            </p>
          </div>
        </div>

        {/* Request Details Card */}
        <div className={`bg-surface border border-border rounded-lg shadow-lg p-6 mb-6 transition-all duration-500 delay-500 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Request Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="FileText" size={20} className="text-primary" />
                <span>Request Details</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Request ID:</span>
                  <span className="text-sm font-medium text-text-primary">{requestId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Service Type:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {requestData?.serviceType || 'Web Development'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Submitted:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Status:</span>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-warning-100 text-warning-700 rounded-full">
                    Under Review
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Expected Response:</span>
                  <span className="text-sm font-medium text-text-primary">{estimatedResponseTime}</span>
                </div>
              </div>
            </div>

            {/* Project Manager Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="User" size={20} className="text-primary" />
                <span>Your Project Manager</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{projectManager.name}</div>
                    <div className="text-sm text-text-secondary">Senior Project Manager</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-text-secondary" />
                    <a 
                      href={`mailto:${projectManager.email}`}
                      className="text-sm text-primary hover:text-primary-700"
                    >
                      {projectManager.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-text-secondary" />
                    <a 
                      href={`tel:${projectManager.phone}`}
                      className="text-sm text-primary hover:text-primary-700"
                    >
                      {projectManager.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className={`bg-surface border border-border rounded-lg shadow-lg p-6 mb-6 transition-all duration-500 delay-700 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-primary" />
            <span>What Happens Next?</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <div className="font-medium text-text-primary">Email Confirmation</div>
                <div className="text-sm text-text-secondary">
                  You'll receive a detailed confirmation email within the next few minutes.
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <div className="font-medium text-text-primary">Initial Review</div>
                <div className="text-sm text-text-secondary">
                  Our team will review your requirements and prepare initial questions.
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <div className="font-medium text-text-primary">Discovery Call</div>
                <div className="text-sm text-text-secondary">
                  {projectManager.name} will schedule a call to discuss your project in detail.
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <div>
                <div className="font-medium text-text-primary">Proposal Delivery</div>
                <div className="text-sm text-text-secondary">
                  You'll receive a comprehensive proposal with timeline and pricing.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-900 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Button
            variant="primary"
            size="lg"
            iconName="FolderOpen"
            iconPosition="left"
            onClick={onViewDashboard}
            className="flex-1 justify-center"
          >
            View My Projects
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="Plus"
            iconPosition="left"
            onClick={onNewRequest}
            className="flex-1 justify-center"
          >
            Submit Another Request
          </Button>
        </div>

        {/* Additional Information */}
        <div className={`mt-8 text-center transition-all duration-500 delay-1100 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent-700">Average Response Time</span>
            </div>
            <div className="text-2xl font-bold text-accent mb-1">24 Hours</div>
            <div className="text-sm text-accent-600">
              Most clients hear back from us within one business day
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className={`mt-6 text-center transition-all duration-500 delay-1300 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <p className="text-sm text-text-secondary mb-2">
            Need immediate assistance? Contact our support team:
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="mailto:support@nexorawebiotix.com"
              className="flex items-center space-x-1 text-sm text-primary hover:text-primary-700"
            >
              <Icon name="Mail" size={16} />
              <span>support@nexorawebiotix.com</span>
            </a>
            <a 
              href="tel:+1-555-NEXORA-1"
              className="flex items-center space-x-1 text-sm text-primary hover:text-primary-700"
            >
              <Icon name="Phone" size={16} />
              <span>+1 (555) NEXORA-1</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirmation;