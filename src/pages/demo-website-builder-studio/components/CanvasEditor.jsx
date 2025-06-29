import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CanvasEditor = ({ 
  selectedTemplate, 
  selectedElement, 
  onElementSelect, 
  onElementUpdate,
  viewMode,
  onViewModeChange 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasScale, setCanvasScale] = useState(1);
  const canvasRef = useRef(null);

  const viewModes = [
    { id: 'desktop', label: 'Desktop', icon: 'Monitor', width: '100%' },
    { id: 'tablet', label: 'Tablet', icon: 'Tablet', width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: 'Smartphone', width: '375px' }
  ];

  const mockElements = [
    {
      id: 'header-1',
      type: 'header',
      content: 'Welcome to Our Company',
      position: { x: 0, y: 0 },
      size: { width: '100%', height: '80px' },
      styles: {
        backgroundColor: '#1E40AF',
        color: '#FFFFFF',
        fontSize: '24px',
        textAlign: 'center',
        padding: '20px'
      }
    },
    {
      id: 'hero-1',
      type: 'hero',
      content: 'Transform Your Business with Our Solutions',
      position: { x: 0, y: 80 },
      size: { width: '100%', height: '400px' },
      styles: {
        backgroundColor: '#F8FAFC',
        color: '#1E293B',
        fontSize: '48px',
        textAlign: 'center',
        padding: '100px 20px',
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }
    },
    {
      id: 'content-1',
      type: 'content',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      position: { x: 0, y: 480 },
      size: { width: '100%', height: '200px' },
      styles: {
        backgroundColor: '#FFFFFF',
        color: '#64748B',
        fontSize: '16px',
        textAlign: 'left',
        padding: '40px'
      }
    },
    {
      id: 'cta-1',
      type: 'button',
      content: 'Get Started Today',
      position: { x: 0, y: 680 },
      size: { width: '200px', height: '50px' },
      styles: {
        backgroundColor: '#0EA5E9',
        color: '#FFFFFF',
        fontSize: '16px',
        textAlign: 'center',
        padding: '15px 30px',
        borderRadius: '8px',
        margin: '20px auto',
        display: 'block'
      }
    }
  ];

  const [elements, setElements] = useState(mockElements);

  const handleElementClick = (element, event) => {
    event.stopPropagation();
    onElementSelect(element);
  };

  const handleElementDragStart = (element, event) => {
    setIsDragging(true);
    const rect = event.target.getBoundingClientRect();
    setDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleElementDrag = (element, event) => {
    if (!isDragging) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = event.clientX - canvasRect.left - dragOffset.x;
    const newY = event.clientY - canvasRect.top - dragOffset.y;

    const updatedElements = elements.map(el =>
      el.id === element.id
        ? { ...el, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
        : el
    );
    
    setElements(updatedElements);
    onElementUpdate(element.id, { position: { x: newX, y: newY } });
  };

  const handleElementDragEnd = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (event) => {
    if (event.target === canvasRef.current) {
      onElementSelect(null);
    }
  };

  const handleZoomIn = () => {
    setCanvasScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setCanvasScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setCanvasScale(1);
  };

  const getCurrentViewWidth = () => {
    const currentMode = viewModes.find(mode => mode.id === viewMode);
    return currentMode ? currentMode.width : '100%';
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging && selectedElement) {
        handleElementDrag(selectedElement, event);
      }
    };

    const handleMouseUp = () => {
      handleElementDragEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, selectedElement]);

  return (
    <div className="flex-1 bg-muted flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-surface border-b border-border p-3 flex items-center justify-between">
        {/* View Mode Selector */}
        <div className="flex items-center space-x-2">
          {viewModes.map((mode) => (
            <Button
              key={mode.id}
              variant={viewMode === mode.id ? 'primary' : 'ghost'}
              size="sm"
              iconName={mode.icon}
              onClick={() => onViewModeChange(mode.id)}
              className="hidden sm:flex"
            >
              {mode.label}
            </Button>
          ))}
          
          {/* Mobile View Mode Selector */}
          <select
            value={viewMode}
            onChange={(e) => onViewModeChange(e.target.value)}
            className="sm:hidden px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {viewModes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ZoomOut"
            onClick={handleZoomOut}
            disabled={canvasScale <= 0.5}
          />
          <span className="text-sm text-text-secondary min-w-[60px] text-center">
            {Math.round(canvasScale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="ZoomIn"
            onClick={handleZoomIn}
            disabled={canvasScale >= 2}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={handleZoomReset}
          />
        </div>

        {/* Canvas Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Grid3X3"
            className="hidden md:flex"
          >
            Grid
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Layers"
            className="hidden md:flex"
          >
            Layers
          </Button>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div
            className="bg-surface shadow-lg transition-all duration-300"
            style={{
              width: getCurrentViewWidth(),
              maxWidth: '100%',
              transform: `scale(${canvasScale})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Canvas */}
            <div
              ref={canvasRef}
              className="relative min-h-screen bg-white cursor-default"
              onClick={handleCanvasClick}
              style={{ minHeight: '800px' }}
            >
              {/* Grid Overlay */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Elements */}
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move transition-all duration-150 ${
                    selectedElement?.id === element.id
                      ? 'ring-2 ring-primary ring-offset-2' :'hover:ring-1 hover:ring-accent hover:ring-offset-1'
                  }`}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    width: element.size.width,
                    height: element.size.height,
                    ...element.styles
                  }}
                  onClick={(e) => handleElementClick(element, e)}
                  onMouseDown={(e) => handleElementDragStart(element, e)}
                >
                  {element.content}
                  
                  {/* Element Controls */}
                  {selectedElement?.id === element.id && (
                    <div className="absolute -top-8 left-0 flex items-center space-x-1 bg-primary text-white px-2 py-1 rounded-md text-xs">
                      <Icon name="Move" size={12} />
                      <span>{element.type}</span>
                      <Button
                        variant="ghost"
                        size="2xs"
                        iconName="X"
                        className="text-white hover:bg-primary-600 ml-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          onElementSelect(null);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Drop Zones */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Add visual drop zones here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-surface border-t border-border px-4 py-2 flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>Elements: {elements.length}</span>
          <span>Canvas: {getCurrentViewWidth()}</span>
          {selectedElement && (
            <span className="text-primary">
              Selected: {selectedElement.type}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Wifi" size={14} className="text-success-500" />
          <span>Auto-saved</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;