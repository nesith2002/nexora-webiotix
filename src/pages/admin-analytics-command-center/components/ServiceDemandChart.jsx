import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ServiceDemandChart = () => {
  const [viewType, setViewType] = useState('bar');

  const serviceData = [
    { service: 'Web Development', demand: 45, revenue: 280000, color: '#1E40AF' },
    { service: 'App Development', demand: 32, revenue: 195000, color: '#0EA5E9' },
    { service: 'AI Development', demand: 28, revenue: 168000, color: '#059669' },
    { service: 'IoT Robotics', demand: 18, revenue: 125000, color: '#D97706' },
    { service: 'Tanning Services', demand: 12, revenue: 45000, color: '#DC2626' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{label || data.service}</p>
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">
              Demand: {data.demand} projects
            </p>
            <p className="text-sm text-text-secondary">
              Revenue: ${data.revenue?.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Service Demand Analysis</h3>
          <p className="text-sm text-text-secondary">Project distribution across service categories</p>
        </div>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 mt-4 sm:mt-0">
          <button
            onClick={() => setViewType('bar')}
            className={`p-2 rounded-md transition-all duration-150 ${
              viewType === 'bar' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="BarChart3" size={16} />
          </button>
          <button
            onClick={() => setViewType('pie')}
            className={`p-2 rounded-md transition-all duration-150 ${
              viewType === 'pie' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="PieChart" size={16} />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'bar' ? (
            <BarChart data={serviceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="service" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="demand" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomPieLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="demand"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {serviceData.map((service, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: service.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-text-primary truncate">
                  {service.service}
                </p>
                <p className="text-xs text-text-secondary">
                  {service.demand} projects
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDemandChart;