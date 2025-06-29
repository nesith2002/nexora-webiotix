import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PortfolioHighlights = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const portfolioProjects = [
    {
      id: 1,
      title: "E-Commerce Revolution",
      category: "web",
      client: "FashionForward Inc.",
      description: "Complete e-commerce platform with AI-powered recommendations and seamless checkout experience.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "AI/ML", "Stripe"],
      results: {
        metric1: { label: "Sales Increase", value: "250%" },
        metric2: { label: "Page Load Time", value: "1.2s" },
        metric3: { label: "Conversion Rate", value: "8.5%" }
      },
      duration: "3 months",
      year: "2024"
    },
    {
      id: 2,
      title: "HealthCare Mobile App",
      category: "mobile",
      client: "MediCare Plus",
      description: "Patient management mobile application with telemedicine capabilities and appointment scheduling.",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?w=600&h=400&fit=crop",
      technologies: ["React Native", "Firebase", "WebRTC", "HealthKit"],
      results: {
        metric1: { label: "User Adoption", value: "95%" },
        metric2: { label: "App Rating", value: "4.8/5" },
        metric3: { label: "Consultation Time", value: "-40%" }
      },
      duration: "4 months",
      year: "2024"
    },
    {
      id: 3,
      title: "AI-Powered Analytics",
      category: "ai",
      client: "DataDriven Corp",
      description: "Machine learning platform for predictive analytics and automated business intelligence reporting.",
      image: "https://images.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg?w=600&h=400&fit=crop",
      technologies: ["Python", "TensorFlow", "AWS", "Docker"],
      results: {
        metric1: { label: "Processing Speed", value: "10x faster" },
        metric2: { label: "Accuracy", value: "94%" },
        metric3: { label: "Cost Reduction", value: "60%" }
      },
      duration: "6 months",
      year: "2023"
    },
    {
      id: 4,
      title: "Smart Factory Automation",
      category: "iot",
      client: "ManufactureTech Ltd",
      description: "IoT-enabled robotic system for automated quality control and production line optimization.",
      image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?w=600&h=400&fit=crop",
      technologies: ["IoT Sensors", "Robotics", "Edge Computing", "5G"],
      results: {
        metric1: { label: "Efficiency Gain", value: "45%" },
        metric2: { label: "Error Reduction", value: "85%" },
        metric3: { label: "ROI", value: "300%" }
      },
      duration: "8 months",
      year: "2023"
    },
    {
      id: 5,
      title: "Luxury Spa Experience",
      category: "tanning",
      client: "Elite Wellness Spa",
      description: "Premium tanning equipment installation with smart controls and customer experience enhancement.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      technologies: ["Smart Controls", "UV Technology", "Safety Systems", "Mobile App"],
      results: {
        metric1: { label: "Customer Satisfaction", value: "98%" },
        metric2: { label: "Booking Increase", value: "75%" },
        metric3: { label: "Revenue Growth", value: "120%" }
      },
      duration: "2 months",
      year: "2024"
    },
    {
      id: 6,
      title: "FinTech Dashboard",
      category: "web",
      client: "InvestSmart Pro",
      description: "Real-time financial dashboard with advanced analytics and portfolio management tools.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "D3.js", "WebSocket", "Blockchain"],
      results: {
        metric1: { label: "User Engagement", value: "180%" },
        metric2: { label: "Data Accuracy", value: "99.9%" },
        metric3: { label: "Response Time", value: "0.5s" }
      },
      duration: "5 months",
      year: "2023"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'Grid3X3' },
    { id: 'web', label: 'Web Development', icon: 'Globe' },
    { id: 'mobile', label: 'Mobile Apps', icon: 'Smartphone' },
    { id: 'ai', label: 'AI Solutions', icon: 'Brain' },
    { id: 'iot', label: 'IoT & Robotics', icon: 'Bot' },
    { id: 'tanning', label: 'Tanning Solutions', icon: 'Sun' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
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
          <div className="inline-flex items-center space-x-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Award" size={16} />
            <span>Portfolio Showcase</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Our Success Stories
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects that have transformed businesses across various industries and technologies.
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
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-muted border border-border'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-surface rounded-2xl shadow-lg border border-border overflow-hidden cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm text-text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {project.year}
                  </div>
                  
                  {/* View Details Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                    >
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent-600 font-medium">{project.client}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-md text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Key Metric */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-text-secondary">{project.results.metric1.label}</div>
                        <div className="text-lg font-bold text-success-600">{project.results.metric1.value}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-text-secondary">Duration</div>
                        <div className="text-sm font-semibold text-text-primary">{project.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            iconName="ExternalLink"
            iconPosition="right"
            className="text-lg px-8 py-4"
          >
            View Complete Portfolio
          </Button>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1020 flex items-center justify-center p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-surface transition-colors duration-200"
                >
                  <Icon name="X" size={20} className="text-text-primary" />
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-lg opacity-90">{selectedProject.client}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Project Overview</h3>
                  <p className="text-text-secondary leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Key Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.values(selectedProject.results).map((result, idx) => (
                      <div key={idx} className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-2">{result.value}</div>
                        <div className="text-sm text-text-secondary">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Project Duration</div>
                    <div className="text-lg font-semibold text-text-primary">{selectedProject.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Completion Year</div>
                    <div className="text-lg font-semibold text-text-primary">{selectedProject.year}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioHighlights;