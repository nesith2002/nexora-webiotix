import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const TeamWorkloadChart = ({ teamData, onMemberSelect }) => {
  const workloadData = [
    { name: 'Sarah Chen', hours: 38, capacity: 40, projects: 4, efficiency: 95 },
    { name: 'Mike Rodriguez', hours: 42, capacity: 40, projects: 5, efficiency: 88 },
    { name: 'Emily Johnson', hours: 35, capacity: 40, projects: 3, efficiency: 92 },
    { name: 'David Kim', hours: 40, capacity: 40, projects: 4, efficiency: 90 },
    { name: 'Lisa Wang', hours: 28, capacity: 40, projects: 2, efficiency: 97 },
    { name: 'Alex Thompson', hours: 45, capacity: 40, projects: 6, efficiency: 85 }
  ];

  const getWorkloadColor = (hours, capacity) => {
    const percentage = (hours / capacity) * 100;
    if (percentage > 100) return '#DC2626'; // Over capacity - red
    if (percentage > 90) return '#D97706'; // Near capacity - amber
    if (percentage > 70) return '#059669'; // Good utilization - green
    return '#0EA5E9'; // Under utilized - blue
  };

  const getWorkloadStatus = (hours, capacity) => {
    const percentage = (hours / capacity) * 100;
    if (percentage > 100) return 'Overloaded';
    if (percentage > 90) return 'At Capacity';
    if (percentage > 70) return 'Optimal';
    return 'Available';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            Hours: {data.hours}/{data.capacity}
          </p>
          <p className="text-sm text-text-secondary">
            Projects: {data.projects}
          </p>
          <p className="text-sm text-text-secondary">
            Efficiency: {data.efficiency}%
          </p>
          <p className={`text-sm font-medium ${
            data.hours > data.capacity ? 'text-error-600' : 
            data.hours > data.capacity * 0.9 ? 'text-warning-600' : 'text-success-600'
          }`}>
            Status: {getWorkloadStatus(data.hours, data.capacity)}
          </p>
        </div>
      );
    }
    return null;
  };

  const totalTeamHours = workloadData.reduce((sum, member) => sum + member.hours, 0);
  const totalCapacity = workloadData.reduce((sum, member) => sum + member.capacity, 0);
  const averageEfficiency = workloadData.reduce((sum, member) => sum + member.efficiency, 0) / workloadData.length;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Team Workload</h3>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-center">
            <p className="text-text-secondary">Utilization</p>
            <p className="font-semibold text-text-primary">
              {Math.round((totalTeamHours / totalCapacity) * 100)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary">Avg Efficiency</p>
            <p className="font-semibold text-text-primary">{Math.round(averageEfficiency)}%</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workloadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {workloadData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getWorkloadColor(entry.hours, entry.capacity)}
                />
              ))}
            </Bar>
            <Bar dataKey="capacity" fill="var(--color-border)" opacity={0.3} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workloadData.map((member, index) => {
          const utilizationPercentage = (member.hours / member.capacity) * 100;
          const statusColor = member.hours > member.capacity ? 'text-error-600' : 
                            member.hours > member.capacity * 0.9 ? 'text-warning-600' : 'text-success-600';
          
          return (
            <div
              key={index}
              className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-primary-50 transition-colors duration-150"
              onClick={() => onMemberSelect && onMemberSelect(member)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">{member.name}</p>
                    <p className={`text-xs ${statusColor}`}>
                      {getWorkloadStatus(member.hours, member.capacity)}
                    </p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Hours</span>
                  <span className="font-medium text-text-primary">
                    {member.hours}/{member.capacity}
                  </span>
                </div>
                
                <div className="w-full bg-secondary-100 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(utilizationPercentage, 100)}%`,
                      backgroundColor: getWorkloadColor(member.hours, member.capacity)
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Briefcase" size={12} className="text-text-secondary" />
                    <span className="text-text-secondary">{member.projects} projects</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={12} className="text-text-secondary" />
                    <span className="text-text-secondary">{member.efficiency}% efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-sky-500 rounded"></div>
          <span className="text-sm text-text-secondary">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-600 rounded"></div>
          <span className="text-sm text-text-secondary">Optimal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-600 rounded"></div>
          <span className="text-sm text-text-secondary">At Capacity</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded"></div>
          <span className="text-sm text-text-secondary">Overloaded</span>
        </div>
      </div>
    </div>
  );
};

export default TeamWorkloadChart;