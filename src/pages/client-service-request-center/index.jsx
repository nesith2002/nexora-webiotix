import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/ui/AuthenticatedNavigation';
import ServiceNavigationBreadcrumbs from '../../components/ui/ServiceNavigationBreadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import ProgressIndicator from './components/ProgressIndicator';
import ServiceTypeCard from './components/ServiceTypeCard';
import ServiceDetailsForm from './components/ServiceDetailsForm';
import BudgetTimelineForm from './components/BudgetTimelineForm';
import ContactInformationForm from './components/ContactInformationForm';
import ReviewSubmitForm from './components/ReviewSubmitForm';
import RequestSummary from './components/RequestSummary';
import SuccessConfirmation from './components/SuccessConfirmation';
import Button from '../../components/ui/Button';


const ClientServiceRequestCenter = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const totalSteps = 4;
  const steps = [
    { title: 'Service Type', subtitle: 'Choose your service' },
    { title: 'Requirements', subtitle: 'Project details' },
    { title: 'Budget & Timeline', subtitle: 'Planning & pricing' },
    { title: 'Contact & Review', subtitle: 'Final details' }
  ];

  const services = [
    {
      id: 'web-development',
      name: 'Web Development',
      icon: 'Globe',
      description: 'Custom websites, web applications, and e-commerce solutions built with modern technologies.',
      features: ['Responsive Design', 'SEO Optimized', 'CMS Integration', 'E-commerce'],
      startingPrice: '$2,500'
    },
    {
      id: 'app-development',
      name: 'App Development',
      icon: 'Smartphone',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      features: ['iOS & Android', 'Cross-platform', 'API Integration', 'App Store Deployment'],
      startingPrice: '$8,000'
    },
    {
      id: 'ai-development',
      name: 'AI Development',
      icon: 'Brain',
      description: 'Artificial intelligence solutions including machine learning, chatbots, and automation.',
      features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Automation'],
      startingPrice: '$15,000'
    },
    {
      id: 'tanning',
      name: 'Tanning Services',
      icon: 'Sun',
      description: 'Professional tanning services including spray tanning, UV tanning, and mobile services.',
      features: ['Spray Tanning', 'UV Tanning', 'Mobile Service', 'Consultation'],
      startingPrice: '$50'
    },
    {
      id: 'iot-robotics',
      name: 'IoT & Robotics',
      icon: 'Cpu',
      description: 'Internet of Things solutions and robotics automation for smart homes and businesses.',
      features: ['Smart Automation', 'Sensor Integration', 'Remote Monitoring', 'Custom Hardware'],
      startingPrice: '$12,000'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setHasUnsavedChanges(currentStep > 1 && !isSubmitted);
  }, [currentStep, isSubmitted]);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setFormData({ ...formData, serviceType: serviceId });
    setHasUnsavedChanges(true);
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
    setHasUnsavedChanges(true);
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
    setFormData({ ...formData, uploadedFiles: files });
    setHasUnsavedChanges(true);
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedService) {
      alert('Please select a service type to continue.');
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepEdit = (step) => {
    setCurrentStep(step);
  };

  const handleSaveDraft = () => {
    // Save draft functionality
    const draftData = {
      ...formData,
      selectedService,
      uploadedFiles,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('serviceRequestDraft', JSON.stringify(draftData));
    setHasUnsavedChanges(false);
    
    // Show success message
    alert('Draft saved successfully!');
  };

  const handlePreview = () => {
    // Preview functionality
    console.log('Preview request:', { formData, selectedService, uploadedFiles });
  };

  const handleSubmit = async (submissionData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const requestData = {
        ...formData,
        serviceType: selectedService,
        uploadedFiles,
        submissionData,
        submittedAt: new Date().toISOString()
      };
      
      console.log('Submitting request:', requestData);
      
      // Clear draft from localStorage
      localStorage.removeItem('serviceRequestDraft');
      
      setIsSubmitted(true);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRequest = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setFormData({});
    setUploadedFiles([]);
    setIsSubmitted(false);
    setHasUnsavedChanges(false);
  };

  const handleViewDashboard = () => {
    window.location.href = '/client-project-dashboard';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Choose Your Service
              </h2>
              <p className="text-text-secondary">
                Select the service that best matches your project needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceTypeCard
                  key={service.id}
                  service={service}
                  isSelected={selectedService === service.id}
                  onSelect={handleServiceSelect}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Project Requirements
              </h2>
              <p className="text-text-secondary">
                Tell us more about your project requirements and goals.
              </p>
            </div>
            
            <ServiceDetailsForm
              serviceType={selectedService}
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Budget & Timeline
              </h2>
              <p className="text-text-secondary">
                Help us understand your budget range and timeline expectations.
              </p>
            </div>
            
            <BudgetTimelineForm
              formData={formData}
              onFormDataChange={handleFormDataChange}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Contact Information & Review
              </h2>
              <p className="text-text-secondary">
                Provide your contact details and review your request before submission.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactInformationForm
                  formData={formData}
                  onFormDataChange={handleFormDataChange}
                />
                
                <div className="mt-8 pt-8 border-t border-border">
                  <ReviewSubmitForm
                    formData={formData}
                    serviceType={selectedService}
                    onEdit={handleStepEdit}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <RequestSummary
                  formData={formData}
                  serviceType={selectedService}
                  onEdit={handleStepEdit}
                  isVisible={true}
                  isMobile={false}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <SuccessConfirmation
        requestData={{ ...formData, serviceType: selectedService }}
        onNewRequest={handleNewRequest}
        onViewDashboard={handleViewDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation userRole="client" userName="John Doe" />
      
      <div className="pt-16">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          steps={steps}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <ServiceNavigationBreadcrumbs />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-8 border-t border-border">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ArrowLeft"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex-1 sm:flex-none justify-center"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="lg"
                      iconName="Save"
                      onClick={handleSaveDraft}
                      className="flex-1 sm:flex-none justify-center"
                    >
                      Save Draft
                    </Button>
                    
                    <Button
                      variant="primary"
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={handleNext}
                      className="flex-1 sm:flex-none justify-center"
                    >
                      {currentStep === totalSteps ? 'Review' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Desktop Summary Sidebar */}
            {currentStep > 1 && currentStep < 4 && !isMobile && (
              <div className="lg:col-span-1">
                <RequestSummary
                  formData={formData}
                  serviceType={selectedService}
                  onEdit={handleStepEdit}
                  isVisible={true}
                  isMobile={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Summary Bottom Sheet */}
      {currentStep > 1 && currentStep < 4 && isMobile && (
        <RequestSummary
          formData={formData}
          serviceType={selectedService}
          onEdit={handleStepEdit}
          isVisible={true}
          isMobile={true}
        />
      )}
      
      <QuickActionToolbar
        workflowType="service-request"
        onSave={handleSaveDraft}
        onPreview={handlePreview}
        onExport={handleSubmit}
        hasUnsavedChanges={hasUnsavedChanges}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ClientServiceRequestCenter;