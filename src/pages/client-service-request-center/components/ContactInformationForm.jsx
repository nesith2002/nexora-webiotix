import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ContactInformationForm = ({ formData, onFormDataChange }) => {
  const handleInputChange = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const communicationPreferences = [
    { id: 'email', label: 'Email', icon: 'Mail', description: 'Primary communication via email' },
    { id: 'phone', label: 'Phone Calls', icon: 'Phone', description: 'Regular phone check-ins' },
    { id: 'video', label: 'Video Calls', icon: 'Video', description: 'Video meetings and demos' },
    { id: 'chat', label: 'Instant Messaging', icon: 'MessageSquare', description: 'Quick updates via chat' },
    { id: 'in-person', label: 'In-Person Meetings', icon: 'Users', description: 'Face-to-face meetings when needed' }
  ];

  const meetingFrequencies = [
    { id: 'daily', label: 'Daily Updates', description: 'Daily progress reports' },
    { id: 'weekly', label: 'Weekly Check-ins', description: 'Weekly status meetings' },
    { id: 'bi-weekly', label: 'Bi-weekly Reviews', description: 'Every two weeks' },
    { id: 'monthly', label: 'Monthly Reviews', description: 'Monthly milestone reviews' },
    { id: 'as-needed', label: 'As Needed', description: 'Contact when necessary' }
  ];

  return (
    <div className="space-y-8">
      {/* Primary Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Primary Contact Information
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          This information will be used for project communication and updates.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              First Name *
            </label>
            <Input
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Last Name *
            </label>
            <Input
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@company.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number *
            </label>
            <Input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Job Title / Role
          </label>
          <Input
            type="text"
            value={formData.jobTitle || ''}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            placeholder="e.g., CEO, Marketing Manager, Project Manager"
          />
        </div>
      </div>

      {/* Company Information */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Company Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company Name *
            </label>
            <Input
              type="text"
              value={formData.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Your Company Name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Industry
            </label>
            <select
              value={formData.industry || ''}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance & Banking</option>
              <option value="retail">Retail & E-commerce</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="real-estate">Real Estate</option>
              <option value="hospitality">Hospitality & Tourism</option>
              <option value="consulting">Consulting</option>
              <option value="non-profit">Non-profit</option>
              <option value="government">Government</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company Size
            </label>
            <select
              value={formData.companySize || ''}
              onChange={(e) => handleInputChange('companySize', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Website (if any)
            </label>
            <Input
              type="url"
              value={formData.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://www.yourcompany.com"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Company Address
          </label>
          <textarea
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Street address, City, State, ZIP Code, Country"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Communication Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Communication Preferences
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          How would you prefer to communicate during the project?
        </p>
        
        <div className="space-y-3">
          {communicationPreferences.map((pref) => (
            <label
              key={pref.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.communicationPrefs?.includes(pref.id)
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.communicationPrefs?.includes(pref.id) || false}
                onChange={(e) => {
                  const prefs = formData.communicationPrefs || [];
                  if (e.target.checked) {
                    handleInputChange('communicationPrefs', [...prefs, pref.id]);
                  } else {
                    handleInputChange('communicationPrefs', prefs.filter(p => p !== pref.id));
                  }
                }}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                formData.communicationPrefs?.includes(pref.id) ? 'bg-primary text-white' : 'bg-primary-100 text-primary'
              }`}>
                <Icon name={pref.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-text-primary">{pref.label}</div>
                <div className="text-sm text-text-secondary">{pref.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Meeting Frequency */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Meeting Frequency
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          How often would you like project updates and check-ins?
        </p>
        
        <div className="space-y-3">
          {meetingFrequencies.map((freq) => (
            <label
              key={freq.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.meetingFrequency === freq.id
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-300'
              }`}
            >
              <input
                type="radio"
                name="meetingFrequency"
                value={freq.id}
                checked={formData.meetingFrequency === freq.id}
                onChange={(e) => handleInputChange('meetingFrequency', e.target.value)}
                className="text-primary focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{freq.label}</div>
                <div className="text-sm text-text-secondary">{freq.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Additional Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Best Time to Contact
            </label>
            <select
              value={formData.bestTimeToContact || ''}
              onChange={(e) => handleInputChange('bestTimeToContact', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select preferred time</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 8 PM)</option>
              <option value="anytime">Anytime during business hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time Zone
            </label>
            <select
              value={formData.timeZone || ''}
              onChange={(e) => handleInputChange('timeZone', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select time zone</option>
              <option value="EST">Eastern Time (EST)</option>
              <option value="CST">Central Time (CST)</option>
              <option value="MST">Mountain Time (MST)</option>
              <option value="PST">Pacific Time (PST)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="CET">Central European Time (CET)</option>
              <option value="IST">India Standard Time (IST)</option>
              <option value="JST">Japan Standard Time (JST)</option>
              <option value="AEST">Australian Eastern Time (AEST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              How did you hear about us?
            </label>
            <select
              value={formData.referralSource || ''}
              onChange={(e) => handleInputChange('referralSource', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select source</option>
              <option value="google">Google Search</option>
              <option value="social-media">Social Media</option>
              <option value="referral">Referral from friend/colleague</option>
              <option value="existing-client">Existing client</option>
              <option value="advertisement">Online Advertisement</option>
              <option value="event">Conference/Event</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.additionalNotes || ''}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Any additional information you'd like us to know..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;