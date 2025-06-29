import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedNavigation from '../../components/ui/AuthenticatedNavigation';
import ServiceNavigationBreadcrumbs from '../../components/ui/ServiceNavigationBreadcrumbs';
import ProjectStatusIndicator from '../../components/ui/ProjectStatusIndicator';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import MetricsOverviewCard from './components/MetricsOverviewCard';
import RevenueChart from './components/RevenueChart';
import ServiceDemandChart from './components/ServiceDemandChart';
import ClientConversionFunnel from './components/ClientConversionFunnel';
import RegionalHeatMap from './components/RegionalHeatMap';
import RealTimeActivityFeed from './components/RealTimeActivityFeed';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import AnalyticsFilters from './components/AnalyticsFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminAnalyticsCommandCenter = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const overviewMetrics = [
    {
      title: 'Total Revenue',
      value: '$847,250',
      change: '+15.2%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'primary'
    },
    {
      title: 'Active Projects',
      value: '142',
      change: '+8.5%',
      changeType: 'positive',
      icon: 'FolderOpen',
      color: 'accent'
    },
    {
      title: 'Total Clients',
      value: '89',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Avg Project Value',
      value: '$18,500',
      change: '+5.8%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'primary'
    },
    {
      title: 'Client Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      color: 'warning'
    }
  ];

  const timeframes = [
    { value: 'week', label: 'This Week', icon: 'Calendar' },
    { value: 'month', label: 'This Month', icon: 'Calendar' },
    { value: 'quarter', label: 'This Quarter', icon: 'Calendar' },
    { value: 'year', label: 'This Year', icon: 'Calendar' }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDashboardData({
        lastUpdated: new Date(),
        totalProjects: 142,
        urgentIssues: 3,
        completedToday: 8
      });
      
      setIsLoading(false);
    };

    loadDashboardData();
  }, [selectedTimeframe, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExportData = () => {
    console.log('Exporting analytics data...');
  };

  const handleSaveReport = () => {
    console.log('Saving custom report...');
  };

  const handleScheduleReport = () => {
    console.log('Scheduling automated report...');
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/', icon: 'Home', isActive: false },
    { label: 'Admin Dashboard', path: '/admin-analytics-command-center', icon: 'BarChart3', isActive: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticatedNavigation userRole="admin" userName="Admin User" />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="text-lg text-text-secondary">Loading analytics dashboard...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Analytics Command Center - Nexora Webiotix</title>
        <meta name="description" content="Comprehensive business intelligence dashboard for monitoring operations, tracking performance metrics, and managing strategic decisions at Nexora Webiotix." />
        <meta name="keywords" content="admin dashboard, analytics, business intelligence, performance metrics, Nexora Webiotix" />
      </Helmet>

      <AuthenticatedNavigation userRole="admin" userName="Admin User" />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <ServiceNavigationBreadcrumbs customBreadcrumbs={customBreadcrumbs} />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Analytics Command Center
                </h1>
                <p className="text-text-secondary">
                  Comprehensive business intelligence and performance monitoring
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <ProjectStatusIndicator
                  projectCount={dashboardData.totalProjects}
                  urgentCount={dashboardData.urgentIssues}
                  completedToday={dashboardData.completedToday}
                  userRole="admin"
                />
                
                <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe.value}
                      onClick={() => setSelectedTimeframe(timeframe.value)}
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                        selectedTimeframe === timeframe.value
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon name={timeframe.icon} size={14} />
                      <span className="hidden sm:inline">{timeframe.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <AnalyticsFilters 
            onFiltersChange={handleFiltersChange}
            onExport={handleExportData}
          />

          {/* Overview Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {overviewMetrics.map((metric, index) => (
              <MetricsOverviewCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Revenue Chart - Spans 2 columns */}
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            
            {/* Real-time Activity Feed */}
            <div>
              <RealTimeActivityFeed />
            </div>
          </div>

          {/* Secondary Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ServiceDemandChart />
            <ClientConversionFunnel />
          </div>

          {/* Regional and System Monitoring */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <RegionalHeatMap />
            <SystemHealthMonitor />
          </div>

          {/* Quick Actions Section */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  Quick Actions
                </h3>
                <p className="text-sm text-text-secondary">
                  Common administrative tasks and report generation
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  onClick={handleSaveReport}
                >
                  Save Report
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Clock"
                  onClick={handleScheduleReport}
                >
                  Schedule Report
                </Button>
                
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Download"
                  onClick={handleExportData}
                >
                  Export All Data
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-sm text-text-muted">
            <p>
              Last updated: {dashboardData.lastUpdated?.toLocaleString()} • 
              Data refreshes automatically every 5 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <QuickActionToolbar
        workflowType="admin-analytics"
        onSave={handleSaveReport}
        onExport={handleExportData}
        onPreview={handleScheduleReport}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminAnalyticsCommandCenter;