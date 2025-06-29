import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Button from './Button';

const QuickActionToolbar = ({ 
  workflowType = 'default',
  onSave = null,
  onPreview = null,
  onExport = null,
  onUndo = null,
  onRedo = null,
  hasUnsavedChanges = false,
  isLoading = false 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const getWorkflowActions = () => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('demo-website-builder-studio')) {
      return {
        primary: [
          { 
            label: 'Save', 
            icon: 'Save', 
            action: onSave, 
            variant: hasUnsavedChanges ? 'primary' : 'secondary',
            disabled: isLoading 
          },
          { 
            label: 'Preview', 
            icon: 'Eye', 
            action: onPreview, 
            variant: 'outline',
            disabled: isLoading 
          },
          { 
            label: 'Export', 
            icon: 'Download', 
            action: onExport, 
            variant: 'accent',
            disabled: isLoading 
          }
        ],
        secondary: [
          { 
            label: 'Undo', 
            icon: 'Undo2', 
            action: onUndo, 
            variant: 'ghost',
            disabled: isLoading 
          },
          { 
            label: 'Redo', 
            icon: 'Redo2', 
            action: onRedo, 
            variant: 'ghost',
            disabled: isLoading 
          }
        ]
      };
    }
    
    if (currentPath.includes('client-service-request-center')) {
      return {
        primary: [
          { 
            label: 'Save Draft', 
            icon: 'Save', 
            action: onSave, 
            variant: 'secondary',
            disabled: isLoading 
          },
          { 
            label: 'Preview Request', 
            icon: 'Eye', 
            action: onPreview, 
            variant: 'outline',
            disabled: isLoading 
          },
          { 
            label: 'Submit Request', 
            icon: 'Send', 
            action: onExport, 
            variant: 'primary',
            disabled: isLoading 
          }
        ],
        secondary: [
          { 
            label: 'Clear Form', 
            icon: 'RotateCcw', 
            action: onUndo, 
            variant: 'ghost',
            disabled: isLoading 
          }
        ]
      };
    }

    if (currentPath.includes('employee-project-management-hub')) {
      return {
        primary: [
          { 
            label: 'Update Status', 
            icon: 'RefreshCw', 
            action: onSave, 
            variant: 'primary',
            disabled: isLoading 
          },
          { 
            label: 'Generate Report', 
            icon: 'FileText', 
            action: onExport, 
            variant: 'outline',
            disabled: isLoading 
          }
        ],
        secondary: [
          { 
            label: 'Quick Note', 
            icon: 'MessageSquare', 
            action: onPreview, 
            variant: 'ghost',
            disabled: isLoading 
          }
        ]
      };
    }

    // Default actions
    return {
      primary: [
        { 
          label: 'Save', 
          icon: 'Save', 
          action: onSave, 
          variant: 'primary',
          disabled: isLoading 
        }
      ],
      secondary: []
    };
  };

  const { primary, secondary } = getWorkflowActions();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  const executeAction = (action) => {
    if (action && typeof action === 'function') {
      action();
    }
  };

  if (!primary.length && !secondary.length) {
    return null;
  }

  return (
    <>
      {/* Desktop Toolbar - Sidebar Style */}
      <div className={`hidden md:block fixed right-4 top-1/2 transform -translate-y-1/2 z-1010 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="bg-surface border border-border rounded-lg shadow-lg p-2 space-y-2 min-w-[120px]">
          {/* Unsaved Changes Indicator */}
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-2 px-2 py-1 bg-warning-50 rounded-md border border-warning-200">
              <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-warning-700 font-medium">Unsaved</span>
            </div>
          )}

          {/* Primary Actions */}
          <div className="space-y-1">
            {primary.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                iconName={action.icon}
                iconPosition="left"
                fullWidth
                disabled={action.disabled}
                loading={isLoading && action.variant === 'primary'}
                onClick={() => executeAction(action.action)}
                className="justify-start text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>

          {/* Secondary Actions */}
          {secondary.length > 0 && (
            <>
              <div className="border-t border-border"></div>
              <div className="space-y-1">
                {secondary.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    size="sm"
                    iconName={action.icon}
                    iconPosition="left"
                    fullWidth
                    disabled={action.disabled}
                    onClick={() => executeAction(action.action)}
                    className="justify-start text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Toolbar - Bottom Sheet */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-1010 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-surface border-t border-border shadow-lg p-4">
          {/* Unsaved Changes Indicator */}
          {hasUnsavedChanges && (
            <div className="flex items-center justify-center space-x-2 mb-3 px-3 py-2 bg-warning-50 rounded-md border border-warning-200">
              <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-warning-700 font-medium">You have unsaved changes</span>
            </div>
          )}

          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-2">
            {primary.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="md"
                iconName={action.icon}
                iconPosition="left"
                fullWidth
                disabled={action.disabled}
                loading={isLoading && action.variant === 'primary'}
                onClick={() => executeAction(action.action)}
                className="justify-center"
              >
                {action.label}
              </Button>
            ))}
          </div>

          {/* Secondary Actions Row */}
          {secondary.length > 0 && (
            <div className="flex justify-center space-x-2 mt-3 pt-3 border-t border-border">
              {secondary.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  iconName={action.icon}
                  disabled={action.disabled}
                  onClick={() => executeAction(action.action)}
                  className="flex-1 max-w-[100px]"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {/* Handle for swipe gesture */}
          <div className="flex justify-center mt-2">
            <div className="w-12 h-1 bg-border rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickActionToolbar;