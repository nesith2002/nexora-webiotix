import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileManager = ({ files, onDownload, onUpload, onDelete }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('date');

  const getFileIcon = (fileType) => {
    const icons = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'xls': 'FileSpreadsheet',
      'xlsx': 'FileSpreadsheet',
      'ppt': 'Presentation',
      'pptx': 'Presentation',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'svg': 'Image',
      'zip': 'Archive',
      'rar': 'Archive',
      'mp4': 'Video',
      'avi': 'Video',
      'mov': 'Video',
      'mp3': 'Music',
      'wav': 'Music',
      'default': 'File'
    };
    return icons[fileType.toLowerCase()] || icons.default;
  };

  const getFileTypeColor = (fileType) => {
    const colors = {
      'pdf': 'text-error',
      'doc': 'text-primary',
      'docx': 'text-primary',
      'xls': 'text-success',
      'xlsx': 'text-success',
      'ppt': 'text-warning-600',
      'pptx': 'text-warning-600',
      'jpg': 'text-accent',
      'jpeg': 'text-accent',
      'png': 'text-accent',
      'gif': 'text-accent',
      'svg': 'text-accent',
      'zip': 'text-secondary',
      'rar': 'text-secondary',
      'mp4': 'text-purple-600',
      'avi': 'text-purple-600',
      'mov': 'text-purple-600',
      'mp3': 'text-orange-600',
      'wav': 'text-orange-600'
    };
    return colors[fileType.toLowerCase()] || 'text-text-secondary';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedFiles = [...files].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return b.size - a.size;
      case 'type':
        return a.type.localeCompare(b.type);
      case 'date':
      default:
        return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
  });

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const selectAllFiles = () => {
    setSelectedFiles(selectedFiles.length === files.length ? [] : files.map(f => f.id));
  };

  const handleBulkDownload = () => {
    selectedFiles.forEach(fileId => {
      const file = files.find(f => f.id === fileId);
      if (file) onDownload(file);
    });
  };

  const renderListView = () => (
    <div className="space-y-2">
      {sortedFiles.map((file, index) => (
        <div
          key={index}
          className={`flex items-center space-x-3 p-3 rounded-md border transition-all duration-150 cursor-pointer ${
            selectedFiles.includes(file.id)
              ? 'bg-primary-50 border-primary-200' :'bg-surface border-border hover:bg-muted'
          }`}
          onClick={() => toggleFileSelection(file.id)}
        >
          <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)}
            onChange={() => toggleFileSelection(file.id)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
            file.category === 'deliverable' ? 'bg-success-100' : 
            file.category === 'feedback' ? 'bg-warning-100' : 'bg-secondary-100'
          }`}>
            <Icon 
              name={getFileIcon(file.type)} 
              size={16} 
              className={getFileTypeColor(file.type)}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary truncate">
                {file.name}
              </h4>
              <span className="text-xs text-text-secondary ml-2">
                {formatFileSize(file.size)}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                file.category === 'deliverable' ? 'bg-success-100 text-success-700' :
                file.category === 'feedback'? 'bg-warning-100 text-warning-700' : 'bg-secondary-100 text-secondary-700'
              }`}>
                {file.category}
              </span>
              <span className="text-xs text-text-secondary">
                {formatDate(file.uploadDate)}
              </span>
              {file.projectName && (
                <span className="text-xs text-accent">
                  {file.projectName}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file);
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={(e) => {
                e.stopPropagation();
                // Handle preview
              }}
            />
            {file.canDelete && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                className="text-error hover:text-error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(file.id);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {sortedFiles.map((file, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border transition-all duration-150 cursor-pointer ${
            selectedFiles.includes(file.id)
              ? 'bg-primary-50 border-primary-200' :'bg-surface border-border hover:bg-muted'
          }`}
          onClick={() => toggleFileSelection(file.id)}
        >
          <div className="flex items-center justify-between mb-3">
            <input
              type="checkbox"
              checked={selectedFiles.includes(file.id)}
              onChange={() => toggleFileSelection(file.id)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file);
              }}
            />
          </div>

          <div className="text-center">
            <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${
              file.category === 'deliverable' ? 'bg-success-100' : 
              file.category === 'feedback' ? 'bg-warning-100' : 'bg-secondary-100'
            }`}>
              <Icon 
                name={getFileIcon(file.type)} 
                size={24} 
                className={getFileTypeColor(file.type)}
              />
            </div>
            <h4 className="text-sm font-medium text-text-primary truncate mb-1">
              {file.name}
            </h4>
            <p className="text-xs text-text-secondary">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Folder" size={20} className="text-text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Project Files</h3>
          <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
            {files.length} files
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            onClick={onUpload}
          >
            Upload
          </Button>
          {selectedFiles.length > 0 && (
            <Button
              variant="primary"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={handleBulkDownload}
            >
              Download ({selectedFiles.length})
            </Button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={selectAllFiles}
            className="text-sm text-primary hover:text-primary-700 font-medium"
          >
            {selectedFiles.length === files.length ? 'Deselect All' : 'Select All'}
          </button>
          {selectedFiles.length > 0 && (
            <span className="text-sm text-text-secondary">
              {selectedFiles.length} selected
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
            <option value="type">Sort by Type</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-surface shadow-sm' : ''}`}
            >
              <Icon name="List" size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-surface shadow-sm' : ''}`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary mb-2">No files uploaded yet</p>
          <Button
            variant="primary"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            onClick={onUpload}
          >
            Upload First File
          </Button>
        </div>
      ) : (
        viewMode === 'list' ? renderListView() : renderGridView()
      )}
    </div>
  );
};

export default FileManager;