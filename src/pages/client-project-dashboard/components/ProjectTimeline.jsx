import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTimeline = ({ projects, viewMode }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getProjectsForDate = (date) => {
    return projects.filter(project => {
      const deliverableDate = new Date(project.nextDeliverable);
      return deliverableDate.toDateString() === date.toDateString();
    });
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dayProjects = getProjectsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          className={`p-2 min-h-[80px] border border-border rounded-md ${
            isToday ? 'bg-primary-50 border-primary-200' : 'bg-surface hover:bg-muted'
          } transition-colors duration-150`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-primary' : 'text-text-primary'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayProjects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className="text-xs p-1 bg-accent-100 text-accent-700 rounded truncate"
                title={project.name}
              >
                {project.name}
              </div>
            ))}
            {dayProjects.length > 2 && (
              <div className="text-xs text-text-secondary">
                +{dayProjects.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderGanttView = () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    return (
      <div className="space-y-4">
        {/* Timeline Header */}
        <div className="flex items-center space-x-4 pb-2 border-b border-border">
          <div className="w-48 text-sm font-medium text-text-secondary">Project</div>
          <div className="flex-1 grid grid-cols-12 gap-1 text-xs text-text-secondary">
            {months.slice(selectedMonth, selectedMonth + 3).map((month, index) => (
              <div key={index} className="col-span-4 text-center">{month}</div>
            ))}
          </div>
        </div>

        {/* Project Rows */}
        {projects.slice(0, 8).map((project, index) => {
          const startDate = new Date(project.startDate);
          const endDate = new Date(project.nextDeliverable);
          const projectDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
          const progressWidth = (project.progress / 100) * 100;

          return (
            <div key={index} className="flex items-center space-x-4 py-2">
              <div className="w-48">
                <div className="text-sm font-medium text-text-primary truncate">
                  {project.name}
                </div>
                <div className="text-xs text-text-secondary">{project.teamMember}</div>
              </div>
              <div className="flex-1 relative">
                <div className="h-6 bg-secondary-100 rounded-md relative overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-md"
                    style={{ width: `${progressWidth}%` }}
                  />
                  <div className="absolute inset-0 flex items-center px-2">
                    <span className="text-xs font-medium text-text-primary">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderListView = () => {
    const sortedProjects = [...projects].sort((a, b) => 
      new Date(a.nextDeliverable) - new Date(b.nextDeliverable)
    );

    return (
      <div className="space-y-3">
        {sortedProjects.map((project, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 bg-surface border border-border rounded-md hover:shadow-sm transition-shadow duration-150">
            <div className="w-2 h-12 bg-primary rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-text-primary truncate">
                  {project.name}
                </h4>
                <span className="text-xs text-text-secondary">
                  {new Date(project.nextDeliverable).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-text-secondary">{project.currentPhase}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-16 bg-secondary-100 rounded-full h-1">
                  <div 
                    className="h-1 bg-primary rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">{project.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {viewMode === 'gantt' ? 'Project Timeline' : 
           viewMode === 'timeline' ? 'Calendar View' : 'Timeline List'}
        </h3>
        
        {viewMode === 'timeline' && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (selectedMonth === 0) {
                  setSelectedMonth(11);
                  setSelectedYear(selectedYear - 1);
                } else {
                  setSelectedMonth(selectedMonth - 1);
                }
              }}
              className="p-1 hover:bg-muted rounded"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <span className="text-sm font-medium text-text-primary min-w-[120px] text-center">
              {months[selectedMonth]} {selectedYear}
            </span>
            <button
              onClick={() => {
                if (selectedMonth === 11) {
                  setSelectedMonth(0);
                  setSelectedYear(selectedYear + 1);
                } else {
                  setSelectedMonth(selectedMonth + 1);
                }
              }}
              className="p-1 hover:bg-muted rounded"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {viewMode === 'timeline' && renderCalendarView()}
      {viewMode === 'gantt' && renderGanttView()}
      {viewMode === 'cards' && renderListView()}
    </div>
  );
};

export default ProjectTimeline;