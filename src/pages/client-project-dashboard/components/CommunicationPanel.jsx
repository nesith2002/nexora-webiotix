import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationPanel = ({ messages, onSendMessage, onScheduleMeeting }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Project Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      status: 'online',
      lastSeen: 'Active now'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Lead Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      status: 'away',
      lastSeen: '2 hours ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      status: 'offline',
      lastSeen: 'Yesterday'
    }
  ];

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-success',
      away: 'bg-warning-500',
      offline: 'bg-secondary'
    };
    return colors[status] || 'bg-secondary';
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      onSendMessage({
        contactId: selectedContact.id,
        message: newMessage.trim(),
        timestamp: new Date().toISOString()
      });
      setNewMessage('');
    }
  };

  const getMessagesForContact = (contactId) => {
    return messages.filter(msg => 
      msg.senderId === contactId || msg.receiverId === contactId
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={20} className="text-text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Team Communication</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => setShowMeetingScheduler(true)}
          >
            Schedule Meeting
          </Button>
        </div>
      </div>

      <div className="flex h-96">
        {/* Contacts Sidebar */}
        <div className="w-1/3 border-r border-border bg-muted">
          <div className="p-3 border-b border-border">
            <h4 className="text-sm font-semibold text-text-primary">Team Members</h4>
          </div>
          <div className="overflow-y-auto h-full">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-3 text-left hover:bg-surface transition-colors duration-150 ${
                  selectedContact?.id === contact.id ? 'bg-surface border-r-2 border-primary' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface ${getStatusColor(contact.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {contact.role}
                    </p>
                    <p className="text-xs text-text-muted">
                      {contact.lastSeen}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b border-border bg-surface">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {selectedContact.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {selectedContact.role} • {selectedContact.lastSeen}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {getMessagesForContact(selectedContact.id).map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.senderId === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                      message.senderId === 'client' ?'bg-primary text-primary-foreground' :'bg-secondary-100 text-text-primary'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 'client' ?'text-primary-foreground opacity-75' :'text-text-muted'
                      }`}>
                        {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 border-t border-border bg-surface">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    iconName="Send"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Icon name="MessageCircle" size={48} className="text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">Select a team member to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meeting Scheduler Modal */}
      {showMeetingScheduler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Schedule Meeting</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowMeetingScheduler(false)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Meeting Title
                </label>
                <Input
                  type="text"
                  placeholder="Project Review Meeting"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Date & Time
                </label>
                <Input
                  type="datetime-local"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Attendees
                </label>
                <div className="space-y-2">
                  {contacts.map((contact) => (
                    <label key={contact.id} className="flex items-center space-x-2">
                      <Input
                        type="checkbox"
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-text-primary">{contact.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowMeetingScheduler(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    onScheduleMeeting();
                    setShowMeetingScheduler(false);
                  }}
                  className="flex-1"
                >
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationPanel;