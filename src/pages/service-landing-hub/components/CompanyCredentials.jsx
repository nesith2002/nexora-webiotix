import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyCredentials = () => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });

  const finalStats = {
    projects: 500,
    clients: 200,
    experience: 5,
    satisfaction: 98
  };

  const certifications = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "Quality Management System",
      icon: "Award",
      issuer: "International Organization for Standardization",
      year: "2023",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      id: 2,
      name: "AWS Certified",
      description: "Cloud Solutions Architecture",
      icon: "Cloud",
      issuer: "Amazon Web Services",
      year: "2024",
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    {
      id: 3,
      name: "Google Partner",
      description: "Digital Marketing & Analytics",
      icon: "TrendingUp",
      issuer: "Google",
      year: "2023",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      id: 4,
      name: "Microsoft Certified",
      description: "Azure Cloud Platform",
      icon: "Server",
      issuer: "Microsoft",
      year: "2024",
      color: "text-purple-600",
      bg: "bg-purple-100"
    }
  ];

  const partnerships = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop",
      description: "Strategic Technology Partnership"
    },
    {
      id: 2,
      name: "InnovateHub",
      logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=120&h=60&fit=crop",
      description: "Innovation & Research Collaboration"
    },
    {
      id: 3,
      name: "GlobalTech Alliance",
      logo: "https://images.pixabay.com/photo/2016/12/30/10/03/logo-1940466_1280.png?w=120&h=60&fit=crop",
      description: "International Business Network"
    },
    {
      id: 4,
      name: "StartupAccelerator",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&h=60&fit=crop",
      description: "Startup Mentorship Program"
    }
  ];

  const awards = [
    {
      id: 1,
      title: "Best Web Development Company 2024",
      organization: "Tech Excellence Awards",
      icon: "Trophy",
      year: "2024"
    },
    {
      id: 2,
      title: "Innovation in AI Solutions",
      organization: "Digital Innovation Summit",
      icon: "Zap",
      year: "2023"
    },
    {
      id: 3,
      title: "Client Satisfaction Excellence",
      organization: "Business Excellence Institute",
      icon: "Heart",
      year: "2023"
    },
    {
      id: 4,
      title: "Emerging Technology Leader",
      organization: "Future Tech Conference",
      icon: "Rocket",
      year: "2024"
    }
  ];

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          projects: Math.floor(finalStats.projects * progress),
          clients: Math.floor(finalStats.clients * progress),
          experience: Math.floor(finalStats.experience * progress),
          satisfaction: Math.floor(finalStats.satisfaction * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(finalStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-surface to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Shield" size={16} />
            <span>Trust & Credibility</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Why Choose Nexora Webiotix
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence is backed by industry certifications, strategic partnerships, and a proven track record of delivering exceptional results.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          id="stats-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          <div className="text-center p-6 bg-surface rounded-2xl shadow-lg border border-border">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="FolderOpen" size={24} className="text-primary" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {animatedStats.projects}+
            </div>
            <div className="text-sm text-text-secondary">Projects Completed</div>
          </div>

          <div className="text-center p-6 bg-surface rounded-2xl shadow-lg border border-border">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-success-600" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-success-600 mb-2">
              {animatedStats.clients}+
            </div>
            <div className="text-sm text-text-secondary">Happy Clients</div>
          </div>

          <div className="text-center p-6 bg-surface rounded-2xl shadow-lg border border-border">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-accent-600" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-accent-600 mb-2">
              {animatedStats.experience}+
            </div>
            <div className="text-sm text-text-secondary">Years Experience</div>
          </div>

          <div className="text-center p-6 bg-surface rounded-2xl shadow-lg border border-border">
            <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Star" size={24} className="text-warning-600" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-warning-600 mb-2">
              {animatedStats.satisfaction}%
            </div>
            <div className="text-sm text-text-secondary">Client Satisfaction</div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
            Industry Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-surface rounded-xl p-6 shadow-lg border border-border text-center hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${cert.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={cert.icon} size={24} className={cert.color} />
                </div>
                <h4 className="font-bold text-text-primary mb-2">{cert.name}</h4>
                <p className="text-sm text-text-secondary mb-3">{cert.description}</p>
                <div className="text-xs text-text-muted">
                  <div>{cert.issuer}</div>
                  <div className="font-medium">{cert.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
            Awards & Recognition
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200 text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={award.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-bold text-text-primary mb-2 text-sm leading-tight">{award.title}</h4>
                <p className="text-xs text-text-secondary mb-2">{award.organization}</p>
                <div className="text-xs font-medium text-primary">{award.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
            Strategic Partnerships
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-surface rounded-xl p-6 shadow-lg border border-border text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-12 mx-auto mb-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="font-semibold text-text-primary mb-2 text-sm">{partner.name}</h4>
                <p className="text-xs text-text-secondary">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyCredentials;