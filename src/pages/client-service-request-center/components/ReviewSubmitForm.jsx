import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewSubmitForm = ({ formData, serviceType, onEdit, onSubmit, isSubmitting }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [subscribedToUpdates, setSubscedToUpdates] = useState(true);

  const getServiceName = () => {
    const serviceNames = {
      'web-development': 'Web Development',
      'app-development': 'App Development',
      'ai-development': 'AI Development',
      'tanning': 'Tanning Services',
      'iot-robotics': 'IoT & Robotics'
    };
    return serviceNames[serviceType] || 'Service';
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions to proceed.');
      return;
    }
    onSubmit({ agreedToTerms, subscribedToUpdates });
  };

  const reviewSections = [
    {
      title: 'Service Details',
      icon: 'Briefcase',
      editStep: 1,
      items: [
        { label: 'Service Type', value: getServiceName() },
        { label: 'Description', value: formData.description || 'Not provided' },
        { label: 'Target Audience', value: formData.targetAudience || 'Not specified' },
        { label: 'Geographic Focus', value: formData.geographic || 'Not specified' }
      ]
    },
    {
      title: 'Budget & Timeline',
      icon: 'DollarSign',
      editStep: 2,
      items: [
        { 
          label: 'Budget Range', 
          value: formData.customBudget && formData.minBudget && formData.maxBudget
            ? `$${parseInt(formData.minBudget).toLocaleString()} - $${parseInt(formData.maxBudget).toLocaleString()}`
            : formData.budgetRange || 'Not specified'
        },
        { 
          label: 'Timeline', 
          value: formData.customTimeline && formData.targetDate
            ? `By ${new Date(formData.targetDate).toLocaleDateString()}`
            : formData.timeline || 'Not specified'
        },
        { label: 'Priority Level', value: formData.priority || 'Not specified' },
        { label: 'Ongoing Support', value: formData.ongoingSupport ? 'Yes' : 'No' }
      ]
    },
    {
      title: 'Contact Information',
      icon: 'User',
      editStep: 3,
      items: [
        { label: 'Name', value: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Not provided' },
        { label: 'Email', value: formData.email || 'Not provided' },
        { label: 'Phone', value: formData.phone || 'Not provided' },
        { label: 'Company', value: formData.companyName || 'Not provided' },
        { label: 'Industry', value: formData.industry || 'Not specified' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Review Your Request
        </h2>
        <p className="text-text-secondary">
          Please review all the information below before submitting your service request.
        </p>
      </div>

      {/* Review Sections */}
      <div className="space-y-6">
        {reviewSections.map((section, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name={section.icon} size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-text-primary">{section.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                onClick={() => onEdit(section.editStep)}
                className="text-primary hover:text-primary-700"
              >
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-1">
                  <div className="text-sm font-medium text-text-secondary">{item.label}</div>
                  <div className="text-sm text-text-primary">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Service-Specific Details */}
      {serviceType === 'web-development' && formData.features && formData.features.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Selected Features</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Communication Preferences */}
      {formData.communicationPrefs && formData.communicationPrefs.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="MessageSquare" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Communication Preferences</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-text-secondary mb-1">Preferred Methods</div>
              <div className="text-sm text-text-primary">
                {formData.communicationPrefs.join(', ')}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-text-secondary mb-1">Meeting Frequency</div>
              <div className="text-sm text-text-primary">
                {formData.meetingFrequency || 'Not specified'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {formData.uploadedFiles && formData.uploadedFiles.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Paperclip" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Attached Files</h3>
          </div>
          <div className="space-y-2">
            {formData.uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                <Icon name="File" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{file.name}</span>
                <span className="text-xs text-text-muted">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estimated Project Details */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calculator" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-accent-700">Project Estimation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">3-5</div>
            <div className="text-sm text-accent-600">Business Days</div>
            <div className="text-xs text-accent-500">Initial Response</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">1-2</div>
            <div className="text-sm text-accent-600">Weeks</div>
            <div className="text-xs text-accent-500">Detailed Proposal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">24/7</div>
            <div className="text-sm text-accent-600">Support</div>
            <div className="text-xs text-accent-500">Project Duration</div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Terms & Conditions</h3>
        
        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 rounded border-border text-primary focus:ring-primary-500"
            />
            <div className="text-sm text-text-primary">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Privacy Policy
              </a>
              . I understand that this is a service request and not a binding contract. Final terms will be discussed during the proposal phase.
            </div>
          </label>
          
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscribedToUpdates}
              onChange={(e) => setSubscedToUpdates(e.target.checked)}
              className="mt-1 rounded border-border text-primary focus:ring-primary-500"
            />
            <div className="text-sm text-text-primary">
              I would like to receive project updates and marketing communications from Nexora Webiotix. You can unsubscribe at any time.
            </div>
          </label>
        </div>
      </div>

      {/* Next Steps Information */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-success-700">What Happens Next?</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
            <div>
              <div className="text-sm font-medium text-success-700">Immediate Confirmation</div>
              <div className="text-sm text-success-600">You'll receive an email confirmation with your request details</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
            <div>
              <div className="text-sm font-medium text-success-700">Team Assignment</div>
              <div className="text-sm text-success-600">Our project manager will review and assign the right team</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
            <div>
              <div className="text-sm font-medium text-success-700">Initial Consultation</div>
              <div className="text-sm text-success-600">We'll schedule a call to discuss your requirements in detail</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
            <div>
              <div className="text-sm font-medium text-success-700">Detailed Proposal</div>
              <div className="text-sm text-success-600">You'll receive a comprehensive proposal with timeline and pricing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          variant="outline"
          size="lg"
          iconName="ArrowLeft"
          onClick={() => onEdit(3)}
          className="flex-1 justify-center"
        >
          Back to Edit
        </Button>
        <Button
          variant="primary"
          size="lg"
          iconName="Send"
          iconPosition="right"
          onClick={handleSubmit}
          disabled={!agreedToTerms || isSubmitting}
          loading={isSubmitting}
          className="flex-1 justify-center"
        >
          {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewSubmitForm;