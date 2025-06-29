import React, { useState, useEffect } from 'react';
import AuthenticatedNavigation from '../../components/ui/AuthenticatedNavigation';
import ServiceNavigationBreadcrumbs from '../../components/ui/ServiceNavigationBreadcrumbs';
import ProjectStatusIndicator from '../../components/ui/ProjectStatusIndicator';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import Icon from '../../components/AppIcon';

import Input from '../../components/ui/Input';

// Import all components
import ProjectCard from './components/ProjectCard';
import KanbanBoard from './components/KanbanBoard';
import ProjectDetailsPanel from './components/ProjectDetailsPanel';
import TimeTracker from './components/TimeTracker';
import TeamWorkloadChart from './components/TeamWorkloadChart';
import QuickStatsCards from './components/QuickStatsCards';
import RecentActivityFeed from './components/RecentActivityFeed';

const EmployeeProjectManagementHub = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list', 'kanban', 'calendar'
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [activeTimeProject, setActiveTimeProject] = useState(null);

  // Mock data
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform Development",
      clientName: "TechCorp Solutions",
      serviceType: "web-development",
      status: "development",
      priority: "high",
      progress: 75,
      deadline: "2024-02-15",
      startDate: "2024-01-01",
      timeLogged: 45,
      completedTasks: 8,
      totalTasks: 12,
      description: `Developing a comprehensive e-commerce platform with advanced features including inventory management, payment processing, and customer analytics. The platform will support multiple vendors and include a mobile-responsive design.`,
      teamMembers: [
        { name: "Sarah Chen", role: "Lead Developer" },
        { name: "Mike Rodriguez", role: "Frontend Developer" },
        { name: "Emily Johnson", role: "UI/UX Designer" }
      ],
      recentTasks: [
        { title: "Payment gateway integration", completed: true },
        { title: "Product catalog optimization", completed: false }
      ],
      files: [
        { name: "Design_Mockups_v2.1.pdf", size: "2.4 MB", uploadDate: "2024-01-20" },
        { name: "Technical_Specifications.docx", size: "1.8 MB", uploadDate: "2024-01-18" }
      ],
      messages: [
        {
          author: "Sarah Chen",
          content: "Payment integration testing completed successfully. Ready for client review.",
          timestamp: "2024-01-22T10:30:00Z"
        }
      ],
      tasks: [
        {
          title: "Complete payment gateway integration",
          description: "Integrate Stripe and PayPal payment systems",
          completed: true,
          dueDate: "2024-01-20"
        },
        {
          title: "Implement product search functionality",
          description: "Add advanced search with filters and sorting",
          completed: false,
          dueDate: "2024-01-25"
        }
      ],
      timeEntries: [
        {
          hours: 4.5,
          description: "Payment gateway development",
          date: "2024-01-22T09:00:00Z",
          employee: "Sarah Chen"
        }
      ]
    },
    {
      id: 2,
      title: "Mobile Banking Application",
      clientName: "SecureBank Ltd",
      serviceType: "app-development",
      status: "review",
      priority: "high",
      progress: 90,
      deadline: "2024-02-10",
      startDate: "2023-12-15",
      timeLogged: 62,
      completedTasks: 15,
      totalTasks: 16,
      description: `Secure mobile banking application with biometric authentication, real-time transaction monitoring, and comprehensive financial management tools.`,
      teamMembers: [
        { name: "David Kim", role: "Mobile Developer" },
        { name: "Lisa Wang", role: "Security Specialist" },
        { name: "Alex Thompson", role: "Backend Developer" }
      ],
      recentTasks: [
        { title: "Security audit completion", completed: true },
        { title: "Final UI polish", completed: false }
      ],
      files: [
        { name: "Security_Audit_Report.pdf", size: "3.2 MB", uploadDate: "2024-01-21" }
      ],
      messages: [
        {
          author: "David Kim",
          content: "Security audit passed with flying colors. App is ready for final review.",
          timestamp: "2024-01-21T14:15:00Z"
        }
      ],
      tasks: [
        {
          title: "Complete security testing",
          description: "Comprehensive security audit and penetration testing",
          completed: true,
          dueDate: "2024-01-21"
        }
      ],
      timeEntries: [
        {
          hours: 6.0,
          description: "Security testing and bug fixes",
          date: "2024-01-21T08:00:00Z",
          employee: "Lisa Wang"
        }
      ]
    },
    {
      id: 3,
      title: "AI Chatbot Integration",
      clientName: "CustomerFirst Inc",
      serviceType: "ai-development",
      status: "planning",
      priority: "medium",
      progress: 25,
      deadline: "2024-03-01",
      startDate: "2024-01-15",
      timeLogged: 18,
      completedTasks: 3,
      totalTasks: 10,
      description: `Intelligent chatbot system with natural language processing capabilities for customer support automation and lead generation.`,
      teamMembers: [
        { name: "Emily Johnson", role: "AI Specialist" },
        { name: "Mike Rodriguez", role: "Integration Developer" }
      ],
      recentTasks: [
        { title: "Requirements analysis", completed: true },
        { title: "Model training setup", completed: false }
      ],
      files: [
        { name: "AI_Model_Requirements.pdf", size: "1.5 MB", uploadDate: "2024-01-16" }
      ],
      messages: [
        {
          author: "Emily Johnson",
          content: "Initial model training showing promising results. Need client feedback on conversation flows.",
          timestamp: "2024-01-20T11:45:00Z"
        }
      ],
      tasks: [
        {
          title: "Define conversation flows",
          description: "Map out all possible customer interaction scenarios",
          completed: true,
          dueDate: "2024-01-18"
        }
      ],
      timeEntries: [
        {
          hours: 3.5,
          description: "Model architecture design",
          date: "2024-01-19T13:00:00Z",
          employee: "Emily Johnson"
        }
      ]
    },
    {
      id: 4,
      title: "Smart IoT Dashboard",
      clientName: "InnovateTech Corp",
      serviceType: "iot-robotics",
      status: "delivery",
      priority: "low",
      progress: 95,
      deadline: "2024-01-30",
      startDate: "2023-12-01",
      timeLogged: 78,
      completedTasks: 18,
      totalTasks: 19,
      description: `Comprehensive IoT dashboard for monitoring and controlling smart devices across multiple locations with real-time analytics and automated alerts.`,
      teamMembers: [
        { name: "Alex Thompson", role: "IoT Developer" },
        { name: "Sarah Chen", role: "Dashboard Developer" }
      ],
      recentTasks: [
        { title: "Final testing phase", completed: true },
        { title: "Documentation completion", completed: false }
      ],
      files: [
        { name: "User_Manual_v1.0.pdf", size: "4.1 MB", uploadDate: "2024-01-22" }
      ],
      messages: [
        {
          author: "Alex Thompson",
          content: "All IoT devices tested and integrated successfully. Ready for deployment.",
          timestamp: "2024-01-22T16:20:00Z"
        }
      ],
      tasks: [
        {
          title: "Complete system integration testing",
          description: "End-to-end testing of all IoT components",
          completed: true,
          dueDate: "2024-01-22"
        }
      ],
      timeEntries: [
        {
          hours: 5.0,
          description: "Final integration testing",
          date: "2024-01-22T10:00:00Z",
          employee: "Alex Thompson"
        }
      ]
    },
    {
      id: 5,
      title: "Tanning Salon Website",
      clientName: "Golden Glow Spa",
      serviceType: "tanning",
      status: "development",
      priority: "medium",
      progress: 60,
      deadline: "2024-02-20",
      startDate: "2024-01-10",
      timeLogged: 32,
      completedTasks: 6,
      totalTasks: 10,
      description: `Modern website for tanning salon with online booking system, service catalog, and customer management features.`,
      teamMembers: [
        { name: "Lisa Wang", role: "Web Developer" },
        { name: "Emily Johnson", role: "Designer" }
      ],
      recentTasks: [
        { title: "Booking system integration", completed: false },
        { title: "Service gallery design", completed: true }
      ],
      files: [
        { name: "Website_Mockups.pdf", size: "2.8 MB", uploadDate: "2024-01-19" }
      ],
      messages: [
        {
          author: "Lisa Wang",
          content: "Booking system integration in progress. Client requested additional customization options.",
          timestamp: "2024-01-21T09:30:00Z"
        }
      ],
      tasks: [
        {
          title: "Design service gallery",
          description: "Create visual gallery for tanning services",
          completed: true,
          dueDate: "2024-01-19"
        }
      ],
      timeEntries: [
        {
          hours: 4.0,
          description: "Booking system development",
          date: "2024-01-21T14:00:00Z",
          employee: "Lisa Wang"
        }
      ]
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleProjectMove = (projectId, newStatus) => {
    console.log(`Moving project ${projectId} to ${newStatus}`);
  };

  const handleStatusUpdate = (project) => {
    console.log('Updating status for:', project.title);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleTimeLog = (timeEntry) => {
    console.log('Logging time:', timeEntry);
  };

  const handleProjectUpdate = (projectId, updateType, data) => {
    console.log('Updating project:', projectId, updateType, data);
  };

  const handleFileUpload = () => {
    console.log('File upload triggered');
  };

  const handleStatsCardClick = (cardId) => {
    console.log('Stats card clicked:', cardId);
  };

  const handleActivityClick = (activity) => {
    console.log('Activity clicked:', activity);
  };

  const handleTeamMemberSelect = (member) => {
    console.log('Team member selected:', member);
  };

  const handleSave = () => {
    console.log('Saving changes...');
  };

  const handlePreview = () => {
    console.log('Previewing...');
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  useEffect(() => {
    if (projects.length > 0) {
      setActiveTimeProject(projects[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <AuthenticatedNavigation userRole="employee" userName="Sarah Chen" />
      
      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <ServiceNavigationBreadcrumbs />
                <h1 className="text-2xl font-bold text-text-primary mt-2">
                  Project Management Hub
                </h1>
                <p className="text-text-secondary mt-1">
                  Manage your assigned projects, track progress, and collaborate with your team
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <ProjectStatusIndicator 
                  projectCount={filteredProjects.length}
                  urgentCount={filteredProjects.filter(p => p.priority === 'high').length}
                  completedToday={2}
                  userRole="employee"
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-6">
            <QuickStatsCards 
              stats={{
                totalProjects: projects.length,
                activeProjects: projects.filter(p => p.status !== 'completed').length,
                completedThisWeek: 6,
                overdueProjects: projects.filter(p => new Date(p.deadline) < new Date()).length,
                totalHours: projects.reduce((sum, p) => sum + p.timeLogged, 0),
                teamMembers: 8
              }}
              onCardClick={handleStatsCardClick}
            />
          </div>

          {/* Controls and Filters */}
          <div className="mb-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <Input
                      type="text"
                      placeholder="Search projects or clients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Status</option>
                    <option value="planning">Planning</option>
                    <option value="development">Development</option>
                    <option value="review">Review</option>
                    <option value="delivery">Delivery</option>
                  </select>
                  
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <div className="flex bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                        viewMode === 'list' ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon name="List" size={16} />
                      <span>List</span>
                    </button>
                    <button
                      onClick={() => setViewMode('kanban')}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                        viewMode === 'kanban' ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon name="Columns" size={16} />
                      <span>Kanban</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Projects Section */}
            <div className="xl:col-span-3">
              {viewMode === 'list' ? (
                <div className="bg-surface border border-border rounded-lg">
                  <div className="p-4 border-b border-border">
                    <h2 className="font-semibold text-text-primary">Projects ({filteredProjects.length})</h2>
                  </div>
                  <div className="p-4">
                    {filteredProjects.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredProjects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onSelect={handleProjectSelect}
                            isSelected={selectedProject?.id === project.id}
                            onStatusUpdate={handleStatusUpdate}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Icon name="Search" size={48} className="text-text-muted mx-auto mb-3" />
                        <p className="text-text-secondary">No projects found matching your criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-surface border border-border rounded-lg p-4">
                  <KanbanBoard
                    projects={filteredProjects}
                    onProjectMove={handleProjectMove}
                    onTaskAdd={(status) => console.log('Add task to', status)}
                    onTaskUpdate={(project) => console.log('Update task', project)}
                  />
                </div>
              )}

              {/* Team Workload Chart */}
              <div className="mt-6">
                <TeamWorkloadChart
                  onMemberSelect={handleTeamMemberSelect}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Time Tracker */}
              <TimeTracker
                activeProject={activeTimeProject}
                onTimeLog={handleTimeLog}
                onProjectChange={() => console.log('Change project')}
              />

              {/* Recent Activity */}
              <RecentActivityFeed
                onActivityClick={handleActivityClick}
                onLoadMore={() => console.log('Load more activities')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showProjectDetails && selectedProject && (
        <ProjectDetailsPanel
          project={selectedProject}
          onClose={() => setShowProjectDetails(false)}
          onUpdate={handleProjectUpdate}
          onFileUpload={handleFileUpload}
        />
      )}

      {/* Quick Action Toolbar */}
      <QuickActionToolbar
        workflowType="employee-management"
        onSave={handleSave}
        onPreview={handlePreview}
        onExport={handleExport}
        hasUnsavedChanges={false}
        isLoading={false}
      />
    </div>
  );
};

export default EmployeeProjectManagementHub;