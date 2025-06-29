import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateGallery = ({ onTemplateSelect, isCollapsed, onToggleCollapse }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Templates', icon: 'Grid3X3' },
    { id: 'business', label: 'Business', icon: 'Building2' },
    { id: 'portfolio', label: 'Portfolio', icon: 'User' },
    { id: 'ecommerce', label: 'E-commerce', icon: 'ShoppingCart' },
    { id: 'blog', label: 'Blog', icon: 'FileText' },
    { id: 'landing', label: 'Landing Page', icon: 'Zap' }
  ];

  const templates = [
    {
      id: 'business-1',
      name: 'Corporate Pro',
      category: 'business',
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      description: 'Professional corporate website with modern design',
      features: ['Responsive', 'Contact Forms', 'Team Section'],
      isPremium: false
    },
    {
      id: 'portfolio-1',
      name: 'Creative Studio',
      category: 'portfolio',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      description: 'Stunning portfolio for creative professionals',
      features: ['Gallery', 'Animations', 'Dark Mode'],
      isPremium: true
    },
    {
      id: 'ecommerce-1',
      name: 'Shop Modern',
      category: 'ecommerce',
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      description: 'Complete e-commerce solution with cart',
      features: ['Product Catalog', 'Shopping Cart', 'Checkout'],
      isPremium: false
    },
    {
      id: 'blog-1',
      name: 'Content Hub',
      category: 'blog',
      preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      description: 'Clean blog layout for content creators',
      features: ['Article Layout', 'Comments', 'Categories'],
      isPremium: false
    },
    {
      id: 'landing-1',
      name: 'Launch Pro',
      category: 'landing',
      preview: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      description: 'High-converting landing page template',
      features: ['Hero Section', 'CTA Buttons', 'Analytics'],
      isPremium: true
    },
    {
      id: 'business-2',
      name: 'Startup Base',
      category: 'business',
      preview: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      description: 'Perfect for tech startups and agencies',
      features: ['Services Section', 'Testimonials', 'FAQ'],
      isPremium: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
  };

  return (
    <div className={`bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
    } lg:w-80 flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Templates</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            onClick={onToggleCollapse}
            className="lg:hidden"
          />
        </div>

        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-border">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                selectedCategory === category.id
                  ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-muted">No templates found</p>
            <p className="text-sm text-text-muted mt-1">Try adjusting your search or category filter</p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Preview Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {template.isPremium && (
                  <div className="absolute top-2 right-2 bg-warning-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Premium
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Eye"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Preview
                  </Button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-3">
                <h3 className="font-medium text-text-primary mb-1">{template.name}</h3>
                <p className="text-sm text-text-secondary mb-2">{template.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-accent-50 text-accent-700 px-2 py-1 rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 2 && (
                    <span className="text-xs text-text-muted">
                      +{template.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateSelect(template);
                  }}
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-text-muted mb-2">Need a custom template?</p>
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            fullWidth
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;