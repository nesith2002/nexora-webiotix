import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ServiceNavigationBreadcrumbs from '../../components/ui/ServiceNavigationBreadcrumbs';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import TestimonialsSection from './components/TestimonialsSection';
import PortfolioHighlights from './components/PortfolioHighlights';
import CompanyCredentials from './components/CompanyCredentials';
import FloatingCTA from './components/FloatingCTA';

const ServiceLandingHub = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = (source = 'hero') => {
    // Navigate to service request center
    window.location.href = '/client-service-request-center';
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    // Navigate to service request center with pre-selected service
    window.location.href = `/client-service-request-center?service=${service.id}`;
  };

  const breadcrumbs = [
    { label: 'Home', path: '/', icon: 'Home', isActive: false },
    { label: 'Services', path: '/service-landing-hub', icon: 'Grid3X3', isActive: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
            </motion.div>
          </div>
          <div className="text-lg font-semibold text-text-primary">Loading Services...</div>
          <div className="text-sm text-text-secondary">Preparing your digital solutions</div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Services - Nexora Webiotix | Web Development, AI, IoT & More</title>
        <meta 
          name="description" 
          content="Explore Nexora Webiotix's comprehensive digital services including web development, mobile apps, AI solutions, IoT robotics, and tanning equipment. Transform your business with cutting-edge technology." 
        />
        <meta name="keywords" content="web development, mobile app development, AI solutions, IoT robotics, tanning equipment, digital transformation, technology services" />
        <meta property="og:title" content="Services - Nexora Webiotix | Complete Digital Solutions" />
        <meta property="og:description" content="Discover our full range of technology services designed to transform your business and drive growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/service-landing-hub`} />
        <link rel="canonical" href={`${window.location.origin}/service-landing-hub`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Breadcrumbs */}
          <div className="bg-surface border-b border-border py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ServiceNavigationBreadcrumbs customBreadcrumbs={breadcrumbs} />
            </div>
          </div>

          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Section */}
            <HeroSection onGetStarted={handleGetStarted} />

            {/* Services Grid */}
            <ServicesGrid 
              onServiceSelect={handleServiceSelect}
              onGetStarted={handleGetStarted}
            />

            {/* Portfolio Highlights */}
            <PortfolioHighlights />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Company Credentials */}
            <CompanyCredentials />
          </motion.div>

          {/* Floating CTA */}
          <FloatingCTA onGetStarted={handleGetStarted} />
        </main>

        {/* Footer */}
        <footer className="bg-text-primary text-surface py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="text-xl font-semibold">Nexora Webiotix</span>
                </div>
                <p className="text-surface/80 text-sm leading-relaxed">
                  Transforming businesses through innovative technology solutions and exceptional digital experiences.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-surface/60 hover:text-surface transition-colors duration-200">
                    <span className="sr-only">Facebook</span>
                    <div className="w-6 h-6 bg-surface/20 rounded"></div>
                  </a>
                  <a href="#" className="text-surface/60 hover:text-surface transition-colors duration-200">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-surface/20 rounded"></div>
                  </a>
                  <a href="#" className="text-surface/60 hover:text-surface transition-colors duration-200">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-surface/20 rounded"></div>
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">Web Development</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">Mobile Apps</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">AI Solutions</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">IoT Robotics</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">Tanning Equipment</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">About Us</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">Contact</a></li>
                  <li><a href="#" className="text-surface/80 hover:text-surface transition-colors duration-200">Support</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-surface/80">
                  <li>123 Tech Street</li>
                  <li>Innovation City, IC 12345</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Email: info@nexorawebiotix.com</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-surface/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-surface/60 text-sm">
                © {new Date().getFullYear()} Nexora Webiotix. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-surface/60 hover:text-surface text-sm transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-surface/60 hover:text-surface text-sm transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-surface/60 hover:text-surface text-sm transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ServiceLandingHub;