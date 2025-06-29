import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedNavigation from '../../components/ui/AuthenticatedNavigation';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import ServiceNavigationBreadcrumbs from '../../components/ui/ServiceNavigationBreadcrumbs';
import TemplateGallery from './components/TemplateGallery';
import CanvasEditor from './components/CanvasEditor';
import PropertiesPanel from './components/PropertiesPanel';
import ComponentLibrary from './components/ComponentLibrary';
import ExportModal from './components/ExportModal';
import PreviewModal from './components/PreviewModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DemoWebsiteBuilderStudio = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [isTemplateGalleryCollapsed, setIsTemplateGalleryCollapsed] = useState(false);
  const [isPropertiesPanelCollapsed, setIsPropertiesPanelCollapsed] = useState(false);
  const [isComponentLibraryVisible, setIsComponentLibraryVisible] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [websiteData, setWebsiteData] = useState(null);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 's':
            event.preventDefault();
            handleSave();
            break;
          case 'z':
            event.preventDefault();
            if (event.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'p':
            event.preventDefault();
            handlePreview();
            break;
          default:
            break;
        }
      }
      
      if (event.key === 'Escape') {
        setSelectedElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedElement(null);
    setHasUnsavedChanges(true);
    
    // Mock website data based on template
    setWebsiteData({
      template: template,
      elements: [],
      settings: {
        title: `Website from ${template.name}`,
        description: template.description
      }
    });
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (elementId, updates) => {
    setHasUnsavedChanges(true);
    // Update element logic would go here
    console.log('Updating element:', elementId, updates);
  };

  const handleComponentAdd = (component) => {
    setHasUnsavedChanges(true);
    setSelectedElement(component);
    console.log('Adding component:', component);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate save operation
    setTimeout(() => {
      setIsLoading(false);
      setHasUnsavedChanges(false);
      console.log('Website saved successfully');
    }, 1500);
  };

  const handlePreview = () => {
    setIsPreviewModalOpen(true);
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const handleUndo = () => {
    console.log('Undo action');
  };

  const handleRedo = () => {
    console.log('Redo action');
  };

  const handleExportComplete = (exportData) => {
    console.log('Export completed:', exportData);
    // Handle export completion
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/', icon: 'Home', isActive: false },
    { label: 'Services', path: '/service-landing-hub', icon: 'Grid3X3', isActive: false },
    { label: 'Demo Builder', path: '/demo-website-builder-studio', icon: 'Palette', isActive: true }
  ];

  return (
    <>
      <Helmet>
        <title>Demo Website Builder Studio - Nexora Webiotix</title>
        <meta name="description" content="Create professional demo websites with our intuitive drag-and-drop builder. Choose from templates, customize elements, and export to Figma or code." />
        <meta name="keywords" content="website builder, demo builder, drag and drop, templates, figma export, web design" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <AuthenticatedNavigation userRole="client" userName="John Doe" />

        {/* Main Content */}
        <div className="pt-16 h-screen flex flex-col">
          {/* Header Bar */}
          <div className="bg-surface border-b border-border px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ServiceNavigationBreadcrumbs 
                  customBreadcrumbs={customBreadcrumbs}
                  maxItems={3}
                />
                
                {selectedTemplate && (
                  <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-primary-50 rounded-md">
                    <Icon name="Palette" size={14} className="text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {selectedTemplate.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {/* Quick Actions */}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Plus"
                  onClick={() => setIsComponentLibraryVisible(!isComponentLibraryVisible)}
                  className="hidden lg:flex"
                >
                  Components
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={handlePreview}
                  disabled={!selectedTemplate}
                >
                  Preview
                </Button>
                
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Download"
                  onClick={handleExport}
                  disabled={!selectedTemplate}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Builder Interface */}
          <div className="flex-1 flex overflow-hidden">
            {/* Template Gallery */}
            <TemplateGallery
              onTemplateSelect={handleTemplateSelect}
              isCollapsed={isTemplateGalleryCollapsed}
              onToggleCollapse={() => setIsTemplateGalleryCollapsed(!isTemplateGalleryCollapsed)}
            />

            {/* Canvas Editor */}
            <CanvasEditor
              selectedTemplate={selectedTemplate}
              selectedElement={selectedElement}
              onElementSelect={handleElementSelect}
              onElementUpdate={handleElementUpdate}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Properties Panel */}
            <PropertiesPanel
              selectedElement={selectedElement}
              onElementUpdate={handleElementUpdate}
              isCollapsed={isPropertiesPanelCollapsed}
              onToggleCollapse={() => setIsPropertiesPanelCollapsed(!isPropertiesPanelCollapsed)}
            />
          </div>

          {/* Component Library Overlay */}
          <ComponentLibrary
            onComponentAdd={handleComponentAdd}
            isVisible={isComponentLibraryVisible}
            onToggle={() => setIsComponentLibraryVisible(!isComponentLibraryVisible)}
          />

          {/* Quick Action Toolbar */}
          <QuickActionToolbar
            workflowType="demo-builder"
            onSave={handleSave}
            onPreview={handlePreview}
            onExport={handleExport}
            onUndo={handleUndo}
            onRedo={handleRedo}
            hasUnsavedChanges={hasUnsavedChanges}
            isLoading={isLoading}
          />

          {/* Modals */}
          <ExportModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            onExport={handleExportComplete}
          />

          <PreviewModal
            isOpen={isPreviewModalOpen}
            onClose={() => setIsPreviewModalOpen(false)}
            websiteData={websiteData}
          />

          {/* Getting Started Overlay */}
          {!selectedTemplate && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-1000 pointer-events-none">
              <div className="bg-surface rounded-lg shadow-xl p-8 max-w-md mx-4 pointer-events-auto">
                <div className="text-center">
                  <Icon name="Palette" size={48} className="mx-auto text-primary mb-4" />
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Welcome to Demo Builder
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Start by selecting a template from the gallery on the left, or create a new website from scratch.
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      fullWidth
                      iconName="Grid3X3"
                      iconPosition="left"
                      onClick={() => setIsTemplateGalleryCollapsed(false)}
                    >
                      Browse Templates
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => {
                        setSelectedTemplate({
                          id: 'blank',
                          name: 'Blank Canvas',
                          category: 'custom'
                        });
                        setWebsiteData({
                          template: { id: 'blank', name: 'Blank Canvas' },
                          elements: [],
                          settings: { title: 'New Website', description: 'Custom website' }
                        });
                      }}
                    >
                      Start from Scratch
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DemoWebsiteBuilderStudio;