import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, onDownloadFiles, onContactTeam }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'in-progress': 'bg-primary text-primary-foreground',
      'review': 'bg-warning-500 text-warning-foreground',
      'completed': 'bg-success text-success-foreground',
      'on-hold': 'bg-secondary text-secondary-foreground'
    };
    return colors[status] || 'bg-secondary text-secondary-foreground';
  };

  const getServiceIcon = (serviceType) => {
    const icons = {
      'web-development': 'Globe',
      'app-development': 'Smartphone',
      'ai-development': 'Brain',
      'iot-robotics': 'Cpu',
      'tanning': 'Sun'
    };
    return icons[serviceType] || 'Briefcase';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning-500';
    return 'bg-secondary';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon 
                name={getServiceIcon(project.serviceType)} 
                size={20} 
                className="text-primary" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-text-primary truncate">
                {project.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {project.serviceCategory}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Progress</span>
          <span className="text-sm text-text-secondary">{project.progress}%</span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Team & Timeline */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} className="text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">Project Manager</p>
              <p className="text-sm font-medium text-text-primary">{project.teamMember}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">Next Deliverable</p>
              <p className="text-sm font-medium text-text-primary">
                {formatDate(project.nextDeliverable)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border bg-muted">
          <div className="p-4 space-y-4">
            {/* Current Phase */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Current Phase</h4>
              <p className="text-sm text-text-secondary">{project.currentPhase}</p>
            </div>

            {/* Budget Info */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Budget</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  ${project.budgetSpent.toLocaleString()} / ${project.budgetTotal.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {Math.round((project.budgetSpent / project.budgetTotal) * 100)}% used
                </span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5 mt-1">
                <div 
                  className="h-1.5 rounded-full bg-accent"
                  style={{ width: `${Math.min((project.budgetSpent / project.budgetTotal) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Recent Activity</h4>
              <div className="space-y-2">
                {project.recentActivity.slice(0, 2).map((activity, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-primary">{activity.description}</p>
                      <p className="text-xs text-text-secondary">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(project.id)}
                className="flex-1"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => onDownloadFiles(project.id)}
                className="flex-1"
              >
                Download Files
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => onContactTeam(project.id)}
                className="flex-1"
              >
                Contact Team
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;