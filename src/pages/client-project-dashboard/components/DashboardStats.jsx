import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      change: stats.activeProjectsChange,
      icon: 'FolderOpen',
      color: 'primary',
      description: 'Currently in progress'
    },
    {
      title: 'Completed Projects',
      value: stats.completedProjects,
      change: stats.completedProjectsChange,
      icon: 'CheckCircle',
      color: 'success',
      description: 'Successfully delivered'
    },
    {
      title: 'Total Investment',
      value: `$${stats.totalInvestment.toLocaleString()}`,
      change: stats.investmentChange,
      icon: 'DollarSign',
      color: 'accent',
      description: 'Across all projects'
    },
    {
      title: 'Avg. Completion Time',
      value: `${stats.avgCompletionTime} days`,
      change: stats.completionTimeChange,
      icon: 'Clock',
      color: 'warning',
      description: 'Project delivery time'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary',
        border: 'border-primary-200'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success',
        border: 'border-success-200'
      },
      accent: {
        bg: 'bg-accent-50',
        icon: 'text-accent',
        border: 'border-accent-200'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning-600',
        border: 'border-warning-200'
      }
    };
    return colors[color] || colors.primary;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <div
            key={index}
            className={`bg-surface border ${colorClasses.border} rounded-lg p-4 hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                <Icon 
                  name={stat.icon} 
                  size={20} 
                  className={colorClasses.icon}
                />
              </div>
              {stat.change !== undefined && (
                <div className={`flex items-center space-x-1 ${getChangeColor(stat.change)}`}>
                  <Icon 
                    name={getChangeIcon(stat.change)} 
                    size={14}
                  />
                  <span className="text-xs font-medium">
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-text-primary">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-text-primary">
                {stat.title}
              </p>
              <p className="text-xs text-text-secondary">
                {stat.description}
              </p>
            </div>

            {/* Progress indicator for specific stats */}
            {stat.title === 'Active Projects' && stats.activeProjects > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>Capacity</span>
                  <span>{Math.min((stats.activeProjects / 10) * 100, 100)}%</span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${colorClasses.icon.replace('text-', 'bg-')}`}
                    style={{ width: `${Math.min((stats.activeProjects / 10) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;