import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComponentLibrary = ({ onComponentAdd, isVisible, onToggle }) => {
  const [activeCategory, setActiveCategory] = useState('basic');

  const categories = [
    { id: 'basic', label: 'Basic', icon: 'Square' },
    { id: 'layout', label: 'Layout', icon: 'Layout' },
    { id: 'forms', label: 'Forms', icon: 'FileText' },
    { id: 'media', label: 'Media', icon: 'Image' },
    { id: 'navigation', label: 'Navigation', icon: 'Menu' }
  ];

  const components = {
    basic: [
      {
        id: 'text',
        name: 'Text',
        icon: 'Type',
        description: 'Simple text element',
        defaultProps: {
          content: 'Your text here',
          styles: {
            fontSize: '16px',
            color: '#1E293B',
            textAlign: 'left'
          }
        }
      },
      {
        id: 'heading',
        name: 'Heading',
        icon: 'Heading',
        description: 'Heading element',
        defaultProps: {
          content: 'Your Heading',
          styles: {
            fontSize: '32px',
            color: '#1E293B',
            fontWeight: 'bold',
            textAlign: 'left'
          }
        }
      },
      {
        id: 'button',
        name: 'Button',
        icon: 'Square',
        description: 'Interactive button',
        defaultProps: {
          content: 'Click Me',
          styles: {
            backgroundColor: '#1E40AF',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }
        }
      },
      {
        id: 'divider',
        name: 'Divider',
        icon: 'Minus',
        description: 'Horizontal line separator',
        defaultProps: {
          content: '',
          styles: {
            width: '100%',
            height: '1px',
            backgroundColor: '#E2E8F0',
            margin: '20px 0'
          }
        }
      }
    ],
    layout: [
      {
        id: 'container',
        name: 'Container',
        icon: 'Box',
        description: 'Flexible container',
        defaultProps: {
          content: 'Container',
          styles: {
            padding: '20px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px'
          }
        }
      },
      {
        id: 'columns',
        name: 'Columns',
        icon: 'Columns',
        description: 'Multi-column layout',
        defaultProps: {
          content: 'Column Layout',
          styles: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            padding: '20px'
          }
        }
      },
      {
        id: 'hero',
        name: 'Hero Section',
        icon: 'Monitor',
        description: 'Large banner section',
        defaultProps: {
          content: 'Hero Section',
          styles: {
            padding: '80px 20px',
            textAlign: 'center',
            backgroundColor: '#1E40AF',
            color: '#FFFFFF',
            fontSize: '48px'
          }
        }
      },
      {
        id: 'card',
        name: 'Card',
        icon: 'CreditCard',
        description: 'Content card',
        defaultProps: {
          content: 'Card Content',
          styles: {
            padding: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }
        }
      }
    ],
    forms: [
      {
        id: 'input',
        name: 'Text Input',
        icon: 'Type',
        description: 'Text input field',
        defaultProps: {
          content: '',
          styles: {
            width: '100%',
            padding: '12px',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            fontSize: '16px'
          }
        }
      },
      {
        id: 'textarea',
        name: 'Textarea',
        icon: 'FileText',
        description: 'Multi-line text input',
        defaultProps: {
          content: '',
          styles: {
            width: '100%',
            padding: '12px',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            fontSize: '16px',
            minHeight: '120px',
            resize: 'vertical'
          }
        }
      },
      {
        id: 'form',
        name: 'Contact Form',
        icon: 'Mail',
        description: 'Complete contact form',
        defaultProps: {
          content: 'Contact Form',
          styles: {
            padding: '24px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px'
          }
        }
      }
    ],
    media: [
      {
        id: 'image',
        name: 'Image',
        icon: 'Image',
        description: 'Image element',
        defaultProps: {
          content: '',
          styles: {
            width: '100%',
            height: 'auto',
            borderRadius: '8px'
          }
        }
      },
      {
        id: 'video',
        name: 'Video',
        icon: 'Play',
        description: 'Video player',
        defaultProps: {
          content: '',
          styles: {
            width: '100%',
            height: '300px',
            backgroundColor: '#000000',
            borderRadius: '8px'
          }
        }
      },
      {
        id: 'gallery',
        name: 'Image Gallery',
        icon: 'Grid3X3',
        description: 'Image gallery grid',
        defaultProps: {
          content: 'Image Gallery',
          styles: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            padding: '20px'
          }
        }
      }
    ],
    navigation: [
      {
        id: 'navbar',
        name: 'Navigation Bar',
        icon: 'Menu',
        description: 'Top navigation',
        defaultProps: {
          content: 'Navigation',
          styles: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0'
          }
        }
      },
      {
        id: 'breadcrumb',
        name: 'Breadcrumb',
        icon: 'ChevronRight',
        description: 'Navigation breadcrumb',
        defaultProps: {
          content: 'Home > Page > Current',
          styles: {
            padding: '12px 0',
            fontSize: '14px',
            color: '#64748B'
          }
        }
      },
      {
        id: 'footer',
        name: 'Footer',
        icon: 'Minus',
        description: 'Page footer',
        defaultProps: {
          content: 'Footer Content',
          styles: {
            padding: '40px 24px',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            textAlign: 'center'
          }
        }
      }
    ]
  };

  const handleComponentDrag = (component, event) => {
    event.dataTransfer.setData('component', JSON.stringify(component));
  };

  const handleComponentClick = (component) => {
    const newElement = {
      id: `${component.id}-${Date.now()}`,
      type: component.id,
      position: { x: 50, y: 50 },
      size: { width: 'auto', height: 'auto' },
      ...component.defaultProps
    };
    onComponentAdd(newElement);
  };

  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-1010 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
    }`}>
      <div className="bg-surface border border-border rounded-lg shadow-lg w-72 max-h-96 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Components</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onToggle}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  activeCategory === category.id
                    ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={category.icon} size={14} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Components List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {components[activeCategory]?.map((component) => (
              <div
                key={component.id}
                className="p-3 border border-border rounded-lg hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing group"
                draggable
                onDragStart={(e) => handleComponentDrag(component, e)}
                onClick={() => handleComponentClick(component)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <Icon name={component.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                      {component.name}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      {component.description}
                    </p>
                  </div>
                  <Icon 
                    name="Plus" 
                    size={14} 
                    className="text-text-muted group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-text-muted mb-2">
              Drag components to canvas or click to add
            </p>
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
              fullWidth
            >
              View Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;