import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionalHeatMap = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regionData = [
    { 
      region: 'North America', 
      country: 'United States',
      revenue: 450000, 
      clients: 85, 
      projects: 142,
      growth: 15.2,
      coordinates: { x: 25, y: 35 }
    },
    { 
      region: 'North America', 
      country: 'Canada',
      revenue: 125000, 
      clients: 23, 
      projects: 38,
      growth: 12.8,
      coordinates: { x: 22, y: 25 }
    },
    { 
      region: 'Europe', 
      country: 'United Kingdom',
      revenue: 280000, 
      clients: 52, 
      projects: 89,
      growth: 18.5,
      coordinates: { x: 50, y: 30 }
    },
    { 
      region: 'Europe', 
      country: 'Germany',
      revenue: 195000, 
      clients: 38, 
      projects: 65,
      growth: 14.2,
      coordinates: { x: 52, y: 32 }
    },
    { 
      region: 'Asia Pacific', 
      country: 'Australia',
      revenue: 165000, 
      clients: 31, 
      projects: 52,
      growth: 22.1,
      coordinates: { x: 78, y: 70 }
    },
    { 
      region: 'Asia Pacific', 
      country: 'India',
      revenue: 95000, 
      clients: 28, 
      projects: 47,
      growth: 28.5,
      coordinates: { x: 68, y: 45 }
    },
    { 
      region: 'Asia Pacific', 
      country: 'Singapore',
      revenue: 75000, 
      clients: 15, 
      projects: 25,
      growth: 19.8,
      coordinates: { x: 72, y: 52 }
    }
  ];

  const metrics = [
    { key: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { key: 'clients', label: 'Clients', icon: 'Users' },
    { key: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { key: 'growth', label: 'Growth %', icon: 'TrendingUp' }
  ];

  const getIntensity = (value, metric) => {
    const maxValues = {
      revenue: Math.max(...regionData.map(r => r.revenue)),
      clients: Math.max(...regionData.map(r => r.clients)),
      projects: Math.max(...regionData.map(r => r.projects)),
      growth: Math.max(...regionData.map(r => r.growth))
    };
    
    const intensity = (value / maxValues[metric]) * 100;
    
    if (intensity >= 80) return 'bg-primary text-white';
    if (intensity >= 60) return 'bg-primary-600 text-white';
    if (intensity >= 40) return 'bg-primary-400 text-white';
    if (intensity >= 20) return 'bg-primary-200 text-primary-800';
    return 'bg-primary-100 text-primary-700';
  };

  const getMarkerSize = (value, metric) => {
    const maxValues = {
      revenue: Math.max(...regionData.map(r => r.revenue)),
      clients: Math.max(...regionData.map(r => r.clients)),
      projects: Math.max(...regionData.map(r => r.projects)),
      growth: Math.max(...regionData.map(r => r.growth))
    };
    
    const intensity = (value / maxValues[metric]) * 100;
    
    if (intensity >= 80) return 'w-6 h-6';
    if (intensity >= 60) return 'w-5 h-5';
    if (intensity >= 40) return 'w-4 h-4';
    return 'w-3 h-3';
  };

  const formatValue = (value, metric) => {
    switch (metric) {
      case 'revenue':
        return `$${(value / 1000).toFixed(0)}k`;
      case 'growth':
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  const getRegionSummary = () => {
    const summary = regionData.reduce((acc, curr) => {
      if (!acc[curr.region]) {
        acc[curr.region] = { revenue: 0, clients: 0, projects: 0, countries: 0 };
      }
      acc[curr.region].revenue += curr.revenue;
      acc[curr.region].clients += curr.clients;
      acc[curr.region].projects += curr.projects;
      acc[curr.region].countries += 1;
      return acc;
    }, {});
    
    return Object.entries(summary).map(([region, data]) => ({
      region,
      ...data
    }));
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Regional Performance Map</h3>
          <p className="text-sm text-text-secondary">Global distribution of business metrics</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {metrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`flex items-center space-x-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-150 ${
                  selectedMetric === metric.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={metric.icon} size={14} />
                <span className="hidden sm:inline">{metric.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-muted rounded-lg p-4 h-80 overflow-hidden">
            {/* Simplified World Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg">
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 60">
                {/* Simplified continent shapes */}
                <path d="M10,20 Q15,15 25,18 Q35,22 30,35 Q20,40 10,35 Z" fill="var(--color-text-muted)" />
                <path d="M45,15 Q55,12 65,20 Q70,30 60,35 Q50,32 45,25 Z" fill="var(--color-text-muted)" />
                <path d="M70,35 Q80,32 85,45 Q82,55 75,50 Q70,45 70,35 Z" fill="var(--color-text-muted)" />
              </svg>
            </div>
            
            {/* Data Points */}
            {regionData.map((region, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                  getMarkerSize(region[selectedMetric], selectedMetric)
                } ${getIntensity(region[selectedMetric], selectedMetric)}`}
                style={{
                  left: `${region.coordinates.x}%`,
                  top: `${region.coordinates.y}%`
                }}
                onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
                title={`${region.country}: ${formatValue(region[selectedMetric], selectedMetric)}`}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={12} />
                </div>
              </div>
            ))}
            
            {/* Selected Region Details */}
            {selectedRegion !== null && (
              <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-lg p-3 shadow-lg max-w-xs">
                <h4 className="font-medium text-text-primary mb-2">
                  {regionData[selectedRegion].country}
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Revenue:</span>
                    <span className="font-medium">${regionData[selectedRegion].revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Clients:</span>
                    <span className="font-medium">{regionData[selectedRegion].clients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Projects:</span>
                    <span className="font-medium">{regionData[selectedRegion].projects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Growth:</span>
                    <span className="font-medium text-success-600">+{regionData[selectedRegion].growth}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Regional Summary */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Regional Summary</h4>
          {getRegionSummary().map((region, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <h5 className="font-medium text-text-primary mb-3">{region.region}</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Countries:</span>
                  <span className="font-medium">{region.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Revenue:</span>
                  <span className="font-medium">${region.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Clients:</span>
                  <span className="font-medium">{region.clients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Projects:</span>
                  <span className="font-medium">{region.projects}</span>
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" size="sm" iconName="Download" fullWidth>
            Export Regional Data
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">Intensity Scale:</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary-100 rounded"></div>
              <span className="text-xs text-text-secondary">Low</span>
              <div className="w-4 h-4 bg-primary-400 rounded"></div>
              <span className="text-xs text-text-secondary">Medium</span>
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span className="text-xs text-text-secondary">High</span>
            </div>
          </div>
          
          <div className="text-sm text-text-secondary">
            Click markers for details
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalHeatMap;