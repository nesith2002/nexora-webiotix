import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Solutions",
      company: "TechStart Solutions",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      content: `Nexora Webiotix transformed our digital presence completely. Their web development team delivered a stunning, high-performance website that increased our conversion rates by 150%. The attention to detail and professional approach exceeded our expectations.`,
      project: "E-commerce Platform Development",
      result: "150% increase in conversions",
      serviceType: "Web Development"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Founder, InnovateLab",
      company: "InnovateLab",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      content: `The AI solution they developed for our data analysis needs was game-changing. We can now process customer insights 10x faster and make data-driven decisions in real-time. Exceptional technical expertise and project management.`,
      project: "AI-Powered Analytics Platform",
      result: "10x faster data processing",
      serviceType: "AI Development"
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Operations Director, HealthPlus",
      company: "HealthPlus Clinics",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      content: `Our mobile app for patient management has revolutionized how we operate. The user-friendly interface and robust functionality have improved patient satisfaction scores by 40%. Outstanding work from start to finish.`,
      project: "Healthcare Mobile Application",
      result: "40% improvement in patient satisfaction",
      serviceType: "App Development"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Manufacturing Manager, AutoTech",
      company: "AutoTech Industries",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      rating: 5,
      content: `The IoT robotics solution automated our production line and reduced operational costs by 35%. The team's expertise in both hardware and software integration is remarkable. Highly recommend their services.`,
      project: "Industrial Automation System",
      result: "35% reduction in operational costs",
      serviceType: "IoT Robotics"
    },
    {
      id: 5,
      name: "Lisa Martinez",
      role: "Spa Owner, Luxe Wellness",
      company: "Luxe Wellness Spa",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      rating: 5,
      content: `The professional tanning equipment and installation service was flawless. Our clients love the new tanning experience, and we've seen a 60% increase in bookings. Professional, reliable, and results-driven.`,
      project: "Spa Equipment Installation",
      result: "60% increase in bookings",
      serviceType: "Tanning Solutions"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const current = testimonials[currentTestimonial];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={`${i < rating ? 'text-warning-500 fill-current' : 'text-secondary-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-surface via-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-success-100 text-success-700 px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Heart" size={16} />
            <span>Client Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            What Our Clients Say
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience working with Nexora Webiotix.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-surface rounded-2xl shadow-xl border border-border p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="Quote" size={32} className="text-primary" />
                </div>
              </div>

              {/* Service Type Badge */}
              <div className="flex justify-center mb-6">
                <span className="bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-medium">
                  {current.serviceType}
                </span>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-center space-y-6">
                <p className="text-lg md:text-xl text-text-primary leading-relaxed italic">
                  "{current.content}"
                </p>
                
                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {renderStars(current.rating)}
                </div>

                {/* Project Details */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="text-sm font-semibold text-text-primary">Project: {current.project}</div>
                  <div className="text-sm text-success-600 font-medium">Result: {current.result}</div>
                </div>
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4 mt-8 pt-8 border-t border-border">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-200">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-text-primary">{current.name}</div>
                  <div className="text-sm text-text-secondary">{current.role}</div>
                  <div className="text-sm text-primary font-medium">{current.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-surface rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? 'bg-primary w-8' :'bg-secondary-300 hover:bg-secondary-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-surface rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isAutoPlaying
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-secondary border border-border hover:bg-muted'
              }`}
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={14} />
              <span>{isAutoPlaying ? "Pause" : "Play"} Auto-scroll</span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-text-secondary">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-sm text-text-secondary">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-text-secondary">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-text-secondary">Support Available</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;