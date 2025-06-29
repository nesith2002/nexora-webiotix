import React from 'react';
import Icon from '../../../components/AppIcon';

const ClientConversionFunnel = () => {
  const funnelData = [
    { stage: 'Website Visitors', count: 12450, percentage: 100, color: 'bg-primary', icon: 'Users' },
    { stage: 'Service Inquiries', count: 3680, percentage: 29.6, color: 'bg-accent', icon: 'MessageSquare' },
    { stage: 'Quote Requests', count: 1840, percentage: 14.8, color: 'bg-success-500', icon: 'FileText' },
    { stage: 'Proposals Sent', count: 920, percentage: 7.4, color: 'bg-warning-500', icon: 'Send' },
    { stage: 'Contracts Signed', count: 368, percentage: 3.0, color: 'bg-error-500', icon: 'CheckCircle' }
  ];

  const getBarWidth = (percentage) => {
    return Math.max(percentage, 5); // Minimum 5% width for visibility
  };

  const getConversionRate = (current, previous) => {
    if (!previous) return null;
    return ((current / previous) * 100).toFixed(1);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Client Conversion Funnel</h3>
          <p className="text-sm text-text-secondary">Lead progression through sales pipeline</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-xs text-text-secondary">Overall Conversion</p>
            <p className="text-sm font-semibold text-success-600">3.0%</p>
          </div>
          <Icon name="TrendingUp" size={20} className="text-success-600" />
        </div>
      </div>

      <div className="space-y-4">
        {funnelData.map((stage, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${stage.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={stage.icon} size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{stage.stage}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">
                      {stage.count.toLocaleString()} leads
                    </span>
                    {index > 0 && (
                      <span className="text-xs text-success-600">
                        {getConversionRate(stage.count, funnelData[index - 1].count)}% conversion
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-text-primary">{stage.percentage}%</p>
                <p className="text-xs text-text-secondary">of total</p>
              </div>
            </div>
            
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${stage.color} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${getBarWidth(stage.percentage)}%` }}
              />
            </div>
            
            {index < funnelData.length - 1 && (
              <div className="flex justify-center mt-2">
                <Icon name="ChevronDown" size={16} className="text-text-muted" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Avg. Lead Quality</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="flex space-x-0.5">
                {[1, 2, 3, 4].map((star) => (
                  <Icon key={star} name="Star" size={12} className="text-warning-500 fill-current" />
                ))}
                <Icon name="Star" size={12} className="text-text-muted" />
              </div>
              <span className="text-xs font-medium text-text-primary">4.2</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Avg. Deal Size</p>
            <p className="text-sm font-semibold text-text-primary">$18,500</p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Sales Cycle</p>
            <p className="text-sm font-semibold text-text-primary">21 days</p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Win Rate</p>
            <p className="text-sm font-semibold text-success-600">40%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientConversionFunnel;