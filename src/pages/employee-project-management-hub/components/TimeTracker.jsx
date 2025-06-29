import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TimeTracker = ({ activeProject, onTimeLog, onProjectChange }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 1000);
    } else if (!isTracking) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (isTracking) {
      // Stop tracking
      setIsTracking(false);
      if (currentTime > 0 && description.trim()) {
        const hours = currentTime / (1000 * 60 * 60);
        onTimeLog({
          projectId: activeProject?.id,
          hours: parseFloat(hours.toFixed(2)),
          description: description.trim(),
          date: new Date().toISOString(),
          employee: 'Current User'
        });
      }
      setCurrentTime(0);
      setDescription('');
      setStartTime(null);
    } else {
      // Start tracking
      if (activeProject && description.trim()) {
        setIsTracking(true);
        setStartTime(Date.now());
        setCurrentTime(0);
      }
    }
  };

  const handleReset = () => {
    setIsTracking(false);
    setCurrentTime(0);
    setDescription('');
    setStartTime(null);
  };

  const recentTimeEntries = [
    {
      id: 1,
      project: "E-commerce Platform",
      description: "Frontend component development",
      hours: 2.5,
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 2,
      project: "Mobile Banking App",
      description: "API integration testing",
      hours: 1.75,
      date: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 3,
      project: "AI Chatbot System",
      description: "Model training and optimization",
      hours: 3.25,
      date: new Date(Date.now() - 259200000).toISOString()
    }
  ];

  const todayTotal = recentTimeEntries
    .filter(entry => new Date(entry.date).toDateString() === new Date().toDateString())
    .reduce((total, entry) => total + entry.hours, 0);

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Time Tracker</h3>
        </div>
        <div className="text-sm text-text-secondary">
          Today: {todayTotal.toFixed(2)}h
        </div>
      </div>

      {/* Active Timer */}
      <div className="bg-muted rounded-lg p-4">
        <div className="text-center mb-4">
          <div className={`text-3xl font-mono font-bold ${isTracking ? 'text-primary' : 'text-text-secondary'}`}>
            {formatTime(currentTime)}
          </div>
          {isTracking && (
            <div className="flex items-center justify-center space-x-1 mt-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-success-600 font-medium">Recording</span>
            </div>
          )}
        </div>

        {/* Project Selection */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-text-primary mb-1">
            Active Project
          </label>
          <div className="flex items-center space-x-2 p-2 bg-surface rounded border border-border">
            {activeProject ? (
              <>
                <div className="w-6 h-6 bg-primary-100 rounded flex items-center justify-center">
                  <Icon name="Briefcase" size={14} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-text-primary">{activeProject.title}</span>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ChevronDown"
                  onClick={() => onProjectChange()}
                />
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                fullWidth
                onClick={() => onProjectChange()}
              >
                Select Project
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="What are you working on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isTracking}
          />
        </div>

        {/* Controls */}
        <div className="flex space-x-2">
          <Button
            variant={isTracking ? "danger" : "primary"}
            size="md"
            iconName={isTracking ? "Square" : "Play"}
            iconPosition="left"
            onClick={handleStartStop}
            disabled={!activeProject || (!isTracking && !description.trim())}
            className="flex-1"
          >
            {isTracking ? 'Stop' : 'Start'}
          </Button>
          {(currentTime > 0 || isTracking) && (
            <Button
              variant="outline"
              size="md"
              iconName="RotateCcw"
              onClick={handleReset}
            />
          )}
        </div>
      </div>

      {/* Recent Entries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-text-primary">Recent Entries</h4>
          <Button variant="ghost" size="xs" iconName="MoreHorizontal" />
        </div>
        
        <div className="space-y-2">
          {recentTimeEntries.slice(0, 3).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-2 bg-muted rounded">
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{entry.project}</p>
                <p className="text-xs text-text-secondary">{entry.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">{entry.hours}h</p>
                <p className="text-xs text-text-secondary">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          className="mt-3"
        >
          View All Entries
        </Button>
      </div>
    </div>
  );
};

export default TimeTracker;