import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverviewCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary border-primary-200',
      success: 'bg-success-50 text-success-600 border-success-200',
      warning: 'bg-warning-50 text-warning-600 border-warning-200',
      error: 'bg-error-50 text-error-600 border-error-200',
      accent: 'bg-accent-50 text-accent-600 border-accent-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success-600';
    if (changeType === 'negative') return 'text-error-600';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-all duration-150">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
        <p className="text-sm text-text-secondary">{title}</p>
      </div>
    </div>
  );
};

export default MetricsOverviewCard;