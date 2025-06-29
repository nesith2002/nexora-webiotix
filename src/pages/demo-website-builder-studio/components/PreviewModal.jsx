import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreviewModal = ({ isOpen, onClose, websiteData }) => {
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const devices = [
    { id: 'desktop', label: 'Desktop', icon: 'Monitor', width: '100%', height: '100%' },
    { id: 'tablet', label: 'Tablet', icon: 'Tablet', width: '768px', height: '1024px' },
    { id: 'mobile', label: 'Mobile', icon: 'Smartphone', width: '375px', height: '667px' }
  ];

  const mockWebsiteContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo Website Preview</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; line-height: 1.6; }
            .header { background: #1E40AF; color: white; padding: 20px; text-align: center; }
            .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
            .hero h1 { font-size: 48px; margin-bottom: 20px; }
            .content { padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
            .cta-button { background: #0EA5E9; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 20px auto; display: block; }
            .footer { background: #1E293B; color: white; padding: 40px 20px; text-align: center; }
            @media (max-width: 768px) {
                .hero h1 { font-size: 32px; }
                .hero { padding: 60px 20px; }
            }
        </style>
    </head>
    <body>
        <header class="header">
            <h2>Welcome to Our Company</h2>
        </header>
        
        <section class="hero">
            <h1>Transform Your Business with Our Solutions</h1>
            <p>We provide cutting-edge technology solutions to help your business grow and succeed in the digital age.</p>
        </section>
        
        <section class="content">
            <h2>About Our Services</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <button class="cta-button">Get Started Today</button>
            
            <h3>Why Choose Us?</h3>
            <ul style="margin: 20px 0; padding-left: 20px;">
                <li>Expert team with years of experience</li>
                <li>Cutting-edge technology solutions</li>
                <li>24/7 customer support</li>
                <li>Competitive pricing</li>
            </ul>
        </section>
        
        <footer class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </footer>
    </body>
    </html>
  `;

  const handleDeviceChange = (deviceId) => {
    setPreviewDevice(deviceId);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleShare = () => {
    // Mock share functionality
    navigator.clipboard.writeText('https://demo.nexora-webiotix.com/preview/abc123');
    // Show toast notification (would be implemented with a toast system)
    alert('Preview link copied to clipboard!');
  };

  const handleOpenInNewTab = () => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(mockWebsiteContent);
    newWindow.document.close();
  };

  if (!isOpen) return null;

  const currentDevice = devices.find(d => d.id === previewDevice);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 ${
      isFullscreen ? 'p-0' : 'p-4'
    }`}>
      <div className={`bg-surface rounded-lg shadow-xl flex flex-col ${
        isFullscreen ? 'w-full h-full rounded-none' : 'max-w-6xl w-full max-h-[90vh]'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-text-primary">Website Preview</h2>
            
            {/* Device Selector */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {devices.map((device) => (
                <Button
                  key={device.id}
                  variant={previewDevice === device.id ? 'primary' : 'ghost'}
                  size="sm"
                  iconName={device.icon}
                  onClick={() => handleDeviceChange(device.id)}
                  className="hidden sm:flex"
                >
                  {device.label}
                </Button>
              ))}
              
              {/* Mobile Device Selector */}
              <select
                value={previewDevice}
                onChange={(e) => handleDeviceChange(e.target.value)}
                className="sm:hidden px-2 py-1 border border-border rounded bg-surface text-text-primary focus:outline-none"
              >
                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Preview Actions */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              onClick={handleShare}
              className="hidden md:flex"
            >
              Share
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              onClick={handleOpenInNewTab}
              className="hidden md:flex"
            >
              Open in New Tab
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName={isFullscreen ? "Minimize2" : "Maximize2"}
              onClick={toggleFullscreen}
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 bg-muted p-4 overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <div
              className="bg-white shadow-lg transition-all duration-300 overflow-hidden"
              style={{
                width: currentDevice.width,
                height: isFullscreen ? '100%' : currentDevice.height,
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: previewDevice === 'mobile' ? '24px' : '8px',
                border: previewDevice === 'mobile' ? '8px solid #1f2937' : '1px solid #e5e7eb'
              }}
            >
              {/* Device Frame for Mobile */}
              {previewDevice === 'mobile' && (
                <div className="bg-gray-800 h-6 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
                </div>
              )}
              
              {/* Website Content */}
              <iframe
                srcDoc={mockWebsiteContent}
                className="w-full h-full border-none"
                title="Website Preview"
                style={{
                  height: previewDevice === 'mobile' ? 'calc(100% - 24px)' : '100%'
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Monitor" size={14} />
                <span>Resolution: {currentDevice.width} × {currentDevice.height}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Zap" size={14} />
                <span>Live Preview</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Mobile Actions */}
              <div className="md:hidden flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share"
                  onClick={handleShare}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={handleOpenInNewTab}
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                Close Preview
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;