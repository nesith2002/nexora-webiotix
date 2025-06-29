import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectFilters = ({ 
  activeFilter, 
  onFilterChange, 
  viewMode, 
  onViewModeChange,
  searchQuery,
  onSearchChange 
}) => {
  const filters = [
    { key: 'all', label: 'All Projects', icon: 'Grid3X3', count: 12 },
    { key: 'active', label: 'Active', icon: 'Play', count: 8 },
    { key: 'review', label: 'In Review', icon: 'Eye', count: 2 },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle', count: 15 },
    { key: 'on-hold', label: 'On Hold', icon: 'Pause', count: 1 }
  ];

  const viewModes = [
    { key: 'cards', label: 'Cards', icon: 'Grid3X3' },
    { key: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { key: 'gantt', label: 'Gantt', icon: 'BarChart3' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Tabs - Mobile Scrollable */}
      <div className="mb-4">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                activeFilter === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={filter.icon} size={16} />
              <span>{filter.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeFilter === filter.key
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-secondary-100 text-secondary-600'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
          {viewModes.map((mode) => (
            <button
              key={mode.key}
              onClick={() => onViewModeChange(mode.key)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded text-sm font-medium transition-all duration-150 ${
                viewMode === mode.key
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={mode.icon} size={14} />
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            className="hidden sm:flex"
          >
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            className="hidden sm:flex"
          />
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => window.location.href = '/client-service-request-center'}
          >
            New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;