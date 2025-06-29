import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Services', path: '/service-landing-hub', icon: 'Grid3X3' },
    { label: 'Request Service', path: '/client-service-request-center', icon: 'Plus' },
    { label: 'My Projects', path: '/client-project-dashboard', icon: 'FolderOpen' },
    { label: 'Demo Builder', path: '/demo-website-builder-studio', icon: 'Palette' },
    { label: 'Analytics', path: '/admin-analytics-command-center', icon: 'BarChart3' },
    { label: 'Project Management', path: '/employee-project-management-hub', icon: 'Users' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              iconSize={18}
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              iconSize={18}
            />
            <Button
              variant="primary"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Get Started
            </Button>
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
              >
                Notifications
                <span className="absolute top-2 left-8 w-2 h-2 bg-error rounded-full"></span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="User"
                iconPosition="left"
                fullWidth
                className="justify-start"
              >
                Profile
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                fullWidth
                className="justify-center mt-3"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;