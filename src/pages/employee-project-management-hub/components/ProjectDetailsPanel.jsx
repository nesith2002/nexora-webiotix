import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectDetailsPanel = ({ project, onClose, onUpdate, onFileUpload }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeEntry, setTimeEntry] = useState({ hours: '', description: '' });
  const [newComment, setNewComment] = useState('');

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'files', label: 'Files', icon: 'Folder' },
    { id: 'communication', label: 'Messages', icon: 'MessageSquare' },
    { id: 'time', label: 'Time Log', icon: 'Clock' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'planning': 'bg-accent-100 text-accent-700 border-accent-200',
      'development': 'bg-warning-100 text-warning-700 border-warning-200',
      'review': 'bg-primary-100 text-primary-700 border-primary-200',
      'delivery': 'bg-success-100 text-success-700 border-success-200',
      'completed': 'bg-secondary-100 text-secondary-700 border-secondary-200'
    };
    return colors[status] || 'bg-secondary-100 text-secondary-700 border-secondary-200';
  };

  const handleTimeSubmit = () => {
    if (timeEntry.hours && timeEntry.description) {
      onUpdate(project.id, 'timeLog', {
        hours: parseFloat(timeEntry.hours),
        description: timeEntry.description,
        date: new Date().toISOString(),
        employee: 'Current User'
      });
      setTimeEntry({ hours: '', description: '' });
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onUpdate(project.id, 'comment', {
        message: newComment,
        timestamp: new Date().toISOString(),
        author: 'Current User',
        type: 'internal'
      });
      setNewComment('');
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Project Info */}
      <div className="bg-muted rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-3">Project Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-text-secondary">Client</label>
            <p className="font-medium text-text-primary">{project.clientName}</p>
          </div>
          <div>
            <label className="text-sm text-text-secondary">Service Type</label>
            <p className="font-medium text-text-primary">{project.serviceType.replace('-', ' ')}</p>
          </div>
          <div>
            <label className="text-sm text-text-secondary">Start Date</label>
            <p className="font-medium text-text-primary">
              {new Date(project.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="text-sm text-text-secondary">Deadline</label>
            <p className="font-medium text-text-primary">
              {new Date(project.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Status and Progress */}
      <div className="bg-muted rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-3">Current Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
            <span className="text-sm text-text-secondary">{project.progress}% Complete</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-muted rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-3">Project Description</h3>
        <p className="text-text-secondary leading-relaxed">{project.description}</p>
      </div>
    </div>
  );

  const renderTasksTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary">Project Tasks</h3>
        <Button variant="primary" size="sm" iconName="Plus">Add Task</Button>
      </div>
      
      <div className="space-y-3">
        {project.tasks && project.tasks.map((task, index) => (
          <div key={index} className="bg-muted rounded-lg p-3 flex items-center space-x-3">
            <button className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              task.completed ? 'bg-success-500 border-success-500' : 'border-secondary-300'
            }`}>
              {task.completed && <Icon name="Check" size={12} color="white" />}
            </button>
            <div className="flex-1">
              <p className={`font-medium ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                {task.title}
              </p>
              <p className="text-sm text-text-secondary">{task.description}</p>
            </div>
            <div className="text-sm text-text-secondary">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFilesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary">Project Files</h3>
        <Button variant="primary" size="sm" iconName="Upload" onClick={onFileUpload}>
          Upload File
        </Button>
      </div>
      
      <div className="space-y-3">
        {project.files && project.files.map((file, index) => (
          <div key={index} className="bg-muted rounded-lg p-3 flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="File" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-primary">{file.name}</p>
              <p className="text-sm text-text-secondary">
                {file.size} • Uploaded {new Date(file.uploadDate).toLocaleDateString()}
              </p>
            </div>
            <Button variant="ghost" size="sm" iconName="Download" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderCommunicationTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary">Project Communication</h3>
      </div>
      
      {/* Add Comment */}
      <div className="bg-muted rounded-lg p-4">
        <Input
          type="text"
          placeholder="Add a comment or update..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3"
        />
        <Button variant="primary" size="sm" onClick={handleCommentSubmit}>
          Post Comment
        </Button>
      </div>

      {/* Messages */}
      <div className="space-y-3">
        {project.messages && project.messages.map((message, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {message.author.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-text-primary">{message.author}</span>
              </div>
              <span className="text-sm text-text-secondary">
                {new Date(message.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-text-secondary">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimeTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary">Time Tracking</h3>
        <div className="text-sm text-text-secondary">
          Total: {project.timeLogged || 0} hours
        </div>
      </div>
      
      {/* Add Time Entry */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3">Log Time</h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Input
            type="number"
            placeholder="Hours"
            value={timeEntry.hours}
            onChange={(e) => setTimeEntry({...timeEntry, hours: e.target.value})}
          />
          <Input
            type="text"
            placeholder="Description"
            value={timeEntry.description}
            onChange={(e) => setTimeEntry({...timeEntry, description: e.target.value})}
          />
        </div>
        <Button variant="primary" size="sm" onClick={handleTimeSubmit}>
          Log Time
        </Button>
      </div>

      {/* Time Entries */}
      <div className="space-y-3">
        {project.timeEntries && project.timeEntries.map((entry, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">{entry.description}</p>
                <p className="text-sm text-text-secondary">
                  {entry.employee} • {new Date(entry.date).toLocaleDateString()}
                </p>
              </div>
              <span className="font-semibold text-primary">{entry.hours}h</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1020 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">{project.title}</h2>
            <p className="text-text-secondary">{project.clientName}</p>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'tasks' && renderTasksTab()}
          {activeTab === 'files' && renderFilesTab()}
          {activeTab === 'communication' && renderCommunicationTab()}
          {activeTab === 'time' && renderTimeTab()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPanel;