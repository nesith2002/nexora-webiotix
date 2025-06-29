import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLive, setIsLive] = useState(true);

  const activityTypes = {
    project: { icon: 'FolderOpen', color: 'text-primary', bg: 'bg-primary-50' },
    client: { icon: 'Users', color: 'text-accent', bg: 'bg-accent-50' },
    payment: { icon: 'CreditCard', color: 'text-success-600', bg: 'bg-success-50' },
    system: { icon: 'Settings', color: 'text-warning-600', bg: 'bg-warning-50' },
    alert: { icon: 'AlertTriangle', color: 'text-error-600', bg: 'bg-error-50' }
  };

  const initialActivities = [
    {
      id: 1,
      type: 'project',
      title: 'New project started',
      description: 'E-commerce website for TechCorp Inc.',
      user: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 300000),
      priority: 'normal'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '$15,000 from Global Solutions Ltd.',
      user: 'System',
      timestamp: new Date(Date.now() - 600000),
      priority: 'high'
    },
    {
      id: 3,
      type: 'client',
      title: 'New client registration',
      description: 'InnovateTech registered for AI development services',
      user: 'Michael Chen',
      timestamp: new Date(Date.now() - 900000),
      priority: 'normal'
    },
    {
      id: 4,
      type: 'project',
      title: 'Project milestone completed',
      description: 'Mobile app UI/UX design phase finished',
      user: 'Alex Rodriguez',
      timestamp: new Date(Date.now() - 1200000),
      priority: 'normal'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Server performance alert',
      description: 'High CPU usage detected on production server',
      user: 'System Monitor',
      timestamp: new Date(Date.now() - 1500000),
      priority: 'critical'
    },
    {
      id: 6,
      type: 'system',
      title: 'Backup completed',
      description: 'Daily database backup finished successfully',
      user: 'System',
      timestamp: new Date(Date.now() - 1800000),
      priority: 'low'
    },
    {
      id: 7,
      type: 'client',
      title: 'Demo request submitted',
      description: 'StartupXYZ requested IoT robotics demonstration',
      user: 'Emma Wilson',
      timestamp: new Date(Date.now() - 2100000),
      priority: 'normal'
    },
    {
      id: 8,
      type: 'project',
      title: 'Code review completed',
      description: 'Backend API development review approved',
      user: 'David Kim',
      timestamp: new Date(Date.now() - 2400000),
      priority: 'normal'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Activities', icon: 'Activity' },
    { key: 'project', label: 'Projects', icon: 'FolderOpen' },
    { key: 'client', label: 'Clients', icon: 'Users' },
    { key: 'payment', label: 'Payments', icon: 'CreditCard' },
    { key: 'alert', label: 'Alerts', icon: 'AlertTriangle' }
  ];

  useEffect(() => {
    setActivities(initialActivities);
  }, []);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: ['project', 'client', 'payment', 'system'][Math.floor(Math.random() * 4)],
        title: 'New activity detected',
        description: 'Real-time activity simulation',
        user: 'System',
        timestamp: new Date(),
        priority: 'normal'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getFilteredActivities = () => {
    if (filter === 'all') return activities;
    return activities.filter(activity => activity.type === filter);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-error-500';
      case 'high': return 'border-l-warning-500';
      case 'normal': return 'border-l-primary';
      case 'low': return 'border-l-secondary-300';
      default: return 'border-l-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-text-primary">Real-Time Activity</h3>
            {isLive && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-success-600 font-medium">LIVE</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant={isLive ? "primary" : "outline"}
            size="sm"
            iconName={isLive ? "Pause" : "Play"}
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? 'Pause' : 'Resume'}
          </Button>
          
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 mb-6 overflow-x-auto">
        {filters.map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap ${
              filter === filterOption.key
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={filterOption.icon} size={14} />
            <span>{filterOption.label}</span>
          </button>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
        {getFilteredActivities().map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start space-x-3 p-3 bg-muted rounded-lg border-l-4 ${getPriorityColor(activity.priority)} hover:bg-muted/80 transition-colors duration-150`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activityTypes[activity.type].bg}`}>
              <Icon 
                name={activityTypes[activity.type].icon} 
                size={16} 
                className={activityTypes[activity.type].color}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-text-muted">by {activity.user}</span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs text-text-muted">{getTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  {activity.priority === 'critical' && (
                    <Icon name="AlertTriangle" size={14} className="text-error-500" />
                  )}
                  {activity.priority === 'high' && (
                    <Icon name="ArrowUp" size={14} className="text-warning-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Today's Activities</p>
            <p className="text-lg font-semibold text-text-primary">{activities.length}</p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Critical Alerts</p>
            <p className="text-lg font-semibold text-error-600">
              {activities.filter(a => a.priority === 'critical').length}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">New Projects</p>
            <p className="text-lg font-semibold text-primary">
              {activities.filter(a => a.type === 'project').length}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Payments</p>
            <p className="text-lg font-semibold text-success-600">
              {activities.filter(a => a.type === 'payment').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeActivityFeed;