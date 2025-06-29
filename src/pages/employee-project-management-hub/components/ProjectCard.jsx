import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onSelect, isSelected, onStatusUpdate, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      'planning': 'bg-accent-100 text-accent-700 border-accent-200',
      'development': 'bg-warning-100 text-warning-700 border-warning-200',
      'review': 'bg-primary-100 text-primary-700 border-primary-200',
      'delivery': 'bg-success-100 text-success-700 border-success-200',
      'completed': 'bg-secondary-100 text-secondary-700 border-secondary-200',
      'on-hold': 'bg-error-100 text-error-700 border-error-200'
    };
    return colors[status] || 'bg-secondary-100 text-secondary-700 border-secondary-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-error-600',
      'medium': 'text-warning-600',
      'low': 'text-success-600'
    };
    return colors[priority] || 'text-secondary-600';
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

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(project.deadline);
  const isOverdue = daysRemaining < 0;
  const isUrgent = daysRemaining <= 3 && daysRemaining >= 0;

  return (
    <div
      className={`bg-surface border rounded-lg p-4 cursor-pointer transition-all duration-150 hover:shadow-md ${
        isSelected ? 'border-primary-300 bg-primary-50' : 'border-border hover:border-primary-200'
      }`}
      onClick={() => onSelect(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name={getServiceIcon(project.serviceType)} size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary text-sm">{project.title}</h3>
            <p className="text-xs text-text-secondary">{project.clientName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name="Flag" 
            size={14} 
            className={getPriorityColor(project.priority)} 
          />
          <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Status and Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ').toUpperCase()}
          </span>
          <span className="text-xs text-text-secondary">{project.progress}% Complete</span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-1.5">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Deadline */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} className="text-text-secondary" />
          <span className="text-xs text-text-secondary">Due: {formatDate(project.deadline)}</span>
        </div>
        {isOverdue && (
          <span className="text-xs text-error-600 font-medium">
            {Math.abs(daysRemaining)} days overdue
          </span>
        )}
        {isUrgent && !isOverdue && (
          <span className="text-xs text-warning-600 font-medium">
            {daysRemaining} days left
          </span>
        )}
      </div>

      {/* Team Members */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} className="text-text-secondary" />
          <span className="text-xs text-text-secondary">Team:</span>
        </div>
        <div className="flex -space-x-1">
          {project.teamMembers.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="w-6 h-6 bg-primary-100 rounded-full border-2 border-surface flex items-center justify-center"
              title={member.name}
            >
              <span className="text-xs font-medium text-primary">
                {member.name.charAt(0)}
              </span>
            </div>
          ))}
          {project.teamMembers.length > 3 && (
            <div className="w-6 h-6 bg-secondary-100 rounded-full border-2 border-surface flex items-center justify-center">
              <span className="text-xs font-medium text-secondary-600">
                +{project.teamMembers.length - 3}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="xs"
          iconName="Eye"
          iconPosition="left"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(project);
          }}
          className="flex-1"
        >
          View
        </Button>
        <Button
          variant="primary"
          size="xs"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={(e) => {
            e.stopPropagation();
            onStatusUpdate(project);
          }}
          className="flex-1"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;