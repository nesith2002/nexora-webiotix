import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    const icons = {
      'project-update': 'RefreshCw',
      'message': 'MessageCircle',
      'milestone': 'Flag',
      'deadline': 'Clock',
      'file-upload': 'Upload',
      'payment': 'CreditCard',
      'team-update': 'Users'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning-600';
    
    const colors = {
      'project-update': 'text-primary',
      'message': 'text-accent',
      'milestone': 'text-success',
      'deadline': 'text-warning-600',
      'file-upload': 'text-secondary',
      'payment': 'text-success',
      'team-update': 'text-primary'
    };
    return colors[type] || 'text-text-secondary';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'important') return notification.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-error text-error-foreground text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="CheckCheck"
              onClick={onMarkAllAsRead}
              disabled={unreadCount === 0}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mt-3">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'important', label: 'Important', count: notifications.filter(n => n.priority === 'high').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-150 ${
                filter === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                filter === tab.key
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-secondary-100 text-secondary-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-48'} overflow-y-auto`}>
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications.slice(0, isExpanded ? undefined : 3).map((notification, index) => (
              <div
                key={index}
                className={`p-4 hover:bg-muted transition-colors duration-150 cursor-pointer ${
                  !notification.isRead ? 'bg-primary-50' : ''
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    !notification.isRead ? 'bg-primary-100' : 'bg-secondary-100'
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={16} 
                      className={getNotificationColor(notification.type, notification.priority)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${!notification.isRead ? 'font-semibold text-text-primary' : 'text-text-primary'}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        {notification.projectName && (
                          <p className="text-xs text-accent mt-1">
                            Project: {notification.projectName}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-xs text-text-muted whitespace-nowrap">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons for specific notification types */}
                    {notification.actionRequired && (
                      <div className="flex space-x-2 mt-2">
                        <Button
                          variant="primary"
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle action
                          }}
                        >
                          {notification.actionText || 'View'}
                        </Button>
                        {notification.secondaryAction && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle secondary action
                            }}
                          >
                            {notification.secondaryActionText}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isExpanded && filteredNotifications.length > 3 && (
        <div className="p-3 border-t border-border text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-primary"
          >
            View {filteredNotifications.length - 3} more notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;