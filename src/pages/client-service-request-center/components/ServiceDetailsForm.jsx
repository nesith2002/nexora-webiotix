import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceDetailsForm = ({ serviceType, formData, onFormDataChange, onFileUpload, uploadedFiles }) => {
  const handleInputChange = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    onFileUpload(files);
  };

  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    onFileUpload(newFiles);
  };

  const renderWebDevelopmentFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Website Type *
          </label>
          <select
            value={formData.websiteType || ''}
            onChange={(e) => handleInputChange('websiteType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select website type</option>
            <option value="business">Business Website</option>
            <option value="ecommerce">E-commerce Store</option>
            <option value="portfolio">Portfolio</option>
            <option value="blog">Blog/News</option>
            <option value="landing">Landing Page</option>
            <option value="custom">Custom Application</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Technology Preference
          </label>
          <select
            value={formData.technology || ''}
            onChange={(e) => handleInputChange('technology', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">No preference</option>
            <option value="react">React.js</option>
            <option value="vue">Vue.js</option>
            <option value="angular">Angular</option>
            <option value="wordpress">WordPress</option>
            <option value="shopify">Shopify</option>
            <option value="custom">Custom Solution</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Key Features Required
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'User Authentication',
            'Payment Integration',
            'Content Management',
            'Search Functionality',
            'Mobile App',
            'Analytics Dashboard',
            'Email Integration',
            'Social Media Integration',
            'Multi-language Support',
            'SEO Optimization',
            'Live Chat',
            'API Integration'
          ].map((feature) => (
            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.features?.includes(feature) || false}
                onChange={(e) => {
                  const features = formData.features || [];
                  if (e.target.checked) {
                    handleInputChange('features', [...features, feature]);
                  } else {
                    handleInputChange('features', features.filter(f => f !== feature));
                  }
                }}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppDevelopmentFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Platform *
          </label>
          <div className="space-y-2">
            {['iOS', 'Android', 'Cross-platform (React Native)', 'Cross-platform (Flutter)', 'Web App (PWA)'].map((platform) => (
              <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.platforms?.includes(platform) || false}
                  onChange={(e) => {
                    const platforms = formData.platforms || [];
                    if (e.target.checked) {
                      handleInputChange('platforms', [...platforms, platform]);
                    } else {
                      handleInputChange('platforms', platforms.filter(p => p !== platform));
                    }
                  }}
                  className="rounded border-border text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-primary">{platform}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            App Category
          </label>
          <select
            value={formData.appCategory || ''}
            onChange={(e) => handleInputChange('appCategory', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select category</option>
            <option value="business">Business & Productivity</option>
            <option value="ecommerce">E-commerce & Shopping</option>
            <option value="social">Social Networking</option>
            <option value="education">Education & Learning</option>
            <option value="health">Health & Fitness</option>
            <option value="entertainment">Entertainment & Media</option>
            <option value="finance">Finance & Banking</option>
            <option value="travel">Travel & Navigation</option>
            <option value="utility">Utilities & Tools</option>
            <option value="games">Games & Gaming</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Core Functionality
        </label>
        <textarea
          value={formData.coreFunctionality || ''}
          onChange={(e) => handleInputChange('coreFunctionality', e.target.value)}
          placeholder="Describe the main features and functionality of your app..."
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );

  const renderAIDevelopmentFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            AI Solution Type *
          </label>
          <select
            value={formData.aiType || ''}
            onChange={(e) => handleInputChange('aiType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select AI solution</option>
            <option value="chatbot">Chatbot & Virtual Assistant</option>
            <option value="ml">Machine Learning Model</option>
            <option value="nlp">Natural Language Processing</option>
            <option value="computer-vision">Computer Vision</option>
            <option value="recommendation">Recommendation System</option>
            <option value="automation">Process Automation</option>
            <option value="analytics">Predictive Analytics</option>
            <option value="custom">Custom AI Solution</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Data Sources
          </label>
          <div className="space-y-2">
            {['Existing Database', 'CSV/Excel Files', 'API Integration', 'Real-time Data Streams', 'Image/Video Files', 'Text Documents', 'Web Scraping', 'IoT Sensors'].map((source) => (
              <label key={source} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dataSources?.includes(source) || false}
                  onChange={(e) => {
                    const sources = formData.dataSources || [];
                    if (e.target.checked) {
                      handleInputChange('dataSources', [...sources, source]);
                    } else {
                      handleInputChange('dataSources', sources.filter(s => s !== source));
                    }
                  }}
                  className="rounded border-border text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-primary">{source}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Use Case Description *
        </label>
        <textarea
          value={formData.useCase || ''}
          onChange={(e) => handleInputChange('useCase', e.target.value)}
          placeholder="Describe your AI use case, expected outcomes, and business objectives..."
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );

  const renderTanningFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Service Type *
          </label>
          <select
            value={formData.tanningType || ''}
            onChange={(e) => handleInputChange('tanningType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select service</option>
            <option value="spray-tan">Spray Tanning</option>
            <option value="uv-tanning">UV Tanning</option>
            <option value="sunless">Sunless Tanning</option>
            <option value="mobile">Mobile Tanning Service</option>
            <option value="consultation">Tanning Consultation</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Preferred Location
          </label>
          <select
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select location</option>
            <option value="salon">At Salon</option>
            <option value="home">At Home (Mobile Service)</option>
            <option value="office">At Office</option>
            <option value="event">Event Location</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Preferred Date
          </label>
          <Input
            type="date"
            value={formData.preferredDate || ''}
            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Preferred Time
          </label>
          <select
            value={formData.preferredTime || ''}
            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select time</option>
            <option value="morning">Morning (9 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
            <option value="evening">Evening (5 PM - 8 PM)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderIoTFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            IoT Solution Type *
          </label>
          <select
            value={formData.iotType || ''}
            onChange={(e) => handleInputChange('iotType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select IoT solution</option>
            <option value="smart-home">Smart Home Automation</option>
            <option value="industrial">Industrial IoT</option>
            <option value="agriculture">Smart Agriculture</option>
            <option value="healthcare">Healthcare IoT</option>
            <option value="retail">Smart Retail</option>
            <option value="transportation">Smart Transportation</option>
            <option value="energy">Energy Management</option>
            <option value="security">Security & Surveillance</option>
            <option value="custom">Custom IoT Solution</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Robotics Integration
          </label>
          <select
            value={formData.robotics || ''}
            onChange={(e) => handleInputChange('robotics', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">No robotics needed</option>
            <option value="automation">Process Automation</option>
            <option value="service">Service Robots</option>
            <option value="manufacturing">Manufacturing Robots</option>
            <option value="delivery">Delivery Robots</option>
            <option value="cleaning">Cleaning Robots</option>
            <option value="custom">Custom Robotics</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Sensors & Hardware Requirements
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Temperature Sensors',
            'Motion Detectors',
            'Camera Systems',
            'GPS Tracking',
            'Environmental Sensors',
            'Pressure Sensors',
            'Smart Switches',
            'Voice Control',
            'Biometric Sensors',
            'RFID/NFC',
            'Wireless Connectivity',
            'Edge Computing'
          ].map((hardware) => (
            <label key={hardware} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hardware?.includes(hardware) || false}
                onChange={(e) => {
                  const hardwareList = formData.hardware || [];
                  if (e.target.checked) {
                    handleInputChange('hardware', [...hardwareList, hardware]);
                  } else {
                    handleInputChange('hardware', hardwareList.filter(h => h !== hardware));
                  }
                }}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">{hardware}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case 'web-development':
        return renderWebDevelopmentFields();
      case 'app-development':
        return renderAppDevelopmentFields();
      case 'ai-development':
        return renderAIDevelopmentFields();
      case 'tanning':
        return renderTanningFields();
      case 'iot-robotics':
        return renderIoTFields();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Service-specific fields */}
      {renderServiceSpecificFields()}

      {/* Common fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Project Description *
          </label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Provide a detailed description of your project requirements, goals, and any specific needs..."
            rows={5}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Target Audience
            </label>
            <Input
              type="text"
              value={formData.targetAudience || ''}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              placeholder="e.g., Small businesses, Young professionals, Students"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Geographic Focus
            </label>
            <Input
              type="text"
              value={formData.geographic || ''}
              onChange={(e) => handleInputChange('geographic', e.target.value)}
              placeholder="e.g., Local, National, Global"
            />
          </div>
        </div>

        {/* File Upload Section */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Reference Materials
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary-300 transition-colors duration-200">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
              <p className="text-sm text-text-secondary mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-text-muted">
                PDF, DOC, Images, ZIP files up to 10MB each
              </p>
            </label>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium text-text-primary">Uploaded Files:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="File" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{file.name}</span>
                    <span className="text-xs text-text-muted">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => removeFile(index)}
                    className="text-error hover:text-error-700"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsForm;