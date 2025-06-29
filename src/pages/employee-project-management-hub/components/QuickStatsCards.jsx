import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = ({ stats, onCardClick }) => {
  const defaultStats = {
    totalProjects: 24,
    activeProjects: 18,
    completedThisWeek: 6,
    overdueProjects: 3,
    totalHours: 156,
    teamMembers: 8,
    clientSatisfaction: 94,
    avgProjectDuration: 12
  };

  const currentStats = { ...defaultStats, ...stats };

  const cards = [
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: currentStats.activeProjects,
      subtitle: `${currentStats.totalProjects} total`,
      icon: 'FolderOpen',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      trend: { value: '+12%', isPositive: true }
    },
    {
      id: 'completed-week',
      title: 'Completed This Week',
      value: currentStats.completedThisWeek,
      subtitle: 'projects delivered',
      icon: 'CheckCircle',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      trend: { value: '+25%', isPositive: true }
    },
    {
      id: 'overdue-projects',
      title: 'Overdue Projects',
      value: currentStats.overdueProjects,
      subtitle: 'need attention',
      icon: 'AlertTriangle',
      color: 'text-error-600',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      trend: { value: '-8%', isPositive: true }
    },
    {
      id: 'total-hours',
      title: 'Hours This Week',
      value: currentStats.totalHours,
      subtitle: 'team hours logged',
      icon: 'Clock',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200',
      trend: { value: '+5%', isPositive: true }
    },
    {
      id: 'team-members',
      title: 'Team Members',
      value: currentStats.teamMembers,
      subtitle: 'active employees',
      icon: 'Users',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      trend: { value: '2 new', isPositive: true }
    },
    {
      id: 'client-satisfaction',
      title: 'Client Satisfaction',
      value: `${currentStats.clientSatisfaction}%`,
      subtitle: 'average rating',
      icon: 'Star',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      trend: { value: '+3%', isPositive: true }
    }
  ];

  const handleCardClick = (cardId) => {
    if (onCardClick) {
      onCardClick(cardId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${card.bgColor} ${card.borderColor} border rounded-lg p-4 cursor-pointer transition-all duration-150 hover:shadow-md hover:scale-105`}
          onClick={() => handleCardClick(card.id)}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${card.bgColor} rounded-lg flex items-center justify-center border ${card.borderColor}`}>
              <Icon name={card.icon} size={20} className={card.color} />
            </div>
            {card.trend && (
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                card.trend.isPositive ? 'text-success-600' : 'text-error-600'
              }`}>
                <Icon 
                  name={card.trend.isPositive ? "TrendingUp" : "TrendingDown"} 
                  size={12} 
                />
                <span>{card.trend.value}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">
              {card.value}
            </h3>
            <p className="text-sm font-medium text-text-primary mb-1">
              {card.title}
            </p>
            <p className="text-xs text-text-secondary">
              {card.subtitle}
            </p>
          </div>

          {/* Progress Indicator for specific cards */}
          {card.id === 'active-projects' && (
            <div className="mt-3">
              <div className="w-full bg-primary-200 rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStats.activeProjects / currentStats.totalProjects) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {card.id === 'client-satisfaction' && (
            <div className="mt-3">
              <div className="w-full bg-warning-200 rounded-full h-1.5">
                <div 
                  className="bg-warning-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${currentStats.clientSatisfaction}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Indicator */}
          <div className="flex items-center justify-end mt-3">
            <Icon name="ArrowRight" size={14} className={`${card.color} opacity-60`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;