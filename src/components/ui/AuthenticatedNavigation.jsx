import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticatedNavigation = ({ userRole = 'client', userName = 'John Doe' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { label: 'Services', path: '/service-landing-hub', icon: 'Grid3X3', roles: ['client', 'employee', 'admin'] },
    ];

    const roleSpecificItems = {
      client: [
        { label: 'Request Service', path: '/client-service-request-center', icon: 'Plus' },
        { label: 'My Projects', path: '/client-project-dashboard', icon: 'FolderOpen' },
        { label: 'Demo Builder', path: '/demo-website-builder-studio', icon: 'Palette' },
      ],
      employee: [
        { label: 'Project Management', path: '/employee-project-management-hub', icon: 'Users' },
        { label: 'Demo Builder', path: '/demo-website-builder-studio', icon: 'Palette' },
      ],
      admin: [
        { label: 'Analytics', path: '/admin-analytics-command-center', icon: 'BarChart3' },
        { label: 'Project Management', path: '/employee-project-management-hub', icon: 'Users' },
        { label: 'Demo Builder', path: '/demo-website-builder-studio', icon: 'Palette' },
      ],
    };

    return [...baseItems, ...(roleSpecificItems[userRole] || [])];
  };

  const navigationItems = getNavigationItems();

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  const getRoleDisplayName = () => {
    const roleNames = {
      client: 'Client',
      employee: 'Employee',
      admin: 'Administrator'
    };
    return roleNames[userRole] || 'User';
  };

  const getRoleBadgeColor = () => {
    const colors = {
      client: 'bg-accent-100 text-accent-700',
      employee: 'bg-success-100 text-success-700',
      admin: 'bg-warning-100 text-warning-700'
    };
    return colors[userRole] || 'bg-secondary-100 text-secondary-700';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('/')}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-semibold text-text-primary">
                  Nexora <span className="text-primary">Webiotix</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              iconSize={18}
              className="relative"
              onClick={handleNotificationClick}
            >
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </Button>

            {/* User Profile Dropdown */}
            <div className="flex items-center space-x-3 pl-3 border-l border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <div className="hidden lg:block">
                  <div className="text-sm font-medium text-text-primary">{userName}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor()}`}>
                    {getRoleDisplayName()}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="LogOut"
                iconSize={16}
                onClick={handleLogout}
                className="text-text-secondary hover:text-error"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-lg animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-3 py-3 bg-muted rounded-md mb-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">{userName}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${getRoleBadgeColor()}`}>
                  {getRoleDisplayName()}
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Bell"
                iconPosition="left"
                fullWidth
                className="justify-start relative"
                onClick={handleNotificationClick}
              >
                Notifications
                {notifications > 0 && (
                  <span className="absolute top-2 left-8 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                fullWidth
                className="justify-start"
              >
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="LogOut"
                iconPosition="left"
                fullWidth
                className="justify-start text-error border-error hover:bg-error-50 mt-3"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthenticatedNavigation;