import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full bg-surface border-b border-border p-4 mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.title}
          </h2>
          <div className="text-sm text-text-secondary">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </div>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isUpcoming = stepNumber > currentStep;
              
              return (
                <div key={index} className="flex flex-col items-center relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-success border-success text-white'
                      : isCurrent
                      ? 'bg-primary border-primary text-white' :'bg-surface border-border text-text-secondary'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <span className="text-sm font-medium">{stepNumber}</span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-text-muted mt-1 hidden sm:block">
                      {step.subtitle}
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`absolute top-5 left-full w-full h-0.5 -translate-y-1/2 ${
                      stepNumber < currentStep ? 'bg-success' : 'bg-border'
                    }`} style={{ width: 'calc(100vw / 4 - 2.5rem)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4 bg-border rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;