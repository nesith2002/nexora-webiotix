import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AnalyticsFilters = ({ onFiltersChange, onExport }) => {
  const [filters, setFilters] = useState({
    dateRange: '30days',
    serviceType: 'all',
    region: 'all',
    clientType: 'all',
    projectStatus: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const dateRanges = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 3 months' },
    { value: '1year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const serviceTypes = [
    { value: 'all', label: 'All Services' },
    { value: 'web', label: 'Web Development' },
    { value: 'app', label: 'App Development' },
    { value: 'ai', label: 'AI Development' },
    { value: 'iot', label: 'IoT Robotics' },
    { value: 'tanning', label: 'Tanning Services' }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'other', label: 'Other' }
  ];

  const clientTypes = [
    { value: 'all', label: 'All Clients' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'startup', label: 'Startup' },
    { value: 'individual', label: 'Individual' },
    { value: 'non-profit', label: 'Non-Profit' }
  ];

  const projectStatuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleCustomDateChange = (key, value) => {
    const newCustomRange = { ...customDateRange, [key]: value };
    setCustomDateRange(newCustomRange);
    
    if (filters.dateRange === 'custom') {
      onFiltersChange?.({ ...filters, customDateRange: newCustomRange });
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '30days',
      serviceType: 'all',
      region: 'all',
      clientType: 'all',
      projectStatus: 'all'
    };
    setFilters(defaultFilters);
    setCustomDateRange({ startDate: '', endDate: '' });
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== '30days').length;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4 lg:mb-0">
          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="text-sm border border-border rounded-md px-3 py-1.5 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div className="flex items-center space-x-2">
            <Icon name="Grid3X3" size={16} className="text-text-secondary" />
            <select
              value={filters.serviceType}
              onChange={(e) => handleFilterChange('serviceType', e.target.value)}
              className="text-sm border border-border rounded-md px-3 py-1.5 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {serviceTypes.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-text-secondary" />
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="text-sm border border-border rounded-md px-3 py-1.5 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Advanced
            {getActiveFiltersCount() > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={resetFilters}
          >
            Reset
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Custom Date Range */}
            {filters.dateRange === 'custom' && (
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Custom Date Range
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="date"
                    value={customDateRange.startDate}
                    onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-text-secondary">to</span>
                  <Input
                    type="date"
                    value={customDateRange.endDate}
                    onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            )}

            {/* Client Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Client Type
              </label>
              <select
                value={filters.clientType}
                onChange={(e) => handleFilterChange('clientType', e.target.value)}
                className="w-full text-sm border border-border rounded-md px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {clientTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Status
              </label>
              <select
                value={filters.projectStatus}
                onChange={(e) => handleFilterChange('projectStatus', e.target.value)}
                className="w-full text-sm border border-border rounded-md px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {projectStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Filters Placeholder */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Revenue Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  className="flex-1"
                />
                <span className="text-text-secondary">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Applied Filters Summary */}
          {getActiveFiltersCount() > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Filter" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">Applied Filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (value === 'all' || (key === 'dateRange' && value === '30days')) return null;
                  
                  const getFilterLabel = () => {
                    switch (key) {
                      case 'dateRange':
                        return dateRanges.find(r => r.value === value)?.label;
                      case 'serviceType':
                        return serviceTypes.find(s => s.value === value)?.label;
                      case 'region':
                        return regions.find(r => r.value === value)?.label;
                      case 'clientType':
                        return clientTypes.find(c => c.value === value)?.label;
                      case 'projectStatus':
                        return projectStatuses.find(p => p.value === value)?.label;
                      default:
                        return value;
                    }
                  };

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md border border-primary-200"
                    >
                      <span>{getFilterLabel()}</span>
                      <button
                        onClick={() => handleFilterChange(key, key === 'dateRange' ? '30days' : 'all')}
                        className="hover:text-primary-900"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsFilters;