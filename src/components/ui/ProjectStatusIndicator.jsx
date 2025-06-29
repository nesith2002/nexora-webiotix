import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ProjectStatusIndicator = ({ 
  projectCount = 0, 
  urgentCount = 0, 
  completedToday = 0,
  userRole = 'client' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animate, setAnimate] = useState(false);

  const getStatusData = () => {
    switch (userRole) {
      case 'client':
        return {
          primary: { label: 'Active Projects', count: projectCount, icon: 'FolderOpen', color: 'text-primary' },
          secondary: { label: 'Pending Review', count: urgentCount, icon: 'Clock', color: 'text-warning-600' },
          tertiary: { label: 'Completed', count: completedToday, icon: 'CheckCircle', color: 'text-success-600' }
        };
      case 'employee':
        return {
          primary: { label: 'Assigned Tasks', count: projectCount, icon: 'Users', color: 'text-primary' },
          secondary: { label: 'Due Today', count: urgentCount, icon: 'AlertCircle', color: 'text-error-600' },
          tertiary: { label: 'Completed Today', count: completedToday, icon: 'CheckCircle', color: 'text-success-600' }
        };
      case 'admin':
        return {
          primary: { label: 'Total Projects', count: projectCount, icon: 'BarChart3', color: 'text-primary' },
          secondary: { label: 'Urgent Issues', count: urgentCount, icon: 'AlertTriangle', color: 'text-error-600' },
          tertiary: { label: 'Delivered Today', count: completedToday, icon: 'TrendingUp', color: 'text-success-600' }
        };
      default:
        return {
          primary: { label: 'Projects', count: projectCount, icon: 'FolderOpen', color: 'text-primary' },
          secondary: { label: 'Updates', count: urgentCount, icon: 'Bell', color: 'text-warning-600' },
          tertiary: { label: 'Completed', count: completedToday, icon: 'CheckCircle', color: 'text-success-600' }
        };
    }
  };

  const statusData = getStatusData();
  const totalNotifications = urgentCount;
  const hasNotifications = totalNotifications > 0;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (hasNotifications) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [urgentCount, hasNotifications]);

  return (
    <div className="relative">
      {/* Desktop Version */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Primary Status */}
        <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-lg border border-primary-200">
          <Icon name={statusData.primary.icon} size={16} className={statusData.primary.color} />
          <span className="text-sm font-medium text-text-primary">{statusData.primary.count}</span>
          <span className="text-xs text-text-secondary">{statusData.primary.label}</span>
        </div>

        {/* Notification Badge */}
        {hasNotifications && (
          <button
            onClick={toggleExpanded}
            className={`relative flex items-center space-x-2 px-3 py-2 bg-warning-50 rounded-lg border border-warning-200 hover:bg-warning-100 transition-all duration-150 ${
              animate ? 'animate-bounce-gentle' : ''
            }`}
          >
            <Icon name={statusData.secondary.icon} size={16} className={statusData.secondary.color} />
            <span className="text-sm font-medium text-warning-700">{urgentCount}</span>
            <span className="text-xs text-warning-600">{statusData.secondary.label}</span>
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} className="text-warning-600" />
          </button>
        )}

        {/* Success Indicator */}
        {completedToday > 0 && (
          <div className="flex items-center space-x-2 px-3 py-2 bg-success-50 rounded-lg border border-success-200">
            <Icon name={statusData.tertiary.icon} size={16} className={statusData.tertiary.color} />
            <span className="text-sm font-medium text-success-700">{completedToday}</span>
            <span className="text-xs text-success-600">{statusData.tertiary.label}</span>
          </div>
        )}
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        <button
          onClick={toggleExpanded}
          className={`flex items-center space-x-2 px-3 py-2 bg-surface rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-150 ${
            animate ? 'animate-bounce-gentle' : ''
          }`}
        >
          <Icon name="Activity" size={16} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">{projectCount}</span>
          {hasNotifications && (
            <span className="w-2 h-2 bg-error rounded-full"></span>
          )}
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} className="text-text-secondary" />
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-surface rounded-lg border border-border shadow-lg z-1010 animate-slide-down">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Project Status</h3>
              <button
                onClick={toggleExpanded}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {/* Primary Status Detail */}
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name={statusData.primary.icon} size={18} className={statusData.primary.color} />
                  <span className="text-sm font-medium text-text-primary">{statusData.primary.label}</span>
                </div>
                <span className="text-lg font-semibold text-primary">{statusData.primary.count}</span>
              </div>

              {/* Secondary Status Detail */}
              {urgentCount > 0 && (
                <div className="flex items-center justify-between p-3 bg-warning-50 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name={statusData.secondary.icon} size={18} className={statusData.secondary.color} />
                    <span className="text-sm font-medium text-text-primary">{statusData.secondary.label}</span>
                  </div>
                  <span className="text-lg font-semibold text-warning-600">{urgentCount}</span>
                </div>
              )}

              {/* Tertiary Status Detail */}
              {completedToday > 0 && (
                <div className="flex items-center justify-between p-3 bg-success-50 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name={statusData.tertiary.icon} size={18} className={statusData.tertiary.color} />
                    <span className="text-sm font-medium text-text-primary">{statusData.tertiary.label}</span>
                  </div>
                  <span className="text-lg font-semibold text-success-600">{completedToday}</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-border">
              <button
                onClick={() => window.location.href = userRole === 'client' ? '/client-project-dashboard' : '/employee-project-management-hub'}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-700 transition-colors duration-150"
              >
                <Icon name="ArrowRight" size={16} />
                <span className="text-sm font-medium">View Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectStatusIndicator;