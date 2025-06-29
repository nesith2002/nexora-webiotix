import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  const revenueData = [
    { month: 'Jan', revenue: 45000, projects: 12, clients: 8 },
    { month: 'Feb', revenue: 52000, projects: 15, clients: 11 },
    { month: 'Mar', revenue: 48000, projects: 13, clients: 9 },
    { month: 'Apr', revenue: 61000, projects: 18, clients: 14 },
    { month: 'May', revenue: 55000, projects: 16, clients: 12 },
    { month: 'Jun', revenue: 67000, projects: 20, clients: 16 },
    { month: 'Jul', revenue: 72000, projects: 22, clients: 18 },
    { month: 'Aug', revenue: 68000, projects: 19, clients: 15 },
    { month: 'Sep', revenue: 75000, projects: 24, clients: 19 },
    { month: 'Oct', revenue: 82000, projects: 26, clients: 21 },
    { month: 'Nov', revenue: 78000, projects: 23, clients: 18 },
    { month: 'Dec', revenue: 85000, projects: 28, clients: 22 }
  ];

  const timeRanges = [
    { label: '3M', value: '3months' },
    { label: '6M', value: '6months' },
    { label: '1Y', value: '1year' },
    { label: 'All', value: 'all' }
  ];

  const getFilteredData = () => {
    switch (timeRange) {
      case '3months':
        return revenueData.slice(-3);
      case '6months':
        return revenueData.slice(-6);
      case '1year':
        return revenueData;
      default:
        return revenueData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary">
                {entry.name}: ${entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Revenue Analytics</h3>
          <p className="text-sm text-text-secondary">Monthly revenue trends and performance</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
                  timeRange === range.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-all duration-150 ${
                chartType === 'line' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-2 rounded-md transition-all duration-150 ${
                chartType === 'area' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="AreaChart" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={getFilteredData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={getFilteredData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-primary)" 
                fill="var(--color-primary-100)"
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-xs text-text-secondary">Avg. Monthly</p>
            <p className="text-sm font-semibold text-text-primary">$67,250</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary">Growth Rate</p>
            <p className="text-sm font-semibold text-success-600">+12.5%</p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="Download">
          Export
        </Button>
      </div>
    </div>
  );
};

export default RevenueChart;