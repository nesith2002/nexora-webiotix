import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RequestSummary = ({ formData, serviceType, onEdit, isVisible, isMobile }) => {
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

  const getBudgetDisplay = () => {
    if (formData.customBudget && formData.minBudget && formData.maxBudget) {
      return `$${parseInt(formData.minBudget).toLocaleString()} - $${parseInt(formData.maxBudget).toLocaleString()}`;
    }
    
    const budgetRanges = {
      'under-5k': 'Under $5,000',
      '5k-15k': '$5,000 - $15,000',
      '15k-30k': '$15,000 - $30,000',
      '30k-50k': '$30,000 - $50,000',
      '50k-100k': '$50,000 - $100,000',
      'over-100k': 'Over $100,000'
    };
    
    return budgetRanges[formData.budgetRange] || 'Not specified';
  };

  const getTimelineDisplay = () => {
    const timelines = {
      'asap': 'ASAP (Rush Job)',
      '1-2weeks': '1-2 Weeks',
      '1month': '1 Month',
      '2-3months': '2-3 Months',
      '3-6months': '3-6 Months',
      'flexible': 'Flexible'
    };
    
    if (formData.customTimeline && formData.targetDate) {
      return `By ${new Date(formData.targetDate).toLocaleDateString()}`;
    }
    
    return timelines[formData.timeline] || 'Not specified';
  };

  const getPriorityDisplay = () => {
    const priorities = {
      'low': 'Low Priority',
      'medium': 'Medium Priority',
      'high': 'High Priority',
      'critical': 'Critical Priority'
    };
    return priorities[formData.priority] || 'Not specified';
  };

  const getEstimatedPrice = () => {
    // Simple estimation logic based on service type and budget
    let basePrice = 5000;
    
    switch (serviceType) {
      case 'web-development':
        basePrice = 8000;
        break;
      case 'app-development':
        basePrice = 15000;
        break;
      case 'ai-development':
        basePrice = 20000;
        break;
      case 'tanning':
        basePrice = 200;
        break;
      case 'iot-robotics':
        basePrice = 25000;
        break;
    }

    // Adjust based on timeline
    const timelineMultipliers = {
      'asap': 1.5,
      '1-2weeks': 1.3,
      '1month': 1.0,
      '2-3months': 0.9,
      '3-6months': 0.8,
      'flexible': 0.7
    };

    const multiplier = timelineMultipliers[formData.timeline] || 1.0;
    const estimatedPrice = basePrice * multiplier;

    return `$${estimatedPrice.toLocaleString()}`;
  };

  if (!isVisible) return null;

  const summaryContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Request Summary</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Edit"
          onClick={() => onEdit(1)}
          className="text-primary hover:text-primary-700"
        />
      </div>

      {/* Service Type */}
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Briefcase" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Service Type</span>
        </div>
        <div className="text-text-primary font-medium">{getServiceName()}</div>
      </div>

      {/* Key Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-text-secondary">Budget Range</span>
          <span className="text-sm font-medium text-text-primary">{getBudgetDisplay()}</span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-text-secondary">Timeline</span>
          <span className="text-sm font-medium text-text-primary">{getTimelineDisplay()}</span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-text-secondary">Priority</span>
          <span className="text-sm font-medium text-text-primary">{getPriorityDisplay()}</span>
        </div>
      </div>

      {/* Contact Information */}
      {formData.firstName && formData.lastName && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="User" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-secondary">Contact</span>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-text-primary">
              {formData.firstName} {formData.lastName}
            </div>
            {formData.companyName && (
              <div className="text-sm text-text-secondary">{formData.companyName}</div>
            )}
            {formData.email && (
              <div className="text-sm text-text-secondary">{formData.email}</div>
            )}
          </div>
        </div>
      )}

      {/* Estimated Pricing */}
      <div className="p-4 bg-accent-50 rounded-lg border border-accent-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-accent-700">Estimated Starting Price</div>
            <div className="text-xs text-accent-600 mt-1">Final pricing may vary based on requirements</div>
          </div>
          <div className="text-xl font-bold text-accent">{getEstimatedPrice()}</div>
        </div>
      </div>

      {/* Features Summary */}
      {formData.features && formData.features.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="CheckSquare" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-secondary">Selected Features</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-success-100 text-success-700 rounded-full"
              >
                {feature}
              </span>
            ))}
            {formData.features.length > 3 && (
              <span className="px-2 py-1 text-xs bg-secondary-100 text-secondary-700 rounded-full">
                +{formData.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          fullWidth
          className="justify-center"
        >
          Download Summary
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Share"
          fullWidth
          className="justify-center"
        >
          Share Request
        </Button>
      </div>

      {/* Help Section */}
      <div className="p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="HelpCircle" size={16} className="text-text-secondary mt-0.5" />
          <div>
            <div className="text-sm font-medium text-text-primary">Need Help?</div>
            <div className="text-xs text-text-secondary mt-1">
              Contact our team for assistance with your request.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-lg z-1010 max-h-96 overflow-y-auto">
        <div className="p-4">
          {summaryContent}
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-24 bg-surface border border-border rounded-lg shadow-sm p-6 max-h-screen overflow-y-auto">
      {summaryContent}
    </div>
  );
};

export default RequestSummary;