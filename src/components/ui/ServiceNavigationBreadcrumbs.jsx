import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ServiceNavigationBreadcrumbs = ({ 
  customBreadcrumbs = null,
  showHomeLink = true,
  maxItems = 4 
}) => {
  const location = useLocation();

  const getDefaultBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbMap = {
      'service-landing-hub': { label: 'Services', icon: 'Grid3X3' },
      'client-service-request-center': { label: 'Request Service', icon: 'Plus' },
      'demo-website-builder-studio': { label: 'Demo Builder', icon: 'Palette' },
      'client-project-dashboard': { label: 'My Projects', icon: 'FolderOpen' },
      'admin-analytics-command-center': { label: 'Analytics', icon: 'BarChart3' },
      'employee-project-management-hub': { label: 'Project Management', icon: 'Users' },
    };

    const breadcrumbs = [];
    
    if (showHomeLink) {
      breadcrumbs.push({
        label: 'Home',
        path: '/',
        icon: 'Home',
        isActive: false
      });
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      if (breadcrumbMap[segment]) {
        breadcrumbs.push({
          label: breadcrumbMap[segment].label,
          path: currentPath,
          icon: breadcrumbMap[segment].icon,
          isActive: isLast
        });
      } else {
        // Handle dynamic segments
        const formattedLabel = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({
          label: formattedLabel,
          path: currentPath,
          icon: 'ChevronRight',
          isActive: isLast
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = customBreadcrumbs || getDefaultBreadcrumbs();
  
  // Truncate breadcrumbs if they exceed maxItems
  const displayBreadcrumbs = breadcrumbs.length > maxItems 
    ? [
        breadcrumbs[0],
        { label: '...', path: null, icon: 'MoreHorizontal', isEllipsis: true },
        ...breadcrumbs.slice(-2)
      ]
    : breadcrumbs;

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm" aria-label="Breadcrumb">
      {/* Desktop Breadcrumbs */}
      <div className="hidden sm:flex items-center space-x-1">
        {displayBreadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-text-muted mx-2" 
              />
            )}
            
            {crumb.isEllipsis ? (
              <span className="text-text-muted px-2 py-1">
                <Icon name={crumb.icon} size={16} />
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb.path)}
                disabled={crumb.isActive}
                className={`flex items-center space-x-1.5 px-2 py-1 rounded-md transition-all duration-150 ${
                  crumb.isActive
                    ? 'text-primary font-medium bg-primary-50 cursor-default' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
                aria-current={crumb.isActive ? 'page' : undefined}
              >
                <Icon name={crumb.icon} size={14} />
                <span>{crumb.label}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Breadcrumbs - Show only current and previous */}
      <div className="sm:hidden flex items-center space-x-1 w-full">
        {breadcrumbs.length > 1 && (
          <>
            <button
              onClick={() => handleNavigation(breadcrumbs[breadcrumbs.length - 2].path)}
              className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              <Icon name="ChevronLeft" size={16} />
              <span className="truncate max-w-24">
                {breadcrumbs[breadcrumbs.length - 2].label}
              </span>
            </button>
            
            <Icon name="ChevronRight" size={14} className="text-text-muted" />
            
            <div className="flex items-center space-x-1.5 text-primary font-medium">
              <Icon name={breadcrumbs[breadcrumbs.length - 1].icon} size={14} />
              <span className="truncate">
                {breadcrumbs[breadcrumbs.length - 1].label}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs
              .filter(crumb => !crumb.isEllipsis && crumb.path)
              .map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.label,
                "item": `${window.location.origin}${crumb.path}`
              }))
          })
        }}
      />
    </nav>
  );
};

export default ServiceNavigationBreadcrumbs;