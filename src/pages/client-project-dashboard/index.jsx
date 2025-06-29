import React, { useState, useEffect } from 'react';
import AuthenticatedNavigation from '../../components/ui/AuthenticatedNavigation';
import ServiceNavigationBreadcrumbs from '../../components/ui/ServiceNavigationBreadcrumbs';
import ProjectStatusIndicator from '../../components/ui/ProjectStatusIndicator';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import DashboardStats from './components/DashboardStats';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import ProjectTimeline from './components/ProjectTimeline';
import NotificationCenter from './components/NotificationCenter';
import FileManager from './components/FileManager';
import CommunicationPanel from './components/CommunicationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClientProjectDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data
  const dashboardStats = {
    activeProjects: 8,
    activeProjectsChange: 12,
    completedProjects: 15,
    completedProjectsChange: 8,
    totalInvestment: 125000,
    investmentChange: 15,
    avgCompletionTime: 45,
    completionTimeChange: -10
  };

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      serviceType: "web-development",
      serviceCategory: "Web Development",
      status: "in-progress",
      progress: 75,
      teamMember: "Sarah Johnson",
      nextDeliverable: "2024-02-15",
      currentPhase: "Frontend Development & Testing",
      budgetSpent: 18500,
      budgetTotal: 25000,
      startDate: "2024-01-01",
      recentActivity: [
        { description: "UI components completed", date: "2024-02-10" },
        { description: "Database integration finished", date: "2024-02-08" }
      ]
    },
    {
      id: 2,
      name: "Mobile Banking App",
      serviceType: "app-development",
      serviceCategory: "Mobile App Development",
      status: "review",
      progress: 90,
      teamMember: "Mike Chen",
      nextDeliverable: "2024-02-12",
      currentPhase: "Final Testing & Security Audit",
      budgetSpent: 42000,
      budgetTotal: 45000,
      startDate: "2023-12-01",
      recentActivity: [
        { description: "Security testing completed", date: "2024-02-09" },
        { description: "Performance optimization done", date: "2024-02-07" }
      ]
    },
    {
      id: 3,
      name: "AI Chatbot Integration",
      serviceType: "ai-development",
      serviceCategory: "AI Development",
      status: "completed",
      progress: 100,
      teamMember: "Emily Rodriguez",
      nextDeliverable: "2024-01-30",
      currentPhase: "Project Completed",
      budgetSpent: 15000,
      budgetTotal: 15000,
      startDate: "2023-11-15",
      recentActivity: [
        { description: "Final deployment completed", date: "2024-01-30" },
        { description: "Documentation delivered", date: "2024-01-28" }
      ]
    },
    {
      id: 4,
      name: "IoT Smart Home System",
      serviceType: "iot-robotics",
      serviceCategory: "IoT & Robotics",
      status: "on-hold",
      progress: 35,
      teamMember: "David Kim",
      nextDeliverable: "2024-03-01",
      currentPhase: "Hardware Integration - On Hold",
      budgetSpent: 8500,
      budgetTotal: 30000,
      startDate: "2024-01-15",
      recentActivity: [
        { description: "Project paused pending client approval", date: "2024-02-05" },
        { description: "Prototype testing completed", date: "2024-02-01" }
      ]
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "milestone",
      title: "Milestone Completed",
      message: "Frontend development phase has been completed for E-commerce Platform Redesign project.",
      projectName: "E-commerce Platform Redesign",
      timestamp: "2024-02-10T14:30:00Z",
      isRead: false,
      priority: "medium",
      actionRequired: true,
      actionText: "Review Progress"
    },
    {
      id: 2,
      type: "message",
      title: "New Message from Sarah Johnson",
      message: "Hi! The UI components are ready for your review. Please check the staging environment and let me know your feedback.",
      projectName: "E-commerce Platform Redesign",
      timestamp: "2024-02-10T10:15:00Z",
      isRead: false,
      priority: "high",
      actionRequired: true,
      actionText: "Reply"
    },
    {
      id: 3,
      type: "deadline",
      title: "Upcoming Deadline",
      message: "Mobile Banking App final review is due in 2 days. Please prepare your feedback.",
      projectName: "Mobile Banking App",
      timestamp: "2024-02-09T16:45:00Z",
      isRead: true,
      priority: "high"
    },
    {
      id: 4,
      type: "file-upload",
      title: "New Files Uploaded",
      message: "Design mockups and wireframes have been uploaded to the project folder.",
      projectName: "E-commerce Platform Redesign",
      timestamp: "2024-02-09T09:20:00Z",
      isRead: true,
      priority: "low"
    }
  ];

  const files = [
    {
      id: 1,
      name: "Project_Requirements_v2.pdf",
      type: "pdf",
      size: 2048576,
      category: "deliverable",
      uploadDate: "2024-02-10T14:30:00Z",
      projectName: "E-commerce Platform Redesign",
      canDelete: false
    },
    {
      id: 2,
      name: "UI_Mockups_Final.zip",
      type: "zip",
      size: 15728640,
      category: "deliverable",
      uploadDate: "2024-02-09T16:20:00Z",
      projectName: "E-commerce Platform Redesign",
      canDelete: false
    },
    {
      id: 3,
      name: "Client_Feedback_Form.docx",
      type: "docx",
      size: 524288,
      category: "feedback",
      uploadDate: "2024-02-08T11:15:00Z",
      projectName: "Mobile Banking App",
      canDelete: true
    },
    {
      id: 4,
      name: "App_Demo_Video.mp4",
      type: "mp4",
      size: 52428800,
      category: "deliverable",
      uploadDate: "2024-02-07T13:45:00Z",
      projectName: "Mobile Banking App",
      canDelete: false
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      receiverId: "client",
      content: "Hi! The UI components are ready for your review. Please check the staging environment.",
      timestamp: "2024-02-10T10:15:00Z"
    },
    {
      id: 2,
      senderId: "client",
      receiverId: 1,
      content: "Thanks Sarah! I\'ll review them today and get back to you with feedback.",
      timestamp: "2024-02-10T10:30:00Z"
    },
    {
      id: 3,
      senderId: 2,
      receiverId: "client",
      content: "Security testing is complete. The app is ready for final review.",
      timestamp: "2024-02-09T16:45:00Z"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'active' && ['in-progress', 'review'].includes(project.status)) ||
      (activeFilter === 'review' && project.status === 'review') ||
      (activeFilter === 'completed' && project.status === 'completed') ||
      (activeFilter === 'on-hold' && project.status === 'on-hold');
    
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.teamMember.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleViewDetails = (projectId) => {
    console.log('Viewing project details:', projectId);
  };

  const handleDownloadFiles = (projectId) => {
    console.log('Downloading files for project:', projectId);
  };

  const handleContactTeam = (projectId) => {
    console.log('Contacting team for project:', projectId);
    setSelectedTab('communication');
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  const handleFileDownload = (file) => {
    console.log('Downloading file:', file.name);
  };

  const handleFileUpload = () => {
    console.log('Opening file upload dialog');
  };

  const handleFileDelete = (fileId) => {
    console.log('Deleting file:', fileId);
  };

  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);
  };

  const handleScheduleMeeting = () => {
    console.log('Scheduling meeting');
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { key: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { key: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { key: 'files', label: 'Files', icon: 'Folder' },
    { key: 'communication', label: 'Communication', icon: 'MessageCircle' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation userRole="client" userName="John Smith" />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <ServiceNavigationBreadcrumbs />
              <h1 className="text-3xl font-bold text-text-primary mt-2">Project Dashboard</h1>
              <p className="text-text-secondary mt-1">
                Manage and track your projects across all service categories
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <ProjectStatusIndicator 
                projectCount={dashboardStats.activeProjects}
                urgentCount={2}
                completedToday={1}
                userRole="client"
              />
            </div>
          </div>

          {/* Stats Overview */}
          <DashboardStats stats={dashboardStats} />

          {/* Tab Navigation */}
          <div className="bg-surface border border-border rounded-lg mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${
                    selectedTab === tab.key
                      ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ProjectFilters
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                  
                  <div className="grid grid-cols-1 gap-4">
                    {filteredProjects.slice(0, 3).map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        onDownloadFiles={handleDownloadFiles}
                        onContactTeam={handleContactTeam}
                      />
                    ))}
                  </div>
                  
                  {filteredProjects.length > 3 && (
                    <div className="text-center">
                      <Button
                        variant="outline"
                        size="md"
                        iconName="ArrowRight"
                        iconPosition="right"
                        onClick={() => setSelectedTab('projects')}
                      >
                        View All Projects ({filteredProjects.length})
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <NotificationCenter
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                  />
                </div>
              </div>
            )}

            {selectedTab === 'projects' && (
              <div>
                <ProjectFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        onDownloadFiles={handleDownloadFiles}
                        onContactTeam={handleContactTeam}
                      />
                    ))}
                  </div>
                ) : (
                  <ProjectTimeline 
                    projects={filteredProjects} 
                    viewMode={viewMode}
                  />
                )}
              </div>
            )}

            {selectedTab === 'timeline' && (
              <ProjectTimeline 
                projects={projects} 
                viewMode="timeline"
              />
            )}

            {selectedTab === 'files' && (
              <FileManager
                files={files}
                onDownload={handleFileDownload}
                onUpload={handleFileUpload}
                onDelete={handleFileDelete}
              />
            )}

            {selectedTab === 'communication' && (
              <CommunicationPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                onScheduleMeeting={handleScheduleMeeting}
              />
            )}
          </div>
        </div>
      </div>

      <QuickActionToolbar 
        workflowType="client-dashboard"
        onSave={() => console.log('Saving dashboard preferences')}
        onExport={() => console.log('Exporting project data')}
        hasUnsavedChanges={false}
      />
    </div>
  );
};

export default ClientProjectDashboard;