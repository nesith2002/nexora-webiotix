import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesGrid = ({ onServiceSelect, onGetStarted }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      category: 'Development',
      description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
      icon: 'Globe',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      gradient: 'from-blue-500 to-purple-600',
      categoryBg: 'bg-blue-100',
      categoryColor: 'text-blue-700',
      startingPrice: '$2,999',
      deliveryTime: '2-4 weeks',
      projectsCompleted: '150+',
      rating: '4.9',
      isPopular: true,
      benefits: [
        'Responsive design across all devices',
        'SEO optimized for better visibility',
        'Fast loading and performance optimized',
        'Modern UI/UX design principles',
        'Content management system integration'
      ]
    },
    {
      id: 'app-development',
      title: 'App Development',
      category: 'Mobile',
      description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=400&h=300&fit=crop',
      icon: 'Smartphone',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      gradient: 'from-green-500 to-teal-600',
      categoryBg: 'bg-green-100',
      categoryColor: 'text-green-700',
      startingPrice: '$4,999',
      deliveryTime: '3-6 weeks',
      projectsCompleted: '85+',
      rating: '4.8',
      isPopular: false,
      benefits: [
        'Cross-platform compatibility',
        'App store optimization',
        'Push notifications integration',
        'Offline functionality support',
        'Real-time data synchronization'
      ]
    },
    {
      id: 'ai-development',
      title: 'AI Development',
      category: 'Artificial Intelligence',
      description: 'Intelligent solutions powered by machine learning and AI to automate processes and enhance decision-making.',
      image: 'https://images.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg?w=400&h=300&fit=crop',
      icon: 'Brain',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      gradient: 'from-purple-500 to-pink-600',
      categoryBg: 'bg-purple-100',
      categoryColor: 'text-purple-700',
      startingPrice: '$7,999',
      deliveryTime: '4-8 weeks',
      projectsCompleted: '45+',
      rating: '4.9',
      isPopular: false,
      benefits: [
        'Custom AI model development',
        'Natural language processing',
        'Computer vision capabilities',
        'Predictive analytics integration',
        'Automated workflow optimization'
      ]
    },
    {
      id: 'tanning',
      title: 'Tanning Solutions',
      category: 'Beauty & Wellness',
      description: 'Professional tanning services and equipment solutions for beauty salons and wellness centers.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      icon: 'Sun',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      gradient: 'from-orange-500 to-red-600',
      categoryBg: 'bg-orange-100',
      categoryColor: 'text-orange-700',
      startingPrice: '$1,999',
      deliveryTime: '1-2 weeks',
      projectsCompleted: '120+',
      rating: '4.7',
      isPopular: false,
      benefits: [
        'Professional grade equipment',
        'Safety certified solutions',
        'Custom installation service',
        'Maintenance and support',
        'Training and certification'
      ]
    },
    {
      id: 'iot-robotics',
      title: 'IoT Robotics',
      category: 'Technology',
      description: 'Smart automation solutions combining IoT sensors with robotic systems for industrial and commercial use.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?w=400&h=300&fit=crop',
      icon: 'Bot',
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-100',
      gradient: 'from-cyan-500 to-blue-600',
      categoryBg: 'bg-cyan-100',
      categoryColor: 'text-cyan-700',
      startingPrice: '$9,999',
      deliveryTime: '6-12 weeks',
      projectsCompleted: '30+',
      rating: '4.8',
      isPopular: false,
      benefits: [
        'Custom robotic solutions',
        'IoT sensor integration',
        'Remote monitoring capabilities',
        'Automated process control',
        'Predictive maintenance systems'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services', icon: 'Grid3X3' },
    { id: 'development', label: 'Development', icon: 'Code' },
    { id: 'mobile', label: 'Mobile', icon: 'Smartphone' },
    { id: 'ai', label: 'AI & ML', icon: 'Brain' },
    { id: 'hardware', label: 'Hardware', icon: 'Cpu' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => {
        switch (selectedCategory) {
          case 'development':
            return service.category === 'Development';
          case 'mobile':
            return service.category === 'Mobile';
          case 'ai':
            return service.category === 'Artificial Intelligence';
          case 'hardware':
            return service.category === 'Beauty & Wellness' || service.category === 'Technology';
          default:
            return true;
        }
      });

  const handleServiceLearnMore = (service) => {
    onServiceSelect(service);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-20 bg-background">
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
            <Icon name="Sparkles" size={16} />
            <span>Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Comprehensive Digital Solutions
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            From cutting-edge web development to innovative AI solutions, we provide end-to-end technology services that transform your business and drive growth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-muted border border-border'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onLearnMore={handleServiceLearnMore}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-200"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Let's discuss your requirements and create a custom solution that perfectly fits your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              iconName="MessageSquare"
              iconPosition="left"
              onClick={onGetStarted}
            >
              Get Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;