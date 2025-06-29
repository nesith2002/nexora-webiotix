import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetTimelineForm = ({ formData, onFormDataChange }) => {
  const handleInputChange = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const budgetRanges = [
    { id: 'under-5k', label: 'Under $5,000', min: 0, max: 5000 },
    { id: '5k-15k', label: '$5,000 - $15,000', min: 5000, max: 15000 },
    { id: '15k-30k', label: '$15,000 - $30,000', min: 15000, max: 30000 },
    { id: '30k-50k', label: '$30,000 - $50,000', min: 30000, max: 50000 },
    { id: '50k-100k', label: '$50,000 - $100,000', min: 50000, max: 100000 },
    { id: 'over-100k', label: 'Over $100,000', min: 100000, max: 999999 }
  ];

  const timelineOptions = [
    { id: 'asap', label: 'ASAP (Rush Job)', icon: 'Zap', description: 'Urgent delivery needed', multiplier: 1.5 },
    { id: '1-2weeks', label: '1-2 Weeks', icon: 'Clock', description: 'Quick turnaround', multiplier: 1.3 },
    { id: '1month', label: '1 Month', icon: 'Calendar', description: 'Standard timeline', multiplier: 1.0 },
    { id: '2-3months', label: '2-3 Months', icon: 'CalendarDays', description: 'Comfortable timeline', multiplier: 0.9 },
    { id: '3-6months', label: '3-6 Months', icon: 'CalendarRange', description: 'Extended timeline', multiplier: 0.8 },
    { id: 'flexible', label: 'Flexible', icon: 'Timer', description: 'No specific deadline', multiplier: 0.7 }
  ];

  const priorityLevels = [
    { id: 'low', label: 'Low Priority', description: 'Can wait for optimal scheduling', color: 'text-success' },
    { id: 'medium', label: 'Medium Priority', description: 'Standard business priority', color: 'text-warning' },
    { id: 'high', label: 'High Priority', description: 'Important for business operations', color: 'text-error' },
    { id: 'critical', label: 'Critical Priority', description: 'Urgent business need', color: 'text-error' }
  ];

  return (
    <div className="space-y-8">
      {/* Budget Selection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Project Budget Range
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Select your budget range to help us provide accurate proposals and recommendations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetRanges.map((range) => (
            <div
              key={range.id}
              onClick={() => handleInputChange('budgetRange', range.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                formData.budgetRange === range.id
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${
                    formData.budgetRange === range.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {range.label}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    Estimated range
                  </div>
                </div>
                {formData.budgetRange === range.id && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Budget Input */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.customBudget || false}
              onChange={(e) => handleInputChange('customBudget', e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-text-primary">
              I have a specific budget in mind
            </span>
          </label>
          
          {formData.customBudget && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Minimum Budget ($)
                </label>
                <input
                  type="number"
                  value={formData.minBudget || ''}
                  onChange={(e) => handleInputChange('minBudget', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Maximum Budget ($)
                </label>
                <input
                  type="number"
                  value={formData.maxBudget || ''}
                  onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Selection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Project Timeline
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          When do you need this project completed? Timeline affects pricing and resource allocation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {timelineOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleInputChange('timeline', option.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                formData.timeline === option.id
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  formData.timeline === option.id ? 'bg-primary text-white' : 'bg-primary-100 text-primary'
                }`}>
                  <Icon name={option.icon} size={20} />
                </div>
                
                <div className="flex-1">
                  <div className={`font-medium ${
                    formData.timeline === option.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {option.label}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    {option.description}
                  </div>
                  {option.multiplier !== 1.0 && (
                    <div className="text-xs text-text-muted mt-1">
                      {option.multiplier > 1.0 ? '+' : ''}{((option.multiplier - 1) * 100).toFixed(0)}% pricing adjustment
                    </div>
                  )}
                </div>
                
                {formData.timeline === option.id && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Timeline */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.customTimeline || false}
              onChange={(e) => handleInputChange('customTimeline', e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-text-primary">
              I have a specific deadline
            </span>
          </label>
          
          {formData.customTimeline && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Target Completion Date
              </label>
              <input
                type="date"
                value={formData.targetDate || ''}
                onChange={(e) => handleInputChange('targetDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full md:w-auto px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Priority Level */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Project Priority
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Help us understand the urgency and importance of this project for your business.
        </p>
        
        <div className="space-y-3">
          {priorityLevels.map((priority) => (
            <label
              key={priority.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.priority === priority.id
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-300'
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={priority.id}
                checked={formData.priority === priority.id}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="text-primary focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className={`font-medium ${priority.color}`}>
                  {priority.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {priority.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Requirements */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Additional Requirements
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Special Requirements or Constraints
            </label>
            <textarea
              value={formData.specialRequirements || ''}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              placeholder="Any specific requirements, constraints, or considerations we should know about..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ongoingSupport || false}
                onChange={(e) => handleInputChange('ongoingSupport', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">
                I need ongoing support and maintenance
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.training || false}
                onChange={(e) => handleInputChange('training', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">
                I need training on the final product
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTimelineForm;