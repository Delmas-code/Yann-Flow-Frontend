import React, { useState, useEffect, useCallback,memo } from 'react';
import { X, UploadCloudIcon, FileArchive } from 'lucide-react';
import { fileStyles } from '../../modules/panelStyles';
import PreviewFileIcon from '../../modules/previewIcons';
import { FilePropIcon } from '../../modules/projectIcons';



const formatFileSize = (bytes, file) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Memoized file preview component to prevent unnecessary re-renders
const FilePreview = memo(({ file, onRemove }) => (
    <div style={fileStyles.previewContainer}>
        <div style={fileStyles.fileIcon}>
            {/* <FileArchive color='#237804' /> */}
            <PreviewFileIcon fileName={file.name} />
        </div>
        <div style={fileStyles.fileDetails}>
            <p style={fileStyles.fileName}>{file.name}</p>
            <p style={fileStyles.fileSize}>{formatFileSize(file.fileObj.size, file)}</p>
        </div>
        <button
            onClick={() => onRemove(file.id)}
            style={fileStyles.removeButton}
        >
            <X size={16} />
        </button>
    </div>

));

const FileNodePropertyPanel = ({ node, setNodes, onClose }) => {

  const [title, setTitle] = useState(node.data?.title || 'File Block');
  const [selectedFiles, setSelectedFiles] = useState(node.data?.files || []);
  const [activeTab, setActiveTab] = useState('options');


  // Load data only when node ID changes
  useEffect(() => {
    if (node?.id) {
      setTitle(node.data?.title || 'File Block');
      setSelectedFiles(node.data?.files || []);
    }
  }, [node?.id]); // Only depend on node ID, not entire data object


  // Memoized update function to prevent unnecessary recreations
  const updateNodeData = useCallback((files, nodeTitle) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              files,
              title: nodeTitle
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes]);


  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    
    // Process files one at a time to avoid memory spikes
    const newFiles = [];
    for (const fileObj of files) {
      const file = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            fileObj,
            preview: e.target.result,
            name: fileObj.name,
            id: `${fileObj.name}-${Date.now()}`
          });
        };
        reader.readAsDataURL(fileObj);
      });
      newFiles.push(file);
    }

    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    updateNodeData(updatedFiles, title);
  };


  const removeFile = useCallback((fileId) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter(file => file.id !== fileId);
      updateNodeData(newFiles, title);
      return newFiles;
    });
  }, [updateNodeData, title]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);



  return (
    <div className="properties-panel">
      {/* Tab Navigation*/}

      <div className="property-panel-tabs">
        <button
          className={`tab ${activeTab === 'options' ? 'active' : ''}`}
          onClick={() => setActiveTab('options')}
        >
          Options
        </button>
        
        <button
          className={`tab ${activeTab === 'sandbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('sandbox')}
        >
          Sandbox
        </button>
      </div>
      

      <div className="property-panel-content">
        {activeTab === 'options' ? (
          <div style={fileStyles.container}>
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <FilePropIcon />
              </div>
              <p>File</p>
            </div>

            <hr/>
            
            <div style={fileStyles.uploadArea}>
              <input className='media-upload-section'
                type="file"
                multiple
                onChange={handleFileSelect}
                id="file-file"
                // accept="application/*, text/*, font/*, model/*"
              />
              <label className="media-upload" id="file-upload" htmlFor="file-file">
                <UploadCloudIcon size={24} strokeWidth={1.5} />
              </label>
            </div>

            <div style={fileStyles.previewList}>
              {selectedFiles.map((file) => (
                <FilePreview 
                  key={file.id}
                  file={file}
                  onRemove={removeFile}
                />
              ))}
            </div>

          </div>
        ) : (
            <div className="sandbox-tab">
                <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Connected Apps</h3>
                
                <p style={{ color: '#666', fontSize: '14px' }}>
                    No Sandbox environment connected yet. You'll be able to test integrations here in the future.
                </p>
                
                <button
                style={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '15px'
                }}
                disabled
                >
                Add Sandbox (Coming Soon)
                </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileNodePropertyPanel;