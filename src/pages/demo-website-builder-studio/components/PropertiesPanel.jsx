import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PropertiesPanel = ({ selectedElement, onElementUpdate, isCollapsed, onToggleCollapse }) => {
  const [activeTab, setActiveTab] = useState('content');

  const tabs = [
    { id: 'content', label: 'Content', icon: 'Type' },
    { id: 'style', label: 'Style', icon: 'Palette' },
    { id: 'layout', label: 'Layout', icon: 'Layout' },
    { id: 'advanced', label: 'Advanced', icon: 'Settings' }
  ];

  const handleContentChange = (field, value) => {
    if (selectedElement) {
      onElementUpdate(selectedElement.id, { [field]: value });
    }
  };

  const handleStyleChange = (property, value) => {
    if (selectedElement) {
      onElementUpdate(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          [property]: value
        }
      });
    }
  };

  const handlePositionChange = (axis, value) => {
    if (selectedElement) {
      onElementUpdate(selectedElement.id, {
        position: {
          ...selectedElement.position,
          [axis]: parseInt(value) || 0
        }
      });
    }
  };

  const handleSizeChange = (dimension, value) => {
    if (selectedElement) {
      onElementUpdate(selectedElement.id, {
        size: {
          ...selectedElement.size,
          [dimension]: value
        }
      });
    }
  };

  const renderContentTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Content
        </label>
        <textarea
          value={selectedElement?.content || ''}
          onChange={(e) => handleContentChange('content', e.target.value)}
          placeholder="Enter content..."
          className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      {selectedElement?.type === 'button' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Button Link
          </label>
          <Input
            type="url"
            placeholder="https://example.com"
            className="w-full"
          />
        </div>
      )}

      {selectedElement?.type === 'image' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Image Source
          </label>
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Image URL"
              className="w-full"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              fullWidth
            >
              Upload Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderStyleTab = () => (
    <div className="space-y-4">
      {/* Typography */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Typography</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Font Size</label>
            <Input
              type="text"
              value={selectedElement?.styles?.fontSize || '16px'}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              placeholder="16px"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Text Color</label>
            <div className="flex space-x-2">
              <Input
                type="color"
                value={selectedElement?.styles?.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="w-12 h-8 p-1"
              />
              <Input
                type="text"
                value={selectedElement?.styles?.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Text Align</label>
            <div className="grid grid-cols-3 gap-1">
              {['left', 'center', 'right'].map((align) => (
                <Button
                  key={align}
                  variant={selectedElement?.styles?.textAlign === align ? 'primary' : 'outline'}
                  size="sm"
                  iconName={align === 'left' ? 'AlignLeft' : align === 'center' ? 'AlignCenter' : 'AlignRight'}
                  onClick={() => handleStyleChange('textAlign', align)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Background</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Background Color</label>
            <div className="flex space-x-2">
              <Input
                type="color"
                value={selectedElement?.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="w-12 h-8 p-1"
              />
              <Input
                type="text"
                value={selectedElement?.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Border */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Border</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Border Radius</label>
            <Input
              type="text"
              value={selectedElement?.styles?.borderRadius || '0px'}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              placeholder="0px"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="space-y-4">
      {/* Position */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Position</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-text-secondary mb-1">X</label>
            <Input
              type="number"
              value={selectedElement?.position?.x || 0}
              onChange={(e) => handlePositionChange('x', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Y</label>
            <Input
              type="number"
              value={selectedElement?.position?.y || 0}
              onChange={(e) => handlePositionChange('y', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Size</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Width</label>
            <Input
              type="text"
              value={selectedElement?.size?.width || 'auto'}
              onChange={(e) => handleSizeChange('width', e.target.value)}
              placeholder="auto"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Height</label>
            <Input
              type="text"
              value={selectedElement?.size?.height || 'auto'}
              onChange={(e) => handleSizeChange('height', e.target.value)}
              placeholder="auto"
            />
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Spacing</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Padding</label>
            <Input
              type="text"
              value={selectedElement?.styles?.padding || '0px'}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              placeholder="0px"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Margin</label>
            <Input
              type="text"
              value={selectedElement?.styles?.margin || '0px'}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
              placeholder="0px"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Element Settings</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Element ID</label>
            <Input
              type="text"
              value={selectedElement?.id || ''}
              placeholder="element-id"
              disabled
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">CSS Classes</label>
            <Input
              type="text"
              placeholder="custom-class another-class"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Animations</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Animation Type</label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">None</option>
              <option value="fadeIn">Fade In</option>
              <option value="slideUp">Slide Up</option>
              <option value="slideDown">Slide Down</option>
              <option value="zoomIn">Zoom In</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Duration (ms)</label>
            <Input
              type="number"
              placeholder="300"
              min="0"
              max="5000"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return renderContentTab();
      case 'style':
        return renderStyleTab();
      case 'layout':
        return renderLayoutTab();
      case 'advanced':
        return renderAdvancedTab();
      default:
        return renderContentTab();
    }
  };

  if (!selectedElement) {
    return (
      <div className={`bg-surface border-l border-border transition-all duration-300 ${
        isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
      } lg:w-80 flex flex-col h-full`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Properties</h2>
            <Button
              variant="ghost"
              size="sm"
              iconName={isCollapsed ? "ChevronLeft" : "ChevronRight"}
              onClick={onToggleCollapse}
              className="lg:hidden"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Icon name="MousePointer" size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No Element Selected</h3>
            <p className="text-text-secondary">Click on an element in the canvas to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface border-l border-border transition-all duration-300 ${
      isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
    } lg:w-80 flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Properties</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronLeft" : "ChevronRight"}
            onClick={onToggleCollapse}
            className="lg:hidden"
          />
        </div>

        {/* Element Info */}
        <div className="flex items-center space-x-2 p-2 bg-primary-50 rounded-md">
          <Icon name="Square" size={16} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-text-primary capitalize">
              {selectedElement.type}
            </div>
            <div className="text-xs text-text-secondary">
              {selectedElement.id}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderTabContent()}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Copy"
          iconPosition="left"
          fullWidth
        >
          Duplicate Element
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Trash2"
          iconPosition="left"
          fullWidth
          className="text-error border-error hover:bg-error-50"
        >
          Delete Element
        </Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;