import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ activities, onActivityClick, onLoadMore }) => {
  const [filter, setFilter] = useState('all');

  const defaultActivities = [
    {
      id: 1,
      type: 'project_update',
      title: 'Project status updated',
      description: 'E-commerce Platform moved to Review phase',
      user: 'Sarah Chen',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      project: 'E-commerce Platform',
      priority: 'medium',
      icon: 'RefreshCw',
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'file_upload',
      title: 'New file uploaded',
      description: 'Design mockups v2.1 added to Mobile Banking App',
      user: 'Mike Rodriguez',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      project: 'Mobile Banking App',
      priority: 'low',
      icon: 'Upload',
      color: 'text-accent-600'
    },
    {
      id: 3,
      type: 'deadline_alert',
      title: 'Deadline approaching',
      description: 'AI Chatbot System due in 2 days',
      user: 'System',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      project: 'AI Chatbot System',
      priority: 'high',
      icon: 'AlertTriangle',
      color: 'text-warning-600'
    },
    {
      id: 4,
      type: 'task_completed',
      title: 'Task completed',
      description: 'Frontend integration testing finished',
      user: 'Emily Johnson',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      project: 'IoT Dashboard',
      priority: 'medium',
      icon: 'CheckCircle',
      color: 'text-success-600'
    },
    {
      id: 5,
      type: 'client_message',
      title: 'Client message received',
      description: 'New feedback on tanning salon website design',
      user: 'David Kim',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      project: 'Tanning Salon Website',
      priority: 'medium',
      icon: 'MessageSquare',
      color: 'text-secondary-600'
    },
    {
      id: 6,
      type: 'time_logged',
      title: 'Time logged',
      description: '3.5 hours of development work recorded',
      user: 'Lisa Wang',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      project: 'E-commerce Platform',
      priority: 'low',
      icon: 'Clock',
      color: 'text-accent-600'
    },
    {
      id: 7,
      type: 'project_created',
      title: 'New project assigned',
      description: 'Smart Home Automation System project started',
      user: 'Alex Thompson',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      project: 'Smart Home Automation',
      priority: 'high',
      icon: 'Plus',
      color: 'text-primary'
    },
    {
      id: 8,
      type: 'milestone_reached',
      title: 'Milestone achieved',
      description: 'Beta testing phase completed successfully',
      user: 'Sarah Chen',
      timestamp: new Date(Date.now() - 18000000).toISOString(),
      project: 'Mobile Banking App',
      priority: 'high',
      icon: 'Award',
      color: 'text-success-600'
    }
  ];

  const currentActivities = activities || defaultActivities;

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: 'Activity' },
    { value: 'project_update', label: 'Project Updates', icon: 'RefreshCw' },
    { value: 'deadline_alert', label: 'Deadlines', icon: 'AlertTriangle' },
    { value: 'task_completed', label: 'Completed Tasks', icon: 'CheckCircle' },
    { value: 'client_message', label: 'Client Messages', icon: 'MessageSquare' }
  ];

  const filteredActivities = filter === 'all' 
    ? currentActivities 
    : currentActivities.filter(activity => activity.type === filter);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'border-l-error-500',
      'medium': 'border-l-warning-500',
      'low': 'border-l-success-500'
    };
    return colors[priority] || 'border-l-secondary-300';
  };

  const handleActivityClick = (activity) => {
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="font-semibold text-text-primary">Recent Activity</h3>
          </div>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                filter === option.value
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`p-4 cursor-pointer hover:bg-muted transition-colors duration-150 border-l-4 ${getPriorityColor(activity.priority)}`}
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                    <Icon name={activity.icon} size={16} className={activity.color} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-text-primary text-sm">
                        {activity.title}
                      </p>
                      <span className="text-xs text-text-secondary flex-shrink-0">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mt-1">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-text-secondary">
                          by {activity.user}
                        </span>
                        {activity.project && (
                          <>
                            <span className="text-xs text-text-muted">•</span>
                            <span className="text-xs text-primary font-medium">
                              {activity.project}
                            </span>
                          </>
                        )}
                      </div>
                      
                      {activity.priority === 'high' && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Flag" size={12} className="text-error-600" />
                          <span className="text-xs text-error-600 font-medium">High</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Arrow */}
                  <div className="flex-shrink-0">
                    <Icon name="ChevronRight" size={16} className="text-text-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Inbox" size={48} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary">No activities found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredActivities.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            fullWidth
            onClick={onLoadMore}
          >
            Load More Activities
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;