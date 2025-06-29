import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('figma');
  const [exportOptions, setExportOptions] = useState({
    includeAssets: true,
    optimizeImages: true,
    generateResponsive: true,
    includeAnimations: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const exportFormats = [
    {
      id: 'figma',
      name: 'Figma',
      icon: 'Figma',
      description: 'Export as Figma design file',
      price: 9.99,
      features: ['Editable layers', 'Component library', 'Design tokens', 'Auto-layout']
    },
    {
      id: 'html',
      name: 'HTML/CSS',
      icon: 'Code',
      description: 'Export as HTML and CSS files',
      price: 0,
      features: ['Clean code', 'Responsive design', 'Cross-browser compatible', 'SEO optimized']
    },
    {
      id: 'react',
      name: 'React Components',
      icon: 'Component',
      description: 'Export as React components',
      price: 14.99,
      features: ['JSX components', 'Props interface', 'TypeScript support', 'Styled components']
    },
    {
      id: 'pdf',
      name: 'PDF Design',
      icon: 'FileText',
      description: 'Export as PDF document',
      price: 4.99,
      features: ['High resolution', 'Print ready', 'Multiple pages', 'Vector graphics']
    }
  ];

  const handleExport = async () => {
    const selectedFormatData = exportFormats.find(f => f.id === selectedFormat);
    
    if (selectedFormatData.price > 0) {
      setShowPayment(true);
      return;
    }

    setIsProcessing(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsProcessing(false);
      onExport({
        format: selectedFormat,
        options: exportOptions
      });
      onClose();
    }, 3000);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setIsProcessing(true);
    
    // Simulate export process after payment
    setTimeout(() => {
      setIsProcessing(false);
      onExport({
        format: selectedFormat,
        options: exportOptions
      });
      onClose();
    }, 3000);
  };

  const toggleOption = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  if (!isOpen) return null;

  if (showPayment) {
    const selectedFormatData = exportFormats.find(f => f.id === selectedFormat);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
        <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Payment Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary">Complete Purchase</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowPayment(false)}
              />
            </div>
          </div>

          {/* Payment Content */}
          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-3">Order Summary</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={selectedFormatData.icon} size={20} className="text-primary" />
                  <div>
                    <div className="font-medium text-text-primary">{selectedFormatData.name} Export</div>
                    <div className="text-sm text-text-secondary">{selectedFormatData.description}</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-text-primary">
                  ${selectedFormatData.price}
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  defaultValue="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Card Number
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  defaultValue="4242 4242 4242 4242"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Date
                  </label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    CVC
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    defaultValue="123"
                  />
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start space-x-2 p-3 bg-success-50 rounded-lg">
              <Icon name="Shield" size={16} className="text-success-600 mt-0.5" />
              <div className="text-sm text-success-700">
                Your payment is secured with 256-bit SSL encryption
              </div>
            </div>
          </div>

          {/* Payment Actions */}
          <div className="p-6 border-t border-border">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowPayment(false)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                fullWidth
                iconName="CreditCard"
                iconPosition="left"
                onClick={handlePaymentComplete}
              >
                Pay ${selectedFormatData.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Export Website</h2>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
          <p className="text-text-secondary mt-2">
            Choose your export format and customize options
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Formats */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportFormats.map((format) => (
                <div
                  key={format.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedFormat === format.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-muted'
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon name={format.icon} size={24} className="text-primary" />
                      <div>
                        <h4 className="font-medium text-text-primary">{format.name}</h4>
                        <p className="text-sm text-text-secondary">{format.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {format.price > 0 ? (
                        <span className="text-lg font-semibold text-primary">${format.price}</span>
                      ) : (
                        <span className="text-sm font-medium text-success-600">Free</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {format.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={14} className="text-success-500" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Export Options</h3>
            <div className="space-y-3">
              {Object.entries(exportOptions).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => toggleOption(key)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <span className="text-text-primary">
                    {key === 'includeAssets' && 'Include all assets and images'}
                    {key === 'optimizeImages' && 'Optimize images for web'}
                    {key === 'generateResponsive' && 'Generate responsive breakpoints'}
                    {key === 'includeAnimations' && 'Include CSS animations'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-2">Export Preview</h4>
            <div className="text-sm text-text-secondary space-y-1">
              <div>Format: {exportFormats.find(f => f.id === selectedFormat)?.name}</div>
              <div>Estimated file size: ~2.5 MB</div>
              <div>Processing time: ~30 seconds</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              iconName={isProcessing ? "Loader2" : "Download"}
              iconPosition="left"
              loading={isProcessing}
              onClick={handleExport}
            >
              {isProcessing ? 'Processing...' : 'Export Website'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;