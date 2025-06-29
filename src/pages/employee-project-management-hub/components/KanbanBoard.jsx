import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KanbanBoard = ({ projects, onProjectMove, onTaskAdd, onTaskUpdate }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const columns = [
    { id: 'planning', title: 'Planning', color: 'bg-accent-50 border-accent-200', icon: 'FileText' },
    { id: 'development', title: 'Development', color: 'bg-warning-50 border-warning-200', icon: 'Code' },
    { id: 'review', title: 'Review', color: 'bg-primary-50 border-primary-200', icon: 'Eye' },
    { id: 'delivery', title: 'Delivery', color: 'bg-success-50 border-success-200', icon: 'Truck' }
  ];

  const getProjectsByStatus = (status) => {
    return projects.filter(project => project.status === status);
  };

  const handleDragStart = (e, project) => {
    setDraggedItem(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedItem && draggedItem.status !== newStatus) {
      onProjectMove(draggedItem.id, newStatus);
    }
    setDraggedItem(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      'planning': 'text-accent-700',
      'development': 'text-warning-700',
      'review': 'text-primary-700',
      'delivery': 'text-success-700'
    };
    return colors[status] || 'text-secondary-700';
  };

  const getPriorityDot = (priority) => {
    const colors = {
      'high': 'bg-error-500',
      'medium': 'bg-warning-500',
      'low': 'bg-success-500'
    };
    return colors[priority] || 'bg-secondary-500';
  };

  return (
    <div className="h-full bg-background">
      <div className="flex space-x-4 h-full overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnProjects = getProjectsByStatus(column.id);
          
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className={`p-4 rounded-t-lg border-t border-l border-r ${column.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={column.icon} size={18} className={getStatusColor(column.id)} />
                    <h3 className="font-semibold text-text-primary">{column.title}</h3>
                    <span className={`text-sm px-2 py-0.5 rounded-full bg-surface ${getStatusColor(column.id)}`}>
                      {columnProjects.length}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Plus"
                    onClick={() => onTaskAdd(column.id)}
                  />
                </div>
              </div>

              {/* Column Content */}
              <div className={`border-l border-r border-b rounded-b-lg ${column.color} min-h-[600px] p-2 space-y-3`}>
                {columnProjects.map((project) => (
                  <div
                    key={project.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, project)}
                    className="bg-surface border border-border rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-150"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary text-sm mb-1">{project.title}</h4>
                        <p className="text-xs text-text-secondary">{project.clientName}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getPriorityDot(project.priority)}`}></div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-secondary">Progress</span>
                        <span className="text-xs font-medium text-text-primary">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary-100 rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="mb-3">
                      <div className="flex items-center space-x-1 mb-2">
                        <Icon name="CheckSquare" size={12} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          {project.completedTasks}/{project.totalTasks} tasks
                        </span>
                      </div>
                      {project.recentTasks && project.recentTasks.slice(0, 2).map((task, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-success-500' : 'bg-secondary-300'}`}></div>
                          <span className={`text-xs ${task.completed ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">{project.timeLogged}h</span>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center justify-between">
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
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="MoreHorizontal"
                        onClick={() => onTaskUpdate(project)}
                      />
                    </div>
                  </div>
                ))}

                {/* Add New Card */}
                <button
                  onClick={() => onTaskAdd(column.id)}
                  className="w-full p-3 border-2 border-dashed border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary-300 transition-all duration-150 flex items-center justify-center space-x-2"
                >
                  <Icon name="Plus" size={16} />
                  <span className="text-sm">Add Project</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;