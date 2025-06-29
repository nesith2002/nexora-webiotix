import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealthMonitor = () => {
  const [systemData, setSystemData] = useState({});
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const initialSystemData = {
    server: {
      status: 'healthy',
      cpu: 45,
      memory: 68,
      disk: 32,
      uptime: '15d 8h 23m',
      lastCheck: new Date()
    },
    database: {
      status: 'healthy',
      connections: 23,
      maxConnections: 100,
      queryTime: 1.2,
      size: '2.4 GB',
      lastBackup: new Date(Date.now() - 3600000)
    },
    api: {
      status: 'healthy',
      responseTime: 145,
      requestsPerMin: 342,
      errorRate: 0.02,
      endpoints: 24
    },
    integrations: {
      payment: { status: 'healthy', name: 'Stripe API' },
      email: { status: 'healthy', name: 'SendGrid' },
      storage: { status: 'warning', name: 'AWS S3' },
      analytics: { status: 'healthy', name: 'Google Analytics' }
    }
  };

  useEffect(() => {
    setSystemData(initialSystemData);
  }, []);

  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      setSystemData(prev => ({
        ...prev,
        server: {
          ...prev.server,
          cpu: Math.max(20, Math.min(80, prev.server.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(30, Math.min(90, prev.server.memory + (Math.random() - 0.5) * 8)),
          lastCheck: new Date()
        },
        api: {
          ...prev.api,
          responseTime: Math.max(50, Math.min(300, prev.api.responseTime + (Math.random() - 0.5) * 20)),
          requestsPerMin: Math.max(200, Math.min(500, prev.api.requestsPerMin + (Math.random() - 0.5) * 50))
        }
      }));
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isAutoRefresh, refreshInterval]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success-600';
      case 'warning': return 'text-warning-600';
      case 'error': return 'text-error-600';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy': return 'bg-success-50 border-success-200';
      case 'warning': return 'bg-warning-50 border-warning-200';
      case 'error': return 'bg-error-50 border-error-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 80) return 'bg-error-500';
    if (percentage >= 60) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const formatUptime = (uptime) => {
    return uptime;
  };

  const formatLastCheck = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">System Health Monitor</h3>
          <p className="text-sm text-text-secondary">Real-time infrastructure monitoring</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary">Auto-refresh:</span>
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`w-8 h-4 rounded-full transition-colors duration-200 ${
                isAutoRefresh ? 'bg-primary' : 'bg-secondary-300'
              }`}
            >
              <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                isAutoRefresh ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Metrics */}
        <div className={`border rounded-lg p-4 ${getStatusBg(systemData.server?.status)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Server" size={20} className="text-text-primary" />
              <h4 className="font-medium text-text-primary">Server Performance</h4>
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getStatusIcon(systemData.server?.status)} 
                size={16} 
                className={getStatusColor(systemData.server?.status)}
              />
              <span className={`text-xs font-medium ${getStatusColor(systemData.server?.status)}`}>
                {systemData.server?.status?.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">CPU Usage</span>
                <span className="font-medium">{systemData.server?.cpu}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemData.server?.cpu)}`}
                  style={{ width: `${systemData.server?.cpu}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Memory Usage</span>
                <span className="font-medium">{systemData.server?.memory}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemData.server?.memory)}`}
                  style={{ width: `${systemData.server?.memory}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Disk Usage</span>
                <span className="font-medium">{systemData.server?.disk}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemData.server?.disk)}`}
                  style={{ width: `${systemData.server?.disk}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-text-secondary">Uptime</span>
              <span className="font-medium">{formatUptime(systemData.server?.uptime)}</span>
            </div>
          </div>
        </div>

        {/* Database Metrics */}
        <div className={`border rounded-lg p-4 ${getStatusBg(systemData.database?.status)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={20} className="text-text-primary" />
              <h4 className="font-medium text-text-primary">Database Health</h4>
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getStatusIcon(systemData.database?.status)} 
                size={16} 
                className={getStatusColor(systemData.database?.status)}
              />
              <span className={`text-xs font-medium ${getStatusColor(systemData.database?.status)}`}>
                {systemData.database?.status?.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Active Connections</span>
              <span className="font-medium">
                {systemData.database?.connections}/{systemData.database?.maxConnections}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Avg Query Time</span>
              <span className="font-medium">{systemData.database?.queryTime}ms</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Database Size</span>
              <span className="font-medium">{systemData.database?.size}</span>
            </div>
            
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-text-secondary">Last Backup</span>
              <span className="font-medium">{formatLastCheck(systemData.database?.lastBackup)}</span>
            </div>
          </div>
        </div>

        {/* API Performance */}
        <div className={`border rounded-lg p-4 ${getStatusBg(systemData.api?.status)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} className="text-text-primary" />
              <h4 className="font-medium text-text-primary">API Performance</h4>
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getStatusIcon(systemData.api?.status)} 
                size={16} 
                className={getStatusColor(systemData.api?.status)}
              />
              <span className={`text-xs font-medium ${getStatusColor(systemData.api?.status)}`}>
                {systemData.api?.status?.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Response Time</span>
              <span className="font-medium">{systemData.api?.responseTime}ms</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Requests/Min</span>
              <span className="font-medium">{systemData.api?.requestsPerMin}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Error Rate</span>
              <span className="font-medium">{(systemData.api?.errorRate * 100).toFixed(2)}%</span>
            </div>
            
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-text-secondary">Active Endpoints</span>
              <span className="font-medium">{systemData.api?.endpoints}</span>
            </div>
          </div>
        </div>

        {/* Integrations Status */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Link" size={20} className="text-text-primary" />
            <h4 className="font-medium text-text-primary">External Integrations</h4>
          </div>
          
          <div className="space-y-3">
            {Object.entries(systemData.integrations || {}).map(([key, integration]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{integration.name}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getStatusIcon(integration.status)} 
                    size={14} 
                    className={getStatusColor(integration.status)}
                  />
                  <span className={`text-xs font-medium ${getStatusColor(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-xs text-text-muted">
          Last updated: {formatLastCheck(systemData.server?.lastCheck)} • 
          Next refresh in {refreshInterval}s
        </p>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;