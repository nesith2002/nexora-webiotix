import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingCTA = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      setScrollProgress(scrollPercent);
      
      // Show CTA after scrolling 20% of the page
      setIsVisible(scrollPercent > 0.2 && scrollPercent < 0.9);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const quickActions = [
    {
      label: 'Free Consultation',
      icon: 'MessageSquare',
      action: () => onGetStarted('consultation'),
      color: 'bg-primary text-primary-foreground'
    },
    {
      label: 'View Portfolio',
      icon: 'Eye',
      action: () => onGetStarted('portfolio'),
      color: 'bg-accent text-accent-foreground'
    },
    {
      label: 'Get Quote',
      icon: 'Calculator',
      action: () => onGetStarted('quote'),
      color: 'bg-success text-success-foreground'
    },
    {
      label: 'Call Us',
      icon: 'Phone',
      action: () => window.open('tel:+1234567890'),
      color: 'bg-warning text-warning-foreground'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Floating CTA */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed bottom-4 left-4 right-4 z-1010"
          >
            <div className="bg-surface border border-border rounded-2xl shadow-2xl p-4">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-secondary-200 rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Main CTA */}
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-text-primary">Ready to get started?</div>
                  <div className="text-xs text-text-secondary">Free consultation available</div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => onGetStarted('mobile')}
                >
                  Get Started
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => onGetStarted('consultation')}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors duration-200"
                >
                  <Icon name="MessageSquare" size={16} />
                  <span className="text-sm font-medium">Consult</span>
                </button>
                <button
                  onClick={() => window.open('tel:+1234567890')}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-success-50 text-success-700 hover:bg-success-100 transition-colors duration-200"
                >
                  <Icon name="Phone" size={16} />
                  <span className="text-sm font-medium">Call</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Desktop Floating CTA */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden md:block fixed right-6 bottom-6 z-1010"
          >
            <div className="relative">
              {/* Expanded Actions */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-20 right-0 space-y-3"
                  >
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={action.action}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${action.color} group`}
                      >
                        <Icon name={action.icon} size={18} />
                        <span className="font-medium whitespace-nowrap">{action.label}</span>
                        <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Pulse Animation */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary rounded-full opacity-20"
                />
                
                <button
                  onClick={toggleExpanded}
                  className="relative w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-700 transition-all duration-200 group"
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name={isExpanded ? "X" : "Plus"} size={24} />
                  </motion.div>
                </button>

                {/* Tooltip */}
                <AnimatePresence>
                  {!isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-text-primary text-surface px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
                    >
                      Get Started Today
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-text-primary"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Progress Ring */}
              <svg
                className="absolute inset-0 w-16 h-16 transform -rotate-90"
                viewBox="0 0 64 64"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress)}`}
                  transition={{ duration: 0.1 }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Backdrop for expanded state */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden md:block fixed inset-0 z-1005"
                onClick={() => setIsExpanded(false)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;