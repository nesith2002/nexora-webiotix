import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ServiceCard = ({ service, index, onLearnMore }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-surface rounded-2xl shadow-lg border border-border overflow-hidden cursor-pointer"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.div variants={imageVariants}>
          <Image
            src={service.image}
            alt={`${service.title} - Nexora Webiotix`}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Service Icon */}
        <motion.div
          variants={iconVariants}
          className={`absolute top-4 right-4 w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Icon name={service.icon} size={24} className={service.iconColor} />
        </motion.div>

        {/* Popular Badge */}
        {service.isPopular && (
          <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
            Most Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title & Category */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
              {service.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${service.categoryBg} ${service.categoryColor} font-medium`}>
              {service.category}
            </span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-text-primary">Key Benefits:</h4>
          <ul className="space-y-2">
            {service.benefits.slice(0, 3).map((benefit, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.3 }}
                className="flex items-center space-x-2 text-sm text-text-secondary"
              >
                <Icon name="Check" size={14} className="text-success-600 flex-shrink-0" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Pricing Info */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="space-y-1">
            <div className="text-sm text-text-secondary">Starting from</div>
            <div className="text-lg font-bold text-primary">{service.startingPrice}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary">Delivery</div>
            <div className="text-sm font-semibold text-text-primary">{service.deliveryTime}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="primary"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
            onClick={() => onLearnMore(service)}
            className="group-hover:shadow-lg transition-shadow duration-200"
          >
            Learn More
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            className="px-3"
          >
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{service.projectsCompleted}</div>
            <div className="text-xs text-text-secondary">Projects Done</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Icon name="Star" size={14} className="text-warning-500 fill-current" />
              <span className="text-lg font-bold text-primary">{service.rating}</span>
            </div>
            <div className="text-xs text-text-secondary">Client Rating</div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <motion.div
        className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ServiceCard;