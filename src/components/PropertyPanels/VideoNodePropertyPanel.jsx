import React, { useState, useEffect, useCallback,memo } from 'react';
import { X, UploadCloudIcon, PlayCircle } from 'lucide-react';
import { videoStyles } from '../../modules/panelStyles';
import { VideoPropIcon } from '../../modules/projectIcons';

// Memoized video preview component to prevent unnecessary re-renders
const VideoPreview = memo(({ video, onRemove }) => (
  <div style={videoStyles.previewContainer}>
    <video 
      controls
      style={videoStyles.videoPreview}
      alt={`Preview ${video.name}`}
      src={video.preview}
    />
    <button
      onClick={() => onRemove(video.id)}
      style={videoStyles.removeButton}
    >
      <X size={16} />
    </button>
  </div>
));

const VideoNodePropertyPanel = ({ node, setNodes, onClose }) => {

  const [title, setTitle] = useState(node.data?.title || 'Video Block');
  const [selectedVideos, setSelectedVideos] = useState(node.data?.videos || []);
  const [activeTab, setActiveTab] = useState('options');


  // Load data only when node ID changes
  useEffect(() => {
    if (node?.id) {
      setTitle(node.data?.title || 'Video Block');
      setSelectedVideos(node.data?.videos || []);
    }
  }, [node?.id]); // Only depend on node ID, not entire data object


  // Memoized update function to prevent unnecessary recreations
  const updateNodeData = useCallback((videos, nodeTitle) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              videos,
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
    const newVideos = [];
    for (const file of files) {
      const video = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            file,
            preview: e.target.result,
            name: file.name,
            id: `${file.name}-${Date.now()}`
          });
        };
        reader.readAsDataURL(file);
      });
      newVideos.push(video);
    }

    const updatedVideos = [...selectedVideos, ...newVideos];
    setSelectedVideos(updatedVideos);
    updateNodeData(updatedVideos, title);
  };


  const removeFile = useCallback((fileId) => {
    setSelectedVideos(prev => {
      const newVideos = prev.filter(video => video.id !== fileId);
      updateNodeData(newVideos, title);
      return newVideos;
    });
  }, [updateNodeData, title]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedVideos.forEach(video => {
        if (video.preview) {
          URL.revokeObjectURL(video.preview);
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
          <div style={videoStyles.container}>
            {/* <PlayCircle size={40} fill="#237804" color='#EEEEEE'/> */}
            
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <VideoPropIcon />
              </div>
              <p>Video</p>
            </div>

            <hr/>
            
            <div style={videoStyles.uploadArea}>
              <input className='media-upload-section'
                type="file"
                multiple
                onChange={handleFileSelect}
                id="video-file"
                accept="video/*"
              />
              <label className="media-upload" id="video-upload" htmlFor="video-file">
                <UploadCloudIcon size={24} strokeWidth={1.5} />
              </label>
            </div>

            {/* <div style={videoStyles.previewList}>
              {selectedVideos.map((video) => (
                <div key={video.id} style={videoStyles.previewContainer}>
                  <video 
                    controls
                    style={videoStyles.videoPreview}
                    alt={`Preview ${video.name}`}
                    src={video.preview}
                  />
                  <button
                    onClick={() => removeFile(video.id)}
                    style={videoStyles.removeButton}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div> */}

            <div style={videoStyles.previewList}>
              {selectedVideos.map((video) => (
                <VideoPreview 
                  key={video.id}
                  video={video}
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

export default VideoNodePropertyPanel;