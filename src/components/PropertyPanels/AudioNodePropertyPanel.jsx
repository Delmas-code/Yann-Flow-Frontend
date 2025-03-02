import React, { useState, useEffect, useCallback,memo } from 'react';
import { X, UploadCloudIcon, Mic } from 'lucide-react';
import { audioStyles } from '../../modules/panelStyles';
import { AudioPropIcon } from '../../modules/projectIcons';


// Memoized audio preview component to prevent unnecessary re-renders
const AudioPreview = memo(({ audio, onRemove }) => (
    <div style={audioStyles.previewContainer}>
        <audio 
            controls
            style={audioStyles.audioPreview}
            src={audio.preview}
        />
        <div style={audioStyles.fileName}>{audio.name}</div>
        <button
            onClick={() => onRemove(audio.id)}
            style={audioStyles.removeButton}
        >
        <X size={16} />
        </button>
    </div>

));

const AudioNodePropertyPanel = ({ node, setNodes, onClose }) => {

  const [title, setTitle] = useState(node.data?.title || 'Audio Block');
  const [selectedAudios, setSelectedAudios] = useState(node.data?.audios || []);
  const [activeTab, setActiveTab] = useState('options');


  // Load data only when node ID changes
  useEffect(() => {
    if (node?.id) {
      setTitle(node.data?.title || 'Audio Block');
      setSelectedAudios(node.data?.audios || []);
    }
  }, [node?.id]); // Only depend on node ID, not entire data object


  // Memoized update function to prevent unnecessary recreations
  const updateNodeData = useCallback((audios, nodeTitle) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              audios,
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
    const newAudios = [];
    for (const file of files) {
      const audio = await new Promise((resolve) => {
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
      newAudios.push(audio);
    }

    const updatedAudios = [...selectedAudios, ...newAudios];
    setSelectedAudios(updatedAudios);
    updateNodeData(updatedAudios, title);
  };


  const removeFile = useCallback((fileId) => {
    setSelectedAudios(prev => {
      const newAudios = prev.filter(audio => audio.id !== fileId);
      updateNodeData(newAudios, title);
      return newAudios;
    });
  }, [updateNodeData, title]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedAudios.forEach(audio => {
        if (audio.preview) {
          URL.revokeObjectURL(audio.preview);
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
          <div style={audioStyles.container}>
            {/* <Mic size={40} color='#237804'/> */}
            {/* <div style={{ width: "50px", height: "50px" }}>
              <AudioPropIcon />
            </div> */}
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <AudioPropIcon />
              </div>
              <p>Audio</p>
            </div>

            <hr/>
            
            <div style={audioStyles.uploadArea}>
              <input className='media-upload-section'
                type="file"
                multiple
                onChange={handleFileSelect}
                id="audio-file"
                accept="audio/*"
              />
              <label className="media-upload" id="audio-upload" htmlFor="audio-file">
                <UploadCloudIcon size={24} strokeWidth={1.5} />
              </label>
            </div>

            <div style={audioStyles.previewList}>
              {selectedAudios.map((audio) => (
                <AudioPreview 
                  key={audio.id}
                  audio={audio}
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

export default AudioNodePropertyPanel;