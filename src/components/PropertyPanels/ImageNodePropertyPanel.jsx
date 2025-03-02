import React, { useState, useEffect, useCallback,memo } from 'react';
import { X, UploadCloudIcon, Image } from 'lucide-react';
import { imageStyles } from '../../modules/panelStyles';
import { ImagePropIcon } from '../../modules/projectIcons';


// Memoized image preview component to prevent unnecessary re-renders
const ImagePreview = memo(({ image, onRemove }) => (

    <div style={imageStyles.previewContainer}>
        <img
            src={image.preview}
            alt={`Preview ${image.name}`}
            style={imageStyles.imagePreview}
        />
        <button
            onClick={() => onRemove(image.id)}
            style={imageStyles.removeButton}
        >
        <X size={16} />
        </button>
    </div>
));

const ImageNodePropertyPanel = ({ node, setNodes, onClose }) => {

  const [title, setTitle] = useState(node.data?.title || 'Image Block');
  const [selectedImages, setSelectedImages] = useState(node.data?.images || []);
  const [activeTab, setActiveTab] = useState('options');


  // Load data only when node ID changes
  useEffect(() => {
    if (node?.id) {
      setTitle(node.data?.title || 'Image Block');
      setSelectedImages(node.data?.images || []);
    }
  }, [node?.id]); // Only depend on node ID, not entire data object


  // Memoized update function to prevent unnecessary recreations
  const updateNodeData = useCallback((images, nodeTitle) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              images,
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
    const newImages = [];
    for (const file of files) {
      const image = await new Promise((resolve) => {
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
      newImages.push(image);
    }

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);
    updateNodeData(updatedImages, title);
  };


  const removeFile = useCallback((fileId) => {
    setSelectedImages(prev => {
      const newImages = prev.filter(image => image.id !== fileId);
      updateNodeData(newImages, title);
      return newImages;
    });
  }, [updateNodeData, title]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedImages.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);



  return (
    <div className="properties-panel">
      {/* Tab Navigation (Same as Image panel) */}

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
          <div style={imageStyles.container}>
            {/* <Image size={40} fill="#237804" color='#EEEEEE'/> */}
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <ImagePropIcon />
              </div>
              <p>Image</p>
            </div>

            <hr/>
            
            
            <div style={imageStyles.uploadArea}>
              <input className='media-upload-section'
                type="file"
                multiple
                onChange={handleFileSelect}
                id="image-file"
                accept="image/*"
              />
              <label className="media-upload" id="image-upload" htmlFor="image-file">
                <UploadCloudIcon size={24} strokeWidth={1.5} />
              </label>
            </div>

            <div style={imageStyles.previewGrid}>
              {selectedImages.map((image) => (
                <ImagePreview 
                  key={image.id}
                  image={image}
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

export default ImageNodePropertyPanel;