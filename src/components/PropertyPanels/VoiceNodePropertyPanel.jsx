import React, { useState, useEffect, useCallback,memo } from 'react';
import { X, UploadCloudIcon, Mic } from 'lucide-react';
import { voiceStyles } from '../../modules/panelStyles';
import { VoicePropIcon } from '../../modules/projectIcons';


// Memoized voice preview component to prevent unnecessary re-renders
const VoicePreview = memo(({ voice, onRemove }) => (
    <div style={voiceStyles.previewContainer}>
        <audio 
            controls
            style={voiceStyles.voicePreview}
            src={voice.preview}
        />
        <div style={voiceStyles.fileName}>{voice.name}</div>
        <button
            onClick={() => onRemove(voice.id)}
            style={voiceStyles.removeButton}
        >
        <X size={16} />
        </button>
    </div>

));

const VoiceNodePropertyPanel = ({ node, setNodes, onClose }) => {

  const [title, setTitle] = useState(node.data?.title || 'Voice Block');
  const [selectedVoices, setSelectedVoices] = useState(node.data?.voices || []);
  const [activeTab, setActiveTab] = useState('options');


  // Load data only when node ID changes
  useEffect(() => {
    if (node?.id) {
      setTitle(node.data?.title || 'Voice Block');
      setSelectedVoices(node.data?.voices || []);
    }
  }, [node?.id]); // Only depend on node ID, not entire data object


  // Memoized update function to prevent unnecessary recreations
  const updateNodeData = useCallback((voices, nodeTitle) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              voices,
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
    const newVoices = [];
    for (const file of files) {
      const voice = await new Promise((resolve) => {
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
      newVoices.push(voice);
    }

    const updatedVoices = [...selectedVoices, ...newVoices];
    setSelectedVoices(updatedVoices);
    updateNodeData(updatedVoices, title);
  };


  const removeFile = useCallback((fileId) => {
    setSelectedVoices(prev => {
      const newVoices = prev.filter(voice => voice.id !== fileId);
      updateNodeData(newVoices, title);
      return newVoices;
    });
  }, [updateNodeData, title]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedVoices.forEach(voice => {
        if (voice.preview) {
          URL.revokeObjectURL(voice.preview);
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
          <div style={voiceStyles.container}>
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <VoicePropIcon />
              </div>
              <p>Voice</p>
            </div>

            <hr/>
            
            <div style={voiceStyles.uploadArea}>
              <input className='media-upload-section'
                type="file"
                multiple
                onChange={handleFileSelect}
                id="voice-file"
                accept="audio/*"
              />
              <label className="media-upload" id="voice-upload" htmlFor="voice-file">
                <UploadCloudIcon size={24} strokeWidth={1.5} />
              </label>
            </div>

            <div style={voiceStyles.previewList}>
              {selectedVoices.map((voice) => (
                <VoicePreview 
                  key={voice.id}
                  voice={voice}
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

export default VoiceNodePropertyPanel;