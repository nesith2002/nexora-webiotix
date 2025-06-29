import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceTypeCard = ({ service, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(service.id)}
      className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-primary bg-primary-50 shadow-md'
          : 'border-border bg-surface hover:border-primary-300'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-primary text-white' : 'bg-primary-100 text-primary'
        }`}>
          <Icon name={service.icon} size={32} />
        </div>
        
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${
            isSelected ? 'text-primary' : 'text-text-primary'
          }`}>
            {service.name}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {service.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {service.features.map((feature, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                isSelected
                  ? 'bg-primary-100 text-primary-700' :'bg-secondary-100 text-secondary-700'
              }`}
            >
              {feature}
            </span>
          ))}
        </div>
        
        <div className="text-sm font-medium text-accent">
          Starting from {service.startingPrice}
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeCard;